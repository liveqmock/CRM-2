<template>
  <div class="member-manage">
    <v-breadcrumb :nav='nav'></v-breadcrumb>
    <el-card :body-style="{ padding: '20px 60px' }">
        <div class="table-box">
            <div class="left">
                <el-table border :data="tableData1">
                  <el-table-column prop="id" label="用户名" align="center"></el-table-column>
                  <el-table-column prop="id" label="贡献度（本次）" align="center"></el-table-column>
                  <el-table-column prop="id" label="贡献度（总体）" align="center"></el-table-column>
                  <el-table-column prop="id" label="店铺累计所得分红金" align="center"></el-table-column>
                </el-table>
            </div>
            <div class="right">
                <el-table border :data="tableData2">
                  <el-table-column prop="id" label="用户名" align="center"></el-table-column>
                  <el-table-column prop="id" label="贡献度（本次）" align="center"></el-table-column>
                  <el-table-column prop="id" label="贡献度（总体）" align="center"></el-table-column>
                  <el-table-column prop="id" label="店铺累计所得分红金" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
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
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: { vBreadcrumb },

  data() {
    return {
      nav: ["拼店店铺管理", "店铺管理", "店铺详情", "成员贡献值"],
      tableData1: [{ id: 1 }],
      tableData2: [{ id: 1 }],
      page: {
        currentPage: 1,
        totalPage: 0
      }
    };
  },

  methods: {
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.submitForm(val);
    }
  }
};
</script>
<style lang='less' scoped>
.member-manage {
  .table-box {
    overflow: hidden;
    .left {
      float: left;
      width: 48%;
    }
    .right {
      float: right;
      width: 48%;
    }
  }
  .block{
      margin: 10px 0px;
  }
}
</style>