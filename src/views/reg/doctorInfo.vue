<template>
    <div>
        <div class="common">
            <div class="common-left">
                <div v-if="categor==2" class="common-left" style="padding-top: 0;background: none">
                    <img :src='headUrl'>
                </div>
                <div v-if="categor==1" class="common-left-normol">
                    普通<br>门诊
                </div>
            </div>
            <div class="common-right">
                <div class="common-title">
                    <div class="doc-name" v-if="categor==1">普通号</div>
                    <div class="shenglue doc-name">{{docname}}</div>
                    &nbsp;&nbsp;
                    <div class="doc-title">{{levelName}}</div>
                </div>
                <div class="common-name">
                    <div class="hos-name">{{hospitalName}}</div>
                </div>
                <div>
                    <div class="room">
                        {{deptname}}
                    </div>
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="middle-content">
                <div class="middle-title">
                    <div class="middle-text">
                        {{deptname}}
                    </div>
                    <div :class="[rotateMid?'middle-close close-rotate':'middle-close']" @click="closeMid()">

                    </div>
                </div>
                <div v-if="rotateMid">
                    <div class="reg-time" v-for="(item,index) in docOrder" :key="index">
                        <div class="time">
                            {{item.schdate}}&nbsp;&nbsp;{{weekDay[item.docWeek]}}&nbsp;&nbsp;{{ampm[item.ampm]}}
                        </div>
                        <div @click="stop" class="status1" v-if="item.schstate==1">
                            停诊
                        </div>
                        <div @click="full" class="status1" v-if="item.numremain==0&&item.schstate==0">
                            已满
                        </div>
                        <div @click="end" style="color: #999999" class="status1"
                             v-if="item.numremain==-1&&item.schstate==0">
                            已结束
                        </div>
                        <!--@click="goPage(item.schdate,item.week,item.ampm,item.regfee,item.schid,item.categor,item.deptid,item.docid,item.orgid,item.hospitalId,item.levelId,item.levelName)"-->
                        <div class="status2" @click="showPopup(item)"
                             v-if="item.numremain!=0&&item.schstate==0&&item.numremain!=-1">
                            <span style="vertical-align: middle">预约</span><span class="price">￥{{item.regfee}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="middle-content">
                <div class="middle-title">
                    <div class="middle-text">
                        医生介绍
                    </div>
                </div>
                <div class="intro-text">
                    <span style="color: #333333">擅长：</span>
                    <span>
                        {{doctorGoodAt}}
                    </span>
                </div>
            </div>
        </div>
        <!--底部具体时间点选择-->
        <van-popup v-model="show" round position="bottom" :style="{height: '50%',width:'100%'}">
            <van-picker show-toolbar @cancel="onCancel"
                        @confirm="onConfirm" :title="title" :columns="columns"/>
        </van-popup>
    </div>
</template>

<script>
    import {api} from '@/api/api';
    import moment from 'moment';
    import hospital from "../introduces/hospital";

    export default {
        data() {
            return {
                weekDay: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                columns: [],
                show: false,
                title: '',
                ampm: {'1': '上午', '2': '下午', '3': '全天'},
                orderDate: '',//日期
                orderDay: '',//周几
                orderTime: '',//上午下午
                price: '',//价格
                schid: '',//排版编号
                rotateTop: true,
                rotateMid: true,
                deptid: this.$route.query.hisDeptCode,//科室编号
                hosid: this.$route.query.hisHospitalCode,//平台医院编号
                orgid: this.$route.query.hisHospitalCode,//医院编号
                hisDoctorId: this.$route.query.hisDoctorId,//医生编号
                docname: this.$route.query.docname,//医生姓名
                levelName: this.$route.query.levelName,//级别
                hospitalName: this.$route.query.hospitalName,//医院名字
                headUrl: this.$route.query.headUrl,//头像路径
                deptname: this.$route.query.deptname,//科室名称
                firstCode:this.$route.query.firstCode,  //一级科室ID
                doctorGoodAt: '',//医生擅长
                categor: '',//挂号类别1普通号，2专家号
                //docInfo:'',//医生信息
                docOrder: [],//当前医生的排班
                docTime: [],//当前排班时间
                docItem: {},//排班信息
                token: sessionStorage.getItem('token'),
                hospitalCode: localStorage.getItem('hospitalCode')
            }
        },
        methods: {
            stop() {
                this.$toast({
                    position: 'bottom',
                    message: '该科已停诊',
                });
            },
            full() {
                this.$toast({
                    position: 'bottom',
                    message: '挂号已满',
                });
            },
            end() {
                this.$toast({
                    position: 'bottom',
                    message: '挂号已结束',
                });
            },
            /*获取时间列表*/
            getTime(val) {
                console.log(moment(2019 - 11 - 19).format('dddd'))
                this.columns = [];
                let toDay = new Date();
                toDay = moment(toDay).format('YYYY-MM-DD');
                /*==val1*/
                if (toDay == val.schdate) {
                    let param = {
                        "ampm": val.ampm,
                        "orgid": localStorage.getItem("hospitalCode"),
                        "schid": val.schid,
                        "schtype": "0"
                    };
                    api('/registerController/resAccount', 'post', param).then(res => {
                        console.log(res);
                        if (res.data.code == 2000) {
                            this.docTime = res.data.data.list;
                            for (let i = 0; i < this.docTime.length; i++) {
                                if (this.docTime[i].numstate == 1 && this.docTime[i].numremain != 0) {
                                    this.columns.push({text: this.docTime[i].numtime});
                                } else {
                                    this.columns.push({text: this.docTime[i].numtime, disabled: true});
                                }
                            }
                        }
                    })
                } else {
                    let param = {
                        "ampm": val.ampm,
                        "orgid": localStorage.getItem("hospitalCode"),
                        "schid": val.schid,
                        "schtype": "0"
                    };
                    api('/registerController/appointmentAccount', 'post', param).then(res => {
                        console.log(res);
                        if (res.data.code == 2000) {
                            this.docTime = res.data.data.list;
                            for (let i = 0; i < this.docTime.length; i++) {
                                if (this.docTime[i].numstate == 1 && this.docTime[i].numremain != 0) {
                                    this.columns.push({text: this.docTime[i].numtime});
                                } else {
                                    this.columns.push({text: this.docTime[i].numtime, disabled: true});
                                }
                            }
                        }
                    })
                }

            },
            /*确认*/
            onConfirm(value, index) {
                //this.$toast(`当前值：${value}, 当前索引：${index}`);
                console.log(this.docTime);
                console.log(this.docTime[index]);
                console.log(this.docItem);
                this.goPage(this.docItem, this.docTime[index]);
            },
            /*取消*/
            onCancel() {
                this.show = false;
            },
            /*需要挂号选择具体时间时，需要调用该函数*/
            showPopup(val) {
                console.log(val);
                if (val.categor == 2) {
                    this.show = true;
                    this.docItem = val,
                        this.title = val.schdate + '  ' + this.weekDay[val.docWeek] + ' ' + this.ampm[val.ampm];
                    this.getTime(val);
                } else {
                    // console.log(val);
                    this.goPage(val);
                }
            },
            /*获取医生号源*/
            getOrder() {
                let toDay = new Date();
                let eDay = new Date(toDay.getTime() + 7 * 24 * 60 * 60 * 1000)
                toDay = moment(toDay).format('YYYY-MM-DD');
                eDay = moment(eDay).format('YYYY-MM-DD');
                toDay = toDay.replace(/-/g, "");
                eDay = eDay.replace(/-/g, '');
                let param = {
                    'bdate': toDay,//开始时间
                    'edate': eDay,//结束时间
                    // "deptid":"2012",//科室编号
                    "deptid": this.deptid,//科室编号
                    "hosid": this.hosid,//平台医院编号
                    "orgid": this.hospitalCode,//医院编号
                    "querytype": "1",//查询类型-0 按时间查询 1按医生查询 ,
                    "schtype": "0",//排班类型-0预约挂号排班 1网络诊间排班(只返回医生排班,不要普通号排班)
                    "docid": this.hisDoctorId,//医生编号
                    hospitalCode: this.hospitalCode
                };
                api('/registerController/queryWcDeptScheme?token=' + this.token, 'post', param).then(res => {
                    console.log(param)
                    console.log(res)
                    if (res.data.code == 2000) {
                        this.docOrder = res.data.data;
                        for (let i = 0; i < this.docOrder.length; i++) {
                            let docWeek = moment(this.docOrder[i].schdate).format('d');
                            this.docOrder[i].docWeek = docWeek
                        }
                        console.log(this.docOrder);
                        this.categor = this.docOrder[0].categor;
                        this.doctorGoodAt = this.docOrder[0].doctorGoodAt;
                        this.deptname = this.docOrder[0].deptname;
                        this.headUrl = this.docOrder[0].headUrl;
                        this.hospitalName = this.docOrder[0].hospitalName;
                        this.levelName = this.docOrder[0].levelName;
                        this.docname = this.docOrder[0].docname;
                    }
                })
            },
            /*val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12*/
            // goPage1(val1,val2){
            //     this.$router.push({path:'/reg/regDetails',query:{hospitalName:this.hospitalName,departmentName:this.deptname,doctorName:this.docname,orderDate:val1.schdate,orderDay:val1.week,orderTime:val1.ampm,price:val1.regfee,schid:val1.schid,categor:val1.categor,deptid:val1.deptid,docid:val1.docid,orgid:val1.orgid,hospitalId:val1.hospitalId,levelId:val1.levelId,levelName:val1.levelName}});
            // },
            goPage(val1, val2) {
                console.log(val2);
                if (val2) {
                    this.$router.replace({
                        path: '/reg/regDetails',
                        query: {
                            firstCode:this.firstCode,
                            hospitalName: this.hospitalName,
                            departmentName: this.deptname,
                            doctorName: this.docname,
                            orderDate: val1.schdate,
                            orderDay: val1.week,
                            orderTime: val1.ampm,
                            price: val1.regfee,
                            schid: val1.schid,
                            categor: val1.categor,
                            deptid: val1.deptid,
                            docid: val1.docid,
                            orgid: val1.orgid,
                            hospitalId: val1.hospitalId,
                            levelId: val1.levelId,
                            levelName: val1.levelName,
                            time: val2.numtime,
                            numid: val2.numid
                        }
                    });
                } else {
                    this.$router.replace({
                        path: '/reg/regDetails',
                        query: {
                            firstCode:this.firstCode,
                            hospitalName: this.hospitalName,
                            departmentName: this.deptname,
                            doctorName: this.docname,
                            orderDate: val1.schdate,
                            orderDay: val1.week,
                            orderTime: val1.ampm,
                            price: val1.regfee,
                            schid: val1.schid,
                            categor: val1.categor,
                            deptid: val1.deptid,
                            docid: val1.docid,
                            orgid: val1.orgid,
                            hospitalId: val1.hospitalId,
                            levelId: val1.levelId,
                            levelName: val1.levelName
                        }
                    });
                }

            },
            closeTop() {
                this.rotateTop = !this.rotateTop;
            },
            closeMid() {
                this.rotateMid = !this.rotateMid;
            },
        },
        created() {
            this.getOrder();
        },
        mounted() {
            document.title = this.$route.meta.title;
        }
    }
</script>

<style scoped>
    .shenglue{
        max-width: 200px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .common {
        display: flex;
        width: 345px;
        height: 75px;
        background: rgba(255, 255, 255, 1);
        padding: 12px 15px;
        margin-bottom: 14px;
    }

    .common-left {
        width: 60px;
        height: 55px;
        border-radius: 50%;
        font-size: 16px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 24px;
        margin-bottom: 14px;
        overflow: hidden;
    }

    .common-left-normol {
        background: #00C5AF;
        width: 60px;
        height: 55px;
        border-radius: 50%;
        font-size: 16px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 24px;
        padding-top: 5px;
        margin-bottom: 14px;
        overflow: hidden;
    }

    .common-right {
        margin-left: 12px;
    }

    .common-title {
        display: flex;
        height: 24px;
        margin-bottom: 4px;
    }

    .common-name {
        width: 273px;
        height: 21px;
        margin-bottom: 8px;
    }

    .hos-name {
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 21px;
        float: left;
    }

    .room {
        float: left;
        width: auto;
        height: 18px;
        background: rgba(0, 138, 124, 0.1);
        border-radius: 9px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 138, 124, 1);
        padding: 3px 8px;
    }

    .common-left img {
        width: 60px;
        height: 60px;
        display: block;
    }

    .doc-name {
        height: 24px;
        font-size: 16px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
    }

    .doc-title {
        height: 21px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(238, 120, 0, 1);
        line-height: 21px;
    }

    .middle {
        width: 375px;
        background: #FFFFFF;
        margin-bottom: 12px;
        padding-bottom: 4px;
    }

    .middle-content {
        width: 345px;
        margin: 0 auto 8px;
    }

    .middle-title {
        width: 100%;
        height: 44px;
        vertical-align: middle;
        position: relative;
        border-bottom: 1px solid #D8D8D8;
    }

    .middle-text {
        float: left;
        height: 24px;
        font-size: 16px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        margin-top: 12px;
    }

    .middle-close {
        width: 16px;
        height: 16px;
        float: right;
        background-image: url("../../static/images/nav/icon-close.png");
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position: center;
        position: absolute;
        right: 0;
        top: 16px;
        transition: all 0s
    }

    .close-rotate {
        transform: rotate(180deg);
        transition: all 0s;
    }

    .reg-time {
        height: 24px;
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
    }

    .time {
        height: 21px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
    }

    .status1 {
        height: 21px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(208, 2, 27, 1);
        line-height: 21px;
        width: 80px;
        text-align: center;
    }

    .status2 {
        padding: 0 9px;
        height: 24px;
        border-radius: 15px;
        border: 1px solid rgba(5, 140, 126, 1);
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 138, 124, 1);
        box-sizing: border-box;
    }

    .price {
        color: #EE7800;
        vertical-align: middle;
    }

    .intro-text {
        margin-top: 12px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 21px;
    }
</style>