<template>
  <div class="question-list">
    <v-breadcrumb :nav="nav"></v-breadcrumb>
    <el-card :body-style="{ padding: '30px 60px' }">
      <el-button type="primary" @click="addQuestion">添加问题</el-button>
      <el-table :data="tableData" border style='margin-top:20px' :height="height">
        <el-table-column prop="name" label="编号" align="center"></el-table-column>
        <el-table-column prop="name" label="问题标题" align="center"></el-table-column>
        <el-table-column prop="name" label="反馈有用" align="center"></el-table-column>
        <el-table-column prop="name" label="反馈没用" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click='showQuestionInfo(scope.row)' type="primary">查看详情</el-button>
            <el-button type="warning">编辑</el-button>
            <el-button type="danger">删除</el-button>
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
      nav: ["运营管理", "帮助中心管理"],
      questionTypeId:'',
      tableData: [{id:'100',name:'什么时候发货'}],
      height: "100vh",
      page: {
        currentPage: 1,
        totalPage: 0
      }
    };
  },

  activated() {
    this.height = window.screen.availHeight - 400;
    this.questionTypeId = this.$route.query.questionTypeId || sessionStorage.getItem('questionTypeId');
    this.getList();
    console.log(this.questionTypeId)
  },

  methods: {
    // 获取数据
    getList() {},
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getList(val);
    },
    // 添加问题
    addQuestion(){
        this.$router.push({name:'addQuestion'});
    },
    // 查看问题详情
    showQuestionInfo(row){
      sessionStorage.setItem('questionInfo',row.id);
      this.$router.push({name:'questionInfo',query:{'questionInfo':row.id}});
    }
  }
};
</script>
<style lang='less' scoped>
.question-list {
  .input-sty {
    width: 210px;
  }
  .block {
    float: right;
    margin: 10px 0 10px 0;
  }
}
</style>