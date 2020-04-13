<template>
    <div>
        <div class="header">
            <div :class="{doctorTime:ifDoctor,dataTime:!ifDoctor}" @click="goDoctor">按医生预约</div>
            <div :class="{doctorTime:!ifDoctor,dataTime:ifDoctor}" @click="goTime">按日期预约</div>
        </div>
        <!--按医生预约-->
        <div v-if="ifDoctor">
            <!--普通号-->
            <div class="common" v-for="(item,index) in puLists" :key="index">
                <div class="common-left">
                    普通<br>门诊
                </div>
                <div class="common-right">
                    <div class="common-title">普通号</div>
                    <div class="common-name">
                        <div class="hos-name">{{item.list[0].hospitalName}}</div>
                        <div class="common-do" @click="goPage(item.list[0].docid,item.list[0].docname,item.list[0].levelName,item.list[0].hospitalName,item.list[0].headUrl,item.list[0].deptname,item.list[0].doctorGoodAt,item.list[0].categor)" v-if="item.isResourceNo=='Y'">
                            <div class="common-icon">

                            </div>
                            <div class="do-text">
                                预约
                            </div>
                        </div>
                        <div class="common-do" v-else="item.isResourceNo=='N'">
                            <div class="common-icon">

                            </div>
                            <div class="do-text text-none" >
                                已满
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="room">
                            {{item.list[0].deptname}}
                        </div>
                    </div>
                </div>
            </div>
            <!--专家号-->
            <div class="doctor">
                <div class="doctor-content" v-for="(item,index) in zhuanLists" :key="index">
                    <div class="common-left" style="padding-top: 0;background: none">
                        <img :src="item.list[0].headUrl">
                    </div>
                    <div class="common-right">
                        <div class="common-title">{{item.list[0].docname}}</div>
                        <div class="common-name">
                            <div class="hos-name" style="color: #EE7800">{{item.list[0].levelName}}</div>
                            <div class="common-do" @click="goPage(item.list[0].docid,item.list[0].docname,item.list[0].levelName,item.list[0].hospitalName,item.list[0].headUrl,item.list[0].deptname,item.list[0].doctorGoodAt,item.list[0].categor)" v-if="item.isResourceNo=='Y'">
                                <div class="common-icon">

                                </div>
                                <div class="do-text">
                                    预约
                                </div>
                            </div>
                            <div class="common-do" v-else="item.isResourceNo=='N'">
                                <div class="common-icon">

                                </div>
                                <div class="do-text text-none">
                                    已满
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="better" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;">
                                <span style="color: #333333">擅长：</span>{{item.list[0].doctorGoodAt}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--按时间预约-->
        <div v-if="!ifDoctor">
            <!--选择时间-->
            <div class="chose-time">
                <div class="chose-srl">
                    <div v-for="(item,index) in showDay" :key="index" class="one-time" :class="{active:item.ifActive}" @click="chooseTime(index)">
                        <div class="week-time">{{item.week}}</div>
                        <div class="week-day">{{item.day}}</div>
                    </div>
                </div>
            </div>
            <div v-if="num">
                <div class="nothing">

                </div>
                <div class="nothing-text">
                    当前没有医生排班
                </div>
            </div>
            <!--普通号-->
            <div class="chose-com">
                <div class="date-com" v-for="(item,index) in puLists" :key="index">
                    <div class="common-left">
                        普通<br>门诊
                    </div>
                    <div class="common-right">
                        <div class="common-title">普通号</div>
                        <div class="common-name">
                            <div class="hos-name">{{item.hospitalName}}</div>
                            <!--numremain==-1表示已结束-->
                            <div class="common-do"  v-if="item.numremain==-1&&item.schstate==0">
                                <div class="common-icon">

                                </div>
                                <div class="com-text">
                                    已结束
                                </div>
                            </div>
                            <div class="common-do"  v-else-if="item.numremain==0&&item.schstate==0">
                                <div class="common-icon">

                                </div>
                                <div class="do-text text-none">
                                    已满
                                </div>
                            </div>
                            <div class="common-do" style="color: #D0021B" v-else-if="item.schstate==1">
                                <div class="common-icon">

                                </div>
                                <div class="com-text" style="color: #D0021B">
                                    停诊
                                </div>
                            </div>
                            <!--goDetail(item.schdate,item.ampm,item.regfee,item.schid,item.deptname,item.docname,item.categor,item.deptid,item.docid,item.orgid,item.hospitalId,item.hospitalName,item.levelId,item.levelName)-->
                            <div @click="showPopup(item)" class="common-do" v-else-if="item.numremain!=0&&item.schstate!=1">
                                <div class="common-icon">

                                </div>
                                <div class="com-text" style="color: #EE7800" >
                                    {{item.regfee}}元
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="com-time">
                                {{item.schdate}} {{ampm[item.ampm]}} 普通
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--专家号-->
            <div class="doctor">
                <div class="doctor-content" v-for="(item,index) in zhuanLists" :key="index">
                    <div class="common-left" style="padding-top: 0;background: none">
                        <img :src="item.headUrl">
                    </div>
                    <div class="common-right">
                        <div class="common-title">{{item.docname}}</div>
                        <div class="common-name">
                            <div class="hos-name" style="color: #EE7800">{{item.levelName}}</div>
                            <div class="common-do"  v-if="item.numremain==0&&item.schstate==0">
                                <div class="common-icon">

                                </div>
                                <div class="do-text text-none">
                                    已满
                                </div>
                            </div>
                            <!--numremain==-1表示已结束-->
                            <div class="common-do"  v-else-if="item.numremain==-1&&item.schstate==0">
                                <div class="common-icon">

                                </div>
                                <div class="com-text">
                                    已结束
                                </div>
                            </div>
                            <div class="common-do" style="color: #D0021B" v-else-if="item.schstate==1">
                                <div class="common-icon">

                                </div>
                                <div class="com-text" style="color: #D0021B">
                                    停诊
                                </div>
                            </div>
                            <!--goDetail(item.schdate,item.ampm,item.regfee,item.schid,item.deptname,item.docname,item.categor,item.deptid,item.docid,item.orgid,item.hospitalId,item.hospitalName,item.levelId,item.levelName)-->
                            <div @click="showPopup(item)" class="common-do" v-else-if="item.numremain!=0&&item.schstate!=1">
                                <div class="common-icon">

                                </div>
                                <div class="do-text">
                                    预约
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="better" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;">
                                <span style="color: #333333">擅长:</span>{{item.doctorGoodAt}}
                            </div>
                        </div>
                        <div style="margin-top: 4px">
                            <div class="com-time">
                                {{item.schdate}} {{ampm[item.ampm]}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{height: '50%',width:'100%'}">
            <van-picker show-toolbar @cancel="onCancel"
                        @confirm="onConfirm" :title="title" :columns="columns" />
        </van-popup>
    </div>
</template>

<script>
    import {api} from '@/api/api';
    import moment from "moment";
    export default {
        data(){
            return{
                weekDay:["周日","周一","周二","周三","周四","周五","周六"],
                columns: [],
                show: false,
                title:'',
                num:false,//有没有号
                ampm:{'1':'上午','2':'下午','3':'全天'},
                ifDoctor:true,
                ifSelect:true,
                oneDay:1*24*60*60*1000,
                showDay:[],
                choosedDay:'',
                deptid:this.$route.query.hisDeptCode,//科室编号
                hosid:this.$route.query.hisHospitalCode,//平台医院编号
                orgid:this.$route.query.hisHospitalCode,//医院编号
                firstCode:this.$route.query.firstCode, //一级科室ID
                showLists:[],//按医生查询8天内全部号源
                puLists:[],//8天内全部号源-普通号  1
                zhuanLists:[],//8天内全部号源-专家号  2
                endDay:'',//下个页面要查的时间
                token:sessionStorage.getItem('token'),
                hospitalCode:localStorage.getItem('hospitalCode')
            }
        },
        methods:{
            /*获取时间列表*/
            getDel(val){
                console.log(val)
                console.log(moment(2019-11-19).format('dddd'))
                this.columns=[];
                let toDay=new Date();
                toDay=moment(toDay).format('YYYY-MM-DD');
                /*==val1*/
                if(toDay==val.schdate){
                    let param={
                        "ampm": val.ampm,
                        "orgid": localStorage.getItem("hospitalCode"),
                        "schid": val.schid,
                        "schtype": "0"
                    };
                    api('/registerController/resAccount','post',param).then(res=>{
                        console.log(res);
                        if(res.data.code==2000){
                            this.docTime=res.data.data.list;
                            for(let i=0;i<this.docTime.length;i++){
                                if(this.docTime[i].numstate==1&&this.docTime[i].numremain!=0){
                                    this.columns.push({text:this.docTime[i].numtime});
                                }else {
                                    this.columns.push({text:this.docTime[i].numtime,disabled:true});
                                }
                            }
                        }
                    })
                }else {
                    let param={
                        "ampm":val.ampm,
                        "orgid": localStorage.getItem("hospitalCode"),
                        "schid": val.schid,
                        "schtype": "0"
                    };
                    api('/registerController/appointmentAccount','post',param).then(res=>{
                        console.log(res);
                        if(res.data.code==2000){
                            this.docTime=res.data.data.list;
                            for(let i=0;i<this.docTime.length;i++){
                                if(this.docTime[i].numstate==1&&this.docTime[i].numremain!=0){
                                    this.columns.push({text:this.docTime[i].numtime});
                                }else {
                                    this.columns.push({text:this.docTime[i].numtime,disabled:true});
                                }
                            }
                        }
                    })
                }
            },
            /*确认*/
            onConfirm(value, index) {
                //this.$toast(`当前值：${value}, 当前索引：${index}`);
                console.log(this.docTime[index]);
                this.goDetail(this.docItem,this.docTime[index]);
            },
            /*取消*/
            onCancel() {
                this.show = false;
            },
            /*需要挂号选择具体时间时，需要调用该函数,普通号不选择时段*/
            showPopup(val) {
                if(val.categor==2){
                    this.show=true;
                    this.docItem=val,
                        this.title=val.schdate+'  '+this.ampm[val.ampm];
                    this.getDel(val);
                }else {

                    this.goDetail(val);
                }
            },
            /*按医生获取号源*/
            getDoc(){
                this.zhuanLists=[];//8天内全部号源-专家号  2
                this.puLists=[];//8天内全部号源-普通号  1
                let param={
                    //"deptid":"2012",//科室编号
                    "deptid":this.deptid,//科室编号
                    "hosid":this.hosid,//平台医院编号
                    "orgid":this.hospitalCode,//医院编号
                    "querytype": "1",//查询类型-0 按时间查询 1按医生查询 ,
                    "schtype": "0",//排班类型-0预约挂号排班 1网络诊间排班(只返回医生排班,不要普通号排班)
                    hospitalCode:this.hospitalCode
                };
                api('/registerController/queryDoctorSource?token='+this.token,'post',param).then(res=>{
                    console.log(res);
                    if(res.data.code==2000){
                        console.log(res.data.data.list);
                        this.showLists=res.data.data.list;
                        for (let i=0;i<this.showLists.length;i++){
                            if(this.showLists[i].list[0].categor==1){
                                this.puLists.push(this.showLists[i])
                            }else {
                                this.zhuanLists.push(this.showLists[i])
                            }
                        }
                        console.log(this.puLists)
                        console.log(this.zhuanLists)
                    }
                })
            },
            /*按日期获取号源*/
            getTime(val){
                //alert(val)
                this.zhuanLists=[];//8天内全部号源-专家号  2
                this.puLists=[];//8天内全部号源-普通号  1
                let startDay=new Date();
                this.endDay=new Date(startDay.getTime()+val*24*60*60*1000)
                this.endDay=this.getDataStr(this.endDay);
                console.log(this.endDay)
                let param={
                    "bdate":this.endDay,//开始时间
                    //"deptid":"2012",//科室编号
                    "deptid":this.deptid,//科室编号
                    "edate":this.endDay,//截止数据
                    "hosid":this.hosid,//平台医院编号
                    "orgid":this.hospitalCode,//医院编号
                    "querytype": "0",//查询类型-0 按时间查询 1按医生查询 ,
                    "schtype": "0",//排班类型-0预约挂号排班 1网络诊间排班(只返回医生排班,不要普通号排班)
                    hospitalCode:this.hospitalCode
                };
                api('/registerController/queryWcDeptScheme?token='+this.token,'post',param).then(res=>{
                    console.log(res);
                    if(res.data.code==2000){
                        this.zhuanLists=[];//8天内全部号源-专家号  2
                        this.puLists=[];//8天内全部号源-普通号  1
                        console.log(res.data.data);
                        this.showLists=res.data.data;
                        if (this.showLists.length==0){
                            this.num=true;
                        }else {
                            this.num=false;
                            for (let i=0;i<this.showLists.length;i++){
                                if(this.showLists[i].categor==1){
                                    this.puLists.push(this.showLists[i])
                                    // if(this.puLists.length>0){
                                    //     this.puLists=this.puLists[0];
                                    // }
                                }else {
                                    this.zhuanLists.push(this.showLists[i])
                                }
                            }
                        };
                    }
                })
            },
            /*页面跳转*/
            goPage(val1,val2,val3,val4,val5,val6,val7,val8){
                this.$router.push({path:'/reg/doctorInfo',query:{ firstCode:this.firstCode,hisDeptCode:this.deptid,hisHospitalCode:this.hosid,hisDoctorId:val1,docname:val2,levelName:val3,hospitalName:val4,headUrl:val5,deptname:val6,doctorGoodAt:val7,categor:val8}});
            },
            goDetail(val1,val2){
                if(val2){
                    this.$router.push({path:'/reg/regDetails',query:{orderDate:val1.schdate,orderTime:val1.ampm,price:val1.regfee,schid:val1.schid,departmentName:val1.deptname,doctorName:val1.docname,categor:val1.categor,deptid:val1.deptid,docid:val1.docid,orgid:val1.orgid,hospitalId:val1.hospitalId,hospitalName:val1.hospitalName,levelId:val1.levelId,levelName:val1.levelName,time:val2.numtime,numid:val2.numid}});
                }else{
                    this.$router.push({path:'/reg/regDetails',query:{orderDate:val1.schdate,orderTime:val1.ampm,price:val1.regfee,schid:val1.schid,departmentName:val1.deptname,doctorName:val1.docname,categor:val1.categor,deptid:val1.deptid,docid:val1.docid,orgid:val1.orgid,hospitalId:val1.hospitalId,hospitalName:val1.hospitalName,levelId:val1.levelId,levelName:val1.levelName}});
                }
            },
            /*时间转成字符串*/
            getDataStr(val){
                val=moment(val).format('YYYY-MM-DD');
                val=val.replace(/-/g, "");
                return val;
            },
            /*获取日期*/
            getData(val){
                let startDay=new Date();
                let next=new Date(startDay.getTime()+val*24*60*60*1000)
                let nextDay=moment(next).format('MM-DD');
                return nextDay;
            },
            /*获取周日期*/
            getWeek(val){
                let startDay=new Date();
                let next=new Date(startDay.getTime()+val*24*60*60*1000)
                let nextWeek=next.getDay();
                let weekDay=["周日","周一","周二","周三","周四","周五","周六"]
                return weekDay[nextWeek];
            },
            /*获取展示列表*/
            dayLists(){
                for (let i=0; i<=7; i++){
                    let obj={
                        week:this.getWeek(i),
                        ifActive:i?false:true,
                        day:this.getData(i),
                    };
                    this.showDay.push(obj)
                };
                console.log(this.showDay);
            },
            /*时间选择获取数据*/
            chooseTime(val){
                this.getTime(val);
                console.log(val)
                for (let i=0; i<this.showDay.length; i++){
                    if (i==val){
                        this.showDay[i].ifActive=true;
                    }else {
                        this.showDay[i].ifActive=false;
                    }
                };
            },
            goDoctor(){
                this.ifDoctor=!this.ifDoctor;
                this.getDoc();
                this.showDay[0].ifActive=true;
                for (let i=1; i<this.showDay.length; i++){
                    this.showDay[i].ifActive=false;
                };
            },
            goTime(){
                this.ifDoctor=!this.ifDoctor;
                this.getTime(0);
            }
        },
        created(){
            this.getDoc();
        },
        mounted() {
            document.title=this.$route.meta.title;
            this.dayLists();
        }
    }
</script>

<style scoped>
    .header{
        width: 280px;
        height: 40px;
        margin: 12px auto 12px;
        display: flex;
        border-radius:5px 5px 5px 5px;
        border: 1px solid #00C5AF;
    }
    .doctorTime{
        width:50%;
        height:40px;
        background:rgba(0,197,175,1);
        font-size:16px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:40px;
        text-align: center;
    }
    .dataTime{
        width:50%;
        height:40px;
        background:#FFFFFF;
        font-size:16px;
        font-weight:400;
        color:#00C5AF;
        line-height:40px;
        text-align: center;
    }
    .nothing{
        width: 100px;
        height: 100px;
        margin: 84px auto 17px;
        background: url("../../static/images/reg/no_num.png");
        background-size: 100px 100px;
        background-position: center;
        background-repeat: no-repeat;
    }
    .nothing-text{
        height:26px;
        font-size:17px;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:26px;
        margin: 0 auto;
        text-align: center;
    }
    .common{
        display: flex;
        width:345px;
        height:75px;
        background:rgba(255,255,255,1);
        padding: 12px 15px;
        margin-bottom: 14px;
    }
    .common-left{
        background: #00C5AF;
        width: 60px;
        height: 55px;
        border-radius: 50%;
        font-size:16px;
        font-weight:600;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 24px;
        padding-top: 5px;
        margin-bottom: 14px;
        overflow: hidden;
    }
    .common-right{
        margin-left: 12px;
    }
    .common-title{
        font-size:16px;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:24px;
    }
    .common-name{
        width: 273px;
        height: 21px;
        margin-bottom: 8px;
    }
    .hos-name{
        font-size:14px;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:21px;
        float: left;
    }
    .common-do{
        float: right;
    }
    .do-text{
        float: left;
        font-size:16px;
        font-weight:400;
        color:rgba(0,138,124,1);
        line-height:24px;
    }
    .common-icon{
        float: right;
        width: 16px;
        height: 24px;
        margin-left: 8px;
        background-image: url("../../static/images/reg/down_icon.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 16px 16px;
    }
    .room{
        float: left;
        width: auto;
        height:18px;
        background:rgba(0,138,124,0.1);
        border-radius:9px;
        font-size:12px;
        font-weight:400;
        color:rgba(0,138,124,1);
        padding: 3px 8px;
    }
    .doctor{
        background: #ffffff;
        padding: 0px 15px 0 15px;
    }
    .doctor-content{
        display: flex;
        width: 345px;
        border-bottom: 1px solid #D8D8D8;
        padding:12px 0 13px 0;
    }
    .better{
        width:261px;
        font-size:14px;
        font-weight:400;
        color:#666666;
        line-height:21px;
    }
    .common-left img{
        width: 60px;
        height: 60px;
        display: block;
    }
    .text-none{
        color: #D0021B;
    }
    .chose-time{
        width: 375px;
        height: 50px;
        background: #ffffff;
        margin-bottom: 12px;
        overflow-x: scroll;
    }
    .chose-srl{
        width: 690px;
        display: flex;
    }
    .one-time{
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        border-right: 1px solid #D8D8D8;
        color:rgba(51,51,51,1);
    }
    .week-time{
        text-align: center;
        height:24px;
        font-size:16px;
        font-weight:400;
        line-height:24px;
        margin: 4px auto 2px;
    }
    .week-day{
        width:37px;
        height:16px;
        font-size:12px;
        font-weight:400;
        line-height:16px;
        margin: 0 auto;
    }
    .active{
        color:#FFFFFF;
        background: #00C5AF;
    }
    .chose-com{
        background: #FFFFFF;
        margin-bottom: 15px;
    }
    .date-com{
        display: flex;
        width: 345px;
        margin: 0 auto;
        border-bottom: 1px solid #D8D8D8;
        padding: 12px 0 12px 0;
    }
    .com-time{
        height:21px;
        font-size:14px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:21px;
    }
    .com-text{
        float: left;
        font-size:16px;
        font-weight:400;
        color:#999999;
        line-height:24px;
    }
</style>