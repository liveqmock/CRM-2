<template>
    <div class="keywords">
        <v-breadcrumb :nav="['运营管理','广告位管理','搜索热门搜索关键词']"></v-breadcrumb>
        <transition wordName="move" appear>
            <el-card style="margin:10px 0 20px">
                <el-form ref="form" :inline="true" :model="form">
                    <el-form-item prop="wordName" label="关键词" label-width="120">
                        <el-input style="width:200px" placeholder="请输入关键词搜索" v-model="form.wordName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getList(1)" type="primary">查询</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>
        <div class="table-block">
                <el-button v-if="p.addHotWord" @click="addHotWord" type="primary" style="margin-bottom: 20px">添加搜索关键词</el-button>
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column type="index" label="编号" width="60" align="center"></el-table-column>
                    <el-table-column prop="wordName" label="关键词" align="center"></el-table-column>
                    <el-table-column prop="clickRate" label="活动点击数" align="center"></el-table-column>
                    <el-table-column prop="rank" label="排序" align="center"></el-table-column>
                    <el-table-column v-if="isShowOperate" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="success" v-if="p.updateHotWordsStatusById&&scope.row.status==0" size="small"
                                       @click="upStatusItem(scope.row,1)">开启
                            </el-button>
                            <el-button type="success" v-if="p.updateHotWordsStatusById&&scope.row.status==1" size="small"
                                       @click="upStatusItem(scope.row,2)">关闭
                            </el-button>
                            <el-button type="primary" size="small" @click="editItem(scope.row)"
                                       v-if="p.updateHotWordsById">编辑
                            </el-button>
                            <el-button type="danger" size="small" @click="upStatusItem(scope.row,3)"
                                       v-if="p.deleteHotWordsById" style="width: 80px"> 删除
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
        <!--添加/编辑类目弹窗-->
        <el-dialog title="添加热搜关键词" :visible.sync="addMask">
            <el-form v-model="addForm" label-width="100px">
                <el-form-item label="关键词">
                    <el-input v-model="addForm.wordName" auto-complete="off" placeholder="请输入关键词"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="addForm.rank" auto-complete="off" placeholder="请输入排序数值"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addOrEdit('addForm')">确认保存</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改热搜关键词" :visible.sync="editMask">
            <el-form v-model="editForm" label-width="100px">
                <el-form-item label="关键词">
                    <el-input v-model="editForm.wordName" auto-complete="off" placeholder="请输入关键词"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="editForm.rank" auto-complete="off" placeholder="请输入排序数值"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addOrEdit('editForm')">确 认</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!--消息确认弹窗-->
        <div class="pwd-mask" v-if="tipsMask">
            <div class="box">
                <div class="mask-title">
                    <icon class="ico" ico='icon-jinggao'/>
                    温馨提示
                </div>
                <div class="mask-content">
                    <span class="del-tip">{{info}}</span>
                    <div class="del-btn-group">
                        <el-button :loading="btnLoading" @click="oprSure(true)" class="del-btn" type="danger">确认
                        </el-button>
                        <el-button @click="tipsMask=false">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import icon from '../../../common/ico.vue';
    import * as api from '../../../../api/OperateManage/AdvertisingManage';
    import utils from '../../../../utils/index.js'
    import * as pApi from '../../../../privilegeList/OperateManage/AdvertisingManage';

    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                // 权限控制
                p: {
                    addHotWord: false,
                    updateHotWordsStatusById: false,
                    updateHotWordsById: false,
                    deleteHotWordsById: false,
                },
                isShowOperate: true,

                editForm: {
                    wordName: "",
                    rank: "",
                },
                addForm: {
                    wordName: "",
                    rank: "",
                },
                addMask: false,
                editMask: false,
                id: "",
                itemId: "",
                tableData: [],
                page: {
                    currentPage: 1,
                    totalPage: 0
                },
                height: '',
                tipsMask: false,
                info: '',
                form: {
                    wordName: '',
                },
                isShowDelToast: false,
                btnLoading: false,
            }
        },
        created() {
            let winHeight = window.screen.availHeight - 520;
            this.height = winHeight;
            this.pControl();
        },
        activated() {
            this.getList();
            this.pControl();
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
                if (!this.p.updateHotWordsStatusById && !this.p.updateHotWordsById && !this.p.deleteHotWordsById) {
                    this.isShowOperate = false;
                }
            },
            //获取列表
            getList(val) {
                let that = this;
                let data = {
                    page: val,
                    wordName: that.form.wordName,
                };
                data.url = pApi.getHotWordsByPage;
                that.tableLoading = true;
                that.$axios
                    .post(api.getHotWordsByPage, data)
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
                        that.tableLoading = false;
                        console.log(err)
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
            // 添加热搜关键词
            addHotWord() {
                this.addMask = true;
                this.addForm.wordName='';
                this.addForm.rank='';
                this.itype = "add";
            },
            //编辑
            editItem(row) {
                this.editMask = true;
                this.editForm = row;
                this.itemId = row.id;
                this.itype = "edit";
            },
            //添加修改确定
            addOrEdit(formName) {
                let url = "";
                let data = {};
                data.wordName = this[formName].wordName;
                data.rank = this[formName].rank;
                if(!data.wordName){
                    this.$message.warning('请输入关键词!');
                    return
                }
                if(!data.rank){
                    this.$message.warning('请输入排序数值!');
                    return
                }
                if (this.itype == "add") {
                    url = api.addHotWord;
                    data.url = pApi.addHotWord;
                } else {
                    url = api.updateHotWordsById;
                    data.id = this.itemId;
                    data.url = pApi.updateHotWordsById;
                }
                this.btnLoading = true;
                this.$axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg);
                            this.btnLoading = false;
                            this.addMask = false;
                            this.editMask = false;
                            this.getList(this.page.currentPage);
                        } else {
                            this.btnLoading = false;
                            this.$message.warning(res.data.msg);
                            this.getList(this.page.currentPage);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //开启关闭/删除
            upStatusItem(row, status) {
                let that = this;
                that.tipsMask = true;
                if (status == 1) {
                    that.info = '确定开启？'
                }
                if (status == 2) {
                    that.info = '确定关闭？'
                }
                if (status == 3) {
                    that.info = '确定删除"'+row.wordName+'"关键词？'
                }
                that.status = status;
                that.id = row.id;
            },
            oprSure() {
                let that=this;
                let data = {
                    id: that.id
                };
                let url='';
                if(that.status==1||that.status==2){
                    data.url=pApi.updateHotWordsStatusById;
                    url=api.updateHotWordsStatusById;
                    if(that.status==1){
                        data.status= 1
                    }else{
                        data.status= 0
                    }
                }
                if(that.status==3){
                    data.url=pApi.deleteHotWordsById;
                    url=api.deleteHotWordsById
                }
                that.btnLoading=true;
                that.$axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.tipsMask=false;
                            that.getList(that.page.currentPage);
                            that.btnLoading=false;
                        } else {
                            that.tipsMask=false;
                            that.$message.warning(res.data.msg);
                            that.btnLoading=false;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        that.btnLoading=false;
                        that.tipsMask = false;
                    })
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.form.wordName = '';
                this.getList(this.page.currentPage)
            },
            //取消
            cancel() {
                this.addMask = false;
                this.editMask = false;
                this.getList(this.page.currentPage);
            }
        }
    }
</script>

<style lang="less">
    .keywords {
        .breadcrumb {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            height: 30px;
            overflow: hidden;
            background: white;
            padding-left: 40px;
            box-sizing: border-box;
        }
        .bread-item {
            line-height: 30px;
        }
        .ico {
            margin-right: 5px;
            color: #33b4ff;
            font-size: 18px;
        }
        .tab-item {
            width: 116px;
            height: 50px;
            line-height: 50px;
            border-radius: 0 0 5px 5px;
            text-align: center;
            color: #fff;
            background: #dddddd;
            display: inline-block;
            cursor: pointer;
        }
        .checked {
            background: #ff6868;
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
        .content {
            padding: 40px 40px 0
        }
        .table-block .el-form-item {
            margin-bottom: 0 !important;
        }
        .search-area {
            margin-bottom: 20px
        }
        .search-area .el-input__inner {
            width: 160px
        }

        .pwd-mask {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            .box {
                position: relative;
                width: 530px;
                height: 305px;
                background-color: #fff;
                border-radius: 10px;
                overflow: hidden;
                .mask-title {
                    width: 100%;
                    height: 56px;
                    border-bottom: 1px solid #ccc;
                    padding-left: 45px;
                    box-sizing: border-box;
                    text-align: center;
                    line-height: 56px;
                    color: #ff6868;
                    font-weight: 700;
                    .ico {
                        position: absolute;
                        top: 16px;
                        left: 228px;
                        color: red;
                        font-size: 20px;
                    }
                }
                .mask-content {
                    position: relative;
                    width: 100%;
                    height: 248px;
                    overflow: hidden;
                    padding: 30px 45px 0 45px;
                    box-sizing: border-box;
                    .del-tip {
                        position: absolute;
                        top: 30%;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 22px;
                    }
                    .del-btn-group {
                        width: 180px;
                        display: flex;
                        justify-content: space-between;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        bottom: 15%;
                        .del-btn {
                            background-color: #ff6868;
                        }
                    }
                }
            }
        }
        /*弹窗样式*/
        .el-dialog {
            width: 530px;
            border-radius: 10px;
        }
        .el-dialog__header {
            border-bottom: 1px solid #eee;
            padding: 20px 20px 10px 50px;
        }
        .el-dialog__title {
            color: #ff6868;
        }
        .el-dialog .el-input {
            display: inline;
        }
        .el-dialog .el-input__inner {
            width: 180px;
        }
        .el-select .el-input__inner {
            width: 200px;
        }

        .icon-area .el-input__inner {
            width: 240px;
        }
        .el-input__suffix {
            line-height: 24px;
        }

        .el-dialog__footer {
            margin-right: 30px;
        }

    }


</style>
