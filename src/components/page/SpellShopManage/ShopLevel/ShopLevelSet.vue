<template>
  <div class="shop-level-set">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 40px' }">
          <el-button @click="addShopLevel" style="margin-bottom:20px" type="primary">添加店铺等级</el-button>
          <el-table border :data="tableData">
            <el-table-column prop='id' label="编号" align="center"></el-table-column>
            <el-table-column prop='id' label="名称" align="center"></el-table-column>
            <el-table-column prop='id' label="层级" align="center"></el-table-column>
            <el-table-column prop='id' label="人数限制" align="center"></el-table-column>
            <el-table-column prop='id' label="拼店金额" align="center"></el-table-column>
            <el-table-column prop='id' label="备注说明" align="center"></el-table-column>
            <el-table-column prop='id' label="自动晋级" align="center"></el-table-column>
            <el-table-column label="操作" align="center" minWidth="350">
                <template slot-scope="scope">
                    <el-button @click="shopPromotion(scope.row)" type="primary">晋级设置</el-button>
                    <el-button @click="shopDemotion(scope.row)" type="success">降级设置</el-button>
                    <el-button @click="editShopLevel(scope.row)" type="warning">编辑</el-button>
                    <el-button @click="delItem(scope.row.id)" type="danger">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="block">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="page.totalPage">
                </el-pagination>
            </div>
      </el-card>
      <el-dialog :title="diaTitle" :visible.sync="isShowAddShopLevel" width="25%">
        <el-form :model="form" label-width="100px">
            <el-form-item prop="levelName" label="等级名称">
                <el-input v-model="form.levelName" placeholder="请输入等级名称"></el-input>
            </el-form-item>
            <el-form-item prop="level" label="层级">
                <el-input v-model="form.level" placeholder="6级（自动获取、可修改、但是不可重复）"></el-input>
            </el-form-item>
            <el-form-item prop="autoLevel" label="自动晋级">
                <el-radio v-model="form.autoLevel" label="1">是</el-radio>
                <el-radio v-model="form.autoLevel" label="2">否</el-radio>
            </el-form-item>
            <el-form-item prop="num" label="店铺人数设置">
                <el-input v-model="form.num" placeholder="请输入限制人数"></el-input>
            </el-form-item>
            <el-form-item prop="money" label="拼店金额设置">
                <el-input v-model="form.money" placeholder="请输入金额"></el-input>
            </el-form-item>
            <el-form-item prop="tip" label="备注说明">
                <el-input v-model="form.tip" placeholder="请输入说明"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button type="primary" @click="confirmAddShopLevel">确 定</el-button>
            <el-button @click="isShowAddShopLevel = false">取 消</el-button>
        </span>
      </el-dialog>
      <delete-toast :id='delId' :url='delUrl' :uri='delUri' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import utils from "@/utils/index.js";
import deleteToast from "@/components/common/DeleteToast";
export default {
  components: { vBreadcrumb, deleteToast },

  data() {
    return {
      nav: ["拼店店铺管理", "店铺等级设置"],
      diaTitle:'',
      isShowAddShopLevel: false,
      isShowDelToast:false,
      tableData: [{ id: 1 }],
      delId: 0,
      delUrl: "http://api",
      delUri: "",
      form: {
        levelName: "",
        level: "",
        autoLevel: "1",
        num: "",
        money: "",
        tip: ""
      },
      page: {
        currentPage: 1,
        totalPage: 0
      }
    };
  },

  methods: {
    // 获取数据
    getList(val){},
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.submitForm(val);
    },
    // 添加店铺等级
    addShopLevel() {
        this.diaTitle = '添加店铺等级'
      utils.cleanFormData(this.form);
      this.isShowAddShopLevel = true;
    },
    // 编辑店铺
    editShopLevel(row){
        this.diaTitle = '编辑店铺等级'
        this.isShowAddShopLevel = true;
        this.$axios.post()
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        });
    },
    confirmAddShopLevel() {
      console.log(this.form);
      this.isShowAddShopLevel = false;
    },
    // 店铺晋级
    shopPromotion(row) {
      sessionStorage.setItem("promotionShopId", row.id);
      this.$router.push({
        name: "promotionShop",
        query: { promotionShopId: row.id }
      });
    },
    // 店铺降级
    shopDemotion(row) {
      sessionStorage.setItem("demotionShopId", row.id);
      this.$router.push({
        name: "demotionShop",
        query: { demotionShopId: row.id }
      });
    },
    //删除
    delItem(id) {
        this.delId = id;
        this.delUrl = '/url';
        this.delUri = '/url';
        this.isShowDelToast = true;
    },
    // 删除弹窗
    deleteToast(msg) {
        this.isShowDelToast = msg;
        this.getList(this.page.currentPage);
    },
  }
};
</script>
<style lang='less'>
.shop-level-set {
  .el-dialog {
    border-radius: 10px;
    .el-dialog__header {
      border-bottom: 1px solid #ddd;
      .el-dialog__title {
        color: #ff6868;
      }
    }
  }
  .block {
    margin: 20px;
  }
}
</style>