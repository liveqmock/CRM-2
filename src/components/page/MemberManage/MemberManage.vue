<template>
    <div class="member">
        <v-breadcrumb :nav="['经销商会员管理','会员管理']"></v-breadcrumb>
        <el-card style="margin:10px 0 20px">
            <el-form ref="form" :inline="true" :model="form">
                <el-form-item prop="id" label="用户ID" label-width="120">
                    <el-input style="width:200px" placeholder="请输入用户ID" v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item prop="nickname" label="用户昵称" label-width="120">
                    <el-input style="width:200px" placeholder="请输入用户昵称" v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="授权码" label-width="120">
                    <el-input style="width:200px" placeholder="请输入授权码" v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item prop="idcard" label="证件号" label-width="120">
                    <el-input style="width:200px" placeholder="请输入证件号" v-model="form.idcard"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号" label-width="120">
                    <el-input style="width:200px" placeholder="请输入手机号" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item prop="dType" label="会员类型" label-width="120">
                    <el-select v-model="form.dType" placeholder="请选择会员类型">
                        <el-option label="请选择会员类型" value=""></el-option>
                        <el-option label="网信经销商" value="1"></el-option>
                        <el-option label="供货经销商" value="2"></el-option>
                        <el-option label="网红经销商" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getList(1)" type="primary">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="table-block">
            <el-form ref="exportForm" :inline="true" :model="exportForm" class="search-area">
                <el-form-item>
                    <div style="display: inline-block;margin-right: 20px">
                        <region @regionMsg='getRegion' :regionMsg='address'></region>
                    </div>
                </el-form-item>
                <el-form-item prop="levelId" label="用户层级" label-width="120">
                    <el-select v-model="exportForm.levelId" placeholder="全部层级">
                        <el-option label="全部层级" value=""></el-option>
                        <el-option :label="item.name" :value="item.id" v-for="(item,index) in levelList"
                                   :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="p.exportDealerListExcel" @click="exportData" type="primary">导出</el-button>
                </el-form-item>
            </el-form>
            <template>
                <el-table v-loading="tableLoading" :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="id" label="用户ID" width="60" align="center"></el-table-column>
                    <el-table-column prop="nickname" label="用户昵称" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                    <el-table-column label="授权层级" width="100" align="center">
                        <template slot-scope="scope">{{scope.row.levelName}}</template>
                    </el-table-column>
                    <el-table-column prop="day_count" label="本日登录" width="80" align="center"></el-table-column>
                    <el-table-column prop="month_count" label="本月登录" width="80" align="center"></el-table-column>
                    <el-table-column label="最近登录时间" align="center">
                        <template slot-scope="scope">
                            <template>{{scope.row.last_logintime|formatDate}}</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code" label="授权码" width="100" align="center"></el-table-column>
                    <el-table-column prop="addrPreFix" label="区域/省市区" align="center"></el-table-column>
                    <!--<el-table-column prop="style" label="渠道" width="100"></el-table-column>-->
                    <el-table-column label="下级" width="50" align="center">
                        <template slot-scope="scope">
                            <span style="cursor: pointer"
                                  @click="toLower(scope.row.id)">{{scope.row.sub_level_num}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status==1">待激活</template>
                            <template v-if="scope.row.status==2">正常</template>
                            <template v-if="scope.row.status==3">已关闭</template>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="isShowOperate" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" v-if="p.findDealerById" size="small"
                                       @click="detailItem(scope.$index,scope.row)">详情
                            </el-button>
                            <el-button type="danger" v-if="scope.row.status!=3&&p.stopDealerById" size="small"
                                       @click="updateStatusItem(scope.$index,scope.row.id,1)">关闭
                            </el-button>
                            <el-button type="danger" v-if="scope.row.status==3&&p.openDealerById" size="small"
                                       @click="updateStatusItem(scope.$index,scope.row.id,2)">开启
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
                        <el-button :loading="btnLoading" @click="oprSure(true)" class="del-btn" type="danger">{{btnTxt}}
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
    import region from '../../common/Region';
    import * as api from '../../../api/api';
    import utils from '../../../utils/index.js'
    import * as pApi from '../../../privilegeList/index.js';
    import moment from 'moment';

    export default {
        components: {
            vBreadcrumb, icon, region
        },
        data() {
            return {
                // 权限控制
                p: {
                    stopDealerById: false,
                    openDealerById: false,
                    exportDealerListExcel: false,
                    findDealerById: false
                },
                isShowOperate: true,

                tableData: [],
                tableLoading: false,
                btnLoading: false,
                tipsMask: false,
                page: {
                    currentPage: 1,
                    totalPage: 0
                },
                height: '',
                formLabelWidth: '100px',
                form: {
                    id: '',
                    nickName: '',
                    code: '',
                    idCard: '',
                    phone: '',
                    dType: '',
                },
                exportForm: {
                    levelId: '',
                },
                selected: '',
                address: [],
                levelList: [],//用户层级列表
                id: '',
                info: '',
                type: '',
                btnTxt: ''
            }
        },
        created() {
            let winHeight = window.screen.availHeight - 520;
            this.height = winHeight;
            this.pControl();
        },
        activated() {
            this.getList(this.page.currentPage);
            this.getLevelList();
            this.pControl();
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
                if (!this.p.stopDealerById && !this.p.findDealerById && !this.p.openDealerById) {
                    this.isShowOperate = false;
                }
            },
            //获取列表
            getList(val) {
                let that = this;
                let data = that.form;
                data.page = val;
                data.levelId = that.exportForm.levelId;
                let addrss = that.address;
                if (addrss && addrss[0]) {
                    data.provinceId = addrss[0];
                    if (addrss[1]) {
                        data.cityId = addrss[1];
                    }
                    if (addrss[2]) {
                        data.areaId = addrss[2];
                    }
                } else {
                    data.provinceId = '';
                    data.cityId = '';
                    data.areaId = '';
                }
                data.url = pApi.getDealerPageList;
                that.tableLoading = true;
                that.$axios
                    .post(api.getDealerPageList, data)
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
            //获取用户层级列表
            getLevelList() {
                let that = this;
                let data = {};
                that.$axios
                    .post(api.getDealerLevelList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.levelList = res.data.data;
                        } else {
                            that.$message.warning(res.data.msg);
                        }

                    })
                    .catch(err => {
                        console.log(err);
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
            //跳到下级列表
            toLower(id) {
                sessionStorage.setItem('memberId', id);
                this.$router.push({path: '/lowerMemberManage'})
            },
            //详情
            detailItem(index, row) {
                localStorage.setItem('memberDetail', row.id);
                this.$router.push({path: '/memberDetail', query: {id: row.id}})
            },
            //关闭,开启
            updateStatusItem(index, id, num) {
                let that = this;
                that.id = id;
                if (num == 1) {
                    that.info = '是否确认关闭？';
                    that.type = '关闭';
                    that.btnTxt = '确认关闭'
                } else {
                    that.info = '是否确认开启？';
                    that.type = '开启';
                    that.btnTxt = '确认开启'
                }
                that.tipsMask = true;
            },
            oprSure() {
                let that = this;
                let data = {
                    id: that.id
                };
                let url = '';
                if (that.type == '关闭') {
                    url = api.stopDealerById;
                    data.url = pApi.stopDealerById
                } else {
                    url = api.openDealerById;
                    data.url = pApi.openDealerById
                }
                that.btnLoading = true;
                that.$axios
                    .post(url, data)
                    .then(res => {
                        that.btnLoading = false;
                        if (res.data.code == 200) {
                            that.getList(that.page.currentPage);
                            that.tipsMask = false;
                        } else {
                            that.$message.warning(res.data.msg);
                            that.tipsMask = false;
                            that.btnLoading = false;
                        }
                    })
                    .catch(err => {
                        that.btnLoading = false;
                        that.tipsMask = false;
                    });
            },
            //导出
            exportData() {
                let that = this;
                let data = that.form;
                data.page = that.page.currentPage;
                data.levelId = that.exportForm.levelId;
                data.url = pApi.exportDealerListExcel;
                let addrss = that.address;
                if (addrss && addrss[0]) {
                    data.provinceId = addrss[0];
                    if (addrss[1]) {
                        data.cityId = addrss[1];
                    }
                    if (addrss[2]) {
                        data.areaId = addrss[2];
                    }
                } else {
                    data.provinceId = '';
                    data.cityId = '';
                    data.areaId = '';
                }
                that.$axios
                    .post(api.exportDealerListExcel, data, {responseType: "blob"})
                    .then(res => {
                        var data = res.data;
                        if (!data) {
                            return;
                        }
                        let url = window.URL.createObjectURL(new Blob([data]));
                        let link = document.createElement("a");
                        link.style.display = "none";
                        link.href = url;
                        let time = moment(new Date()).format('YYYYMMDDHHmmss');
                        link.setAttribute("download", "会员列表" + time + ".xlsx");
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //   重置表单
            resetForm(formName) {
                this.address = [];
                this.$refs[formName].resetFields();
                this.$refs['exportForm'].resetFields();
                this.getList(this.page.currentPage)
            },

            // 获取省市区
            getRegion(msg) {
                this.address = msg;
            }
        }
    }
</script>

<style lang="less">
    .member {
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
