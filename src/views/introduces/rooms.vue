<template>
    <div>
        <van-tree-select
                :items="items"
                :active-id.sync="activeId"
                :main-active-index.sync="activeIndex"
                height='100vh'
                @click-item="goPage()"
                @click-nav="reset"
        />
    </div>
</template>

<script>
    import {api} from '@/api/api';

    export default {
        data() {
            return {
                hospitalCode: localStorage.getItem("hospitalCode"),
                token: sessionStorage.getItem('token'),
                items: [],//1是正常 0 是禁用
                lists: [],
                activeIndex: 0,//表示左侧高亮选项的索引
                activeId: 0,//表示右侧高亮选项的 id
            }
        },
        methods: {
            /*获取列表*/
            getLists() {
                api('/hospital/department/book/lists?hospitalCode=' + this.hospitalCode, 'post').then(res => {
                    console.log(res)
                    if (res.data.code == 2000) {
                        this.lists = res.data.data;
                        console.log(res.data.data, this.token);
                        for (let i = 0; i < this.lists.length; i++) {
                            let obj1 = {
                                text: this.lists[i].departmentName,
                                className: 'my-class',
                                children: []
                            }
                            for (let j = 0; j < this.lists[i].list.length; j++) {
                                let obj2 = {
                                    id: j,
                                    text: this.lists[i].list[j].hisDeptName,
                                    hisHospitalCode: this.lists[i].list[j].hisHospitalCode,
                                    hisDeptCode: this.lists[i].list[j].hisDeptCode,
                                }
                                obj1.children.push(obj2)
                            }
                            this.items.push(obj1)
                        }
                        console.log(this.items)
                    }
                })
            },
            reset() {
                //this.activeIndex = 0;
                this.activeId = 0;
            },
            //去详情
            goPage() {
                console.log(this.items[this.activeIndex].children[this.activeId]);
                let select = this.items[this.activeIndex].children[this.activeId];
                this.$nextTick(()=>{
                    console.log(this.activeIndex,this.activeId);
                    let select = this.items[this.activeIndex].children[this.activeId];
                    this.$router.push({path: '/introduces/doctors', query: {hisDeptCode: select.hisDeptCode}});
                })
                sessionStorage.setItem('activeIndex',this.activeIndex);
            },
            //记住上次选择科室
            remember(){
                if (sessionStorage.getItem('activeIndex')){
                    this.activeIndex=Number(sessionStorage.getItem('activeIndex'));
                }
            }
        },
        created() {
            this.remember();
        },
        mounted() {
            document.title = this.$route.meta.title;
            this.getLists();
            //首次进入初始化科室
            sessionStorage.removeItem('activeIndex');
        },
    }
</script>
<style scoped>
    /deep/ .van-sidebar-item--select {
        border-color: #1989fa !important;
    }
    /deep/ .van-tree-select__item--active {
        color: #1989fa !important;
    }
</style>