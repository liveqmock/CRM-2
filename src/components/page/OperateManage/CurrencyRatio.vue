<template>
  <div class="currency-ratio">
      <v-breadcrumb :nav="nav"></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 40px',minHeight:'60vh' }">
          <div class="currency-title">货币比例设置</div>
          <div class="currency-wrap">
              <span class="currency-small-title">分红点数等值设置</span><br/>
              <el-input v-model="bonusPointA" class="input-sty"></el-input><span class="point">点</span><span class="point-mer">=</span>
              <el-input v-model="bonusPointB" class="input-sty"></el-input><span class="point">枚（代币）</span><br />
              <el-input v-model="bonusPointC" class="input-sty"></el-input><span class="point">点</span><span class="point-mer">=</span>
              <el-input v-model="bonusPointD" class="input-sty"></el-input><span class="point">元（金额）</span><br />
              <span class="currency-small-title">代币等值设置</span><br/>
              <el-input v-model="tokenCoinA" class="input-sty"></el-input><span class="point">枚（代币）</span><span class="point-mer">=</span>
              <el-input v-model="tokenCoinB" class="input-sty"></el-input><span class="point">元（金额）</span><br />
              <span class="currency-small-title">积分使用等值设置</span><br/>
              <el-input v-model="userScoreA" class="input-sty"></el-input><span class="point">积分可抵扣</span>
              <el-input v-model="userScoreB" class="input-sty"></el-input><span class="point">元（金额）</span><br />
              <div class="btn-group">
                  <el-button :loading="btnLoading" type="primary" @click="submitForm">确认提交</el-button>
                  <el-button >取消</el-button>
              </div>
          </div>
      </el-card>
      
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import * as api from "@/api/OperateManage/currencyRatioo.js";
import * as pApi from "@/privilegeList/OperateManage/currencyRatioo.js";
export default {
  components: { vBreadcrumb },

  data() {
    return {
      nav: ["运营管理", "货币比例设置"],
      btnLoading: false,
      bonusPointA: "",
      bonusPointB: "",
      bonusPointC: "",
      bonusPointD: "",
      tokenCoinA: "",
      tokenCoinB: "",
      userScoreA: "",
      userScoreB: ""
    };
  },

  activated(){
    this.getInfo();
  },

  methods: {
    //   获取数据
    getInfo() {
      this.$axios
        .post(api.findSysConfig, {})
        .then(res => {
          console.log(res.data.data)
          this.bonusPointA = res.data.data.bonus_point_a;
          this.bonusPointB = res.data.data.bonus_point_b;
          this.bonusPointC = res.data.data.bonus_point_c;
          this.bonusPointD = res.data.data.bonus_point_d;
          this.tokenCoinA = res.data.data.token_coin_a;
          this.tokenCoinB = res.data.data.token_coin_b;
          this.userScoreA = res.data.data.user_score_a;
          this.userScoreB = res.data.data.user_score_b;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交表单
    submitForm() {
      let data = {};
      data.bonusPointA = this.bonusPointA;
      data.bonusPointB = this.bonusPointB;
      data.bonusPointC = this.bonusPointC;
      data.bonusPointD = this.bonusPointD;
      data.tokenCoinA = this.tokenCoinA;
      data.tokenCoinB = this.tokenCoinB;
      data.userScoreA = this.userScoreA;
      data.userScoreB = this.userScoreB;
      data.url = pApi.updateSysConfigByCurrency;
      this.btnLoading = true;
      this.$axios
        .post(api.updateSysConfigByCurrency, data)
        .then(res => {
          this.$message.success(res.data.data);
          this.btnLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang='less' scoped>
.currency-ratio {
  .currency-title {
    width: 100%;
    height: 60px;
    background-color: #f7f7f7;
    line-height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .currency-wrap {
    padding: 0 20px;
    box-sizing: border-box;
    .currency-small-title {
      display: inline-block;
      margin: 20px 0;
      box-sizing: border-box;
      font-size: 14px;
    }
    .input-sty {
      width: 130px;
      margin-bottom: 20px;
    }
    .point {
      font-size: 14px;
      padding: 0 15px 0 5px;
    }
    .point-mer {
      margin-right: 10px;
    }
    .btn-group {
      margin-top: 40px;
    }
  }
}
</style>