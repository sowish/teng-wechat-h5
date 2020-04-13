<template>
    <div class="my-order">
        <div @click="$router.push({path:'/order_detail',query:{id:''}})" class="box fz-14">
            <div class="clear box-title">
                <div class="ft-l">
                    某某某
                </div>
                <div class="ft-r fwb cr-2FBD8B">
                    状态
                </div>
            </div>
            <div class="box-content">
                <div class="sp">医院</div>
                <span>北京人大医院</span>
            </div>
            <div class="box-content">
                <div class="sp">科室</div>
                <span>妇科</span>
            </div>
            <div class="box-content">
                <div class="sp">就医时间</div>
                <span>2020-09-09</span>
            </div>
            <div class="box-content">
                <div class="sp">订单号</div>
                <span>1613151313131313513</span>
            </div>
        </div>
        <div class="box fz-14">
            <div class="clear box-title">
                <div class="ft-l">
                    某某某
                </div>
                <div class="ft-r fwb cr-2FBD8B">
                    状态
                </div>
            </div>
            <div class="box-content">
                <div class="sp">医院</div>
                <span>北京人大医院</span>
            </div>
            <div class="box-content">
                <div class="sp">科室</div>
                <span>妇科</span>
            </div>
            <div class="box-content">
                <div class="sp">就医时间</div>
                <span>2020-09-09</span>
            </div>
            <div class="box-content">
                <div class="sp">订单号</div>
                <span>1613151313131313513</span>
            </div>
        </div>
        <div class="box fz-14">
            <div class="clear box-title">
                <div class="ft-l">
                    某某某
                </div>
                <div class="ft-r fwb cr-2FBD8B">
                    状态
                </div>
            </div>
            <div class="box-content">
                <div class="sp">医院</div>
                <span>北京人大医院</span>
            </div>
            <div class="box-content">
                <div class="sp">科室</div>
                <span>妇科</span>
            </div>
            <div class="box-content">
                <div class="sp">就医时间</div>
                <span>2020-09-09</span>
            </div>
            <div class="box-content">
                <div class="sp">订单号</div>
                <span>1613151313131313513</span>
            </div>
        </div>
        <div class="box fz-14">
            <div class="clear box-title">
                <div class="ft-l">
                    某某某
                </div>
                <div class="ft-r fwb cr-2FBD8B">
                    状态
                </div>
            </div>
            <div class="box-content">
                <div class="sp">医院</div>
                <span>北京人大医院</span>
            </div>
            <div class="box-content">
                <div class="sp">科室</div>
                <span>妇科</span>
            </div>
            <div class="box-content">
                <div class="sp">就医时间</div>
                <span>2020-09-09</span>
            </div>
            <div class="box-content">
                <div class="sp">订单号</div>
                <span>1613151313131313513</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my_order",
        data() {
            return {}
        },
        methods: {},
        mounted() {

        }
    }
</script>

<style scoped>
    .my-order {
        padding: 15px;
    }

    .box {
        padding:0 15px;
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 15px;
    }

    .box-title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #E6E6E6;
    }

    .box-content{
        height: 40px;
        line-height: 40px;
    }
    .box-content .sp {
        width: 90px;
        display: inline-block;
        color: #666666;
    }

    .cr-2FBD8B {
        color: #2fbd8b;
    }

    .cr-5385FE{
        color: #5385fe;
    }


</style>