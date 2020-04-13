<template>
    <div>
        <div class="header">
            <div class="header-img">
                <img src="../../static/images/introduces/hospital.png">
            </div>
            <div class="hos-name">
                {{obj.hospitalName}}
            </div>
            <div class="hos-grade">
                {{obj.hospitalLevelDesc}}
            </div>
        </div>
        <!--<div class="middle">-->
            <!--<div class="icon">-->

            <!--</div>-->
            <!--<div class="hos-web">-->
                <!--医院网址-->
            <!--</div>-->
            <!--<div class="hos-net">-->
                <!--{{obj.website}}-->
            <!--</div>-->
        <!--</div>-->
        <div class="bottom">
            <div class="intro-icon">
            </div>
            <div class="intro">
                介绍
            </div>
            <div class="intro-text">
                {{obj.hospitalIntroduction}}
            </div>
        </div>
    </div>
</template>

<script>
    import {api} from "@/api/api";

    export default {
        data() {
            return {
                hospitalCode:localStorage.getItem("hospitalCode"),
                obj: {}
            }
        },
        methods: {
            getInfo() {
                api('/hospital/getInfo', 'get', {code: this.hospitalCode}).then(res => {
                    console.log(res);
                    if (res.data.code == 2000) {
                        this.obj = res.data.data;
                    }
                })
            }
        },
        mounted() {
            document.title = this.$route.meta.title;
            this.getInfo();
        },
    }
</script>

<style scoped>
    .header {
        width: 375px;
        height: 100px;
        background: #ffffff;
        position: relative;
        margin-bottom: 12px;
    }

    .header-img {
        position: absolute;
        width: 90px;
        height: 68px;
        left: 15px;
        top: 16px;
    }

    .header-img img {
        width: 90px;
        height: 68px;
    }

    .hos-name {
        position: absolute;
        height: 26px;
        font-size: 17px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 26px;
        left: 121px;
        top: 21px;
    }

    .hos-grade {
        position: absolute;
        height: 21px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(245, 110, 35, 1);
        line-height: 21px;
        left: 121px;
        top: 58px;
    }

    .middle {
        width: 375px;
        height: 78px;
        background: #ffffff;
        position: relative;
        margin-bottom: 12px;
    }

    .icon {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 15px;
        top: 15px;
        background-image: url("../../static/images/introduces/web_icon.png");
        background-size: 20px 20px;
        background-position: center;
        background-repeat: no-repeat;
    }

    .hos-web {
        height: 26px;
        font-size: 17px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 26px;
        position: absolute;
        left: 51px;
        top: 12px;
    }

    .hos-net {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        position: absolute;
        left: 51px;
        top: 46px;
    }

    .bottom {
        width: 336px;
        position: relative;
        background: #ffffff;
        padding: 12px 24px 12px 15px;
    }

    .intro-icon {
        width: 20px;
        height: 17px;
        background-image: url("../../static/images/introduces/hospital_icom.png");
        background-repeat: no-repeat;
        background-size: 20px 17px;
        margin: 5px 0 12px 0;
    }

    .intro {
        position: absolute;
        height: 25px;
        font-size: 17px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
        left: 51px;
        top: 12px;
    }

    .intro-text {
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 21px;
    }
</style>