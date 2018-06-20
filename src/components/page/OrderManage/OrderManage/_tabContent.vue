<template>
  <div class="order-manage-tab">
      <div class="tab-title">
        <span class="spec" :style="{width:w.name,minWidth:w.minWidth}">产品名称</span>
        <span class="spec" :style="{width:w.price,minWidth:w.minWidth}">单价</span>
        <span class="spec" :style="{width:w.num,minWidth:w.minWidth}">数量</span>
        <span class="spec" :style="{width:w.consignee,minWidth:w.minWidth}">收货人</span>
        <span class="spec" :style="{width:w.status,minWidth:w.minWidth}">交易状态</span>
        <span class="spec" :style="{width:w.collection,minWidth:w.minWidth}">实收款</span>
        <span class="spec" :style="{width:w.shipper,minWidth:w.minWidth}">发货方</span>
        <span class="spec" :style="{width:w.operate,minWidth:w.minWidth}">操作</span>
      </div>
      <div class="tab-wrap">
        <div class="tab-content-title">
          <el-checkbox label=""></el-checkbox>
          <span>订单号：</span>
          <span>创建时间：</span>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  props: ["name"],

  components: {},

  data() {
    return {
      w:{
        name:'25%',
        price:'8%',
        num:'8%',
        consignee:'12%',
        status:'8%',
        collection:'12%',
        shipper:'8%',
        operate:'15%',
        minWidth:'100px'
      },
      data:[
        {
          imgUrl:'',
          name:'iphone',
          price:'52898',
          num:'66',
          people:''
        }
      ]
    };
  },

  mounted() {
    console.log(this.name);
  },
  methods: {}
};
</script>
<style lang='less' scoped>
.order-manage-tab{
  height: 60vh;
  .tab-title{
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #eee;
      background-color: #f7f7f7;
      margin-bottom: 20px;
      .spec{
        display: inline-block;
        text-align: center;
        box-sizing: border-box;
      }
  }
  .tab-wrap{
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
    .tab-content-title{
      width: 100%;
      height: 40px;
      background-color: #f7f7f7;
      padding: 0 18px;
      line-height: 40px;
    }
  }
}
</style>