<template>
  <div class="shop-info">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 50px' }">
        <div class="shop-box">ss</div>
        <hr style="border:none;height:1px;background-color:#e2e2e2"/>
        <div class="shop-box">ss</div>
        <hr style="border:none;height:1px;background-color:#e2e2e2"/>
      </el-card>
      
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: {vBreadcrumb},

  data () {
    return {
        nav: ["拼店店铺管理", "店铺管理","店铺详情"],
        shopId:''
    };
  },

  activated(){
    this.shopId = this.$route.query.shopInfoId || sessionStorage.getItem('shopInfoId');
    console.log(this.shopId)
  },

  methods: {}
}

</script>
<style lang='less' scoped>
.shop-info{
    .shop-box{
        margin: 30px 0 0 0;
        width: 80%;
        background-color: #ccc;
    }
}
</style>