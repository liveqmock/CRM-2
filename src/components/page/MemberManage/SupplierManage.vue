<template>
    <div class="supplier">
        <v-breadcrumb :nav="['经销商会员管理','供应商管理']"></v-breadcrumb>
        <el-card style="margin:10px 0 20px">
            <el-form ref="form" :inline="true" :model="form">
                <el-form-item prop="name" label="供应商名称" label-width="120">
                    <el-input style="width:200px" placeholder="请输入供应商名称" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="手机号" label-width="120">
                    <el-input style="width:200px" placeholder="请输入手机号" v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getList(1)" type="primary">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
                <el-button type="primary" v-if="p.addSupplier" style="margin-bottom: 20px" @click="addSupplier">添加供应商</el-button>
            </el-form>
        </el-card>
        <div class="table-block">
            <el-form ref="exportForm" :inline="true" :model="exportForm" class="search-area">
                <el-form-item>
                    <div style="display: inline-block;margin-right: 20px">
                        <region @regionMsg='getRegion' :regionMsg='address'></region>
                    </div>
                </el-form-item>
            </el-form>
            <template>
                <el-table v-loading="tableLoading" :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column type="index" label="供应商编号" width="100" align="center"></el-table-column>
                    <el-table-column prop="name" label="供应商名称" align="center"></el-table-column>
                    <el-table-column label="供应商类型" width="100" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.itype==1">产品供应商</template>
                            <template v-if="scope.row.itype==2">服务供应商</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="porductNum" label="供应产品数" width="100" align="center"></el-table-column>
                    <el-table-column label="区域/省市区" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.country==2">海外</template>
                            <template v-else>
                                {{scope.row.province_name}}{{scope.row.city_name}}{{scope.row.area_name}}
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status==1">正常</template>
                            <template v-if="scope.row.status==2">停用</template>
                            <template v-if="scope.row.status==3">删除</template>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="isShowOperate" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" v-if="p.findSupplierById" size="small"
                                       @click="detailItem(scope.$index,scope.row)">详情
                            </el-button>
                            <template v-if="scope.row.status==2">
                                <el-button type="primary" v-if="p.updateSupplier" size="small"
                                           @click="editItem(scope.$index,scope.row)">编辑
                                </el-button>
                            </template>
                           <template v-else>
                               <el-button type="primary" disabled v-if="p.updateSupplier" size="small"
                                          @click="editItem(scope.$index,scope.row)">编辑
                               </el-button>
                           </template>
                            <el-button type="danger" v-if="scope.row.status==1&&p.updateSupplierDeleteById" size="small"
                                       @click="updateStatusItem(scope.$index,scope.row.id,1)">停用
                            </el-button>
                            <el-button type="danger" v-if="scope.row.status==2&&p.updateSupplierDeleteById" size="small"
                                       @click="updateStatusItem(scope.$index,scope.row.id,2)">启用
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
    import * as api from '../../../api/MemberManage/SupplierManage/index';
    import utils from '../../../utils/index.js'
    import * as pApi from '../../../privilegeList/MemberManage/SupplierManage/index.js';
    import moment from 'moment';

    export default {
        components: {
            vBreadcrumb, icon, region
        },
        data() {
            return {
                // 权限控制
                p: {
                    addSupplier: false,
                    updateSupplier: false,
                    updateSupplierDeleteById: false,
                    findSupplierById: false
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
                    name: '',
                    mobile: '',
                },
                exportForm:{},
                selected: '',
                address: [],
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
            this.pControl();
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
                if (!this.p.updateSupplierDeleteById && !this.p.findSupplierById) {
                    this.isShowOperate = false;
                }
            },
            //获取列表
            getList(val) {
                let that = this;
                let data = that.form;
                data.page = val;
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
                data.url = pApi.querySupplierPageList;
                that.tableLoading = true;
                that.$axios
                    .post(api.querySupplierPageList, data)
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
            //详情
            detailItem(index, row) {
                localStorage.setItem('supplierDetail', row.id);
                this.$router.push({path: '/supplierDetail', query: {id: row.id}})
            },
            //编辑
            editItem(index, row){
                localStorage.setItem('supplierDetail', row.id);
                this.$router.push({path: '/editSupplier', query: {id: row.id}})
            },
            //关闭,开启
            updateStatusItem(index, id, num) {
                let that = this;
                that.id = id;
                if (num == 1) {
                    that.info = '是否确认停用？';
                    that.type = 2;
                    that.btnTxt = '确认停用'
                } else {
                    that.info = '是否确认启用？';
                    that.type = 1;
                    that.btnTxt = '确认启用'
                }
                that.tipsMask = true;
            },
            oprSure() {
                let that = this;
                let data = {
                    id: that.id
                };
                if (that.type == 1) {
                    data.status = 1;
                } else {
                    data.status = 2;
                }
                data.url = pApi.updateSupplierDeleteById;
                that.btnLoading = true;
                that.$axios
                    .post(api.updateSupplierDeleteById, data)
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
            //添加供应商
            addSupplier() {
               this.$router.push('/addSupplier')
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
    .supplier {
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
