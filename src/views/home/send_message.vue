<template>
    <div class="send-message">
        <div class="bgc pdb-10">
            <div class="box1">
                <div class="sp">医院</div>
                <span>北京人大医院</span>
            </div>
            <div class="box1">
                <div class="sp">科室</div>
                <span>妇科</span>
            </div>
            <div @click="show=true" class="box1">
                <div class="sp">医生</div>
                <span :class="[doctor=='请选择医生'?'cr-999':'']">{{doctor}}</span>
                <span class="cr-999">▼</span>
            </div>
        </div>
        <div class="box-title fwb">
            患者信息
        </div>
        <div class="box">
            <van-field required placeholder="请输入真实姓名" v-model="userName" label="姓名" />
        </div>
        <div class="box">
            <van-field type="number" required placeholder="请输入正确的电话号码" v-model="userPhone" label="联系电话" />
        </div>
        <div class="box">
            <van-field required placeholder="请输入正确的身份证号" v-model="userCard" label="身份证号" />
        </div>
        <div class="box-title2">
            病历资料
        </div>
        <div class="clear box">
            <div>
                <van-uploader
                        v-model="fileList"
                        multiple
                        :max-count="5"
                />
            </div>
            <div style="height: 30px;line-height: 30px;" class="fz-14 cr-999">
                添加照片（选填项，最多上传5张）
            </div>
        </div>
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
            <van-picker @cancel="show=false" @confirm="doctorConfirm" show-toolbar :columns="columns" @change="onChange" />
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "send_message",
        data(){
            return{
                userName:'',
                userPhone:'',
                userCard:'',
                show:false,
                doctor:'请选择医生',
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                fileList: []
            }
        },
        methods:{
            doctorConfirm(e){
                console.log(e);
                this.doctor=e;
                this.show=false;
            },
            onChange(a,b,c){

            }
        },
        mounted(){

        }
    }
</script>
<style>
    .send-message .van-field{
        border-bottom: 1px solid #e6e6e6;
        padding-left: 8px;
    }
    .send-message .van-cell--required::before{
        left: 0;
    }
    .send-message .van-uploader__upload{
        border: 1px dashed #ddd;
        width: 50px;
        height: 50px;
    }
    .send-message .van-uploader__preview-image{
        width: 50px;
        height: 50px;
    }

</style>
<style scoped>
    .send-message{

    }
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

    .send-message {
        font-size: 14px;
    }

    .box{
        padding: 0 15px;
        background-color: #fff;
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

    .box-title2{
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        color: #666;
        padding-left: 15px;
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