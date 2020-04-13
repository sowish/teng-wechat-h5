<template>
    <div>
        <div class="pic">

        </div>
        <div class="tip-title">挂号失败，请重新<span style="color: #008A7C" @click="$router.push({path:'/reg'})">挂号。</span></div>
        <div class="tip-text">
            {{ms}}。<br/>失败原因：{{ms}}，请选择其他医生或时间重 新挂号。
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                ms:this.$route.query.ms//提示信息
            }
        }
    }
</script>

<style scoped>
    .pic{
        width: 100px;
        height: 100px;
        margin:152px auto 0;
        background-image: url("../../static/images/reg/no_res.png");
        background-size: 100px 100px;
        background-position: center;
        background-repeat: no-repeat;
    }
    .tip-title{
        margin: 31px auto 16px;
        text-align: center;
        height:26px;
        font-size:17px;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:26px;
    }
    .tip-text{
        width:340px;
        height:102px;
        font-size:17px;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:25px;
        margin: 0 auto;
    }
</style>