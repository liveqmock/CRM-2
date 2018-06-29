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
            <span v-if='orderStatus == 1' class="activite-status">当前订单状态：待付款</span> 
            <span v-if='orderStatus == 2' class="activite-status">当前订单状态：待发货</span>
            <span v-if='orderStatus == 3' class="activite-status">当前订单状态：待确认</span>
            <span v-if='orderStatus == 4' class="activite-status">当前订单状态：待提货</span>
            <span v-if='orderStatus == 5' class="activite-status">当前订单状态：已完成（确认收货）</span>
            <span v-if='orderStatus == 6' class="activite-status">当前订单状态：已关闭（退款关闭）</span>
            <span v-if='orderStatus == 7' class="activite-status">当前订单状态：已完成</span>
            <span v-if='orderStatus == 8' class="activite-status">当前订单状态：已关闭</span>
            <span v-if='orderStatus == 9 || orderStatus == 7' class="activite-status">当前订单状态：交易完成</span>
            <span v-if='orderStatus==1' class="pay-time">订单剩余时间：{{orderFreeTime}}</span>
            <span v-if='orderStatus==3' class="pay-time">订单待完成时间：{{orderFinishTime}}</span>
            <br/>
            <el-button v-if="orderStatus == 2" @click='changeStatus' class="cloud-delivery-btn" type="danger">云仓发货</el-button>
            <el-button v-if="orderStatus == 4" @click='changeStatus(orderMsg.url)' class="cloud-delivery-btn" type="danger">已提货</el-button>
            <p class="preferential-info" @click='isShowPreferential = true'>优惠详情</p>
            <span class="mark">标记</span>
            <span class="star" :style="{color:orderMsg.star}">★</span>
            <span class="tip">备注：</span>
            <div class="tip-content">{{orderMsg.adminRemark}}</div>
        </div>
        <!-- 收货人信息 -->
        <div class="user-info">
            <p class="info-title">买家信息</p>
            <p class="info-content">
                <span class="smal-span">昵称：{{orderMsg.nickName}}</span>
                <span class="smal-span">联系方式：{{orderMsg.phone}}</span>
            </p>
            <p v-if='orderStatus == 3 || orderStatus == 5 || orderStatus == 7' class="info-title">收货地址</p>
            <p v-if='orderStatus == 3 || orderStatus == 5 || orderStatus == 7' class="info-content">
                <span class="smal-span">收货人：{{orderMsg.receiver}}</span>
                <span class="smal-span">收货人联系方式：{{orderMsg.recevicePhone}}</span>
            </p>
            <p v-if='orderStatus == 3 || orderStatus == 5 || orderStatus == 7' class="info-content">
                <span class="smal-span">收货地址：{{orderMsg.receiveAddress}}</span>
            </p>
            <p class="info-content">
                <span class="smal-span">买家备注：{{orderMsg.buyerRemark}}</span>
            </p>
            <p v-if='orderStatus == 4 || orderStatus == 5 || orderStatus == 7' class="info-title">买家自提</p>
            <p v-if='orderStatus == 4 || orderStatus == 5 || orderStatus == 7' class="info-content">
                <span class="smal-span">提货点：{{orderMsg.storehouseName}}</span>
                <el-button v-if='orderStatus == 4' type="primary" @click="isShowWarehouse = true">更换提货仓</el-button>
            </p>
            <p v-if='orderStatus == 3 || orderStatus == 5 || orderStatus == 7' class="info-title">物流信息</p>
            <p v-if='orderStatus == 3 || orderStatus == 5 || orderStatus == 7' class="info-content">
                <span class="smal-span">物流公司名称：圆通快递</span>
                <span class="smal-span">运单号：201806221621</span>
                <span style="color:#33b4ff;cursor:pointer" @click="showLogisticsMsg">查看物流信息</span>
            </p>
        </div>
        <!-- 发货人信息 -->
        <div class="delivery">
            <p class="info-content">
                <span class="smal-span">发货方：代理商</span>
                <span class="smal-span">联系方式：17601056863</span>
            </p>
        </div>
        <!-- 订单信息 -->
        <div class="order-info">
            <p class="info-content">
                <span v-if='orderStatus != 9' class="content-con">订单号：{{ orderMsg.orderNum }}</span>
                <span v-if='orderStatus != 9' class="content-con">创建时间：{{ orderMsg.createTime | formatDate }}</span>
                <span v-if='orderStatus != 9' class="content-con">平台支付时间：{{ orderMsg.sysPayTime | formatDate }}</span>
                <span v-if='orderStatus != 1 && orderStatus != 2 && orderStatus != 9' class="content-con">第三方支付时间：{{ orderMsg.payTime | formatDate }}</span>
            </p>
            <p class="info-content">
                <span v-if='orderStatus == 3 || orderStatus == 4 || orderStatus == 5 || orderStatus == 7' class="content-con">发货时间：{{ orderMsg.deliveryTime | formatDate }}</span>
                <span v-if='orderStatus == 6 || orderStatus == 8 || orderStatus == 10' class="content-con">取消时间：2018-06-221131</span>
                <span v-if='orderStatus != 1 && orderStatus != 2 && orderStatus != 9' class="content-con">支付宝（第三方支付）交易号：{{ orderMsg.tradeNo }}</span>
                <span v-if='orderStatus == 5 || orderStatus == 7' class="content-con">确认时间：2018-06-221131</span>
            </p>
            <el-table border :data="tableData" :span-method="spanMethod">
              <el-table-column label="产品名称" align="center" width="500px">
                  <template slot-scope="scope">
                        <div class="name">
                            <img :src="scope.row.imgUrl" alt="">
                            <span class="pro-name">{{scope.row.productName}}</span>
                            <span class="pro-spec">{{scope.row.spec}}</span>
                        </div>
                  </template>
              </el-table-column>
              <el-table-column prop="price" label="单价" align="center"></el-table-column>
              <el-table-column prop="num" label="数量" align="center"></el-table-column>
              <el-table-column label="收货人" align="center">
                  <template slot-scope="scope">
                    <span>收货人：{{scope.row.receiver}}</span><br/>
                    <span>{{scope.row.recevicePhone}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="status" label="交易状态" align="center">
                <template slot-scope="scope">
                  <template v-if='scope.row.status == 1'>待支付</template>
                  <template v-else-if='scope.row.status == 2'>待发货</template>
                  <template v-else-if='scope.row.status == 3'>待收货</template>
                  <template v-else-if='scope.row.status == 4'>待提货</template>
                  <template v-else-if='scope.row.status == 5'>确认收货</template>
                  <template v-else-if='scope.row.status == 6'>退货退款</template>
                  <template v-else-if='scope.row.status == 7'>已完成</template>
                  <template v-else-if='scope.row.status == 8'>已关闭</template>
                  <template v-else-if='scope.row.status == 9'>用户删除</template>
                  <template v-else-if='scope.row.status == 10'>定时关闭</template>
                </template>
              </el-table-column>
              <el-table-column label="实收款" align="center">
                  <template slot-scope="scope">
                      实收款:{{scope.row.totalPrice | handleMoney}}<br/>
                      （含运费:{{scope.row.freightPrice | handleMoney}}）
                  </template>
              </el-table-column>
              <el-table-column prop="id" label="支付详情" align="center">
                  <template slot-scope="scope">
                      代币支付:{{scope.row.tokenCoin}}枚<br/>
                      余额支付:{{scope.row.balance | handleMoney}}<br/>
                      积分抵扣:{{scope.row.userScore | handleMoney}}<br/>
                      <template v-if='scope.row.type == 1'>平台</template>
                      <template v-if='scope.row.type == 2'>微信小程序</template>
                      <template v-if='scope.row.type == 4'>微信</template>
                      <template v-if='scope.row.type == 8'>支付宝</template>
                      <template v-if='scope.row.type == 16'>银联</template>
                      {{scope.row.amounts | handleMoney}}
                  </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button v-if='scope.row.status == 8 && (scope.row.return_type== 1 || scope.row.return_type== 2)' @click='changeSingStatus(1,scope.row)' type="primary">退款成功</el-button>
                    <el-button v-if='scope.row.status == 4 || scope.row.status == 5' @click='changeSingStatus(2,scope.row)' type="primary">买家申请退款</el-button>
                    <el-button v-if='scope.row.status == 2' type="primary">已自提</el-button>
                    <el-button v-if='scope.row.status == 6' @click='changeSingStatus(scope.row)' type="primary">买家申请退换</el-button>
                    <el-button v-if='scope.row.status == 8 && scope.row.return_type== 3' @click='changeSingStatus(scope.row)' type="primary">退换成功</el-button>
                    <template v-if='scope.row.status == 3 || scope.row.status == 8'>已提货</template>
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
                    <!-- <p class="warehouse-box-tit">{{v.title}}</p> -->
                    <p class="warehouse-box-con">{{(v.province==undefined?'':v.province) +v.city+v.area+v.address}}</p>
                </div>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import * as api from "@/api/OrderManage/OrderManage/index.js";
import * as pApi from "@/privilegeList/OrderManage/OrderManage/index.js";
import utils from "@/utils/index.js";
export default {
  components: { vBreadcrumb },

  data() {
    return {
      nav: ["订单管理", "订单详情"],
      detailUrl:'',
      orderId:'',
      boolFirst: false,
      boolsec: false,
      boolThr: false,
      boolFor: false,
      isShowPreferential: false, //优惠活动
      isShowWarehouse: false, // 更换提货仓
      orderStatus: "", //总订单状态: 1:待支付 2:待发货 3:待确认 4:待自提 5:确认收货 6:退款（关闭） 7:正常已完成 8:已关闭 9:用户删除 10:超时关闭
      markArr: [
        { label: "red", value: "1" },
        { label: "skyblue", value: "2" },
        { label: "lightgreen",value: "3" },
        { label: "orange", value: "4" },
        { label: "purple", value: "5" }
      ],
      tableData: [],
      warehouseArr: [],
      orderFreeTime: "",
      orderFinishTime: "",
      orderFreePayTime:'',
      // 订单信息
      orderMsg:{
        url:'', // 按钮状态(批量)
        sinUrl:'', //按钮状态(单个)
        status:'',  //订单状态
        star:'',  //星级
        adminRemark:'', //备注
        nickName:'', //昵称
        phone:'', //联系方式
        receiver:'',  //收货人
        recevicePhone:'',  //收货人电话
        receiveAddress:'',  //收货地址
        buyerRemark:'', //卖家备注
        storehouseName:'', //提货点
        orderNum:'',  //订单号
        createTime:'', //订单创建时间
        sysPayTime:'', // 平台支付时间
        payTime:'', //第三方支付时间
        deliveryTime:'',  // 发货时间
        tradeNo:'', //第三方支付交易号
      }
    };
  },

  activated() {
    // 获取订单信息
    this.orderId = this.$route.query.orderInfoId || sessionStorage.getItem('orderInfoId');
    this.getInfo();
    // 获取提货仓列表
    this.getStoreList();

    this.orderFinishTimeDown();
  },

  methods: {
    //  获取信息
    getInfo() {
      this.$axios.post(api.getOrderDetail,{orderId:this.orderId,url:pApi.getOrderDetail})
      .then((res) => {
        this.orderMsg.status = res.data.data.status;
        // pickedUp: 1：发货 2：自提
        // if(res.data.data.pickedUp == 1 && res.data.data.status==7){
        //   this.orderStatus = 7;
        // }else if(res.data.data.pickedUp == 2 && res.data.data.status==7){
        //   this.orderStatus = 9;
        // }else{
        //   this.orderStatus = res.data.data.status;
        // }
        this.orderStatus = res.data.data.status;
        this.getProgressStu(this.orderStatus.toString());
        this.orderMsg.star = res.data.data.star==null?'':this.markArr[res.data.data.star-1].label;
        this.orderMsg.adminRemark = res.data.data.adminRemark;
        this.orderMsg.nickName = res.data.data.nickname;
        this.orderMsg.phone = res.data.data.phone;
        this.orderMsg.receiver = res.data.data.receiver;
        this.orderMsg.recevicePhone = res.data.data.recevicePhone;
        this.orderMsg.receiveAddress = `${res.data.data.province == undefined?"":res.data.data.province}${res.data.data.city}${res.data.data.area}`;
        this.orderMsg.buyerRemark = res.data.data.buyerRemark;
        this.orderMsg.storehouseName = `${res.data.data.storehouseProvince == undefined?"":res.data.data.storehouseProvince}${res.data.data.storehouseCity}${res.data.data.storehouseArea}${res.data.data.storehouseAddress}`;
        this.orderMsg.orderNum = res.data.data.orderNum;
        this.orderMsg.createTime = res.data.data.createTime;
        this.orderMsg.sysPayTime = res.data.data.sysPayTime;
        this.orderMsg.payTime = res.data.data.payTime;
        this.orderMsg.deliveryTime = res.data.data.deliveryTime;
        this.orderMsg.tradeNo = res.data.data.tradeNo;
        this.orderFreePayTime = res.data.data.createTime;
        this.tableData = [];
        res.data.data.list.forEach((v,k)=>{
          v.totalPrice = res.data.data.totalPrice;
          v.freightPrice = res.data.data.freightPrice;
          v.tokenCoin = res.data.data.tokenCoin == null?'0':res.data.data.tokenCoin;
          v.balance = res.data.data.balance == null?'0':res.data.data.balance;
          v.userScore = res.data.data.userScore == null?'0':res.data.data.userScore;
          v.type = res.data.data.payType;
          v.amounts = res.data.data.amounts == null?'0':res.data.data.amounts;
          this.tableData.push(v);
        })
        this.orderFreeTimeDown(this.orderFreePayTime);
      }).catch((err) => {
        console.log(res)
      });
    },
    //  重置表单
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    // 判断进度条状态
    getProgressStu(n) {
      switch (n) {
        case "1":
          this.boolFirst = true;
          this.boolsec = false;
          this.boolThr = false;
          this.boolFor = false;
          break;
        case "2":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = false;
          this.boolFor = false;
          break;
        case "3":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          this.boolFor = false;
          break;
        case "4":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          this.boolFor = false;
          this.orderMsg.url = api.pickUpGoods;
          this.orderMsg.sinUrl = api.pickUpOrderProduct;
          break;
        case "5":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          this.boolFor = true;
          break;
        case "6":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          this.boolFor = true;
          break;
        case "7":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          this.boolFor = true;
          break;
        case "9":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          this.boolFor = true;
          break;
        case "9":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          this.boolFor = true;
          break;
        case "9":
          this.boolFirst = true;
          this.boolsec = true;
          this.boolThr = true;
          this.boolFor = true;
          break;
      }
    },
    // 合并单元格
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 5 || columnIndex == 6) {
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
    orderFreeTimeDown(createTime) {
      let timeOut = 1800000;
      let date = createTime;
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
    // 更改订单状态(批量)
    changeStatus(url) {
      this.$axios.post(url,{orderId:this.orderId})
      .then((res) => {
        this.$message.success(res.data.data);
        this.getInfo();
      }).catch((err) => {
        console.log(err);
      });
    },
    // 更改订单状态（单个）
    changeSingStatus(status,row){
      sessionStorage.setItem('afterSaleOprId',row.id);
      if(status == 2){
        this.$router.push({name:'afterSaleOpr',query:{'afterSaleOprId':row.id}});
      }
    },
    // 查看物流信息
    showLogisticsMsg() {},
    // 获取提货仓列表
    getStoreList(){
      this.warehouseArr = [];
      this.$axios.post(api.queryStoreHouseList,{})
      .then((res) => {
        res.data.data.forEach((v,k)=>{
          v.active = false;
          this.warehouseArr.push(v);
        })
      }).catch((err) => {
        console.log(err)
      });
    },
    // 更换提货仓
    changeWarehouse(row) {
      this.warehouseArr.forEach((v, k) => {
        v.active = false;
      });
      row.active = true;
      this.$axios.post(api.changeStoreHouse,{orderId:this.orderId,storeHouseId:row.id})
      .then((res) => {
        this.$message.success(res.data.data);
        this.orderMsg.storehouseName = row.province==undefined?'':row.province +row.city+row.area+row.address
      }).catch((err) => {
        console.log(err)
      });
    },
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