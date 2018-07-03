<template>
    <div>
        <v-breadcrumb :nav="['经销商会员管理','会员管理','实名认证审核']"></v-breadcrumb>
        <el-card style="margin:10px 0 20px">
            <el-form ref="form" :inline="true" :model="form">
                <el-form-item prop="code" label="授权码" label-width="120">
                    <el-input style="width:200px" placeholder="请输入用户授权码" v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item prop="nickname" label="昵称" label-width="120">
                    <el-input style="width:200px" placeholder="请输入用户昵称" v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item prop="idNumber" label="证件号" label-width="120">
                    <el-input style="width:200px" placeholder="请输入用户证件号" v-model="form.idNumber"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList(1)">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="table-block">
            <template>
                <el-table  :height="height" :data="tableData" border style="width: 100%">
                    <el-table-column  label="编号" type="index" align="center"></el-table-column>
                    <el-table-column  label="用户昵称" prop="nickname" align="center"></el-table-column>
                    <!--<el-table-column  label="会员编号" prop="" align="center"></el-table-column>-->
                    <el-table-column  label="真实姓名" prop="realname" align="center"></el-table-column>
                    <el-table-column  label="证件号" prop="idcardNo" align="center"></el-table-column>
                    <el-table-column  label="状态" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status==0">待审核</template>
                            <template v-if="scope.row.status==1">已通过</template>
                            <template v-if="scope.row.status==2">未通过</template>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" v-if="p.findDealerRealnameInfo_1" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" size="small" @click="goPage(scope.row.id)">详情信息</el-button>
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
    </div>
</template>


<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import { getUserId, myMixinTable } from '../../../JS/commom.js';
    import * as api from '../../../api/api.js';
    import * as pApi from '../../../privilegeList/index.js';
    import utils from '../../../utils/index.js'
    export default {
        components: {
            vBreadcrumb
        },
        mixins: [getUserId, myMixinTable],
        data () {
            return {
                p:{
                    findDealerRealnameInfo_1:false
                },
               form:{
                   code:'',
                   nickname:'',
                   idNumber:''
               },
                page:{
                    currentPage:1,
                    totalPage:0
                },

                id:'',
                height:'',
                tableData:[],
            }
        },
        activated() {
            this.getList(this.page.currentPage);
            this.pControl();
        },
        created(){
            this.getTbaleHeight();
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
            },
            // 获取数据
            getList(val) {
                let that = this;
                let data = {
                    page: val,
                    code:that.form.code,
                    nickname:that.form.nickname,
                    idNumber:that.form.idNumber,
                    url:pApi.queryDealerRealnamePageList
                };
                that.tableLoading = true;
                that.$axios
                    .post(api.queryDealerRealnamePageList, data)
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

            //跳到详情页面
            goPage(id){
                sessionStorage.setItem('memberId',id);
                this.$router.push({path:'/realNameInfo',query:{'memberId':id}});
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.getList(this.page.currentPage)
            },
        }
    }
</script>

<style>

</style>
