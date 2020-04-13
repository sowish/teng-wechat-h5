<template>
    <div id="app">
        <router-view/>
        <!--有返回值才能点击遮罩层-->
        <!--<div class="load-cover" v-if="showLoading">

        </div>-->
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {api} from "@/api/api";
    export default {
        created() {
            //监听回退事件刷新页面，解决ios回退白屏问题
            window.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    window.location.reload()
                }
            })
        },
        computed: {
            ...mapState([
                'showLoading'
            ])
        }
    }
</script>

<style scoped>
    .load-cover {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .1);
        z-index: 999;
        position: fixed;
        left: 0;
        top: 0;
    }

    * {
        padding: 0;
        margin: 0;
    }

    html, body {
        width: 100%;
    }
</style>
