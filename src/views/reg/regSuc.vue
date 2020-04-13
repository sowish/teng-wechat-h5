<template>
    <div>
        <div class="regContent">
            <div class="bind-img"></div>
            <div class="bing-ms">{{text}}</div>
            <div class="reg-detail">您可以前往个人中心查看<span class="go" @click="goDetail">挂号详情</span></div>
            <div class="btn-sc" @click="goLists">查看挂号记录</div>
        </div>
    </div>
</template>

<script>
    // window.addEventListener('load',()=>{
    //     alert('我要重新加载');
    //    window.location.reload();
    //
    // });
    import {api} from '@/api/api';
    export default {
        name:'reg/regSuc',
        data(){
            return{
                // id:this.$route.query.id,
                text:'挂号中...请等待！',
                bookId:'',
                interval:null,
                step:2000,
            }
        },
        methods:{
            goDetail(){
                clearInterval(this.interval);
                this.interval=null;
                // alert(this.bookId);
                this.$router.replace({path:'/registration/details',query:{id:this.bookId}})
            },
            goLists(){
                clearInterval(this.interval);
                this.interval=null;
                this.$router.replace({path:'/registration'})
            },
            getSuccess(){
                let time=0;
                // alert();
                this.interval=setInterval(()=>{
                    time++;
                    // this.$toast({
                    //     position:'center',
                    //     message:111,
                    //     tyoe:'success'
                    // })
                    api('/registerController/appointDetail?token='+sessionStorage.getItem('token')+'&bookId='+this.bookId,"get").then(res=>{
                        console.log(res);
                        // window.location.href='https://www.baidu.com';
                        if(res.data.code==2000){
                            if(res.data.data.payTypeWC==3){
                                clearInterval(this.interval);
                                this.interval=null;
                                this.text='挂号成功！';
                                // this.$router.push('/registration');

                                // this.$router.push('/reg/regSuc');
                            }
                        }
                    })
                    if(time!=0){
                        //30秒后停止
                        if(time>30/(this.step/1000)){
                            clearInterval(this.interval);
                            this.interval=null;
                            this.text='挂号失败！';
                            this.$dialog.alert({
                                title: '网络异常',
                                message: '请到"个人中心-我的挂号"查看挂号详情'
                            }).then(() => {
                                // on close
                                // clearInterval(this.interval);
                                // this.interval=null;
                                this.$router.replace('/registration');
                                // window.location.href=axios.myUrl+module.baseUrl+'#/registration';
                                // this.$router.push('/registration');

                            });

                        }

                    }
                },this.step);
            }
        },
        beforeDestroy() {
            clearInterval(this.interval);
            this.interval = null;
        },
        mounted() {
            document.title=this.$route.meta.title;
            var bookId=this.$route.query.bookId;
            // alert(bookId);
            if(bookId){
                this.bookId=bookId;
                this.getSuccess();
            }
            // this.getSuccess();
        }
    }
</script>

<style scoped>
    .regContent {
        width: 345px;
        height: 331px;
        margin: 16px 15px 0 15px;
        background: #ffffff;
        box-shadow: 0px 4px 24px -6px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        float: left;
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
    .reg-detail{
        height:24px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:24px;
        text-align: center;
    }
    .bing-ms {
        text-align: center;
        height: 30px;
        font-size: 20px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
        margin: 32px auto 8px;
    }
    .go{
        color: #00C5AF;
        text-decoration: underline;
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
</style>