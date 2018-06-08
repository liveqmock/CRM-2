<template>
    <div class="account-recharge">
        <v-breadcrumb :nav="['会员管理','账户充值']"></v-breadcrumb>
        <transition name="move" appear>
            <el-card style="margin:10px 0 20px">
                <el-form ref="form" :inline="true" :model="form">
                    <el-form-item prop="name" label="会员昵称" label-width="120">
                        <el-input style="width:200px" placeholder="请输入会员昵称" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="status" label="状态" label-width="120">
                        <el-select v-model="form.status" placeholder="请选择">
                            <el-option label="全部记录" value=""></el-option>
                            <el-option label="待审核记录" value="1"></el-option>
                            <el-option label="已通过记录" value="2"></el-option>
                            <el-option label="已驳回记录" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="date" label="时间" label-width="120">
                        <el-date-picker
                            v-model="form.date"
                            type="datetimerange"
                            format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getList(1)" type="primary">查询</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="recharge" type="primary">账户充值</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>
        <div class="table-block">
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="id" label="编号" width="60" align="center"></el-table-column>
                    <el-table-column prop="n_type" label="手机号" width="80" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.n_type==1">公告</template>
                            <template v-if="scope.row.n_type==2">通知</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="会员昵称" align="center"></el-table-column>
                    <el-table-column prop="push_way" label="账户类型" align="center"></el-table-column>
                    <el-table-column prop="push_way" label="充值金额" align="center"></el-table-column>
                    <el-table-column prop="push_way" label="备注" align="center"></el-table-column>
                    <el-table-column label="充值时间" align="center">
                        <template slot-scope="scope">
                            <template>{{scope.row.order_time|formatDate}}</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="操作人" width="80" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status==1">待推送</template>
                            <template v-if="scope.row.status==2">已推送</template>
                            <template v-if="scope.row.status==3">取消推送</template>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="isShowOperate" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" v-if="p.getNoticeDetailById" size="small"
                                       @click="detailItem(scope.$index,scope.row)">通过
                            </el-button>
                            <el-button type="primary" v-if="p.getNoticeDetailById" size="small"
                                       @click="detailItem(scope.$index,scope.row)">驳回
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
        <!--账户充值弹窗-->
        <el-dialog title="账户充值" :visible.sync="addMask">
            <el-form v-model="addForm" :label-width="formLabelWidth">
                <el-form-item prop="name" label="手机号">
                    <el-input v-model="addForm.phone" auto-complete="off" placeholder="请输入用户手机号查找"></el-input>
                </el-form-item>
                <div class="detail" v-if="showDetail">
                    <div class="member-item">
                        <span class="member-title">会员编号：</span><span>{{}}</span>
                    </div>
                    <div class="member-item">
                        <span class="member-title">昵称：</span><span>{{}}</span>
                    </div>
                    <div class="member-item">
                        <span class="member-title">手机号：</span><span>{{}}</span>
                    </div>
                    <div class="member-item">
                        <span class="member-title">姓名：</span><span>{{}}</span>
                    </div>
                    <div class="member-item">
                        <span class="member-title">身份证号：</span><span>{{}}</span>
                    </div>
                </div>
                <el-form-item label="充值账户类型">
                    <el-select v-model="addForm.status" placeholder="请选择账户类型">
                        <el-option value="1" label="现金余额账户"></el-option>
                        <el-option value="2" label="代币账户"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="level" label="充值金额">
                    <el-input v-model="addForm.level" auto-complete="off" placeholder="请输入充值金额"></el-input>
                </el-form-item>
                <el-form-item label="备注说明" class="remark-area">
                    <el-input v-model="addForm.remark" auto-complete="off" placeholder="请输入说明文字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-loading="btnLoading" @click="addOrEdit('addForm')">确定保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import * as api from '../../../api/api';
    import moment from 'moment'
    import {getList} from "../../../api/api";
    import utils from '../../../utils/index.js'
    import * as pApi from '../../../privilegeList/index.js';

    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                // 权限控制
                p: {
                    addNotice: false,
                    updateNoticeStatus_1: false,
                    updateNoticeStatus_2: false,
                    updateNoticeStatus_3: false,
                    getNoticeDetailById: false,
                },
                isShowOperate: true,

                checked: [true, false],
                tableData: [],
                page: {
                    currentPage: 1,
                    totalPage: 0
                },
                height: '',
                tipsMask: false,
                info: '',
                formLabelWidth: '100px',
                form: {
                    status: '',
                    name: '',
                    date: '',
                    nType: '1'
                },
                exportForm: {
                    level: '',
                },
                selected: '',
                nav: ['服务管理', '公告'],
                isShowDelToast: false,
                status: '',
                id: '',
                btnLoading: false,
                levels: [],
                levelIds: [],
                addMask: false,
                addForm: {
                    name: '',
                    level: '',
                    autoUp: '1',
                    remark: ''
                },
                showDetail:true
            }
        },
        created() {
            let winHeight = window.screen.availHeight - 520;
            this.height = winHeight;
            this.pControl();
        },
        activated() {
            this.getTable();
            this.pControl();
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
                if (!this.p.updateNoticeStatus_1 && !this.p.updateNoticeStatus_2 && !this.p.updateNoticeStatus_3 && !this.p.getNoticeDetailById) {
                    this.isShowOperate = false;
                }
            },
            getTable() {
                let that = this;
                let param = {};
                that.$axios
                    .post(api.getDealerLevelList, param)
                    .then(resData => {
                        if (resData.data.code == 200) {
                            for (let i in resData.data.data) {
                                let name = resData.data.data[i].name;
                                let id = resData.data.data[i].id;
                                that.levels.push(name);
                                that.levelIds.push(id);
                            }
                            this.getList(this.page.currentPage)
                        } else {
                            that.$message.warning(res.data.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            change(num) {
                let that = this;
                that.checked = [false, false];
                that.checked[num] = true;
                if (num == 0) {//公告
                    that.nav = ['服务管理', '公告'];
                    that.form.nType = 1;
                } else {//通知
                    that.nav = ['服务管理', '通知'];
                    that.form.nType = 2;
                }
                that.page.currentPage = 1;
                that.getList(that.page.currentPage)
            },
            //获取列表
            getList(val) {
                let that = this;
                let data = {
                    page: val,
                    status: that.form.status,
                    name: that.form.name,
                    nType: that.form.nType,
                    beginTime: that.form.date ? moment(that.form.date[0]).format('YYYY-MM-DD') : '',
                    endTime: that.form.date ? moment(that.form.date[1]).format('YYYY-MM-DD') : '',
                };
                data.url = pApi.getNoticeList;
                that.tableLoading = true;
                that.$axios
                    .post(api.getNoticeList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.tableLoading = false;
                            for (let i in res.data.data.data) {
                                let arr = res.data.data.data[i].push_way.split(',');
                                let temp = [];
                                for (let j in that.levelIds) {
                                    for (let k in arr) {
                                        if (arr[k] == that.levelIds[j]) {
                                            let name = that.levels[k];
                                            if (temp.indexOf(name) == -1) {
                                                temp.push(that.levels[k])
                                            }
                                        }
                                    }
                                }
                                res.data.data.data[i].push_way = temp.join(',');
                            }
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
            //充值
            recharge() {
                this.addMask = true;
            },
            //添加修改确定
            addOrEdit(formName) {
                let url = "";
                let data = {};
                data.name=this[formName].name;
                data.level=this[formName].level;
                if(!data.name||!data.level){
                    this.$message.warning('层级、层级名称不能为空!');
                    return
                }
                data.autoUp=this[formName].autoUp;
                data.remark=this[formName].remark;
                if (!this.isUp) {
                    url = api.addDealerLevel;
                    data.url=pApi.addDealerLevel;
                } else {
                    url = api.updateDealerLevel;
                    data.id = this.id;
                    data.url=pApi.updateDealerLevel;
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
            //取消
            cancel(){
                this.addMask = false;
                this.editMask = false;
                this.getList(this.page.currentPage)
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.form.date = '';
                this.getList(this.page.currentPage)
            },
        }
    }
</script>

<style lang="less">
    .account-recharge {
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
            width: 180px
        }

        .remark-area .el-input__inner {
            width: 360px
        }

        .el-dialog .el-upload--text {
            width: 100px;
            height: 40px;
            border: none
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
        .detail{
            margin: -10px 100px 10px;
        }
        .member-title{
            width: 80px;
            display: inline-block;
        }

    }


</style>
