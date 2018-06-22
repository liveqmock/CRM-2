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
        <div class="top">
            <span class="activite-status">当前订单状态：{{orderStatus}}</span>
            <span v-if='orderStatus==1' class="pay-time">订单剩余时间：{{orderFreeTime}}</span>
            <span v-if='orderStatus==3' class="pay-time">订单待完成时间：{{orderFinishTime}}</span>
            <br/>
            <el-button v-if="orderStatus == 2" @click='changeStatus' class="cloud-delivery-btn" type="danger">云仓发货</el-button>
            <el-button v-if="orderStatus == 4" @click='changeStatus' class="cloud-delivery-btn" type="danger">以自提</el-button>
            <el-button v-if="orderStatus == 5" @click='refund' class="cloud-delivery-btn" type="danger">退款</el-button>
            <el-button v-if="orderStatus == 5" @click='refund' class="cloud-delivery-btn" type="primary" style="margin-left:20px">拒绝退款</el-button>
            <p class="preferential-info" @click='isShowPreferential = true'>优惠详情</p>
            <span class="mark">标记</span>
            <span class="star" :style="{color:'skyblue'}">★</span>
            <span class="tip">备注：</span>
            <div class="tip-content">12312asda安徽打开军火库速度很da安徽打开军火库速度很快回答说客家话发生口角da安徽打开军火库速度很快回答说客家话发生口角快回答说客家话发生口角的回复131</div>
        </div>
        <!-- 收货人信息 -->
        <div class="user-info">
            <p class="info-title">买家信息</p>
            <p class="info-content">
                <span class="smal-span">昵称：张三</span>
                <span class="smal-span">联系方式：17601056863</span>
            </p>
            <p class="info-title">收货地址</p>
            <p class="info-content">
                <span class="smal-span">收货人：张三</span>
                <span class="smal-span">收货人联系方式：18404713575</span>
            </p>
            <p class="info-content">
                <span class="smal-span">收货地址：浙江省杭州市萧山区</span>
            </p>
            <p class="info-content">
                <span class="smal-span">买家备注：hahahahahaha</span>
            </p>
            <p v-if='orderStatus == 4' class="info-title">买家自提</p>
            <p v-if='orderStatus == 4' class="info-content">
                <span class="smal-span">提货点：浙江省杭州市萧山区宁围镇飞机场</span>
                <el-button type="primary" @click="isShowWarehouse = true">更换提货仓</el-button>
            </p>
            <p v-if='orderStatus == 3 || orderStatus == 6 || orderStatus == 7' class="info-title">物流信息</p>
            <p v-if='orderStatus == 3 || orderStatus == 6 || orderStatus == 7' class="info-content">
                <span class="smal-span">物流公司名称：圆通快递</span>
                <span class="smal-span">运单号：201806221621</span>
                <span style="color:#33b4ff;cursor:pointer" @click="showLogisticsMsg">查看物流信息</span>
            </p>
            <p v-if='orderStatus == 3' class="info-title">退货物流信息</p>
            <p v-if='orderStatus == 3' class="info-content">
                <span class="smal-span">物流公司名称：圆通快递</span>
                <span class="smal-span">运单号：201806221621</span>
                <span style="color:#33b4ff;cursor:pointer" @click="showLogisticsMsg">查看物流信息</span>
            </p>
        </div>
        <!-- 发货人信息 -->
        <div class="delivery">
            <p class="info-content">
                <span class="smal-span">发货方：张三</span>
                <span class="smal-span">联系方式：17601056863</span>
            </p>
        </div>
        <!-- 订单信息 -->
        <div class="order-info">
            <p class="info-content">
                <span class="content-con">订单号：2018060221131</span>
                <span class="content-con">创建时间：2018-6-22 11:32:00</span>
                <span v-if='orderStatus != 1' class="content-con">平台支付时间：2018-6-22 11:32:00</span>
                <span v-if='orderStatus != 1' class="content-con">第三方支付时间：2018-6-22 11:32:00</span>
            </p>
            <p class="info-content">
                <span v-if='orderStatus == 3' class="content-con">发货时间：2018-06-221131</span>
                <span v-if='orderStatus == 8' class="content-con">取消时间：2018-06-221131</span>
                <span v-if='orderStatus != 1' class="content-con">支付宝（第三方支付）：2018060221131</span>
                <span v-if='orderStatus == 7' class="content-con">确认时间：2018-06-221131</span>
            </p>
            <el-table border :data="tableData" :span-method="spanMethod">
              <el-table-column label="产品名称" align="center" width="500px">
                  <template slot-scope="scope">
                        <div class="name">
                            <img src="../../../../assets/images/avatar.jpg" alt="">
                            <span class="pro-name">Apple/苹果iPhone 8 Plus 64G全网通4G手机</span>
                            <span class="pro-spec">Apple/苹果iPhone 8 Plus 64G全网通4G手机</span>
                        </div>
                  </template>
              </el-table-column>
              <el-table-column prop="id" label="单价" align="center"></el-table-column>
              <el-table-column prop="id" label="数量" align="center"></el-table-column>
              <el-table-column prop="id" label="收货人" align="center"></el-table-column>
              <el-table-column prop="id" label="交易状态" align="center"></el-table-column>
              <el-table-column label="实收款" align="center">
                  <template slot-scope="scope">
                      实收款:{{scope.row.id | handleMoney}}<br/>
                      （含运费:{{scope.row.id | handleMoney}}）
                  </template>
              </el-table-column>
              <el-table-column prop="id" label="支付详情" align="center">
                  <template slot-scope="scope">
                      代币支付:{{scope.row.id}}枚<br/>
                      余额支付:{{scope.row.id | handleMoney}}<br/>
                      积分抵扣:{{scope.row.id | handleMoney}}<br/>
                      支付宝:{{scope.row.id | handleMoney}}<br/>
                      优惠券抵扣:{{scope.row.id | handleMoney}}<br/>
                  </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                      <el-button type="primary">退款</el-button>
                  </template>
              </el-table-column>
            </el-table>
        </div>
      </el-card>
      <!-- 优惠活动 -->
      <el-dialog title="端午活动专题" width="30%" :visible.sync="isShowPreferential">
          <h2 style="margin-bottom:10px">券值：30元</h2>
          <p>使用限制：满100可用</p>
          <p>可用周期：2018/02/04 12:00 - 2018/02/08 13:00</p>
          <p>可用品类：全品类</p>
          <p>可使用用户层级：V0,V1</p>
          <p>发放数量：999</p>
          <p>优惠券说明：优惠券仅限于商品购物使用，只有满足消费100元才可以使用。</p>
          <p>发布人：杨小猛</p>
      </el-dialog>
      <!-- 更换提货仓 -->
        <el-dialog title="更换提货仓" width="30%" :visible.sync="isShowWarehouse">
            <div class="warehouse-wrap">
                <div v-for="(v,k) in warehouseArr" @click="changeWarehouse(v)" :key="k" :class="{'warehouse-box':true,'warehouse-box-active':v.active}">
                    <p class="warehouse-box-tit">{{v.title}}</p>
                    <p class="warehouse-box-con">{{v.content}}</p>
                </div>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: { vBreadcrumb },

  data() {
    return {
      nav: ["订单管理", "订单详情"],
      boolFirst: false,
      boolsec: false,
      boolThr: false,
      boolFor: false,
      isShowPreferential: false, //优惠活动
      isShowWarehouse: false, // 更换提货仓
      orderStatus: "7", //订单状态: 1:待支付 2:待发货 3:待确认 4:待自提 5:已冻结 6:退货中 7:已完成 8:已关闭
      markArr: [
        { label: "red", value: "1" },
        { label: "skyblue", value: "2" },
        { label: "green", value: "3" },
        { label: "blue", value: "4" },
        { label: "purple", value: "5" },
        { label: "black", value: "6" }
      ],
      tableData: [{ id: 123 }, { id: 234 }],
      warehouseArr: [
        {
          id: "1",
          active: false,
          title: "提货点A",
          content: "浙江省杭州市萧山区宁围镇美哉美称10-2-1204"
        },
        {
          id: "2",
          active: false,
          title: "提货点B",
          content: "浙江省杭州市萧山区宁围镇美哉美称10-2-1204"
        },
        {
          id: "3",
          active: false,
          title: "提货点C",
          content: "浙江省杭州市萧山区宁围镇美哉美称10-2-1204"
        },
        {
          id: "4",
          active: false,
          title: "提货点D",
          content: "浙江省杭州市萧山区宁围镇美哉美称10-2-1204"
        }
      ],
      orderFreeTime: "",
      orderFinishTime: ""
    };
  },

  activated() {
    this.getInfo();
    this.orderFreeTimeDown();
    this.orderFinishTimeDown();
  },

  methods: {
    //   获取信息
    getInfo() {
      this.getProgressStu(this.orderStatus);
    },
    // 判断进度条状态
    getProgressStu(n) {
      switch (n) {
        case "1":
          this.boolFirst = true;
          break;
        case "2":
          this.boolFirst = true;
          this.boolsec = true;
          break;
        case "3":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          break;
        case "4":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          break;
        case "5":
          break;
        case "6":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          break;
        case "7":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          this.boolFor = true;
          break;
      }
    },
    // 合并单元格
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 4 || columnIndex == 5 || columnIndex == 6) {
        if (rowIndex == 0) {
          return {
            rowspan: this.tableData.length,
            colspan: 1
          };
        } else {
          return [0, 0];
        }
      }
    },
    // 订单剩余时间倒计时
    orderFreeTimeDown() {
      let timeOut = 1800000;
      let date = new Date("2018-6-22 15:00:00").getTime();
      let that = this;
      let timer = setInterval(function() {
        let nowDate = new Date().getTime();
        let time = timeOut - (nowDate - date);
        if (time <= 0) {
          that.orderFreeTime = "00:00:00";
          return;
        }
        let hour = Math.floor((time / 1000 / 60 / 60) % 60);
        let minute = Math.floor((time / 1000 / 60) % 60);
        let second = Math.floor((time / 1000) % 60);
        hour = hour > 9 ? hour : "0" + hour;
        minute = minute > 9 ? minute : "0" + minute;
        second = second > 9 ? second : "0" + second;
        that.orderFreeTime = `${hour}:${minute}:${second}`;
      }, 1000);
    },
    // 订单待完成时间倒计时
    orderFinishTimeDown() {
      let timeOut = 1800000;
      let date = new Date("2018-6-22 15:00:00").getTime();
      let that = this;
      let timer = setInterval(function() {
        let nowDate = new Date().getTime();
        let time = timeOut - (nowDate - date);
        if (time <= 0) {
          that.orderFinishTime = "00:00:00";
          return;
        }
        let hour = Math.floor((time / 1000 / 60 / 60) % 60);
        let minute = Math.floor((time / 1000 / 60) % 60);
        let second = Math.floor((time / 1000) % 60);
        hour = hour > 9 ? hour : "0" + hour;
        minute = minute > 9 ? minute : "0" + minute;
        second = second > 9 ? second : "0" + second;
        that.orderFinishTime = `${hour}:${minute}:${second}`;
      }, 1000);
    },
    // 更改订单状态
    changeStatus() {},
    // 更换提货仓
    changeWarehouse(row) {
      this.warehouseArr.forEach((v, k) => {
        v.active = false;
      });
      row.active = true;
      console.log(row.id);
    },
    // 查看物流信息
    showLogisticsMsg() {},
    // 退款
    refund() {}
  }
};
</script>
<style lang='less'>
.order-info {
  min-width: 960px;
  .el-dialog {
    padding: 0 20px;
    .el-dialog__header {
      border-bottom: 1px solid #ccc;
      .el-dialog__title {
        color: #ff6868;
        font-weight: 600;
      }
    }
  }
  .order-status {
    height: 55px;
    min-width: 1000px;
    .s-block {
      float: left;
      width: 200px;
      height: 53px;
      border: 1px solid #eee;
      border-right: none;
      transform: skew(-30deg);
      text-align: center;
      line-height: 53px;
      color: #999;
      .s-block-content {
        display: inline-block;
        transform: skew(30deg);
      }
    }
    .s-block:first-child {
      margin-left: 25px;
    }
    .s-block:last-child {
      border-right: 1px solid #eee;
    }
    .s-block-bgcolor {
      background-color: #33b4ff;
      color: #fff;
    }
  }
  .top {
    position: relative;
    padding: 30px 55px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    .activite-status {
      display: inline-block;
      color: #666;
      font-size: 14px;
    }
    .cloud-delivery-btn {
      margin: 20px 0 0 0;
    }
    .preferential-info {
      margin: 20px 0 10px 0;
      font-size: 14px;
      cursor: pointer;
      color: #33b4ff;
    }
    .mark {
      float: left;
      font-size: 14px;
      cursor: pointer;
      color: #33b4ff;
    }
    .star {
      float: left;
      font-size: 24px;
      cursor: pointer;
      margin: -5px 0 0 10px;
    }
    .tip {
      float: left;
      margin-left: 35px;
      font-size: 14px;
      cursor: pointer;
      color: #33b4ff;
    }
    .tip-content {
      float: left;
      display: inline-block;
      background-color: #f7f7f7;
      border: 1px solid #eee;
      font-size: 14px;
      width: 500px;
      height: auto;
      color: #999;
      margin-top: 5px;
      padding: 10px;
      box-sizing: border-box;
    }
    .pay-time {
      color: #ff6868;
      font-size: 14px;
      margin-left: 150px;
    }
  }
  .user-info,
  .delivery {
    color: #666;
    padding: 30px 0 8px 0;
    border-bottom: 1px solid #ddd;
    .info-title {
      margin-bottom: 20px;
    }
    .info-content {
      padding-left: 50px;
      margin-bottom: 22px;
      box-sizing: border-box;
      font-size: 14px;
      .smal-span {
        margin-right: 50px;
      }
    }
  }
  .order-info {
    padding: 30px 0 8px 0;
    color: #666;
    .info-content {
      padding-left: 50px;
      margin-bottom: 22px;
      box-sizing: border-box;
      font-size: 14px;
      .content-con {
        margin-right: 40px;
      }
    }
  }
  .name {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100px;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100px;
      height: 100px;
      border-radius: 5px;
      border: 1px solid #eee;
    }
    .pro-name {
      position: absolute;
      top: 5px;
      left: 110px;
      display: inline-block;
    }
    .pro-spec {
      position: absolute;
      bottom: 5px;
      left: 110px;
      display: inline-block;
    }
  }
  .warehouse-wrap {
    width: 100%;
    max-height: 400px;
    padding: 5px 0;
    box-sizing: border-box;
    overflow-y: scroll;
    .warehouse-box {
      box-shadow: 0px 0px 2px 1px #ccc;
      margin: 0 auto;
      height: 100px;
      width: 80%;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      cursor: pointer;
      margin-bottom: 20px;
      .warehouse-box-tit {
        font-size: 20px;
      }
      .warehouse-box-con {
        font-size: 14px;
        margin-top: 10px;
      }
    }
    .warehouse-box-active {
      box-shadow: 0px 0px 2px 1px #33b4ff;
      background-color: #33b4ff;
      color: #fff;
    }
  }
}
</style>