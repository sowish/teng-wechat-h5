<template>
    <div>
        <van-tree-select
                :items="items"
                :main-active-index.sync="activeIndex"
                height='100vh'
                v-if="items!=''"
        >
            <template slot="content">
                <div @click="goPage(item.disabled,item.hisDeptCode,item.standardDeptId,item.hisHospitalCode)"
                     class="select-two"
                     v-for="(item,index) in items[activeIndex].children" :key="index">
                    <div class="select-con">
                        <div class="name" :class="{dis:item.disabled}">{{item.text}}</div>
                        <div class="pic"></div>
                    </div>
                </div>
            </template>
        </van-tree-select>
    </div>
</template>

<script>
    import {getUrlParam} from '@/static/js/lib/userLogin/index.js';
    import {api} from '@/api/api';

    export default {
        data() {
            return {
                hospitalCode: localStorage.getItem("hospitalCode"),
                token: sessionStorage.getItem('token'),
                items: '',//1是正常 0 是禁用
                lists: [],
                activeIndex: 0,//表示左侧高亮选项的索引
            }
        },
        methods: {
            /*判断有没有绑卡*/
            ifBind() {
                api('/binding/getPatientInfoListByUserHosId?hospitalCode=' + this.hospitalCode + '&token=' + this.token, 'get').then(res => {
                    if (res.data.code == 2000) {
                        if (res.data.data == null) {
                            this.$router.push('/bindCard/userSearch')
                        }
                    }
                });
            },
            userLogin() {
                const code = getUrlParam('code');
                const wechartUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?',
                    webUrl = encodeURIComponent(window.location.href),
                    appId = localStorage.getItem('appId'),
                    resultUrl = wechartUrl + 'appid=' + appId + '&redirect_uri=' + webUrl + '&response_type=code&scope=snsapi_base#wechat_redirect';
                if (code == null || code == "") {
                    // alert('跳转授权');
                    window.location.href = resultUrl;
                } else {
                    //有了code,调接口请求用户信息openid
                    api('/wechat/redirect/greetUser', 'post', {appid: appId, code: code}).then(res => {
                        console.log(res);
                        // alert(res.data.code);
                        if (res.data.code == 2000) {
                            let openid = res.data.data.openId;
                            sessionStorage.setItem('openid', openid);
                            window.location.reload();
                        } else {
                            alert(res.data.msg);
                        }
                    })
                }
            },
            /*获取列表*/
            getLists() {
                api('/hospital/department/book/list?hospitalCode=' + this.hospitalCode + '&token=' + this.token + '&flag=1', 'post').then(res => {
                    console.log(res)
                    this.items = [];
                    if (res.data.code == 2000) {
                        this.lists = res.data.data;
                        // console.log(res.data.data, this.token);
                        for (let i = 0; i < this.lists.length; i++) {
                            let obj1 = {
                                text: this.lists[i].departmentName,
                                className: 'my-class',
                                children: []
                            };
                            for (let j = 0; j < this.lists[i].list.length; j++) {
                                let obj2 = {
                                    id: j,
                                    text: this.lists[i].list[j].hisDeptName,
                                    hisHospitalCode: this.lists[i].list[j].hisHospitalCode,
                                    disabled: this.lists[i].list[j].num == 0 ? true : false,
                                    hisDeptCode: this.lists[i].list[j].hisDeptCode,
                                    standardDeptId: this.lists[i].list[j].standardDeptId
                                };
                                obj1.children.push(obj2);
                            }
                            this.items.push(obj1)
                        }
                        console.log(this.items)
                    }
                })
            },
            goPage(val1, val2, val3, val4) {
                this.$nextTick(() => {
                    this.ifBind();
                    if (val1) {
                        this.$toast({
                            position: 'bottom',
                            message: '该科室暂无号源'
                        });
                    } else {
                        this.$router.push({
                            path: '/reg/doctorLists',
                            query: {hisDeptCode: val2, hisHospitalCode: val4, firstCode: val3}
                        });
                        sessionStorage.setItem('activeIndex', this.activeIndex)
                    }
                })
            }
        },
        created() {
            if (sessionStorage.getItem('activeIndex')) {
                this.activeIndex = Number(sessionStorage.getItem('activeIndex'));
            }
        },
        mounted() {
            document.title = this.$route.meta.title;
            sessionStorage.removeItem('activeIndex');
            // console.log(this.$route.query);
            //泰康医养入口逻辑
            // console.log(this.$route.query.token);
            if (this.$route.query.token) {
                sessionStorage.setItem('token', this.$route.query.token);
                api('/binding/getPatientInfoListByUserHosId?token=' + sessionStorage.getItem('token') + '&hospitalCode=' + localStorage.getItem('hospitalCode'), 'get').then(res => {
                    console.log(res);
                    if (res.data.code == 2000) {
                        if (!res.data.data) {
                            this.$dialog.alert({
                                title: '提示',
                                message: '您还未绑卡，请绑定就诊卡'
                            }).then(() => {
                                // on close
                                this.$router.push('/bindCard/userSearch');
                            });
                            return;
                        }
                        if (res.data.data.list) {
                            this.getLists();
                        }
                    } else {
                        this.$toast({
                            message: res.data.msg,
                            position: 'bottom'
                        })
                    }
                })
            } else {
                if (!(sessionStorage.getItem('openid'))) {
                    this.userLogin();
                    // sessionStorage.setItem('openid', 'ocgM01SSVEdALl-zomFivA1iRtLg');
                    // window.location.reload();
                } else {
                    let openId = sessionStorage.getItem('openid');
                    api('/wechat/userInfo/userCheck', 'post', {}, {
                        'openId': openId,
                        'hospitalCode': localStorage.getItem('hospitalCode')
                    }).then(res => {
                        console.log(res);
                        // alert(res.data.code);
                        if (res.data.code == 2000) {  //注册过
                            // this.$router.replace('/home');
                            let token = res.data.data;
                            console.log(token);
                            // alert(token);
                            sessionStorage.setItem('token', token);
                            //查询用户是否有卡
                            api('/binding/getPatientInfoListByUserHosId?token=' + sessionStorage.getItem('token') + '&hospitalCode=' + localStorage.getItem('hospitalCode'), 'get').then(res => {
                                console.log(res);
                                if (res.data.code == 2000) {
                                    if (!res.data.data) {
                                        this.$dialog.alert({
                                            title: '提示',
                                            message: '您还未绑卡，请绑定就诊卡'
                                        }).then(() => {
                                            // on close
                                            this.$router.push('/bindCard/userSearch');
                                        });
                                        return;
                                    }
                                    if (res.data.data.list) {
                                        this.getLists();
                                    }
                                } else {
                                    this.$toast({
                                        message: res.data.msg,
                                        position: 'bottom'
                                    })
                                }
                            })
                        } else {
                            this.$router.push({path: '/phone', query: {openId: openId}});
                        }
                    });
                }
            }
        },
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    /deep/ .van-sidebar-item--select {
        border-color: #1989fa !important;
    }

    /deep/ .van-tree-select__item--active {
        color: #1989fa !important;
    }

    .select-two {
        padding: 0 15px;
    }

    .select-con {
        padding: 12px 0;
        border-bottom: 1px solid #D8D8D8;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .name {
        height: 24px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
    }

    .pic {
        width: 16px;
        height: 16px;
        background-image: url("../../static/images/reg/down_icon.png");
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position: center;
    }

    .dis {
        color: #CACACA;
    }
</style>