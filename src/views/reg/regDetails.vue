<template>
    <div style="position: relative">
        <div class="box-title clear">
            <div class="ft-l">
                ID卡
            </div>
            <div class="ft-r" style="width: 50%;">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="value1" :options="option1"/>
                </van-dropdown-menu>
            </div>
        </div>
        <div class="content">
            <div class="content-title">预约信息</div>
            <div class="content-con">
                <span class="name">医院：</span><span class="text">{{hospitalName}}</span>
            </div>
            <div class="content-con">
                <span class="name">科室：</span><span class="text"> {{departmentName}}</span>
            </div>
            <div class="content-con">
                <span class="name">医生：</span><span class="text"> {{doctorName}}</span>
            </div>
            <div class="content-con">
                <span class="name">医生职称：</span><span class="text"> {{levelName}}</span>
            </div>
            <div class="content-con">
                <span class="name">就诊时间：</span><span class="text"> {{orderDate}}&nbsp;&nbsp;&nbsp;&nbsp;{{ampm[orderTime]}} {{time}}</span>
            </div>
            <div class="content-con">
                <span class="name">预估就诊时间：</span><span class="text">暂无</span><span class="name">（以医院实际情况为准)</span>
            </div>
            <div class="content-con">
                <span class="name">挂号费：</span><span class="price"> {{price}}元</span>
            </div>
            <div class="content-con">
                <span class="name">患者主述：</span><br>
            </div>
            <div class="message">
                <van-cell-group>
                    <van-field
                            v-model="patientNarrate"
                            rows="2"
                            autosize
                            type="textarea"
                            oninput="value=value.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/g,'')"
                            placeholder="温馨提示 ：请简单描述病情，以便医师看诊（非必填）。"
                    />
                </van-cell-group>
            </div>
        </div>
        <div class="tip">
            温馨提示：<br>
            线上支付暂不支持医保，医保卡用户可以选择“医保线下支付”，前往医院需要携带本人医保卡。
        </div>
        <div class="radios">
            <van-radio-group v-model="radio">
                <van-radio name="1" :disabled="ifToday">
                    线下支付
                    <img
                            slot="icon"
                            slot-scope="props"
                            :src="props.checked ? activeIcon : inactiveIcon"
                    >
                </van-radio>
                <van-divider/>
                <van-radio name="2">
                    自费支付
                    <img
                            slot="icon"
                            slot-scope="props"
                            :src="props.checked ? activeIcon : inactiveIcon"
                    >
                </van-radio>
            </van-radio-group>
        </div>
        <!--<div v-if="toDay!=orderDate" class="btn"  @click="goPage">确定预约</div>-->
        <div class="bottom" @click="goPage">确定</div>
        <!--<div style="right: 0" class="bottom"  @click="goPay">确定支付</div>-->
    </div>

</template>

<script>
    import {api} from '@/api/api';
    import moment from 'moment';
    import active from '../../static/images/reg/active.png';
    import noactive from '../../static/images/reg/noactive.png';

    export default {
        data() {
            return {
                ifToday: true,//是否是当天号
                radio: '2',//支付方式
                activeIcon: active,
                inactiveIcon: noactive,
                toDay: '',//今天的时间
                ampm: {'1': '上午', '2': '下午', '3': '全天'},
                orderDate: this.$route.query.orderDate,//日期
                orderDay: this.$route.query.orderDay,//周几
                orderTime: this.$route.query.orderTime,//上午下午
                price: this.$route.query.price,//价格
                schid: this.$route.query.schid,//排班编号
                departmentName: this.$route.query.departmentName,//科室名称
                doctorName: !this.$route.query.doctorName ? "普通号" : this.$route.query.doctorName,//医生名字
                time: this.$route.query.time?this.$route.query.time:'',//具体时间
                categor: this.$route.query.categor,//挂号类别
                deptid: this.$route.query.deptid,//科室id
                firstCode:this.$route.query.firstCode,
                docid: this.$route.query.docid,//医生id
                orgid: this.$route.query.orgid,//医院id（his的）
                hospitalName: this.$route.query.hospitalName,//医院名称
                hospitalId: this.$route.query.hospitalId,//医院id
                levelId: this.$route.query.levelId,//医生级别id
                levelName: !this.$route.query.levelName ? "普通号" : this.$route.query.levelName,//医生职称
                numid: this.$route.query.numid ? this.$route.query.numid : '',//号源编号(分时段预约时传)
                hospitalCode: localStorage.getItem("hospitalCode"),
                token: sessionStorage.getItem('token'),
                //docOrder:JSON.parse(localStorage.getItem('docOrder')),//医生排班相关信息
                //docInfo:JSON.parse(localStorage.getItem('docInfo')),//医生所有信息
                patientNarrate: '',
                value1: '',
                option1: [],
                cardList: [],//卡原始列表
                applicationId: '111111',
                id: '',//
                regDisabled: true,//防止挂号重复点击
            }
        },
        methods: {
            //是否是当天号
            todayFun() {
                this.toDay = moment(new Date()).format('YYYY-MM-DD');
                if (this.toDay != this.orderDate) {
                    this.ifToday = false;
                } else {
                    this.ifToday = true;
                }
            },
            /*确认挂号*/
            goPage() {
                if (this.regDisabled) {
                    //先判断年龄和性别
                    if (this.firstCode == '07') {
                        let myDate = new Date();
                        let month = myDate.getMonth() + 1;
                        let day = myDate.getDate();
                        console.log(this.cardList[this.value1].birthday.split('-')[0] - 1)
                        let userAge = myDate.getFullYear() - this.cardList[this.value1].birthday.split('-')[0] - 1;
                        if (Number(this.cardList[this.value1].birthday.split('-')[1]) < month || Number(this.cardList[this.value1].birthday.split('-')[1]) == month && Number(this.cardList[this.value1].birthday.split('-')[2]) <= day) {
                            userAge++;
                        }
                        console.log(userAge);
                        if (userAge > 14) {
                            this.$toast({
                                position: 'bottom',
                                message: '14岁以上人员不能挂儿科号'
                            });
                            return;
                        }
                    }
                    ;
                    if (this.firstCode == '05' || this.firstCode == '06') {
                        if (this.cardList[this.value1].gender != 'f') {
                            this.$toast({
                                position: 'bottom',
                                message: '男性不能挂妇科或产科号'
                            });
                            return;
                        }
                    }
                    this.regDisabled = false;
                    let param = {
                        appointTimeCode: this.orderTime,//预约时段code,上午，下午
                        categor: this.categor, //挂号类别（专家或普通）
                        departmentId: this.deptid,//科室id
                        departmentName: this.departmentName,//科室名称 ,
                        doctorId: this.docid,//医生id ,
                        doctorName: this.doctorName,//医生名称 ,
                        hisHospitalId: this.orgid,//医院id（his的） ,
                        //hospitalId:"15628319649086a76a83898c3" ,//医院id ,
                        hospitalId: this.hospitalId,//医院id ,
                        //hospitalName:'泰康同济(武汉)医院',//医院名称 ,
                        hospitalName: this.hospitalName,//医院名称 ,
                        patientId: this.cardList[this.value1].patientId,//就诊人id ,
                        price: this.price,//挂号费 ,
                        registeredDate: this.orderDate,//挂号日期 ,
                        registeredTime: this.orderTime,//挂号时间 ,
                        schid: this.schid,//排班编号
                        patientNarrate: this.patientNarrate,//患者主诉
                        levelId: this.levelId,//医生级别id
                        paySource: this.radio,//支付方式
                        numid: this.numid,//号源编号(分时段预约时传)
                    };
                    api('/registerController/register?token=' + this.token, 'post', param).then(res => {
                        console.log(param);
                        console.log(res);
                        if (res.data.code == 2000) {
                            this.id = res.data.data.id;
                            //线下支付
                            if (this.radio == 1) {
                                this.$router.replace({path: '/reg/regSuc', query: {bookId: this.id}});
                                //alert('线下支付');
                            } else {
                                if(sessionStorage.getItem('payMint')||sessionStorage.getItem('paySecond')){
                                    sessionStorage.removeItem('payMint');
                                    sessionStorage.removeItem('paySecond');
                                }
                                this.$router.replace({path: '/reg/regPay', query: {id: this.id, price: this.price}});
                                //alert('线上支付');
                            }
                            /*this.$toast({
                                position: 'bottom',
                                message: '挂号成功，请在5分钟内支付，否则挂号无效'
                            });*/
                            //this.$router.push({path:'/registration/details',query:{id:this.id}});
                        } else {
                            this.$router.replace({path: '/reg/regAbnormal', query: {ms: res.data.msg}})
                        }
                    })
                }
            },
            /*获取卡列表*/
            getCards() {
                api('/binding/getPatientInfoListByUserHosId', 'get', {
                    token: sessionStorage.getItem('token'),
                    hospitalCode: localStorage.getItem('hospitalCode')
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 2000) {
                        this.cardList = res.data.data.list;
                        let arr = res.data.data.list;
                        console.log(this.cardList)
                        for (let i = 0; i < arr.length; i++) {
                            arr[i].text = arr[i].name + ' ' + arr[i].cardId;
                            arr[i].value = i;
                        }
                        this.option1 = arr;
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].isDefault == 1) {
                                this.value1 = i;
                                return;
                            } else {
                                this.value1 = 0;
                            }
                        }
                    }
                })
            },
        },
        created() {
            console.log(this.token);
        },
        mounted() {
            this.getCards();
            document.title = this.$route.meta.title;
            this.todayFun();
        }
    }
</script>

<style scoped>
    .box-title {
        font-weight: bold;
        line-height: 50px;
        background-color: #fff;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 16px;
        color: #333333;
        margin-bottom: 11px;
    }

    .ft-r {
        color: #999999;
    }

    .ft-l {
        font-weight: bold;
        line-height: 50px;
    }

    .content {
        width: 345px;
        background: #ffffff;
        padding: 0 11px 15px 15px;
    }

    .content-title {
        height: 49px;
        font-size: 16px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 49px;
        border-bottom: 1px solid #D8D8D8;
        margin-bottom: 12px;
    }

    .content-con {
        height: 21px;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 400;
    }

    .name {
        color: #999999;
    }

    .text {
        color: #333333;
    }

    .price {
        color: #EE7800;
    }

    .message {
        font-size: 14px;
        font-weight: 400;
    }

    .bottom {
        width: 100%;
        height: 44px;
        background: rgba(0, 197, 175, 1);
        line-height: 44px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: fixed;
        bottom: 0;
    }

    .btn {
        width: 100%;
        height: 44px;
        background: rgba(0, 197, 175, 1);
        line-height: 44px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: absolute;
        bottom: 0;
    }

    .tip {
        padding: 12px 16px 50px 16px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        margin-bottom: 102px;
    }

    .radios {
        position: fixed;
        bottom: 44px;
        height: 90px;
        font-size: 14px;
        width: 360px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding: 12px 0 0px 15px;
        background: #FFFFFF;
    }

    /deep/ .van-radio__icon img {
        width: 15px;
        height: 15px;
    }
</style>