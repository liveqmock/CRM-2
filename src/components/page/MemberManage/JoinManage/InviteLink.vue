<template>
    <div>
        <v-breadcrumb :nav="['经销商会员管理','经销商加盟管理','邀请链接']"></v-breadcrumb>
        <div class="invite-link">
            <div class="box">
                <div class="mask-content">
                    <el-form :model="form">
                        <div class="title-item">邀请二维码：</div>
                        <el-form-item>
                            <img src="../../../../assets/images/logo.png" alt="" class="code-area">
                        </el-form-item>
                        <div class="title-item">邀请链接：</div>
                        <el-form-item>
                            <el-input placeholder="请输入邀请链接"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="submit-btn">
                    <el-button type="primary" @click="submitForm('form')">确认保存</el-button>
                    <el-button @click="closeToask">取消</el-button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import icon from "../../../common/ico";
    import vBreadcrumb from '../../../common/Breadcrumb.vue';

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                form: {
                    name: "",
                    isUse: "1",
                    imageUrl: '',
                    brandKey: '',
                    validity: '0'
                },
                activeName2: 'first',
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true,
                isUpdateUperMask: false
            };
        },
        methods: {

            //  取消弹窗
            closeToask() {
                this.$emit("status", false);
            },
            //渠道选项卡
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            // 提交表单
            submitForm(form) {
                this.closeToask();
            },
            sureUpdate() {
                this.isUpdateUperMask = true
            },
            closeUpdateUperMask() {
                this.isUpdateUperMask = false
            }
        }
    };
</script>
<style lang="less">
    .invite-link {
        .title-item {
            padding: 10px 0 20px
        }
        .box {
            background-color: #fff;
            border-radius: 10px;
            height: 880px;
            .mask-content {
                position: relative;
                width: 100%;
                padding: 40px 45px 30px 80px;
                box-sizing: border-box;
                .submit-btn {
                    margin-top: 30px;
                    padding-left: 225px;
                    box-sizing: border-box;
                }
            }
        }
        .code-area {
            width: 200px;
            height: 310px;
            border-radius: 5px;
            border:1px solid #dfdfdf;
        }
        .el-input {
            width: 300px
        }
        .el-input__inner {
            width: 300px
        }
        .submit-btn {
            padding: 0 50px 20px 130px
        }
    }
</style>


