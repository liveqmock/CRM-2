<template>
    <div class="brand-manage">
        <v-breadcrumb :nav="['品牌产品管理','运费模板']"></v-breadcrumb>
        <div class="table-block">
            <el-button v-if="p.addBrand" type="primary" style="margin-bottom: 20px" @click="addTemplate">添加模板</el-button>
            <template>
                <el-table v-loading="tableLoading" :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column type="index" label="运费模板编号" width="100" align="center"></el-table-column>
                    <el-table-column prop="data" label="模板名称" align="center"></el-table-column>
                    <el-table-column prop="area" label="是否包邮" align="center"></el-table-column>
                    <el-table-column prop="data" label="计价方式" align="center"></el-table-column>
                    <el-table-column label="状态" width="180" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status == 1">启用</template>
                            <template v-if="scope.row.status == 2">停用</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="data" label="使用数" width="180" align="center"></el-table-column>
                    <el-table-column v-if="isShowOperate" label="模板设置" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small">设为默认</el-button>
                            <el-button  v-if="p.updateBrand" type="warning" size="small" @click="editItem(scope.$index,scope.row.id)">编辑模板
                            </el-button>
                            <el-button v-if="p.deleteBrand" type="danger" size="small" @click="delItem(scope.$index,scope.row.id)">删除模板
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        layout="total, prev, pager, next, jumper"
                        :total="page.totalPage">
                </el-pagination>
            </div>
        </div>
        <!--删除弹窗-->
        <delete-toast :id='delId' :url='delUrl' :uri='delUri' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
    </div>
</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import deleteToast from "../../common/DeleteToast";
    import * as api from '../../../api/api';
    import utils from '../../../utils/index.js'
    import * as pApi from '../../../privilegeList/index.js';

    export default {
        components: {
            vBreadcrumb, icon, deleteToast
        },
        data() {
            return {
                // 权限控制
                p:{
                    addBrand:false,
                    updateBrand:false,
                    deleteBrand:false,
                },
                isShowOperate:true,

                tableData: [{data:111}],
                tableLoading: false,
                page: {
                    currentPage: 1,
                    totalPage: 1
                },
                height: '',
                addOrEditMask: false,
                isShowDelToast: false,
                formLabelWidth: '100px',
                form: {
                    name: '',
                    status: '',
                    icon: ''
                },
                delId: '',
                delUrl: '',
                delUri:''
            }
        },
        created() {
            let winHeight = window.screen.availHeight - 600;
            this.height = winHeight;
            this.pControl();
        },
        activated() {
            this.pControl();
            // this.getList(this.page.currentPage)
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
                if (!this.p.updateBrand && !this.p.deleteBrand) {
                    this.isShowOperate = false;
                }
            },
            //获取列表
            getList(val) {
                let that = this;
                let data = {
                    page: val,
                    status:that.form.status,
                    name:that.form.name,
                    url:pApi.queryBrandPageList
                };
                that.tableLoading = true;
                that.$axios
                    .post(api.getBrandList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.tableLoading = false;
                            that.tableData = res.data.data.data;
                            that.page.totalPage = res.data.data.resultCount;
                        } else {
                            that.$message.warning(res.data.msg);
                            that.tableLoading = false;
                        }

                    })
                    .catch(err => {
                        console.log(err);
                        that.tableLoading = false;
                    })
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.currentPage = val;
                this.getList(val)
            },
            // 添加品牌
            addTemplate() {
                this.$router.push({path: '/addTemplate'})
            },
            //编辑
            editItem(index, id) {
                sessionStorage.setItem('templateId', id);
                this.$router.push({path: '/editTemplate', query: {brandId: id}})
            },

            //跳到品牌页面
            // toBrand(index,row){
            //     this.$router.push({ path: "/addOrUpBrand", query: { params: row } });
            // },
            //删除
            delItem(index, id) {
                this.delId = id;
                this.delUrl = api.deleteBrand;
                this.delUri = pApi.deleteBrand;
                this.isShowDelToast = true;
            },
            // 删除弹窗
            deleteToast(msg) {
                this.isShowDelToast = msg;
                this.getList(this.page.currentPage);
            },
            //   重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.getList(this.page.currentPage)
            },

        }
    }
</script>

<style lang="less">
    .brand-manage {
        img{
            width: 38px;
            height: 38px;
            border-radius: 5px;
            vertical-align: middle;
        }
        /*表格样式*/
        .table-block {
            padding: 20px 20px 60px;
            background: #fff
        }
        .block {
            float: right;
            margin-top: 10px
        }

        /*弹窗样式*/
        .el-dialog {
            width: 530px;
            border-radius: 10px
        }
        .el-dialog__header {
            border-bottom: 1px solid #eee;
            padding: 20px 20px 10px 50px
        }
        .el-dialog__title {
            color: #ff6868
        }
        .el-dialog .el-input {
            display: inline
        }
        .el-dialog .el-input__inner {
            width: 360px
        }
        .el-select .el-input__inner {
            width: 200px
        }
        .el-dialog .el-upload--text {
            width: 100px;
            height: 40px;
            border: none
        }
        .icon-area .el-input__inner {
            width: 240px
        }
        .el-input__suffix {
            line-height: 24px
        }
        .icon-uploader {
            float: right;
            margin-right: 31px;
            height: 33px
        }
        .icon-uploader .el-button--small {
            border-radius: 5px;
            width: 100px
        }
        .el-upload--text .el-icon-upload {
            line-height: 0;
            margin: 0;
            color: #fff;
            font-size: 14px
        }
        .el-dialog__footer {
            margin-right: 30px
        }
        .el-upload-list {
            display: none
        }
    }


</style>
