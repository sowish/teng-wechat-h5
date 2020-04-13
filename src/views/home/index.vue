<template>
    <div class="home">
        <!--banner图-->
        <div class="banner">
            <img src="../../static/images/index-banner.png" alt="">
        </div>
        <van-search
                v-model="searchText"
                shape="round"
                placeholder="请输入医院关键字"
        />
        <div class="box">
            <div class="clear under">
                <div class="ft-l area">
                    <van-dropdown-menu>
                        <van-dropdown-item title="按区域" ref="item">
                            <div class="area-content">
                                <van-button type="default">东城区</van-button>
                                <van-button type="default">西城区</van-button>
                                <van-button type="default">延庆</van-button>
                                <van-button type="default">昌平大区</van-button>
                                <van-button type="default">市</van-button>
                            </div>
                        </van-dropdown-item>
                    </van-dropdown-menu>
                </div>
                <div class="ft-r">
                    <span class="cr-999">按距离</span>&nbsp;
                    <img src="../../static/images/position.png" alt="">
                </div>
                <div class="ft-r">
                    <span>按等级</span>&nbsp;
                    <img src="../../static/images/leaval.png" alt="">
                </div>
            </div>
            <div @click="" class="hospital-box clear">
                <img class="ft-l" src="../../static/images/hospital.png" alt="">
                <div class="ft-r">
                    <div class="cr-333 dhsl fwb fz-14">
                        北京人大医院北京人大医院北京人大医院北京人大医院北京人大医院
                    </div>
                    <div style="height: 20px;width: 100%;" class="clear cr-999 fz-12">
                        <div class="ft-l">三级甲等医院</div>
                        <div style="margin-left: 10px;" class="ft-l">每天12点休息</div>
                        <div class="ft-r">
                            <img class="hospital-posi" src="../../static/images/position.png" alt="">
                            20.10km
                        </div>
                    </div>
                </div>
            </div>
            <div class="hospital-box clear">
                <img class="ft-l" src="../../static/images/hospital.png" alt="">
                <div class="ft-r">
                    <div class="cr-333 dhsl fwb fz-14">
                        北京人大医院北京人大医院北京人大医院北京人大医院北京人大医院
                    </div>
                    <div style="height: 20px;width: 100%;" class="clear cr-999 fz-12">
                        <div class="ft-l">三级甲等医院</div>
                        <div style="margin-left: 10px;" class="ft-l">每天12点休息</div>
                        <div class="ft-r">
                            <img class="hospital-posi" src="../../static/images/position.png" alt="">
                            20.10km
                        </div>
                    </div>
                </div>
            </div>
            <div class="hospital-box clear">
                <img class="ft-l" src="../../static/images/hospital.png" alt="">
                <div class="ft-r">
                    <div class="cr-333 dhsl fwb fz-14">
                        北京人大医院北京人大医院北京人大医院北京人大医院北京人大医院
                    </div>
                    <div style="height: 20px;width: 100%;" class="clear cr-999 fz-12">
                        <div class="ft-l">三级甲等医院</div>
                        <div style="margin-left: 10px;" class="ft-l">每天12点休息</div>
                        <div class="ft-r">
                            <img class="hospital-posi" src="../../static/images/position.png" alt="">
                            20.10km
                        </div>
                    </div>
                </div>
            </div>
            <div class="hospital-box clear">
                <img class="ft-l" src="../../static/images/hospital.png" alt="">
                <div class="ft-r">
                    <div class="cr-333 dhsl fwb fz-14">
                        北京人大医院北京人大医院北京人大医院北京人大医院北京人大医院
                    </div>
                    <div style="height: 20px;width: 100%;" class="clear cr-999 fz-12">
                        <div class="ft-l">三级甲等医院</div>
                        <div style="margin-left: 10px;" class="ft-l">每天12点休息</div>
                        <div class="ft-r">
                            <img class="hospital-posi" src="../../static/images/position.png" alt="">
                            20.10km
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {api} from "@/api/api";
    import {dateFormat} from "@/utils/util.js";
    import {getUrlParam} from "@/static/js/lib/userLogin/index.js";
    // import slider from "vue-concise-slider";
    export default {
        data() {
            return {
                searchText: '',
                value: 0,
            };
        },

        methods: {
            goPage(url) {
                this.$router.push(url);
            },
        },
        created() {

        },
        mounted() {

        }
    };
</script>
<style>
    .home .van-dropdown-menu {
        background-color: transparent;
        height: 40px;
        line-height: 40px;
    }

    .home .van-dropdown-item__content {
        border-radius: 0 0 8px 8px;
        overflow: hidden;
    }

    .under .van-dropdown-menu__title {
        color: #666666;
    }

    .area-content .van-button--default {
        width: 75px;
        height: 32px;
        line-height: 20px !important;
        padding: 0;
        margin-right: 10px;
    }
</style>


<style scoped>
    .banner {
        width: 100%;
        height: 100px;
    }

    .banner img {
        width: 100%;
        height: 100%;
    }

    .box {
        box-sizing: border-box;
        background-color: #fff;
    }

    .box .area {
        width: 100px;
    }

    .under .ft-l {
        margin-left: -15px;
    }

    .under .ft-l, .under .ft-r {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        margin-right: 15px;
    }

    .under .ft-r img {
        width: 10px;
        height: 10px;
    }

    .area-content {
        padding: 15px;
    }

    .hospital-box {
        padding: 0 15px;
        margin-top: 15px;
    }

    .hospital-box>img {
        width: 80px;
        height: 65px;
        border-radius: 5px;
    }

    .hospital-box>.ft-r {
        width: 265px;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .hospital-box .dhsl {
        height: 40px;
        line-height: 40px;
    }

    .hospital-posi {
        width: 10px;
        height: 10px;
    }

</style>