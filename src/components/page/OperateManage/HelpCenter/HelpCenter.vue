<template>
  <div class="help-center">
    <v-breadcrumb :nav="nav"></v-breadcrumb>
    <el-card :body-style="{ padding: '30px 60px' }">
      <el-button type="primary" @click="addQuestionCate">添加问题类目</el-button>
      <el-table :data="tableData" border style='margin-top:20px' :height="height">
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="name" label="问题类目" align="center"></el-table-column>
        <el-table-column prop="name" label="问题数量" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="questionList(scope.row)">问题列表</el-button>
            <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
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
      <el-dialog title="添加问题类目" :visible.sync="isShowAddQues" width="30%">
        <span>问题类型</span>
        <el-input v-model="questionType" class="input-sty" placeholder="请输入问题类型"></el-input>
        <span slot="footer">
          <el-button type="primary" :loading="addQuesTypeBtn" @click="confirmAddQuesType">确 定</el-button>
          <el-button @click="isShowAddQues = false">取 消</el-button>
        </span>
      </el-dialog>
      <delete-toast :id='delId' :url='delUrl' :uri='delUri' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
    </el-card>
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import deleteToast from "@/components/common/DeleteToast";
export default {
  components: { vBreadcrumb,deleteToast },

  data() {
    return {
      nav: ["运营管理", "帮助中心管理"],
      isShowAddQues:false,
      addQuesTypeBtn:false,
      tableData: [{id:'1',name:'查看物流'}],
      height:'100vh',
      page: {
        currentPage: 1,
        totalPage: 0
      },
      questionType:'',
      delId:'',
      delUrl:'',
      delUri:'',
      isShowDelToast:false
    };
  },
  activated(){
    this.height = window.screen.availHeight-400;
    this.getList();
  },
  methods: {
    // 获取数据
    getList(){

    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getList(val);
    },
    // 添加问题类目
    addQuestionCate(){
      this.isShowAddQues = true;
    },
    confirmAddQuesType(){
      let that = this;
      this.addQuesTypeBtn = true;
      setTimeout(function () {  
        that.addQuesTypeBtn = false;
      },3000)
    },
    // 问题列表
    questionList(row){
      sessionStorage.setItem('questionTypeId',row.id);
      this.$router.push({name:'questionList',query:{'questionTypeId':row.id}});
    },
    // 删除用户
    deleteUser(row){
      this.delId = row.id;
      this.delUrl = '';
      this.delUri = '';
      this.isShowDelToast = true;
    },
    deleteToast(msg) {
      this.isShowDelToast = msg;
      this.getList(this.page.currentPage);
    },
  }
};
</script>
<style lang='less'>
.help-center {
  .input-sty{
    width: 210px;
  }
  .block {
    float: right;
    margin: 10px 0 10px 0;
  }
  .el-dialog{
    border-radius:10px;
    .el-dialog__header{
      border-bottom: 1px solid #dfdfdf;
      .el-dialog__title{
        color: #ff4e4e;
      }
    }
  }
}
</style>