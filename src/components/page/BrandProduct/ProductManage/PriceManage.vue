<template>
  <div>
    <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 45px' }">
        <el-table :data="tableData" border>
          <template v-if="tableData.length != 0">
            <el-table-column v-for="(v,k) in Object.keys(tableData[0])" v-if="k<oldtableLength" :key="k" :prop="v" :label="v" align="center"></el-table-column>
          </template>
          <el-table-column label="结算价" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.settlePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="原价" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.oldPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="V1价" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.v1Price"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="V2价" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.v2Price"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="V3价" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.v3Price"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="V4价" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.v4Price"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="最低支付价" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.lowPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="saveMsg(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px">
            <el-button type="primary">确认提交</el-button>
            <el-button>取消</el-button>
        </div>
      </el-card>
      
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import * as api from "@/api/BrandProduct/ProductMange/index.js";
export default {
  components: {
    vBreadcrumb
  },

  data() {
    return {
      nav:['品牌产品管理','产品管理','价格管理'],
      oldtableLength:0,
      productId:'',
      tableData: [
        { color: "红色", guige: "128GB", address: "中国" },
        { color: "红色", guige: "256GB", address: "中国" },
        { color: "红色", guige: "64GB", address: "中国" },
        { color: "红色", guige: "32GB", address: "中国" },
        { color: "金色", guige: "128GB", address: "中国" },
        { color: "金色", guige: "256GB", address: "中国" },
        { color: "金色", guige: "64GB", address: "中国" },
        { color: "金色", guige: "32GB", address: "中国" }
      ]
    };
  },

  activated(){
    this.productId = this.$route.query.priceManageId || sessionStorage.getItem('priceManage');
    this.getProductInfo();
    this.ambData();
  },

  methods: {
    // 获取产品信息
    getProductInfo(){
      this.$axios.post(api.queryProductPriceSaleSpecList,{productId:this.productId})
      .then((res) => {
        res.data.data.forEach((v,k)=>{
          console.log(v)
        })
      }).catch((err) => {
        
      });
    },
    // 组装表格数据
    ambData(){
      this.oldtableLength = this.tableData.length == 0?0:Object.keys(this.tableData[0]).length;
    },
    // 保存表单信息
    saveMsg(row){
      console.log(row)
    }
  }
};
</script>
<style lang='less' scoped>
</style>