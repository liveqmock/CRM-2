<template>
  <div class="order-info">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '28px 50px' }">
        <!-- 订单状态 -->
        <div class="order-status">
            <div :class="{'s-block':true,'s-block-bgcolor':boolFirst}"><div class="s-block-content">买家下单</div></div>
            <div :class="{'s-block':true,'s-block-bgcolor':boolsec}"><div class="s-block-content">买家付款</div></div>
            <div :class="{'s-block':true,'s-block-bgcolor':boolThr}"><div class="s-block-content">发货</div></div>
            <div :class="{'s-block':true,'s-block-bgcolor':boolFor}"><div class="s-block-content">买家确认收货</div></div>
        </div>
        <span class="activite-status">当前订单状态：{{orderStatus}}</span> 
      </el-card>
      
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: {vBreadcrumb},

  data () {
    return {
        nav: ["订单管理", "订单详情"],
        boolFirst:false,
        boolsec:false,
        boolThr:false,
        boolFor:false,
        orderStatus:'1', //订单状态
    };
  },

  activated(){
      this.getInfo();
  },

  methods: {
      getInfo(){
          
      }
  }
}

</script>
<style lang='less' scoped>
.order-info{
    // overflow: hidden;
    .order-status{
        height: 55px;
        min-width: 1000px;
        .s-block{
            float: left;
            width: 200px;
            height: 53px;
            border: 1px solid #eee;
            border-right: none;
            transform: skew(-30deg);
            text-align: center;
            line-height: 53px;
            color: #999;
            .s-block-content{
                display: inline-block;
                transform: skew(30deg);
            }
        }
        .s-block:first-child{
            margin-left: 25px;
        }
        .s-block:last-child{
            border-right: 1px solid #eee;
        }
        .s-block-bgcolor{
            background-color: #33b4ff;
            color: #fff;
        }
    }
    .activite-status{
        display: inline-block;
        margin: 30px 0 0 55px;
        color: #666;
        font-size: 14px;
    }
}
</style>