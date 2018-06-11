<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理','实名制认知审核']"></v-breadcrumb>
        <el-card style="margin:10px 0 20px">
            <el-form ref="form" :inline="true">
                <el-form-item v-for="(list,index) in fromItemLists" :label="list.label" label-width="120">
                    <el-input style="width:200px" :placeholder="list.holder"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button >重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="table-block">
            <template>
                <el-table  :height="height" border style="width: 100%">
                    <el-table-column  label="编号" align="center"></el-table-column>
                    <el-table-column  label="用户昵称" align="center"></el-table-column>
                    <el-table-column  label="会员编号" align="center"></el-table-column>
                    <el-table-column  label="真实姓名" align="center"></el-table-column>
                    <el-table-column  label="证件号" align="center"></el-table-column>
                    <el-table-column  label="状态" align="center"></el-table-column>
                    <el-table-column  label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" size="small" @click="goPage()">详情信息</el-button>
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

    export default {
        components: {
            vBreadcrumb
        },
        mixins: [getUserId, myMixinTable],
        data () {
            return {
                fromItemLists:[
                    {label:'用户ID',holder:'请输入用户ID'},
                    {label:'授权码',holder:'请输入用户授权码'},
                    {label:'昵称',holder:'请输入用户昵称'},
                    {label:'证件号',holder:'请输入用户证件号'}
                ],
                page:{
                    currentPage:1,
                    totalPage:20
                },
                id:'',
                height:'',
                tableData:[],
            }
        },
        activated() {
            this.getUserId()
        },
        created(){
            this.getTbaleHeight()
        },
        methods: {
            getList(val){
                console.log(val)
            },
            goPage(){

            }
        }
    }
</script>

<style>

</style>
