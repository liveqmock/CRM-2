<template>
    <div class="notice">
        <v-breadcrumb :nav="['服务管理','公告通知管理']"></v-breadcrumb>
        <transition name="move" appear>
            <el-card style="margin:10px 0 20px">
                <el-form ref="form" :inline="true" :model="form">
                    <el-form-item prop="status" label="状态" label-width="120">
                        <el-select v-model="form.status" placeholder="请选择">
                            <el-option label="全部状态" value=""></el-option>
                            <el-option label="待推送" value="1"></el-option>
                            <el-option label="已推送" value="2"></el-option>
                            <el-option label="取消推送" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="name" label="发布者" label-width="120">
                        <el-input style="width:200px" placeholder="请输入发布者" v-model="form.name"></el-input>
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
                </el-form>
            </el-card>
        </transition>
        <div class="table-block">
            <div style="margin: -20px 0 20px">
                <div class="tab-item" :class="checked[0]?'checked':''" @click="change(0)">公告</div>
                <div class="tab-item" :class="checked[1]?'checked':''" @click="change(1)" style="margin-left: -5px">通知
                </div>
            </div>
            <el-form ref="exportForm" :inline="true" :model="form" class="search-area">
                <el-form-item>
                    <el-button v-if="p.addNotice" @click="addInf" type="primary">发布公告/通知</el-button>
                </el-form-item>
            </el-form>
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
                    <el-table-column prop="n_type" label="类型" width="80" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.n_type==1">公告</template>
                            <template v-if="scope.row.n_type==2">通知</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="标题" align="center"></el-table-column>
                    <el-table-column prop="push_way" label="推送用户" align="center"></el-table-column>
                    <el-table-column label="推送区域" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.push_country==1">全国</template>
                            <template v-if="scope.row.push_country==2">国外</template>
                            <template v-if="scope.row.push_country==3">
                                {{scope.row.address}}
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="推送时间" align="center">
                        <template slot-scope="scope">
                            <template>{{scope.row.order_time|formatDate}}</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="发布者" width="80" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status==1">待推送</template>
                            <template v-if="scope.row.status==2">已推送</template>
                            <template v-if="scope.row.status==3">取消推送</template>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="isShowOperate" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" v-if="p.getNoticeDetailById" size="small" @click="detailItem(scope.$index,scope.row)">查看详情
                            </el-button>
                            <el-button type="warning" size="small" @click="upStatusItem(scope.row.id,2)"
                                       v-if="scope.row.status==2&&p.updateNoticeStatus_1">再次推送
                            </el-button>
                            <el-button type="success" size="small" @click="upStatusItem(scope.row.id,3)"
                                       v-if="scope.row.status==1&&p.updateNoticeStatus_2">取消推送
                            </el-button>
                            <el-button type="danger" size="small" @click="upStatusItem(scope.row.id,4)"
                                       v-if="scope.row.status==3&&p.updateNoticeStatus_3" style="width: 80px"> 删除
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
                p:{
                    addNotice:false,
                    updateNoticeStatus_1:false,
                    updateNoticeStatus_2:false,
                    updateNoticeStatus_3:false,
                    getNoticeDetailById:false,
                },
                isShowOperate:true,

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
                status:'',
                id:'',
                btnLoading:false,
                levels:[],
                levelIds:[]
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
                if (!this.p.updateNoticeStatus_1 &&!this.p.updateNoticeStatus_2 &&!this.p.updateNoticeStatus_3 && !this.p.getNoticeDetailById) {
                    this.isShowOperate = false;
                }
            },
            getTable(){
                let that=this;
                let param={};
                that.$axios
                    .post(api.getDealerLevelList, param)
                    .then(resData => {
                        if (resData.data.code == 200) {
                            for (let i in resData.data.data) {
                                let name=resData.data.data[i].name;
                                let id=resData.data.data[i].id;
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
                that.page.currentPage=1;
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
                data.url=pApi.getNoticeList;
                that.tableLoading = true;
                that.$axios
                    .post(api.getNoticeList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.tableLoading = false;
                            for(let i in res.data.data.data){
                                let arr=res.data.data.data[i].push_way.split(',');
                                let temp=[];
                                for(let j in that.levelIds){
                                    for(let k in arr){
                                        if (arr[k] ==that.levelIds[j]) {
                                            let name=that.levels[k];
                                            if(temp.indexOf(name)==-1){
                                                temp.push(that.levels[k])
                                            }
                                        }
                                    }
                                }
                                res.data.data.data[i].push_way=temp.join(',');
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
            //详情
            detailItem(index, row) {
                localStorage.setItem('addNoticeInform', row.id);
                this.$router.push({path: '/noticeInformDetail', query: {id: row.id}})
            },
            //再次推送,取消推送
            upStatusItem(id, status) {
                let that = this;
                that.tipsMask = true;
                if (status == 2) {
                    that.info = '确定再次推送？'
                }
                if (status == 3) {
                    that.info = '确定取消推送？'
                }
                if (status == 4) {
                    that.info = '确定删除？'
                }
                that.status = status;
                that.id = id;
            },
            oprSure() {
                let that=this;
                let data = {
                    id: that.id,
                    status: that.status,
                };
                if(that.status==2){
                    data.url=pApi.updateNoticeStatus_1
                }
                if(that.status==3){
                    data.url=pApi.updateNoticeStatus_2
                }
                if(that.status==4){
                    data.url=pApi.updateNoticeStatus_3
                }
                that.btnLoading=true;
                that.$axios
                    .post(api.updateNoticeStatus, data)
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
            //发布通知/公告
            addInf() {
                this.$router.push('/addNoticeInform')
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.form.date='';
                this.getList(this.page.currentPage)
            },
        }
    }
</script>

<style lang="less">
    .notice {
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

    }


</style>
