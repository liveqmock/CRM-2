<template>
  <div>
      <el-card :body-style="{ padding: '20px' }">
          <h2>问题标题：什么时候发货？</h2>
          <h2 style="margin-top:20px">问题内容：</h2>
          <p>问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容 </p>
      </el-card>
      
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
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
</style>