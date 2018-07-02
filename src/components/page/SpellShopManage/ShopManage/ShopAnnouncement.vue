<template>
  <div class="shop-announcement">
    <v-breadcrumb :nav='nav'></v-breadcrumb>
    <el-card :body-style="{ padding: '20px 60px' }">
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="编号" align="center"></el-table-column>
          <el-table-column prop="content" label="内容" align="center"></el-table-column>
          <el-table-column prop="id" label="购买时间" align="center"></el-table-column>
          <el-table-column prop="id" label="发布人" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button @click="editAnnoun(scope.row)" type="primary">编辑</el-button>
                <el-button @click="delItem(scope.row)" type="danger">删除</el-button>
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
    <el-dialog title="店铺公告修改" :visible.sync="isShowEdit" width="30%">
        <el-input type="textarea" :rows="10" v-model="annContent" placeholder=""></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmEdit">修 改</el-button>
            <el-button @click="isShowEdit = false">取 消</el-button>
        </span>
    </el-dialog>
    <delete-toast :id='delId' :url='delUrl' :uri='delUri' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import deleteToast from "@/components/common/DeleteToast";
export default {
  components: { vBreadcrumb, deleteToast},

  data() {
    return {
      nav: ["拼店店铺管理", "店铺公告管理"],
      isShowEdit:false,
      isShowDelToast:false,
      tableData: [
        {
          id: 0,
          content:
            "一款有专利保护的功能性私护内裤，采用纳米纤维材质，直接把银离子纤维编织进布料里，同时还具备红外理疗功效，有效地杀菌抑菌，防止妇科病滋生。著名影视演员黄小蕾在北京签约代言香港爱耐丝国际股份有限公司旗下朵女郎品牌系列成为该品牌的形象代言人，这也是黄小蕾首次成为内衣品牌代言。"
        }
      ],
      page: {
        currentPage: 1,
        totalPage: 0
      },
      annContent:'',
      delId: 0,
      delUrl: "http://api",
      delUri: "",
    };
  },

  activated(){
      this.getList()
  },

  methods: {
    //  获取数据
    getList(){},
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.submitForm(val);
    },
    // 编辑公告
    editAnnoun(row){
        this.annContent = ''
        this.isShowEdit = true;
    },
    confirmEdit(){
        if(this.annContent == ''){
            this.$message.warning('请输入公告内容');
            return;
        }
        this.isShowEdit = false;
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
.shop-announcement {
    .el-dialog{
        border-radius: 10px;
        .el-dialog__header{
            border-bottom: 1px solid #dcdcdc;
            .el-dialog__title{
                color: #ff6868;
            }
        }
    }
  .block {
    margin: 10px 0;
  }
}
</style>