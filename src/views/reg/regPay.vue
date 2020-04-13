<template>
    <div>
        <div class="tip">
            请在{{minutes}}:<span v-if="seconds<10">0</span>{{seconds}}内完成支付
        </div>
        <div class="price">
            <div class="price-til">挂号费用</div>
            <div>{{price}}元</div>
        </div>
        <div class="pay-chn">
            <div class="pay-text">
                请选择支付方式
            </div>
            <div class="wx">
                <div class="wx-pay">
                    微信支付
                </div>
                <div class="pay-icon">

                </div>
            </div>
        </div>
        <div class="note">
            温馨提示：<br>
            挂号必须5分钟内支付，超时自动取消。
        </div>
        <div class="btn">
            <div class="btn-left">
                应支付：<span class="price-color">{{price}}元</span>
            </div>
            <div class="btn-right" @click="goPay">
                去支付
            </div>
        </div>
        <van-overlay :show="show">
            <div class="wrapper">
                <div class="block">
                    <div class="loading-icon">

                    </div>
                    <div class="loading">
                        支付中
                    </div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
    import {api} from '@/api/api';
    import axios from '@/api/index';
    import module from '../../../vue.config';
    import {weixinPay} from "./pay";

    export default {
        data() {
            return {
                show: false,
                id: this.$route.query.id,
                price: this.$route.query.price,
                payDisabled: true,//防止支付重复点击
                token: sessionStorage.getItem('token'),
                minutes: 4,
                seconds: 59,
                interval: null,

            }
        },
        beforeDestroy() {
            clearInterval(this.interval);
            this.interval = null;
        },
        methods: {
            timer() {
                let _this = this;
                _this.interval = setInterval(() => {
                    // console.log('分钟'+_this.minutes);
                    // console.log('秒' + _this.seconds);
                    _this.seconds -= 1;
                    if (_this.seconds < 0 && _this.minutes > 0) {
                        _this.seconds = 59;
                        _this.minutes -= 1;
                    }
                    // if () {
                    //
                    // }
                    if (_this.minutes < 1 && _this.seconds === 0) {
                        // console.log('分钟小于1，秒等于0');
                        clearInterval(_this.interval);
                        _this.interlval = null;
                        _this.$router.replace({path: '/registration/details', query: {id: _this.id}});
                    }
                    // sessionStorage.setItem('payMint', _this.minutes);
                    // sessionStorage.setItem('paySecond', _this.seconds);
                }, 1000);
            },
            //支付
            goPay() {
                this.show = true;
                if (this.payDisabled) {
                    this.payDisabled = false;
                    let param = {
                        applicationCode: 'CLOUDHOSPITAL-PLATFORM-XIANLIN',
                        bookId: this.id,
                        flag: 'native',
                        payType: 'WX',
                        price: this.price,
                        hospitalCode:localStorage.getItem('hospitalCode')
                    };
                    api('/registerController/insurePay?token=' + sessionStorage.getItem('token'), 'post', param).then(res => {
                        console.log(res);
                        if (res.data.code == 2000) {
                            this.show = false;
                            let obj = res.data.data;
                            // alert('id' + obj.appId);
                            // alert('时间戳' + obj.timestamp);
                            // alert('随机串' + obj.nonceStr);
                            // alert('pageageStr=' + obj.packageStr);
                            // alert('签名' + obj.paySign);
                            // this.wxReadytoPay(obj);
                            // 'appId': options.appId,
                            //     'timeStamp': options.timestamp,
                            //     'nonceStr': options.nonceStr,
                            //     'package': options.packageStr,
                            //     'signType': 'HMAC-SHA256',
                            //     'paySign': options.paySign
                            weixinPay({
                                'appId': obj.appId,
                                'timeStamp': obj.timestamp,
                                'nonceStr': obj.nonceStr,
                                Package: obj.packageStr,
                                // 'signType': 'HMAC-SHA256',
                                'paySign': obj.paySign,
                                callback: this.isCallBack
                            })


                        } else {
                            alert(res.data.msg);
                            this.payDisabled = true;
                            this.show = false;
                        }
                    })

                }
            },
            isCallBack(res) {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    this.goSucceed();
                } else {
                    this.payDisabled = true;
                    // alert('取消支付');
                }
            },
            goSucceed() {
                // alert(this.id);
                this.$router.replace({path: '/reg/regSuc', query: {bookId: this.id}});
            },

            wxReadytoPay(options) {
                let that = this;
                if (typeof WeixinJSBridge == 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady(options), false);
                    }
                    else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady(options));
                        document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady(options));
                    }
                } else {
                    console.log('环境正确');
                    that.onBridgeReady(options);
                }
            },
            getTime() {
                api('/registerController/appointDetail?token=' + sessionStorage.getItem('token') + '&bookId=' + this.id, "get").then(res => {
                    console.log(res);
                    if (res.data.code == 2000) {
                        let obj = res.data.data,
                            createTime = obj.createTime,
                            toDay = new Date().getTime(),
                            time = 5 * 60 * 1000 - (toDay - new Date(createTime.replace(/-/g, '/')).getTime());
                        console.log(time);
                        if (time > 0) {
                            let mm = Math.floor((time / 1000 / 60) % 60);
                            let ss = Math.floor((time / 1000) % 60);
                            this.minutes = mm;
                            this.seconds = ss;
                            this.timer();
                        } else {
                            this.$router.replace({path: '/registration/details', query: {id: this.id}});
                        }

                    }
                })
            }
            // onBridgeReady(options) {
            //     // let that=this;
            //     WeixinJSBridge.invoke(
            //         'getBrandWCPayRequest', {
            //             'appId': options.appId,
            //             'timeStamp': options.timestamp,
            //             'nonceStr': options.nonceStr,
            //             'package': options.packageStr,
            //             'signType': 'HMAC-SHA256',
            //             'paySign': options.paySign
            //             // 'prePayId':options.prePayId
            //         },
            //         function (res) {
            //             this.$dialog.alert({
            //                 title: '标题',
            //                 message: '弹窗内容'
            //             }).then(() => {
            //                 // on close
            //                 this.$router.push({path: '/reg/regSuc', query: {}});
            //             });
            //             if (res.err_msg == "get_brand_wcpay_request:ok") {
            //
            //             } else {
            //                 // alert('支付失败');
            //                 console.log('支付失败');
            //                 console.log(res);
            //             }
            //         }
            //     )
            // }
        },
        //返回事件
        beforeRouteLeave(to, from, next) {
            // alert(to.name);
            // alert(from.name);
            // alert(next);
            // console.log(to);
            // console.log(from);
            // console.log(next);
            if (to.name == 'reg/doctorLists') {
                next(false);
                this.$dialog.confirm({
                    title: '支付提示',
                    message: '是否取消支付',
                    confirmButtonText: '继续支付',
                    cancelButtonText: '取消支付',
                    confirmButtonColor: '#008A7C'
                }).then(() => {
                    window.location.reload();
                }).catch(() => {
                    this.$router.replace({path: '/registration'})
                    next();
                });
            } else {
                next();
            }
        },
        mounted() {
            // if (sessionStorage.getItem('payMint') && sessionStorage.getItem('paySecond')) {
            //     this.minutes = sessionStorage.getItem('payMint');
            //     this.seconds = sessionStorage.getItem('paySecond');
            // }
            // console.log(this.$route.query.id);
            // this.timer();
            this.getTime();
            // alert(2);
            // sessionStorage.setItem('bookId', this.$route.query.id);
        }
    }
</script>

<style scoped>
    .tip {
        text-align: center;
        height: 33px;
        background: rgba(238, 120, 0, .1);
        font-size: 14px;
        font-weight: 400;
        color: rgba(238, 120, 0, 1);
        line-height: 33px;
        margin-bottom: 12px;
    }

    .price {
        display: flex;
        padding: 0 15px;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #EE7800;
        height: 45px;
        background: #ffffff;
        margin-bottom: 12px;
    }

    .price-til {
        color: rgba(51, 51, 51, 1);
    }

    .pay-chn {
        padding: 0 15px;
        height: 94px;
        background: rgba(255, 255, 255, 1);
        margin-bottom: 12px;
    }

    .pay-text {
        height: 49px;
        line-height: 49px;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 1px solid #D8D8D8;
    }

    .wx {
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .wx-pay {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
    }

    .pay-icon {
        width: 15px;
        height: 15px;
        background-image: url("../../static/images/reg/pay.png");
        background-size: 15px 15px;
        background-repeat: no-repeat;
        background-position: center;
    }

    .note {
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        padding-left: 15px;
    }

    .btn {
        position: absolute;
        height: 44px;
        width: 100%;
        bottom: 0;
        display: flex;
        font-size: 16px;
    }

    .btn-left {
        width: 50%;
        height: 44px;
        line-height: 44px;
        color: #333333;
        text-align: center;
        background: #ffffff;
    }

    .btn-right {
        width: 50%;
        height: 44px;
        line-height: 44px;
        color: #FFFFFF;
        text-align: center;
        background: #00C5AF;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .loading-icon {
        width: 80px;
        height: 80px;
        background-image: url("../../static/images/reg/loading.png");
        background-repeat: no-repeat;
        background-size: 80px 80px;
        background-position: center;
        margin-bottom: 12px;
    }

    .block {

    }

    .loading {
        height: 24px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        text-align: center;
    }

    .price-color {
        color: #EE7800;
    }
</style>