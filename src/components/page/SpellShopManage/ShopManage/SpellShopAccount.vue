<template>
  <div class="spell-shop-acount">
    <v-breadcrumb :nav='nav'></v-breadcrumb>
    <el-card :body-style="{ padding: '50px 100px',height:'65vh'}">
        <div class="card">
            <p class="spell-shop-title">
                <img src="../../../../assets/images/spell-shop-ico.png" class="title-ico">
                <span>拼店账户（元）</span>
            </p>
            <p class="spell-shop-content" style="font-size: 22px;">拼店额：￥58000/￥60000</p>
            <p class="spell-shop-content">分红金：￥60000</p>
            <p class="spell-shop-content">交易利润：￥6800</p>
            <p class="btn">账户明细</p>
        </div>
    </el-card>
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: {vBreadcrumb},

  data () {
    return {
        nav: ["拼店店铺管理", "店铺管理", "店铺详情","拼店账户"],
    };
  },

  methods: {}
}

</script>
<style lang='less' scoped>
.spell-shop-acount{
    .card{
        background-color: red;
        background-image: url('../../../../assets/images/spell-shop-card.png');
        width: 420px;
        height: 240px;
        border-radius: 20px;
        overflow: hidden;
        .spell-shop-title{
            margin: 15px 30px;
            font-size: 16px;
            color: #fff;
            font-weight: 600;
            .title-ico{
                vertical-align:middle;
                margin-right: 10px;
            }
        }
        .spell-shop-content{
            margin: 15px 30px;
            color: #fff;
            font-size: 20px;
        }
        .btn{
            width: 110px;
            height: 40px;
            border: 2px solid #fff;
            border-radius: 10px;
            margin: 0 auto;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            color: #fff;
        }
    }
}
</style>