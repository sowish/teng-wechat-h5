<template>
    <div class="container">
        <div class="box">
            <div class="box-i">
                <div class="box-title">姓名</div>
                <div class="box-ctt">{{obj.name}}</div>
            </div>
        </div>
        <div class="box">
            <div class="box-i">
                <div class="box-title">性别</div>
                <div class="box-ctt">{{this.userSex}}</div>
            </div>
        </div>
        <div class="box">
            <div class="box-i">
                <div class="box-title">证件类型</div>
                <div class="box-ctt">{{obj.credentialsType}}</div>
            </div>
        </div>
        <div class="box">
            <div class="box-i">
                <div class="box-title">证件号码</div>
                <div class="box-ctt">{{obj.credentialsId}}</div>
            </div>
        </div>
        <div class="box">
            <div class="box-i">
                <div class="box-title">手机号</div>
                <div class="box-ctt">{{obj.phone}}</div>
            </div>
        </div>
        <div class="box">
            <div style="border-bottom: 0;" class="box-i">
                <div class="box-title">年龄</div>
                <div class="box-ctt">{{this.userAge}}</div>
            </div>
        </div>
        <div class="box mgt">
            <div class="box-i">
                <div class="box-title">卡类型</div>
                <div class="box-ctt">ID卡</div>
            </div>
        </div>
        <div class="box">
            <div style="border-bottom: 0;" class="box-i">
                <div class="box-title">卡号</div>
                <div class="box-ctt">{{obj.cardId}}</div>
            </div>
        </div>
        <div class="box mgt">
            <div class="box-i">
                <div class="box-title">设为默认</div>
                <div class="box-ctt">
                    <van-switch :loading="loading" class="mgt-9" active-color="#00C5AF" v-model="checked"
                                @change="onChange"/>
                </div>
            </div>
        </div>
        <van-button class="my-btn" @click="delCard()" round type="info">解除绑定</van-button>
    </div>
</template>

<script>
    import {api} from '@/api/api';

    export default {
        name: "reportsInfo",
        data() {
            return {
                loading: false,
                checked: false,
                obj: {},
                idNum: '',
                birthday: '',
                userAge: '',
                userSex: '',
                token: sessionStorage.getItem('token'),
                cardText:{
                    '01':'身份证',
                    '09':'护照'
                },
            }
        },
        methods: {
            /*解绑*/
            delCard() {
                console.log(sessionStorage.getItem('token'), this.obj.patientId)
                this.$dialog.confirm({
                    title: '温馨提示',
                    message: '是否取消绑定？'
                }).then(() => {
                    api('/binding/del?token=' + this.token + '&treatmentId=' + this.obj.patientId, 'post').then(res => {
                        console.log(res)
                        if (res.data.code == 2000) {
                            this.$toast({
                                position: 'bottom',
                                message: "解绑成功"
                            });
                            this.$router.go(-1)
                        }
                    })
                }).catch(() => {

                });
            },
            onChange(e) {
                console.log(e);
                this.loading = true;
                var param = {
                    token: sessionStorage.getItem('token'),
                    // cardId: this.obj.id,
                    // hospitalCode: localStorage.getItem('hospitalCode')
                    treatmentId:this.obj.patientId
                };
                if (e) {
                    param.flag = 1;
                    api('/binding/isDefault', 'post', {}, param).then(res => {
                        console.log(res);
                        this.loading = false;
                        if (res.data.code == 2000) {
                            this.$toast({
                                message: '操作成功',
                                position: 'bottom'
                            })
                        } else {
                            this.$toast({
                                message: res.data.msg,
                                position: 'bottom'
                            })
                        }
                    })
                } else {
                    param.flag = 0;
                    api('/binding/isDefault', 'post', {}, param).then(res => {
                        this.loading = false;
                        console.log(res);
                        if (res.data.code == 2000) {
                            this.$toast({
                                message: '操作成功',
                                position: 'bottom'
                            })
                        } else {
                            this.$toast({
                                message: res.data.msg,
                                position: 'bottom'
                            })
                        }
                    })
                }

            },
            getMs() {
                // let idReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                this.birthday = this.idNum.substr(6, 8);
                this.birthday = this.birthday.replace(/(.{4})(.{2})/, "$1-$2-");
                console.log(this.birthday)
                this.userSex = this.idNum.slice(14, 17) % 2 ? "男" : "女";
                let myDate = new Date();
                let month = myDate.getMonth() + 1;
                let day = myDate.getDate();
                this.userAge = myDate.getFullYear() - this.idNum.substring(6, 10) - 1;
                if (this.idNum.substring(10, 12) < month || this.idNum.substring(10, 12) == month && this.idNum.substring(12, 14) <= day) {
                    this.userAge++;
                }
            },
        },
        mounted() {
            document.title = this.$route.meta.title;
            let obj = JSON.parse(this.$route.query.info);
            console.log(obj);
            this.obj = obj;
            this.idNum = obj.credentialsId;
            this.getMs();
            if (obj.isDefault == 1) {
                this.checked = true;
            }else{
                this.checked=false;
            }
        }

    }
</script>

<style scoped>
    .my-btn {
        display: block;
        width: 345px;
        margin: 30px auto 0;
        background-color: #00C5AF;
        font-size: 16px;
        border: 0;
    }

    .mgt-9 {
        margin-top: 9px;
    }

    .mgt {
        margin-top: 12px;
    }

    .container {
        width: 100%;
        background-color: #F8F8FA;
    }

    .box {
        background-color: #fff;
        box-sizing: border-box;
        padding: 0 15px;
    }

    .box-i {
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #E6E6E6;
        overflow: hidden;
        font-size: 16px;
    }

    .box-i .box-title {
        float: left;
        color: #666666;
    }

    .box-i .box-ctt {
        float: right;
        color: #333333;
    }
</style>