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
      <div v-for="(v,k) in orderArr" :key="k" class="tab-wrap">
        <div class="tab-content-title">
          <el-checkbox label=""></el-checkbox>
          <span>订单号：{{v.orderNum}}</span>
          <span style="margin-left:30px">创建时间：{{v.createTime}}</span>
          <div class="operate-btn-group">
            <span>推送云仓</span>
            <span style="margin:0 15px 0 15px">订单详情</span>
            <el-popover placement="bottom" width="150" v-model="v.isShowPop" trigger="click">
              <span slot="reference" style="cursor:pointer">标记 &nbsp <span class="star" :style="{color:v.starColor}">★</span></span>
              <span v-for="(v1,k1) in markArr" :key="k1" @click="changeColor(v1,v)" :style="{color:v1,fontSize:'22px',cursor:'pointer',marginRight:'5px'}">★</span>
              <el-input v-model="v.markTip" placeholder="请输入备注"></el-input>
            </el-popover>
          </div>
        </div>
        <div class="tab-content">
          <div class="left">
            <div v-for="(value,index) in v.productArr" :key="index" class="bar">
              <div class="name">
                <img src="../../../../assets/images/avatar.jpg" alt="">
                <span class="pro-name">{{value.name}}</span>
                <span class="pro-spec">{{value.spec}}</span>
              </div>
              <div class="price">{{value.price}}</div>
              <div class="num">{{value.num}}</div>
              <div class="consignee">{{value.people}}</div>
            </div>
          </div>
          <div class="center" >
            <div class="status" :style="{height:120*v.productArr.length+v.productArr.length-1+'px',lineHeight:120*v.productArr.length+v.productArr.length-1+'px'}">待付款</div>
            <div class="status" :style="{height:120*v.productArr.length+v.productArr.length-1+'px',lineHeight:120*v.productArr.length+v.productArr.length-1+'px'}">
              
            </div>
          </div>
          <div class="right"></div>
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
      orderArr: [
        { id:'1',starColor:'#e7e7e7',isShowPop:false,orderNum: "201806200508", createTime: "2018-12-24 12:12:12",starLevel:'',markTip:'',totalPrice:'9999',status:'1',productArr:[{name:'Apple/苹果iPhone 8 Plus 64G全网通4G手机',spec:'iphone金色128G',price:'1288',num:'2',people:'张三',origin:'角色A',status:'待自提'},{name:'Apple/苹果iPhone 8 Plus 64G全网通4G手机',spec:'iphone金色128G',price:'1288',num:'2',people:'张三',origin:'角色A',status:'待自提'}] },
        { id:'1',starColor:'#e7e7e7',isShowPop:false,orderNum: "201806200508", createTime: "2018-12-24 12:12:12",starLevel:'',markTip:'',totalPrice:'9999',status:'1',productArr:[{name:'Apple/苹果iPhone 8 Plus 64G全网通4G手机',spec:'iphone金色128G',price:'1288',num:'2',people:'张三',origin:'角色A',status:'待自提'}] },
      ],
      markArr: ["red", "skyblue", "deeppink", "green", "purple", "yellow"],
    };
  },

  mounted() {
    console.log(this.name);
  },
  methods: {
    // 修改星级
    changeColor(v1,v) {
      v.starColor = v1;
      v.isShowPop = false;
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
    margin-bottom: 20px;
    .tab-content-title {
      width: 100%;
      height: 40px;
      background-color: #f7f7f7;
      padding: 0 18px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
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
      .left{
        float: left;
        width: 53%;
        border-right: 1px solid #eee;
        .bar {
          padding: 10px;
          box-sizing: border-box;
          font-size: 14px;
          overflow: hidden;
          border-bottom: 1px solid #eee;
          .name{
            float: left;
            position: relative;
            display: inline-block;
            height: 100px;
            width: 43%;
            img{
              position: absolute;
              left: 0;
              top: 0;
              width: 100px;
              height: 100px;
              border-radius: 5px;
              border: 1px solid #eee;
            }
            .pro-name{
              position: absolute;
              top: 5px;
              left: 110px;
              display: inline-block;
            }
            .pro-spec{
              position: absolute;
              bottom: 5px;
              left: 110px;
              display: inline-block;
            }
          }
          .price{
            float: left;
            display: inline-block;
            width: 16%;
            height: 100px;
            margin-left: 4%;
            text-align: center;
            line-height: 100px;
          }
          .num{
            float: left;
            display: inline-block;
            width: 16%;
            height: 100px;
            text-align: center;
            line-height: 100px;
          }
          .consignee{
            float: left;
            display: inline-block;
            width: 16%;
            height: 100px;
            margin-left: 4%;
            text-align: center;
            line-height: 100px;
          }
        }
        .bar:last-child{
          border-bottom: none;
        }
      }
      .center{
        float: left;
        width: 20%;
        .status{
          width: 50%;
          text-align: center;
          border-right: 1px solid #eee;
        }
      }
    }
  }
}
</style>