<template>
    <div>
        <div class="no-header">
            <div class="no-card-icon">

            </div>
            <div class="no-card-text">
                绑定就诊卡
            </div>
            <div @click="skip" class="no-card-button">
                绑卡
            </div>
        </div>
        <template v-if="ifRes">
            <div v-if="list.length==0">
                <div class="no-middle">
                    您还没有就诊卡，请绑定就诊卡～
                </div>
                <div @click="skip" class="no-button">
                    绑定就诊卡
                </div>
            </div>
            <div class="container" v-if="list.length!=0">
                <div v-for="item in list" class="box">
                    <div style="font-size: 18px;font-weight: bold;">
                        {{item.name}}
                        <div v-if="item.isDefault==1" class="defalut">
                            默认
                        </div>
                    </div>
                    <div style="font-size: 12px;line-height: 30px;">
                        ID卡：{{item.cardId}}
                    </div>
                    <div @click="$router.push({path:'/reg'})" class="add">
                        <img src="../../static/images/reports/add.png" alt="">
                        <span>点击此处挂号</span>
                    </div>
                    <div class="erweima">
                        <div class="img">
                            <vue-qr :text="item.cardId" :size="66" :margin="4"></vue-qr>
                        </div>
<!--                        <img :src="'https://api.ooopn.com/qr/api.php?text='+item.cardId" alt="">-->
                        <div @click="look(item)" style="color: #008a7c;font-size: 12px;">
                            *使用二维码
                        </div>
                        <div @click="skipInfo(item)" class="jiuzhenka">
                            就诊卡
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <van-popup v-model="isShow">
            <div class="pop">
                <div class="tk-logo">

                </div>
                <div class="show-code">
                    <vue-qr :text="cardId" :size="180" :margin="4"></vue-qr>
<!--                    <img :src="'https://api.ooopn.com/qr/api.php?text='+cardId">-->
                </div>
                <div class="show-id">
                    就诊卡ID：{{cardId}}
                </div>
                <div class="show-bottom">
                    *使用时，请出示此码。
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import vueQr from 'vue-qr';
    import {api} from "@/api/api";
    import {getUrlParam} from '@/static/js/lib/userLogin/index.js';
    export default {
        data() {
            return {
                ifCard: false,
                list: [],
                isShow: false,
                cardId: '',
                erweima: '',
                ifRes:false,
            }
        },
        methods: {
            look(e) {
                console.log(e);
                this.cardId = e.cardId;
                this.isShow = true;
            },
            skipInfo(e) {
                // console.log(JSON.stringify(e));
                this.$router.push({path: '/reportsInfo', query: {info: JSON.stringify(e)}});
            },
            skip() {
                if (this.list.length > 5) {
                    this.$dialog.alert({
                        title: '温馨提示',
                        message: '同一微信用户最多允许绑定6张电子就诊卡。'
                    });
                } else {
                    this.$router.push({path: '/bindCard/userSearch'});
                }
            },
            getList() {
                api('/binding/getPatientInfoListByUserHosId?token=' + sessionStorage.getItem('token') + '&hospitalCode=' + localStorage.getItem('hospitalCode'), 'get', {
                    // token: sessionStorage.getItem('token'),
                    // // token:'',
                    // hospitalCode: localStorage.getItem('hospitalCode')
                }).then(res => {
                    console.log(res);
                    this.ifRes=true;
                    if (res.data.code == 2000) {
                        let arr = res.data.data.list;
                        this.list = arr;
                    }
                })
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
            }
        },
        mounted() {
            document.title = this.$route.meta.title;
            //this.getList();
            if (!sessionStorage.getItem('openid')) {
               this.userLogin();
            }
            else {
                let openId = sessionStorage.getItem('openid');
                api('/wechat/userInfo/userCheck', 'post', {}, {
                    'openId': openId,
                    'hospitalCode': localStorage.getItem('hospitalCode')
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 2000) {  //注册过
                        // this.$router.replace('/home');
                        let token = res.data.data;
                        console.log(token);
                        sessionStorage.setItem('token', token);
                        this.getList();
                    } else {
                        this.$router.push({path:'/phone',query:{openId:openId}});
                        // alert(res.dsta.msg+'没注册');
                    }
                });
            }

        },
        components: {
            vueQr
        },
    }
</script>

<style lang="less" scoped>
    .erweima {
        position: absolute;
        top: 15px;
        right: 36px;
        text-align: center;
        .img {
            width: 66px;
            height: 66px;
            margin-bottom: 8px;
        }
        .jiuzhenka {
            height: 20px;
            line-height: 20px;
            font-size: 15px;
            color: #008a7c;
            border: 1px solid #008a7c;
            border-radius: 10px;
            margin-top: 10px;
        }
    }

    .add {
        position: absolute;
        height: 32px;
        line-height: 32px;
        left: 15px;
        bottom: 15px;
        overflow: hidden;
        img {
            float: left;
            width: 32px;
            height: 32px;
            margin-right: 10px;
        }
        span {
            float: left;
            font-size: 14px;
        }
    }

    .defalut {
        height: 20px;
        line-height: 20px;
        color: #ff962b;
        display: inline-block;
        font-size: 12px;
        background: #FFF4E9;
        padding: 0 8px;
        border-radius: 10px;
    }

    .container {
        width: 100%;
        box-sizing: border-box;
        padding: 69px 15px 0;
    }

    .box {
        width: 100%;
        height: 150px;
        box-sizing: border-box;
        border-radius: 6px;
        background-color: #fff;
        padding: 15px 15px 15px 15px;
        color: #333333;
        position: relative;
    }

    .no-header {
        width: 375px;
        height: 54px;
        background: #ffffff;
        float: left;
    }

    .no-card-icon {
        width: 30px;
        height: 30px;
        float: left;
        background-image: url("../../static/images/reports/card_icon.png");
        background-size: 30px 30px;
        background-repeat: no-repeat;
        background-position: center;
        margin-top: 12px;
        margin-left: 16px;
    }

    .no-card-text {
        height: 24px;
        font-size: 16px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        margin-top: 15px;
        margin-left: 8px;
        float: left;
    }

    .no-card-button {
        width: 68px;
        height: 30px;
        background: rgba(0, 197, 175, 1);
        border-radius: 15px;
        float: right;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
        margin-top: 12px;
        margin-right: 16px;
    }

    .no-middle {
        position: absolute;
        height: 26px;
        font-size: 17px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 26px;
        left: 60px;
        top: 178px;
    }

    .no-button {
        width: 115px;
        height: 40px;
        border-radius: 20px;
        border: 2px solid rgba(0, 138, 124, 1);
        font-size: 15px;
        font-weight: 400;
        color: rgba(0, 138, 124, 1);
        line-height: 40px;
        position: absolute;
        left: 130px;
        top: 224px;
        text-align: center;
    }

    .pop {
        width: 345px;
        height: 376px;
        background: rgba(255, 255, 255, 1);
        border-radius: 12px;
        overflow: hidden;
    }

    .tk-logo {
        width: 53px;
        height: 31px;
        margin: 28px auto 0;
        background-image: url("../../static/images/user_center/logo.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 53px 31px;
    }

    .show-code {
        width: 180px;
        height: 180px;
        margin: 28px auto 0;
    }

    .show-code img {
        width: 180px;
        height: 180px;
    }

    .show-id {
        height: 18px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
        text-align: center;
    }

    .show-bottom {
        height: 49px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 49px;
        text-align: center;
        margin-top: 28px;
        background: rgba(248, 248, 250, 1);
    }

</style>