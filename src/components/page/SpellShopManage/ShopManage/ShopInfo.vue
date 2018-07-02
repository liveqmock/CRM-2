<template>
  <div class="shop-info">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 50px' }">
        <div class="shop-box" style="height:220px;">
          <p class="shop-title">店铺信息</p>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>店铺名称：王小明的店铺</span>
              </p>
            </div>
            <div class="shop-right">
              <p class="shop-msg">
                <span>创建时间：2018/2/3/12:32:23</span>
              </p>
            </div>
          </div>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>店铺ID：20180001</span>
              </p>
            </div>
            <div class="shop-right">
              <p class="shop-msg">
                <span>店铺等级：一星店铺</span>
              </p>
            </div>
          </div>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>保证金：￥20000.00</span>
              </p>
            </div>
            <div class="shop-right">
              <p class="shop-msg">
                <span>店铺经验：1000</span>
              </p>
            </div>
          </div>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>店长：<span @click="showShopLeader" class="font-href">王小明</span></span>
                <el-button style="margin:0px 20px" type="warning">实名认证</el-button>
                <span @click="shopTransfer" class="font-href">店铺转让</span>
              </p>
            </div>
            <div class="shop-right">
              <p class="shop-msg">
                <span>店铺成员数：142/150</span>
              </p>
            </div>
          </div>
          <div class="avatar-wrap">
            <el-upload :show-file-list='false' :on-success='uploadSuccess' action="/commonAPI/ossClient/aliyunOSSUploadImage" >
              <img v-if='avatar == ""' src="../../../../assets/images/avatar.jpg" alt="">
              <img v-else :src="avatar" alt="">
            </el-upload>
            <p style="margin-top:10px"><el-button type="primary">拼店账户</el-button></p>
            <p style="margin-top:10px"><el-button type="primary">成员管理</el-button></p>
            <p style="margin-top:10px"><el-button type="primary">店铺公告管理</el-button></p>
          </div>
        </div>
        <hr style="border:none;height:1px;background-color:#e2e2e2"/>
        <div class="shop-box">
          <p class="shop-title">店铺交易记录</p>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>店铺拼店分红总额：￥52000000000</span>
              </p>
            </div>
          </div>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>店铺拼店分红总额：￥52000000000</span>
              </p>
            </div>
          </div>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>店铺分红次数：6次</span>
                <span style="margin-left:20px" @click="shareBoneMsg" class="font-href">查看详情</span>
              </p>
            </div>
          </div>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>店铺总分红金额：￥2500000</span>
              </p>
            </div>
          </div>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>店长分红总金额：￥500000</span>
              </p>
            </div>
          </div>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>店员分红总金额：￥500000</span>
              </p>
            </div>
          </div>
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>最快拼店记录：2018/2/1/12:23:52-2018/2/2/12:32:23</span>
              </p>
            </div>
          </div>
        </div>
        <hr style="border:none;height:1px;background-color:#e2e2e2"/>
        <div class="shop-box">
          <div class="shop-wrap">
            <div class="shop-left">
              <p class="shop-msg">
                <span>拼店金额目标：￥60000</span>
              </p>
            </div>
          </div>
        </div>
      </el-card>
      
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: { vBreadcrumb },

  data() {
    return {
      nav: ["拼店店铺管理", "店铺管理", "店铺详情"],
      shopId: "",
      avatar:''
    };
  },

  activated() {
    this.shopId =
      this.$route.query.shopInfoId || sessionStorage.getItem("shopInfoId");
    console.log(this.shopId);
  },

  methods: {
    // 查看店长
    showShopLeader(){},
    // 店铺转让
    shopTransfer(){},
    // 查看分红详情
    shareBoneMsg(){},
    // 上传成功
    uploadSuccess(res){
      this.avatar = res.data.imageUrl;
    }
  }
};
</script>
<style lang='less'>
.shop-info {
  .el-upload-dragger,
  .el-upload--text{
    width: 105px;
    height: 105px;
    border: none;
  }
  .shop-box {
    position: relative;
    margin: 30px 0 0 0;
    .shop-title {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .shop-wrap {
      overflow: hidden;
      .shop-left,
      .shop-right {
        width: 45%;
        float: left;
        .shop-msg {
          font-size: 14px;
          line-height: 40px;
          .font-href{
            color:#20a0ff;
            cursor: pointer;
          }
        }       
      }
    }
    .shop-wrap:last-child{
      margin-bottom: 10px;
    }
    .avatar-wrap{
      position: absolute;
      top: -30px;
      right: 0px;
      width: 110px;
      text-align: center;
      img{
        width: 100px;
        height: 100px;
        border: 2px solid #dfdfdf;
        border-radius: 10px;
        margin: 0 auto;
      }
    }
  }
}
</style>