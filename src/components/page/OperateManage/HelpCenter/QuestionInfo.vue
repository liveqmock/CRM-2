<template>
  <div class="question-info">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px' }">
          <h2>问题标题：什么时候发货？</h2>
          <h2 style="margin-top:20px">问题内容：</h2>
          <p class="question-content">问题内容问题内容问题内容问题问题内容问题内容问题内问题内容问题内容问题内问题内容问题内容问题内
              问题内容问题内容问题内问题内容问题内容问题内问题内容问题内容问题内
              问题内容问题内容问题内问题内容问题内容问题内问题内容问题内容问题内内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容 </p>
      </el-card>
      
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: {vBreadcrumb},

  data () {
    return {
        nav:['帮助中心管理','问题管理','产看问题'],
        questionId:''
    };
  },

  activated(){
      this.questionId = this.$route.query.questionInfo || sessionStorage.getItem('questionInfo');
      console.log(this.questionId);
  },

  methods: {}
}

</script>
<style lang='less' scoped>
.question-info{
    .question-content{
        padding-left: 105px;
        box-sizing: border-box;
    }
}
</style>