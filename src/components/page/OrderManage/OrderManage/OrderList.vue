<template>
  <div class="product-list">
    <v-breadcrumb :nav='nav'></v-breadcrumb>
    <el-card :body-style="{ padding: '20px 20px'}">
        <el-form :model="form" ref="form" inline label-width="100px">
        <el-form-item prop="no" label="订单编号"><el-input v-model="form.no" placeholder="请输入订单编号"></el-input></el-form-item>
        <el-form-item prop="no" label="产品名称"><el-input v-model="form.no" placeholder="请输入产品名称"></el-input></el-form-item>
        <el-form-item prop="no" label="订单标记"><el-input v-model="form.no" placeholder="请选择标记颜色"></el-input></el-form-item>
        <el-form-item prop="no" label="收货人姓名"><el-input v-model="form.no" placeholder="请输入收货人姓名"></el-input></el-form-item>
        <el-form-item prop="no" label="收货人手机"><el-input v-model="form.no" placeholder="请输入收货人手机号"></el-input></el-form-item>
        <el-form-item prop="no" label="下单开始时间"><el-input v-model="form.no" placeholder="请选择开始时间"></el-input></el-form-item>
        <el-form-item prop="no" label="下单结束时间"><el-input v-model="form.no" placeholder="请选择结束时间"></el-input></el-form-item>
        <el-form-item prop="no" label="退款状态"><el-input v-model="form.no" placeholder="请选择退款状态"></el-input></el-form-item>
        <el-form-item prop="no" label="售后状态"><el-input v-model="form.no" placeholder="请选择售后状态"></el-input></el-form-item>
        <el-form-item prop="no" label="关闭状态"><el-input v-model="form.no" placeholder="请选择关闭状态"></el-input></el-form-item>
        <el-form-item prop="no" label="提货状态"><el-input v-model="form.no" placeholder="请选择提货状态"></el-input></el-form-item>
        <el-form-item label=" ">
            <el-button type="primary">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
        </el-form>
    </el-card>
    <el-card style='margin-top:20px' :body-style="{ padding: '20px 50px' }">
        <div class="btn-group">
            <el-button type="primary">批量导出</el-button>
            <el-button type="warning">今日订单</el-button>
            <el-button type="warning">昨日订单</el-button>
            <el-button type="warning">最近三个月订单</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部订单" name="allOrder"><v-tab-content v-if='activeName == "allOrder"' :name='activeName'></v-tab-content></el-tab-pane>
            <el-tab-pane label="待支付" name="toBePaid"><v-tab-content v-if='activeName == "toBePaid"' :name='activeName'></v-tab-content></el-tab-pane>
            <el-tab-pane label="待发货" name="toBeSend"><v-tab-content v-if='activeName == "toBeSend"' :name='activeName'></v-tab-content></el-tab-pane>
            <el-tab-pane label="待自提" name="toBeStay"><v-tab-content v-if='activeName == "toBeStay"' :name='activeName'></v-tab-content></el-tab-pane>
            <el-tab-pane label="待确认" name="toBeConfirm"><v-tab-content v-if='activeName == "toBeConfirm"' :name='activeName'></v-tab-content></el-tab-pane>
            <el-tab-pane label="退款中" name="refund"><v-tab-content v-if='activeName == "refund"' :name='activeName'></v-tab-content></el-tab-pane>
            <el-tab-pane label="已完成" name="finished"><v-tab-content v-if='activeName == "finished"' :name='activeName'></v-tab-content></el-tab-pane>
            <el-tab-pane label="已关闭" name="closed"><v-tab-content v-if='activeName == "closed"' :name='activeName'></v-tab-content></el-tab-pane>
            <el-tab-pane label="已冻结" name="freeze"><v-tab-content v-if='activeName == "freeze"' :name='activeName'></v-tab-content></el-tab-pane>
        </el-tabs>
    </el-card>
     
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import vTabContent from './_tabContent.vue';

export default {
  components: {
    vBreadcrumb,vTabContent
  },

  data() {
    return {
      nav: ["订单管理", "订单管理"],
      activeName: "allOrder",
      tabName:'',
      form: {
        no: ""
      }
    };
  },

  methods: {
    //  重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //  点击tab选项卡
    handleClick(tab) {
      this.activeName = tab.name;
    }
  }
};
</script>
<style lang='less'>
.product-list {
  .el-tabs__active-bar {
    background-color: #ff1e30;
  }
  .el-tabs__item.is-active,
  .el-tabs__item:hover {
    color: #ff1e30;
  }
  .btn-group {
      margin-bottom: 10px;
  }
}
</style>