<template>
    <div>
        <div class="content">
            <div class="intro" v-for="(item,index) in lists" :key="index">
                <div class="title">
                    <div class="icon">
                        <img :src="item.headUrl"/>
                    </div>
                    <div class="text">
                        <div class="name">{{item.doctorName}}</div>
                        <div class="office">{{item.departmentName}}</div><br/>
                        <div class="job-title">{{item.levelName}}</div>
                    </div>
                </div>
                <div class="intro-text" :class="{omit:ifShow}" @click="show">
                        <span class="intro-name">简介：</span>{{item.doctorDesc}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {api} from '@/api/api'
    export default {
        data(){
          return{
              lists:[
                 /* {
                      name:'张丽',
                      src:'../../static/images/introduces/header_icon.png',
                      office:'内分泌门诊',
                      jobTitle:'主治医生',
                      introText:'甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。'
                  },
                  {
                      name:'张丽张丽',
                      src:'../../static/images/introduces/header_icon.png',
                      office:'内分泌门诊内分泌门诊',
                      jobTitle:'主治医生主治医生',
                      introText:'甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。'
                  },
                  {
                      name:'张丽张丽',
                      src:'../../static/images/introduces/header_icon.png',
                      office:'内分泌门诊内分泌门诊内',
                      jobTitle:'主治医生主治医生主治医生',
                      introText:'甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。甲状腺、乳腺、呼吸系统、皮肤病理诊断与 分子诊断。'
                  },*/
              ],
              ifShow:true,
          }
        },
        methods:{
            getList(){
                let param={
                    hospitalCode:localStorage.getItem('hospitalCode'),
                    departmentId:this.$route.query.hisDeptCode,
                }
                api('/doctor/getFamousDoctorList','post',param).then(res=>{
                    console.log(res,param)
                    if (res.data.code==2000){
                        this.lists=res.data.data.list;
                        if(!res.data.data.list.length){
                            this.$toast({
                                message:'暂无数据',
                                position:'bottom'
                            })
                        }
                        console.log(this.lists)
                    }else{
                        this.$toast({
                            message:res.data.msg,
                            position:'bottom'
                        })
                    }
                })
            },
            //点击显示省略
            show(){
                this.ifShow=!this.ifShow;
            }
        },
        mounted(){
            document.title=this.$route.meta.title;
            this.getList();
        },
    }
</script>

<style scoped>
.content{
    width: 345px;
    margin: 0 auto;
}
    .intro{
        width: 315px;
        background: #FFFFFF;
        box-shadow:0px 1px 5px 0px rgba(0,0,0,0.1);
        border-radius:4px;
        padding: 12px 15px 12px 15px;
        margin-top: 14px;
    }
    .title{
        width: 315px;
        height: 62px;
        position: relative;
    }
    .icon{
        border-radius: 50%;
        overflow: hidden;
        float: left;
        width: 50px;
        height: 50px;
    }
    .icon img{
        width: 50px;
        height: 50px;
    }
    .text{
        width: 265px;
        float: left;
    }
    .name{
        float: left;
        height:26px;
        font-size:17px;
        font-weight:600;
        color:rgba(51,51,51,1);
        margin-left: 12px;
        line-height:26px;
    }
    .office{
        margin-left: 12px;
        margin-top: 4px;
        padding: 0 8px;
        float: left;
        height:18px;
        background:rgba(0,138,124,0.1);
        border-radius:9px;
        font-size:12px;
        font-weight:400;
        color:#008A7C;
        line-height:18px;
    }
    .job-title{
        float: left;
        height:21px;
        font-size:14px;
        font-weight:400;
        color:rgba(238,120,0,1);
        line-height:21px;
        margin-left: 12px;
    }
    .intro-text{
        font-size:16px;
        font-weight:400;
        color:#999999;
        line-height:24px;
        width: 309px;
    }
    .omit{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        /*! autoprefixer:off */
        -webkit-box-orient:vertical;
        /* autoprefixer:on */
        -webkit-line-clamp:7;
    }
    .intro-name{
        color:rgba(51,51,51,1);
        font-size: 16px;
    }
</style>