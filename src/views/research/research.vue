<template>
    <div class="container">
        <p class="box-title">泰康同济（武汉）医院门诊服务问卷</p>
        <div class="box-title1 clear">
            <div class="ft-l"></div>
            填写个人信息
        </div>
        <div class="box">
            <van-field
                    v-model="username"
                    required
                    clearable
                    label="姓名"
                    placeholder="请输入姓名"
            />
            <van-field
                    v-model="jiuzhenkeshi"
                    required
                    clearable
                    label="就诊科室"
                    placeholder="请输入就诊科室"
            />
            <van-field
                    v-model="jiuzhenriqi"
                    required
                    clearable
                    label="就诊日期"
                    placeholder="请输入就诊日期"
            />
        </div>
        <div class="box-title1 clear">
            <div class="ft-l"></div>
            问卷正文
        </div>
        <div class="box">
            A.就诊流程
            <div style="font-size: 12px;display: inline">(您在我院就诊期间整体就诊流程顺畅、便捷<span style="color: red;">*</span>)</div>
            <van-radio-group v-model="jiuzhenliucheng">
                <van-cell-group>
                    <van-cell title="5分" clickable @click="radio = '5'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="5" />
                    </van-cell>
                    <van-cell title="4分" clickable @click="radio = '4'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="4" />
                    </van-cell>
                    <van-cell title="3分" clickable @click="radio = '3'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="3" />
                    </van-cell>
                    <van-cell title="2分" clickable @click="radio = '2'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="2" />
                    </van-cell>
                    <van-cell title="1分" clickable @click="radio = '1'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="1" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <div class="box">
            B.医生服务
            <div style="font-size: 12px;display: inline">(我院医生在接诊过程中能够态度良好，耐心沟通<span style="color: red;">*</span>)</div>
            <van-radio-group v-model="yishengfuwu">
                <van-cell-group>
                    <van-cell title="5分" clickable @click="radio = '5'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="5" />
                    </van-cell>
                    <van-cell title="4分" clickable @click="radio = '4'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="4" />
                    </van-cell>
                    <van-cell title="3分" clickable @click="radio = '3'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="3" />
                    </van-cell>
                    <van-cell title="2分" clickable @click="radio = '2'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="2" />
                    </van-cell>
                    <van-cell title="1分" clickable @click="radio = '1'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="1" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <div class="box">
            C.护理服务
            <div style="font-size: 12px;display: inline">(我院护士在接诊过程中能够态度良好，专业尽职 <span style="color: red;">*</span>)</div>
            <van-radio-group v-model="hulifuwu">
                <van-cell-group>
                    <van-cell title="5分" clickable @click="radio = '5'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="5" />
                    </van-cell>
                    <van-cell title="4分" clickable @click="radio = '4'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="4" />
                    </van-cell>
                    <van-cell title="3分" clickable @click="radio = '3'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="3" />
                    </van-cell>
                    <van-cell title="2分" clickable @click="radio = '2'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="2" />
                    </van-cell>
                    <van-cell title="1分" clickable @click="radio = '1'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="1" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <div class="box">
            D.医技服务
            <div style="font-size: 12px;display: inline">(我院超声/放射/心电图/胃肠镜/检验科等工作人员在检查过程中耐心服务，良好的引导您就医 <span style="color: red;">*</span>)</div>
            <van-radio-group v-model="yijifuwu">
                <van-cell-group>
                    <van-cell title="5分" clickable @click="radio = '5'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="5" />
                    </van-cell>
                    <van-cell title="4分" clickable @click="radio = '4'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="4" />
                    </van-cell>
                    <van-cell title="3分" clickable @click="radio = '3'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="3" />
                    </van-cell>
                    <van-cell title="2分" clickable @click="radio = '2'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="2" />
                    </van-cell>
                    <van-cell title="1分" clickable @click="radio = '1'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="1" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <div class="box">
            E.收费情况
            <div style="font-size: 12px;display: inline">(我院收费情况是否符合您的预期?<span style="color: red;">*</span>)</div>
            <van-radio-group v-model="shoufeiqingkuang">
                <van-cell-group>
                    <van-cell title="5分" clickable @click="radio = '5'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="5" />
                    </van-cell>
                    <van-cell title="4分" clickable @click="radio = '4'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="4" />
                    </van-cell>
                    <van-cell title="3分" clickable @click="radio = '3'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="3" />
                    </van-cell>
                    <van-cell title="2分" clickable @click="radio = '2'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="2" />
                    </van-cell>
                    <van-cell title="1分" clickable @click="radio = '1'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="1" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <div class="box">
            F.后勤服务
            <div style="font-size: 12px;display: inline">(我院各项标识/指引清晰，就诊环境令您满意?<span style="color: red;">*</span>)</div>
            <van-radio-group v-model="houqinfuwu">
                <van-cell-group>
                    <van-cell title="5分" clickable @click="radio = '5'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="5" />
                    </van-cell>
                    <van-cell title="4分" clickable @click="radio = '4'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="4" />
                    </van-cell>
                    <van-cell title="3分" clickable @click="radio = '3'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="3" />
                    </van-cell>
                    <van-cell title="2分" clickable @click="radio = '2'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="2" />
                    </van-cell>
                    <van-cell title="1分" clickable @click="radio = '1'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="1" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <div class="box">
            G.推荐意愿
            <div style="font-size: 12px;display: inline">(您会向其他人推荐我们医院吗？请按您推荐的意愿的高低程度评分，1分表示您推荐的意愿最低，5分表示您推荐的意愿最高)<span style="color: red;">*</span></div>
            <van-radio-group v-model="tuijianzhiyuan">
                <van-cell-group>
                    <van-cell title="5分" clickable @click="radio = '5'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="5" />
                    </van-cell>
                    <van-cell title="4分" clickable @click="radio = '4'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="4" />
                    </van-cell>
                    <van-cell title="3分" clickable @click="radio = '3'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="3" />
                    </van-cell>
                    <van-cell title="2分" clickable @click="radio = '2'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="2" />
                    </van-cell>
                    <van-cell title="1分" clickable @click="radio = '1'">
                        <van-radio checked-color="#07c160" slot="right-icon" name="1" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <van-button class="btn" round type="primary">提交答卷</van-button>
    </div>
</template>

<script>
    export default {
        name: "research",
        data() {
            return {
                username: '',
                jiuzhenkeshi:'',
                jiuzhenriqi:'',
                jiuzhenliucheng:'',
                yishengfuwu:'',
                hulifuwu:'',
                yijifuwu:'',
                shoufeiqingkuang:'',
                houqinfuwu:'',
                tuijianzhiyuan:'',

            }
        },
        methods: {},
        mounted() {
            document.title = this.$route.meta.title;
            this.$dialog.alert({
                title: '尊敬的客户，您好！',
                message: '为持续改进和提升我们的服务品质，泰康同济（武汉）医院定期向患者（及患者家属）发放满意度调查问卷，以倾听客户的声音。恳请您抽出宝贵时间，填写这份问卷。我们会对您所填写的内容予以保密，感谢您的合作与支持！如果您希望做更详细深入的交流，可致电泰康同济（武汉）医院客户服务热线：40001-955222',

            })
        }
    }
</script>

<style lang="less" scoped>
    .container {
        overflow: hidden;
        .btn{
            width: 345px;
            display: block;
            border:none;
            margin: 20px auto;
        }
        /*height: 100%;*/
        background-color: #fff;
        .box-title {
            font-size: 18px;
            text-align: center;
            line-height: 50px;
            margin: 0;
        }
        .box-title1 {
            font-size: 16px;
            color: #73b42c;
            margin:10px 0;
            div {
                width: 4px;
                height: 20px;
                background-color: #73b42c;
                margin: 0 15px;
            }
        }
        .box {
            font-size: 14px;
            box-sizing: border-box;
            padding: 0 30px;
        }
    }
</style>