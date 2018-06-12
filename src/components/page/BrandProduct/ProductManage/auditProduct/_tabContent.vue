<template>
  <div class="tab-content">
      <el-button @click="releaseProduct" class="add-product" type="primary">添加产品</el-button>
      <div class="search-pane">
          <el-form :model="form" ref='form' inline label-width="100px">
            <el-form-item prop="name" label="产品名称">
                <el-input v-model="form.name" placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item prop="id" label="产品ID号">
                <el-input v-model="form.id" placeholder="请输入产品ID"></el-input>
            </el-form-item>
            <el-form-item prop="code" label="条形码">
                <el-input v-model="form.code" placeholder="请输入条形码"></el-input>
            </el-form-item>
            <el-form-item prop="item" label="产品类目">
                <el-select style="width:200px" v-model="form.item">
                  <el-option v-for="(v,k) in itemList" :key="k" :label="v.label" :value="v.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="sellMin" label="总销量">
                <el-input style="width:95px" v-model="form.sellMin"></el-input> -
                <el-input style="width:95px" v-model="form.sellMax"></el-input>
            </el-form-item>
            <el-form-item prop="priceMin" label="价格">
                <el-input style="width:95px" v-model="form.priceMin">
                    <template slot="prepend">￥</template>
                </el-input> -
                <el-input style="width:95px" v-model="form.priceMax">
                    <template slot="prepend">￥</template>
                </el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary">搜索</el-button>
                <el-button @click="resetForm('form')" >重置</el-button>
            </el-form-item>
          </el-form>
      </div>
      <el-table border :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="name" label="产品名称" align="center" min-width="300"></el-table-column>
        <el-table-column prop="" label="产品类目" align="center" min-width="120"></el-table-column>
        <el-table-column label="产品售价" align="center" min-width="50">
            <template slot-scope="scope">
                {{scope.row.price | formatPrice}}
            </template>
        </el-table-column>
        <el-table-column prop="" label="库存" align="center" min-width="50"></el-table-column>
        <el-table-column prop="" label="销售" align="center" min-width="50"></el-table-column>
        <el-table-column prop="" label="发布时间/发布人" align="center" min-width="120"></el-table-column>
        <el-table-column prop="" label="状态" align="center" min-width="50"></el-table-column>
        <el-table-column label="操作" align="center" min-width="220">
            <template slot-scope="scope">
                <div class="operate">
                    <el-button @click="showSpeci(scope.row)" type="primary">查看规格</el-button>
                    <el-button @click="showPrice(scope.row)" type="primary">查看价格</el-button>
                    <el-button @click="showInventory(scope.row)" type="primary">查看库存</el-button>
                    <el-button @click="auditProduct(scope.row,1)" type="primary">通过审核</el-button>
                    <el-button @click="auditProduct(scope.row,0)" type="danger">驳回审核</el-button>
                    <el-button @click="productInfo(scope.row)" type="primary">产品详情</el-button>
                </div>
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
      <div class="operate-table">
          <el-button>删除</el-button>
          <el-button>下架</el-button>
      </div>
  </div>
</template>

<script>
export default {
  props: ["name"],
  components: {},

  created() {
    this.id = this.name;
  },

  data() {
    return {
      id: "",
      itemList: [{ label: "数码家电", value: "1" }],
      form: {
        name: "",
        id: "",
        code: "",
        item: "",
        sellMin: "",
        sellMax: "",
        priceMin: "",
        priceMax: ""
      },
      tableData: [
        {id:'1', name: "数码家电", price: 200 },
        {id:'2', name: "零食", price: 300 }
      ],
      multipleSelection:[],
      page: {
        currentPage: 1,
        totalPage: 1
      }
    };
  },

  methods: {
    //   重置表单
    resetForm(formName) {
      this.form.sellMax = "";
      this.form.priceMax = "";
      this.$refs[formName].resetFields();
    },
    // 全选
    handleSelectionChange(val) {
        let that = this;
        this.multipleSelection = [];
        val.forEach((v,k)=>{
            that.multipleSelection.push(v.id);
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
    // 发布产品
    releaseProduct(){
        this.$router.push({name:'releaseProduct'});
    },
    // 查看规格
    showSpeci(row){
        console.log(row);
    },
    // 查看价格
    showPrice(row){
        console.log(row);
    },
    // 查看库存
    showInventory(row){
        console.log(row);
    },      
    // 通过/不通过审核
    auditProduct(row,status){
        console.log(row);
    },
    // 产品详情
    productInfo(row){
        console.log(row);
        this.$router.push({name:'productInfo'})
    },
  },
  filters:{
      formatPrice(val){
          return `￥${val}`;
      }
  }
};
</script>
<style lang='less'>
.tab-content {
  .add-product {
    margin: 0 0 20px 0;
  }
  .search-pane {
    width: 100%;
    padding: 30px 0 0 0;
    margin-bottom: 20px;
    background-color: #f7f7f7;
    box-sizing: border-box;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 4px;
  }
  .operate {
    button {
      margin-right: 10px;
      margin-top: 5px;
    }
    button:nth-child(3) {
      margin-right: 0px;
    }
  }
  .operate-table{
      margin-top: 10px;
  }
  .block {
        float: right;
        margin-top: 10px
    }
}
</style>