<template>
    <div class="order-detail">
        <div class="bgc pdb-10">
            <div class="box1">
                <div class="sp">医院</div>
                北京人大医院
            </div>
            <div class="box1">
                <div class="sp">科室</div>
                妇科
            </div>
            <div class="box1">
                <div class="sp">医生</div>
                某医生
            </div>
        </div>
        <div class="box-title fwb">
            患者信息
        </div>
        <div class="box1">
            <div class="bdb">
                <div class="sp2">姓名</div>
                某某某
            </div>
        </div>
        <div class="box1">
            <div class="bdb">
                <div class="sp2">联系电话</div>
                18852525252
            </div>
        </div>
        <div class="box1">
            <div class="bdb">
                <div class="sp2">身份证号</div>
                130516116131313131
            </div>
        </div>
        <div class="box1">
            <div class="sp2">病例资料</div>
        </div>
        <div class="illness-box">
            <div style="height: 100%;" class="bdb">
                <img src="../../static/images/hospital.png" alt="" class="illness-img">
                <img src="../../static/images/hospital.png" alt="" class="illness-img">
                <img src="../../static/images/hospital.png" alt="" class="illness-img">
                <img src="../../static/images/hospital.png" alt="" class="illness-img">
                <img src="../../static/images/hospital.png" alt="" class="illness-img">
            </div>
        </div>
        <div class="box1">
            <div class="sp2">病情介绍</div>
        </div>
        <div class="litter-box">
            <div class="litter-box-i">
                病情介绍病情介绍病情介绍病情介绍病情介绍病情介绍病情介绍病情介绍病情介绍病情介绍病情介绍
            </div>
        </div>
        <div class="h15"></div>
        <div class="box1">
            <div class="bdt clear">
                <div class="sp2">期望就诊时间</div>
                <div class="ft-r">
                    <div class="date-box clear">
                        <div class="date-text ft-l">
                            2020-09-09
                        </div>
                        <div class="ft-l date-center">至</div>
                        <div class="date-text ft-l">
                            2020-19-09
                        </div>
                        <div class="date-img ft-r">
                            <img src="../../static/images/date.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-title fwb">
            服务类型
        </div>
        <div class="bgc pdb-10">
            <div class="box1">
                <span class="cr-666">预约专家</span>
                <span class="fwb" style="color: #f69200;margin-left: 80px;">1000元/次</span>
            </div>
            <div class="box1 fz-14 cr-999">
                精心就医设计，绿色医疗服务。
            </div>
        </div>
        <div class="box-title fwb">
            服务热线
            <span style="color: #5385fe;margin-left: 76px;">18852525252</span>
        </div>
        <div style="color: #666666;margin-top: -20px;" class="box-title fz-12">
            注：提交预约后，会在1个工作日内和您沟通确认详细就诊信息。
        </div>
        <div class="box-title"></div>
        <div class="box-title"></div>
        <div class="box-title"></div>
    </div>
</template>

<script>
    export default {
        name: "order_detail",
        data() {
            return {}
        },
        methods: {},
        mounted() {

        }
    }
</script>

<style scoped>
    .h15 {
        height: 15px;
        background-color: #fff;
    }

    .bgc {
        background-color: #fff;
    }

    .bdt {
        border-top: 1px solid #E6E6E6;
    }

    .pdb-10 {
        padding-bottom: 10px;
    }

    .bdb {
        border-bottom: 1px solid #E6E6E6;
    }

    .mgt {
        margin-top: 15px;
    }

    .order-detail {
        font-size: 14px;
    }

    .box1 {
        padding: 0 15px;
        background-color: #fff;
        height: 40px;
        line-height: 40px;
    }

    .box1 .sp {
        display: inline-block;
        width: 40px;
        color: #666666;
    }

    .box1 .sp2 {
        display: inline-block;
        width: 100px;
        color: #666666;
    }

    .box-title {
        height: 50px;
        line-height: 50px;
        background-color: #f8f8f8;
        color: #333333;
        padding: 0 15px;
    }

    .illness-box {
        padding: 0 15px;
        background-color: #fff;
        height: 75px;
    }

    .illness-img {
        width: 60px;
        height: 60px;
        background-color: #ddd;
        margin-right: 8px;
    }

    .litter-box {
        padding: 0 15px 0 30px;
        background-color: #fff;
    }

    .litter-box-i {
        border: 1px solid #E6E6E6;
        box-sizing: border-box;
        padding: 10px;
        color: #333333;
    }

    .date-box {
        border: 1px solid #e6e6e6;
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        max-width: 220px;
        margin-top: 8px;
    }

    .date-img {
        width: 22px;
        height: 100%;
        border-left: 1px solid #e6e6e6;
        text-align: center;
        /*vertical-align: middle;*/
    }

    .date-img img {
        margin-top: 4px;
        width: 12px;
        height: 13px;
    }

    .date-text {
        width: 90px;
        color: #333333;
        padding-left: 5px;
        box-sizing: border-box;
        text-align: center;
    }

    .date-center {
        color: #999999;

    }

</style>