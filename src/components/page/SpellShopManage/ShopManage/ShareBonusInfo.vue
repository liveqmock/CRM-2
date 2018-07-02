<template>
  <div class="share-bonus-info">
    <v-breadcrumb :nav='nav'></v-breadcrumb>
    <el-card :body-style="{ padding: '20px 60px' }">
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="编号" align="center"></el-table-column>
          <el-table-column prop="id" label="时间" align="center"></el-table-column>
          <el-table-column prop="id" label="分红总额" align="center"></el-table-column>
          <el-table-column prop="id" label="店长分红" align="center"></el-table-column>
          <el-table-column prop="id" label="店员分红金" align="center"></el-table-column>
          <el-table-column prop="id" label="参与分红人数" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="ShareBonusComposition" type="primary">分红组成</el-button>
                <el-button @click="ShareBonusMemberVal" type="warning">成员贡献值</el-button>
              </template>
          </el-table-column>
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
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: { vBreadcrumb },

  data() {
    return {
      nav: ["拼店店铺管理", "店铺管理", "分红详情"],
      tableData: [{ id: 1 }],
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
    },
    // 分红组成
    ShareBonusComposition(row){
        this.$router.push({name:'shareBonusCom'})
    },
    // 成员贡献值
    ShareBonusMemberVal(row){
        this.$router.push({name:'shopMemberManage'})
    }
  }
};
</script>
<style lang='less' scoped>
.share-bonus-info {
  .block {
    margin: 10px 0px;
  }
}
</style>