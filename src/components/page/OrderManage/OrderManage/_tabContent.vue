<template>
  <div class="order-manage-tab">
      <!-- <div class="tab-title">
        <span class="spec" :style="{width:w.name,minWidth:w.minWidth}">产品名称</span>
        <span class="spec" :style="{width:w.price,minWidth:w.minWidth}">单价</span>
        <span class="spec" :style="{width:w.num,minWidth:w.minWidth}">数量</span>
        <span class="spec" :style="{width:w.consignee,minWidth:w.minWidth}">收货人</span>
        <span class="spec" :style="{width:w.status,minWidth:w.minWidth}">交易状态</span>
        <span class="spec" :style="{width:w.collection,minWidth:w.minWidth}">实收款</span>
        <span class="spec" :style="{width:w.shipper,minWidth:w.minWidth}">发货方</span>
        <span class="spec" :style="{width:w.operate,minWidth:w.minWidth}">操作</span>
      </div> -->
      <!-- <div v-for="(v,k) in data" :key="k" class="tab-wrap">
        <div class="tab-content-title">
          <el-checkbox label=""></el-checkbox>
          <span>订单号：{{v.orderNum}}</span>
          <span style="margin-left:30px">创建时间：{{v.createTime}}</span>
          <div class="operate-btn-group">
            <span>推送云仓</span>
            <span style="margin:0 15px 0 15px">订单详情</span>
            <el-popover placement="bottom" width="150" v-model="isShowPop" trigger="click">
              <span slot="reference" style="cursor:pointer">标记 &nbsp <span class="star" :style="{color:starColor}">★</span></span>
              <span v-for="(v,k) in markArr" :key="k" @click="changeColor(v)" :style="{color:v,fontSize:'22px',cursor:'pointer',marginRight:'5px'}">★</span>
            </el-popover>
          </div>
        </div>
        <div class="tab-content">

        </div>
      </div> -->
  </div>
</template>

<script>
export default {
  props: ["name"],

  components: {},

  data() {
    return {
      w: {
        name: "25%",
        price: "8%",
        num: "8%",
        consignee: "12%",
        status: "8%",
        collection: "12%",
        shipper: "8%",
        operate: "15%",
        minWidth: "100px"
      },
      data: [{ orderNum: "201806200508", createTime: "2018-12-24 12:12:12",starLevel:'', }],
      markArr: ["red", "skyblue", "deeppink", "green", "purple", "yellow"],
      starColor: "#e7e7e7",
      isShowPop: false
    };
  },

  mounted() {
    console.log(this.name);
  },
  methods: {
    // 修改星级
    changeColor(v) {
      this.starColor = v;
      this.isShowPop = false;
    }
  }
};
</script>
<style lang='less' scoped>
.order-manage-tab {
  height: 60vh;
  .tab-title {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eee;
    background-color: #f7f7f7;
    margin-bottom: 20px;
    .spec {
      display: inline-block;
      text-align: center;
      box-sizing: border-box;
    }
  }
  .tab-wrap {
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
    .tab-content-title {
      width: 100%;
      height: 40px;
      background-color: #f7f7f7;
      padding: 0 18px;
      line-height: 40px;
      span {
        font-size: 14px;
        color: #666;
      }
      .star {
        font-size: 22px;
        vertical-align: middle;
        cursor: pointer;
      }
      .operate-btn-group {
        float: right;
        margin-right: 90px;
      }
    }
    .tab-content {
    }
  }
}
</style>