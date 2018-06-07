<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <p class="title">{{name}}的代币账户明细</p>
            <el-table border :data="tableData">
                <el-table-column prop="date" label="流水号" align="center" min-width="180"></el-table-column>
                <el-table-column prop="date" label="状态" align="center" width="200"></el-table-column>
                <el-table-column prop="date" label="金额（元）" align="center" width="200"></el-table-column>
                <el-table-column prop="date" label="类型" align="center" width="200"></el-table-column>
                <el-table-column prop="date" label="时间" align="center" min-width="180"></el-table-column>
            </el-table>
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
        </el-card>
    </div>
</template>
<script>
import breadcrumb from '../../../common/Breadcrumb'
import * as api from '../../../../api/api.js';
import * as pApi from '../../../../privilegeList/index.js';
export default {
    components: {
        breadcrumb
    },
    data () {
        return {
            name:'杨二盟',
            nav: ["会员管理", "经销商会员管理", "会员详情","TA的账户","的代币账户详情"],
           tableData:[{date:123}],
           page: {
                currentPage: 1,
                totalPage: 1
            },
        }
    },
    activated(){
        this.nav[this.nav.length-1] = this.name+"的代币账户详情";
        this.getList(this.page.currentPage);
    },
    methods:{
        // 获取数据
        getList(val){

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
    }
}
</script>
<style scoped>
.title{
    margin-bottom: 20px;
}
.block{
    margin: 10px 0;
    float: right;
}
</style>


