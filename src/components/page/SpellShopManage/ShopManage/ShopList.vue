<template>
  <div class="shop-list">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 40px' }">
        <el-form :model="form" inline label-width="100px">
          <el-form-item prop="name" label="店铺名称">
              <el-input v-model="form.name" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item prop="id" label="店铺ID">
              <el-input v-model="form.id" placeholder="请输入店铺ID"></el-input>
          </el-form-item>
          <el-form-item prop="num" label="分红次数">
              <el-input v-model="form.num" placeholder="请输入分红次数"></el-input>
          </el-form-item>
          <el-form-item prop="shopLevel" label="店铺等级">
            <el-select v-model="form.shopLevel" placeholder="请选择店铺等级">
                <el-option
                v-for="item in shopLevelArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="beginTime" label="创建时间">
            <el-date-picker v-model="form.beginTime" type="datetime" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item prop="endTime" label="-" label-width="17px">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item prop="tradMinNum" label="交易额">
              <el-input v-model="form.tradMinNum" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item prop="tradMaxNum" label="-" label-width="17px">
              <el-input v-model="form.tradMaxNum" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="submitForm(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card :body-style="{ padding: '20px 40px' }" style='margin-top:20px'>
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="编号" align="center"></el-table-column>
          <el-table-column prop="id" label="店铺名称" align="center"></el-table-column>
          <el-table-column prop="id" label="店铺ID" align="center"></el-table-column>
          <el-table-column prop="id" label="店铺等级" align="center"></el-table-column>
          <el-table-column prop="id" label="店长" align="center"></el-table-column>
          <el-table-column prop="id" label="成员数" align="center"></el-table-column>
          <el-table-column prop="id" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="id" label="交易总额" align="center"></el-table-column>
          <el-table-column prop="id" label="分红次数" align="center"></el-table-column>
          <el-table-column prop="id" label="现交易额" align="center"></el-table-column>
          <el-table-column prop="id" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                  <el-button type="primary">查看详情</el-button>
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
      nav: ["拼店店铺管理", "店铺管理"],
      shopLevelArr: [{ label: "一星", value: 1 }],
      tableData: [{ id: 1 }],
      page: {
        currentPage: 1,
        totalPage: 0
      },
      form: {
        name: "",
        id: "",
        num: "",
        shopLevel: "",
        beginTime: "",
        endTime: "",
        tradMinNum: "",
        tradMaxNum: ""
      }
    };
  },

  methods: {
    //  提交表单
    submitForm(val) {},
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.submitForm(val);
    },
  }
};
</script>
<style lang='less' scoped>
.shop-list {
    .block{
        margin: 10px 0;
    }
}
</style>