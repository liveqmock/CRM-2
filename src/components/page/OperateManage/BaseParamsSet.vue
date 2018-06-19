<template>
  <div class="base-params">
      <v-breadcrumb :nav="nav"></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 40px',minHeight:'60vh' }">
          <div class="currency-title">货币比例设置</div>
          <div class="currency-wrap">
              <el-input v-model="firstPoint" class="input-sty"></el-input><span class="point">点</span><span class="point-mer">=</span>
              <el-input v-model="firstToken" class="input-sty"></el-input><span class="point">枚（代币）</span><br />
              <el-input v-model="secPoint" class="input-sty"></el-input><span class="point">点</span><span class="point-mer">=</span>
              <el-input v-model="secMoney" class="input-sty"></el-input><span class="point">元（金额）</span><br />
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
import * as api from "@/api/OperateManage/currencyRatioo.js"
export default {
  components: {vBreadcrumb},

  data () {
    return {
        nav:['运营管理','货币比例设置'],
        btnLoading:false,
        pointToToken:'',
        pointToMoney:'',
        tokenToMoney:'',
        scoreTomoney:'',
        firstPoint:'',
        firstToken:'',
        secPoint:'',
        secMoney:'',
        thirdToken:'',
        thirMoney:'',
        fourScore:'',
        fourMoney:''
    };
  },

  methods: {
      submitForm(){
          this.pointToToken = this.handleNum(this.firstPoint,this.firstToken);
          this.pointToMoney = this.handleNum(this.secPoint,this.secMoney);
          this.tokenToMoney = this.handleNum(this.thirdToken,this.thirMoney);
          this.scoreTomoney = this.handleNum(this.fourScore,this.fourMoney);
          let data = {};
          data.bonusPointToTokenCoin = this.pointToToken;
          data.bonusPointToBalancee = this.pointToMoney;
          data.tokenCoinToBalance = this.tokenToMoney;
          data.userScoreToBalance = this.scoreTomoney;
          data.id = '1';
          this.btnLoading = true;
          this.$axios.post(api.updateSysConfigByCurrency,data)
          .then((res) => {
            this.$message.success(res.data.data);
            this.btnLoading = false;
          }).catch((err) => {
            console.log(err)
          });
      },
      handleNum(a,b){
          return Math.floor(b/a*100)/100
      }
  }
}

</script>
<style lang='less' scoped>
.base-params{
    .currency-title{
        width: 100%;
        height: 60px;
        background-color: #f7f7f7;
        line-height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .currency-wrap{
        padding: 0 20px;
        box-sizing: border-box;
        .currency-small-title{
            display: inline-block;
            margin: 20px 0;
            box-sizing: border-box;
            font-size: 14px;
        }
        .input-sty{
            width: 130px;
            margin-bottom: 20px;
        }
        .point{
            font-size: 14px;
            padding:0 15px 0 5px; 
        }
        .point-mer{
            margin-right: 10px;
        }
        .btn-group{
            margin-top: 40px;
        }
    }
}
</style>