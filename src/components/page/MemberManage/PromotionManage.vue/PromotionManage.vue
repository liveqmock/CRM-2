<template>
  <div class="promotion-manage">
    <el-card style="minHeight:60vh">
      <div class="wrap">
        <div>
          <p class="title">基础设置</p>
          <div class="small-wrap">
            <p class="small-title">设置升级经验值</p>
            <div class="small-content">升级经验值<el-input class="inp"></el-input></div>
            <div class="small-content">升级经验值<el-input class="inp"></el-input></div>
          </div>
          <div class="small-wrap">
            <p class="small-title">设置升级经验值</p>
            <div class="small-content">升级经验值<el-input class="inp"></el-input></div>
            <div class="small-content">升级经验值<el-input class="inp"></el-input></div>
          </div>
          <el-button type="success">设置升级经验值</el-button>
          <el-button type="success">设置必要条件</el-button>
        </div>
        <div>
          <p class="title">邀请推荐维度</p>
          <el-button type="success">设置直接邀请条件</el-button>
          <el-button type="success">设置间接邀请条件</el-button>
          <el-button type="success">设置个人活跃条件</el-button>
          <el-button type="success">设置团队活跃条件</el-button>
        </div>
        <div>
          <p class="title">交易额维度</p>
          <el-button type="success">设置个人交易额条件</el-button>
          <el-button type="success">设置直接交易条件</el-button>
          <el-button type="success">设置间接交易条件</el-button>
          <el-button type="success">设置连续交易条件</el-button>
          <el-button type="success">设置连续交易额频次条件</el-button>
          <el-button type="success">设置一次性交易条件</el-button>
        </div>
        <div>
          <p class="title">充值</p>
          <el-button type="success">代币充值</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
    };
  },

  methods: {}
}

</script>
<style lang='less' scoped>
.promotion-manage{
  .wrap{
    margin: 0px 75px;
    overflow: hidden;
    color: #666;
    // background-color: skyblue;
    .title{
      margin:30px 0 20px 0;
    }
    button {
      background-color: #11a95d;
      border-color:#11a95d;
    }
    .small-wrap{
      // background-color: skyblue;
      margin: 0 0 20px 10px;
      .small-title{
        font-size: 14px;
        margin:0 0 20px 0px;
      }
      .inp{
        width: 180px;
        margin:0 5px 0 5px;
      }
      .small-content{
          display: inline-block;
          margin: 0 10px 0 10px;
      }
    }
  }
}
</style>