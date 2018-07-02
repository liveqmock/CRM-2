<template>
  <div class="demotion-shop">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
    <el-card :body-style="{ padding: '20px 80px',minHeight:'60vh' }">
        <p class="small-title">基础设置</p>
        <el-button @click="showWeekTradNo = true" type="success">无交易额条件</el-button>
        <el-button @click="showMemberNoEnough = true" type="success">人数不足条件</el-button>
        <el-button @click="showWeekTradNum = true" type="success">周期交易频率</el-button>
        <el-button @click="showWeekTradMoney = true" type="success">周期交易额</el-button>
        <el-button @click="showNecessaryConf = true" type="success">平局活跃度</el-button>
    </el-card>
    <!-- 无交易额条件 -->
    <el-dialog title="每周交易额无成长" :visible.sync="showWeekTradNo" width="25%" open="cleanData">
        <p class="dialog-item">
            <span class="dialog-title">扣除经验值</span>
            <el-input class="dialog-inp" v-model="form.weekTradNoExp" placeholder="请输入数值"></el-input>分
        </p>
        <span slot="footer">
            <el-button type="primary" @click="showWeekTradNo = false">确 定</el-button>
            <el-button @click="showWeekTradNo = false">取 消</el-button>
        </span>
    </el-dialog>
    <!-- 人数不足条件 -->
    <el-dialog title="人数不足条件" :visible.sync="showMemberNoEnough" width="25%" open="cleanData">
        <p class="dialog-item">
            <span style="margin-left:30px">人数每减少1人，则扣除</span>
        </p>
        <p class="dialog-item">
            <el-input class="dialog-inp" style="margin-left:30px" v-model="form.memberReducExp" placeholder="请输入数值"></el-input>分
        </p>
        <span slot="footer">
            <el-button type="primary" @click="showMemberNoEnough = false">确 定</el-button>
            <el-button @click="showMemberNoEnough = false">取 消</el-button>
        </span>
    </el-dialog>
    <!-- 周期交易频率 -->
    <el-dialog title="每周交易频率" :visible.sync="showWeekTradNum" width="25%" open="cleanData">
        <p class="dialog-item">
            <span class="dialog-title">交易频率低于</span>
            <el-input class="dialog-inp" v-model="form.weekTradNum" placeholder="请输入数值"></el-input>次
        </p>
        <p class="dialog-item">
            <span class="dialog-title">扣除经验值</span>
            <el-input class="dialog-inp" v-model="form.weekTradExp" placeholder="请输入数值"></el-input>分
        </p>
        <span slot="footer">
            <el-button type="primary" @click="showWeekTradNum = false">确 定</el-button>
            <el-button @click="showWeekTradNum = false">取 消</el-button>
        </span>
    </el-dialog>
    <!-- 周期交易额 -->
    <el-dialog title="每周交易额" :visible.sync="showWeekTradMoney" width="25%" open="cleanData">
        <p class="dialog-item">
            <span class="dialog-title">交易额低于</span>
            <el-input class="dialog-inp" v-model="form.weekTradMoney" placeholder="请输入数值"></el-input>元
        </p>
        <p class="dialog-item">
            <span class="dialog-title">扣除经验值</span>
            <el-input class="dialog-inp" v-model="form.weekTradMoneyExp" placeholder="请输入数值"></el-input>分
        </p>
        <span slot="footer">
            <el-button type="primary" @click="showWeekTradMoney = false">确 定</el-button>
            <el-button @click="showWeekTradMoney = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import utils from "@/utils/index.js";
export default {
  components: { vBreadcrumb },

  data() {
    return {
      nav: ["拼店店铺管理", "店铺等级设置", "店铺降级设置"],
      showWeekTradNo:false,
      showMemberNoEnough: false,
      showWeekTradNum:false,
      showWeekTradMoney:false,
      form: {
        //  无交易额条件
        weekTradNoExp:"",
        // 人数不足条件
        memberReduce: "",
        memberReducExp:"",
        // 周期交易频率
        weekTradNum:"",
        weekTradExp:"",
        // 周期交易额
        weekTradMoney:"",
        weekTradMoneyExp:""
      },
      shopId: ""
    };
  },

  activated() {
    this.shopId =
      this.$route.query.demotionShopId ||
      sessionStorage.getItem("demotionShopId");
    console.log(this.shopId);
  },

  methods: {
    //  弹窗开启之前清除数据
    cleanData() {
      utils.cleanFormData(this.form);
    }
  }
};
</script>
<style lang='less'>
.demotion-shop {
  .el-dialog {
    border-radius: 10px;
    .el-dialog__header {
      padding-left: 50px;
      box-sizing: border-box;
      border-bottom: 1px solid #ddd;
      .el-dialog__title {
        color: #ff6868;
        font-weight: 700;
      }
    }
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0px;
  }
  .small-title {
    margin: 20px 0px;
  }
  .dialog-item {
    margin: 10px 0;
    .dialog-title {
        display: inline-block;
      width: 100px;
      margin: 0 10px 0 30px;
    }
    .dialog-inp {
        margin-right: 10px;
      width: 55%;
    }
  }
}
</style>