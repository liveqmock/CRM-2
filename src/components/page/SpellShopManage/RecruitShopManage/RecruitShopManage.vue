<template>
  <div class="recruit-shop-man">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 40px' }">
        <el-form :model="form" inline label-width="100px">
          <el-form-item prop="name" label="店铺名称">
              <el-input v-model="form.name" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item prop="beginTime" label="发起时间">
            <el-date-picker type="datetime" v-model="form.beginTime" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item prop="endTime" label="">
              <el-date-picker type="datetime" v-model="form.endTime" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click='submitForm'>搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card :body-style="{ padding: '20px 40px',}" style="margin-top:20px">
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="编号" align="center"></el-table-column>
          <el-table-column prop="id" label="店铺名称" align="center"></el-table-column>
          <el-table-column prop="id" label="店铺ID" align="center"></el-table-column>
          <el-table-column prop="id" label="店长" align="center"></el-table-column>
          <el-table-column prop="id" label="招募成员" align="center"></el-table-column>
          <el-table-column prop="id" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="id" label="是否开启推荐" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope"> 
              <el-button type="primary" @click='showInfo(scope.row)'>查看详情</el-button>
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
  components: {vBreadcrumb},

  data () {
    return {
        nav: ["拼店店铺管理", "招募店铺管理"],
        form:{
            name:'',
            beginTime:'',
            endTime:''
        },
        tableData:[{id:'1'}],
        page: {
            currentPage: 1,
            totalPage: 0
        }
    };
  },

  methods: {
    // 提交表单
    submitForm(){

    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.submitForm(val);
    },
    // 查看店铺详情
    showInfo(row){
      sessionStorage.setItem('recruitShopId',row.id);
      this.$router.push({name:'recruitShopInfo',query:{'recruitShopId':row.id}});
    }
  }
}

</script>
<style lang='less' scoped>
.recruit-shop-man{
    .block{
        margin: 10px 0px;
    }
}
</style>