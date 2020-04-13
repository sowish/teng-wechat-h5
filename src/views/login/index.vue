<template>
    <div class="main">
        <template v-if="ifReg">
            <div class="content">
                <div class="regTitle">请先填写您的手机号</div>
                <div class="phone-num">
                    <div class="phone-icon">

                    </div>
                    <input class="number" type="number"
                           placeholder="请输入手机号码" v-model="userNum">
                </div>
                <div class="phone-code">
                    <div style="margin-left: 0.33rem" class="code-icon">

                    </div>
                    <input style="margin-left: 0.2rem" class="code" type="number"
                           oninput="if(value.length>6)value=value.slice(0,6)" placeholder="请输入验证码" v-model="userCode">
                    <div class="get-code" @click="sendMs">{{btnMs}}</div>
                    <button class="btn" :disabled="dis" @click="bindPhone">绑定手机号</button>
                </div>
            </div>
        </template>
        <template v-if="!ifReg">
            <div class="regContent">
                <div class="bind-img"></div>
                <div class="bing-ms">绑定成功</div>
                <div class="btn-sc" @click="goPage('/home')">进入首页</div>
            </div>
        </template>
        <!--<div v-if="!ifReg" class="reg">此用户已经绑定过其它微信号了,<br/>请不要重复绑定。</div>-->
    </div>
</template>

<script>
    import {getUrlParamOpenId} from '@/static/js/lib/userLogin/index.js';
    import {api} from "@/api/api";

    let Base64 = require('js-base64').Base64;
    export default {
        data() {
            return {
                dis: false,
                userNum: "",
                userCode: '',
                btnMs: '获取验证码',
                ifAble: true,
                ifReg: true,
                reg: /^1[3456789]\d{9}$/,
                oId: '',
                nickname: '',
                headimgurl: '',
            }
        },
        methods: {
            sendMs() {
                let reg = this.reg;
                if (this.userNum == '') {
                    this.$toast({
                        position: 'bottom',
                        message: '请输入手机号'
                    });
                    return;
                }
                if (!reg.test(this.userNum)) {
                    this.$toast({
                        position: 'bottom',
                        message: '请输入正确的手机号'
                    });
                    return;
                }
                if (this.ifAble) {
                    this.ifAble = false;
                    this.getCode();
                    let timeMs = 60;
                    //倒计时
                    let timeSet = setInterval(() => {
                        this.btnMs = timeMs + 's后重发';
                        timeMs--;
                        if (timeMs < 0) {
                            this.btnMs = '获取验证码';
                            this.ifAble = true;
                            clearInterval(timeSet);
                        }
                    }, 1000);
                }

            },
            getCode() {
                api('/wechat/userInfo/sendMessage?phone='+this.userNum+'&hospitalCode='+localStorage.getItem('hospitalCode'), 'get',).then(res => {
                    console.log(res);
                    if (res.data.code == 2000) {
                        this.$toast({
                            message: '发送成功',
                            icon: 'success'
                        })
                    } else {
                        this.$toast({
                            message: res.data.msg,
                            position: 'bottom'
                        })
                    }
                })
            },
            bindPhone() {
                if (this.userNum == '') {
                    this.$toast({
                        position: 'bottom',
                        message: '请输入手机号'
                    });
                    return;
                } else if (!this.reg.test(this.userNum)) {
                    this.$toast({
                        position: 'bottom',
                        message: '请输入正确的手机号'
                    });
                    return;
                } else {
                    if (!this.userCode) {
                        this.$toast({
                            position: 'bottom',
                            message: '请输入验证码'
                        });
                        return;
                    }
                }
                this.dis = true;
                // alert(this.nickname);
                // alert(this.headimgurl);
                let param = {
                    phone: this.userNum,
                    validcode: this.userCode,
                    openId: this.oId,
                    weChatName: this.nickname,
                    weChatPortrait: this.headimgurl,
                    hospitalCode: localStorage.getItem('hospitalCode')
                };
                api('/wechat/userInfo/userRegistry', 'post', param).then(res => {
                    console.log(res);
                    if (res.data.code == 2000) {
                        this.dis = false;
                        this.ifReg = false;
                    } else {
                        this.ifReg = true;
                        this.dis = false;
                        this.$toast(res.data.msg);
                    }
                })
            },
            goPage(url) {
                this.$router.push(url)
            },
        },
        created() {
            //获取title
            document.title = this.$route.meta.title;
            let oId = getUrlParamOpenId('openId');
            // nickname=getUrlParamOpenId('nickname'),
            // headimgurl=getUrlParamOpenId('headimgurl')
            this.oId = oId;
            // console.log('img-----' + Base64.decode(headimgurl));
            // let oId='123456789';//注册过,返回首页
            // let oId='987654321';   //没注册,允许注册
            if (oId) {
                // alert('有openid');
                api('/wechat/redirect/getUserInfo', 'post', {openId: oId}).then(res => {
                    console.log(res);
                    if (res.data.code == 2000) {
                        this.nickname = res.data.data.nickname;
                        this.headimgurl = res.data.data.headImgUrl;
                    }
                })
                api('/wechat/userInfo/userCheck', 'post', {}, {
                    'openId': oId,
                    'hospitalCode': localStorage.getItem('hospitalCode')
                }).then(res => {
                    if (res.data.code == 2000) {  //注册过
                        // this.$router.replace('/home');
                        this.ifReg = false;
                    } else {
                        this.ifReg = true;
                        // alert(res.dsta.msg+'没注册');
                    }
                });

            } else {
                this.$toast({
                    message: '客户端异常，参数错误！',
                    position: 'bottom'
                });
            }
        }
    }
</script>

<style scoped>
    .main {
        background-image: url("../../static/images/login_bg.png");
        height: 100%;
        background-repeat: no-repeat;
        background-size: 375px;
        float: left;
    }

    .content {
        width: 345px;
        height: 272px;
        margin: 16px 15px 0 15px;
        background: #ffffff;
        box-shadow: 0px 4px 24px -6px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        float: left;
    }

    .regTitle {
        width: 180px;
        height: 30px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
        margin: 20px 0 16px 20px;
    }

    .phone-num {
        width: 305px;
        height: 42px;
        background: rgba(248, 248, 248, 1);
        border-radius: 8px;
        border: 1px solid rgba(229, 229, 229, 1);
        margin: 0 auto 16px;
    }

    .phone-icon {
        background-image: url("../../static/images/phone_icon.png");
        width: 15px;
        height: 22px;
        background-size: 22px 22px;
        background-repeat: no-repeat;
        background-position: center;
        margin-top: 10px;
        margin-left: 13.5px;
        float: left;
    }

    .number {
        display: block;
        float: right;
        width: 250px;
        height: 22px;
        background: none;
        border: none;
        border-left: 1px solid rgba(229, 229, 229, 1);
        font-size: 12px;
        color: #ADADAD;
        margin-top: 9px;
        margin-right: 7px;
        padding-left: 9px;
    }

    input::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #ADADAD;
        /* placeholder字体大小  */
        font-size: 8px;
        /* placeholder位置  */
        text-align: left;
    }

    .regContent {
        width: 345px;
        height: 300px;
        margin: 16px 15px 0 15px;
        background: #ffffff;
        box-shadow: 0px 4px 24px -6px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        float: left;
    }
    .phone-code {
        width: 305px;
        height: 42px;
        margin: 0 auto;
        background: rgba(248, 248, 248, 1);
        border-radius: 8px;
        border: 1px solid rgba(229, 229, 229, 1);
    }

    .code-icon {
        background-image: url("../../static/images/code_icon.png");
        width: 19.35px;
        height: 22px;
        background-size: 19.35px 22px;
        background-repeat: no-repeat;
        background-position: center;
        margin-top: 10px;
        margin-left: 13.5px;
        float: left;
    }

    .code {
        display: block;
        float: left;
        width: 125px;
        height: 22px;
        border: none;
        background: none;
        border-left: 1px solid rgba(229, 229, 229, 1);
        font-size: 12px;
        color: #ADADAD;
        margin-top: 9px;
        padding-left: 9px;
        margin-left: 9px;
    }

    .get-code {
        width: 86px;
        height: 24px;
        font-size: 14px;
        color: #00C5AF;
        float: right;
        margin-top: 7px;
        margin-right: 15px;
        font-weight: 400;
        border-radius: 12px;
        text-align: center;
        line-height: 24px;
        border: 2px solid rgba(0, 197, 175, 1);
    }

    .btn {
        width: 305px;
        height: 42px;
        background: rgba(0, 197, 175, 1);
        border-radius: 8px;
        font-size: 15px;
        color: #FFFFFF;
        margin-top: 40px;
        border: none;
    }

    .bind-img {
        width: 100px;
        height: 100px;
        background-image: url("../../static/images/bind_sc.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100px 100px;
        margin: 32px auto 0;
    }

    .bing-ms {
        text-align: center;
        height: 30px;
        font-size: 20px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
        margin: 32px auto 0;
    }

    .btn-sc {
        text-align: center;
        width: 305px;
        height: 42px;
        background: rgba(0, 197, 175, 1);
        border-radius: 4px;
        border: none;
        font-size: 15px;
        color: #FFFFFF;
        line-height: 42px;
        margin: 30px auto 0px;
    }

    .reg {
        text-align: center;
        vertical-align: middle;
        font-size: 15px;
        position: absolute;
        bottom: 42.5px;
        left: 75px;
        font-weight: 400;
        color: rgba(208, 2, 27, 1);
        line-height: 22.5px;
    }
</style>
