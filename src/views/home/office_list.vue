<template>
    <div>
        <van-tree-select
                :items="items"
                :active-id.sync="activeId"
                :main-active-index.sync="activeIndex"
        />
    </div>
</template>

<script>
    export default {
        name: "office_list",
        data(){
            return{
                items,
                activeId: 1,
                activeIndex: 0
            }
        },
        methods:{

        },
        mounted(){

        }
    }
</script>

<style scoped>

</style>