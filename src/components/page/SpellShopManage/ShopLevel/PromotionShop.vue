<template>
  <div class="promotion-shop">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
    <el-card :body-style="{ padding: '20px 80px',minHeight:'60vh' }">
        <p class="small-title">基础设置</p>
        <el-button @click="showExperienceValue = true" type="success">设置升级经验值（默认值）</el-button>
        <el-button @click="showNecessaryConf = true" type="success">设置必要条件</el-button>
        <p class="small-title">交易纬度</p>
        <el-button @click="showShareBonus = true" type="success">分红奖励</el-button>
        <el-button @click="showTotalTrans = true" type="success">交易额达标奖励</el-button>
        <el-button @click="showShareBonus = true" type="success">连续交易额达标</el-button>
        <el-button @click="showShareBonus = true" type="success">连续交易频率达标</el-button>
        <el-button @click="showShareBonus = true" type="success">单笔订单交易额</el-button>
        <p class="small-title">成员纬度</p>
        <el-button type="success">人数达标奖励</el-button>
    </el-card>
    <!-- 设置升级经验值 -->
    <el-dialog title="所需经验值设置" :visible.sync="showExperienceValue" width="25%" open="cleanData">
        <p class="dialog-item">
            <span class="dialog-title">所需经验值设置</span>
            <el-input class="dialog-inp" v-model="form.experienceValue" placeholder="请输入数值"></el-input>
        </p>
        <span slot="footer">
            <el-button type="primary" @click="showExperienceValue = false">确 定</el-button>
            <el-button @click="showExperienceValue = false">取 消</el-button>
        </span>
    </el-dialog>
    <!-- 设置必要条件 -->
    <el-dialog title="设置必要条件" :visible.sync="showNecessaryConf" width="25%" open="cleanData">
        <div class="necessary-box">
            <p class="necessary-title">必要条件:</p>
            <div class="dialog-nec-item">
                <el-checkbox v-model="form.selectedMemberNum"><span class="dialog-nec-title">人员数</span></el-checkbox>
                <el-input class="dialog-nec-inp" v-model="form.memberNum" placeholder="请输入数值"></el-input>
            </div>
            <div class="dialog-nec-item">
                <el-checkbox v-model="form.selectedTotalTransactions"><span class="dialog-nec-title">交易总额达到</span></el-checkbox>
                <el-input class="dialog-nec-inp" v-model="form.totalTransactions" placeholder="请输入数值"></el-input>
            </div>
            <div class="dialog-nec-item">
                <el-checkbox v-model="form.selectedProfits"><span class="dialog-nec-title">利润贡献值</span></el-checkbox>
                <el-input class="dialog-nec-inp" v-model="form.profits" placeholder="请输入数值"></el-input>
            </div>
            <div class="dialog-nec-item">
                <el-checkbox v-model="form.selectedActive"><span class="dialog-nec-title">平均活跃度达到</span></el-checkbox>
                <el-input class="dialog-nec-inp" v-model="form.active" placeholder="请输入数值"></el-input>
            </div>
            <div class="dialog-nec-item">
                <el-checkbox v-model="form.selectedShareOutBonusNum"><span class="dialog-nec-title">完成分红次数</span></el-checkbox>
                <el-input class="dialog-nec-inp" v-model="form.shareOutBonusNum" placeholder="请输入数值"></el-input>
            </div>
        </div>
        <span slot="footer">
            <el-button type="primary" @click="showNecessaryConf = false">确 定</el-button>
            <el-button @click="showNecessaryConf = false">取 消</el-button>
        </span>
    </el-dialog>
    <!-- 分红奖励 -->
    <el-dialog title="经验值设置" :visible.sync="showShareBonus" width="25%" open="cleanData">
        <p class="dialog-item">
            <span class="dialog-title">完成分红</span>
            <el-input class="dialog-inp" v-model="form.shareBousNum" placeholder="请输入数值"></el-input>次
        </p>
        <p class="dialog-item">
            <span class="dialog-title">获得经验值</span>
            <el-input class="dialog-inp" v-model="form.shareBousExp" placeholder="请输入数值"></el-input>分
        </p>
        <span slot="footer">
            <el-button type="primary" @click="showShareBonus = false">确 定</el-button>
            <el-button @click="showShareBonus = false">取 消</el-button>
        </span>
    </el-dialog>
    <!-- 交易额达标奖励 -->
    <el-dialog title="经验值设置" :visible.sync="showTotalTrans" width="25%" open="cleanData">
        <p class="dialog-item">
            <span class="dialog-title">总交易额增加</span>
            <el-input class="dialog-inp" v-model="form.totalTransAdd" placeholder="请输入数值"></el-input>次
        </p>
        <p class="dialog-item">
            <span class="dialog-title">获得经验值</span>
            <el-input class="dialog-inp" v-model="form.totalTransExp" placeholder="请输入数值"></el-input>分
        </p>
        <span slot="footer">
            <el-button type="primary" @click="showTotalTrans = false">确 定</el-button>
            <el-button @click="showTotalTrans = false">取 消</el-button>
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
      nav: ["拼店店铺管理", "店铺等级设置", "店铺晋升设置"],
      showExperienceValue: false,
      showNecessaryConf: false,
      showShareBonus: false,
      showTotalTrans:false,
      form: {
        // 设置升级经验值
        experienceValue: "",
        // 设置必要条件
        memberNum: "",
        selectedMemberNum: "",
        totalTransactions: "",
        selectedTotalTransactions: "",
        profits: "",
        selectedProfits: "",
        active: "",
        selectedActive: "",
        shareOutBonusNum: "",
        selectedShareOutBonusNum: "",
        // 分红奖励
        shareBousNum: "",
        shareBousExp: "",
        // 交易额达标奖励
        totalTransAdd:'',
        totalTransExp:''
      },
      shopId: ""
    };
  },

  activated() {
    this.shopId =
      this.$route.query.promotionShopId ||
      sessionStorage.getItem("promotionShopId");
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
.promotion-shop {
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
  .dialog-nec-item {
    width: 90%;
    margin: 10px 0px;
    .el-checkbox {
      width: 35%;
    }
    .dialog-nec-title {
      margin: 0 10px 0 0px;
    }
    .dialog-nec-inp {
      margin-right: 10px;
      width: 55%;
    }
  }
  .necessary-box {
    padding-left: 30px;
    box-sizing: border-box;
    .necessary-title {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>