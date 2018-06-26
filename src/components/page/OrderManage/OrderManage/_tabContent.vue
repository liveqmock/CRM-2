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
        <div v-for="(v,k) in tableData" :key="k" class="tab-wrap">
            <div class="tab-content-title">
                <el-checkbox @change="orderCheckBox(v)"></el-checkbox>
                <span>订单号：{{v.orderNum}}</span>
                <span style="margin-left:30px">创建时间：{{v.orderCreateTime|formatDate}}</span>
                <div class="operate-btn-group">
                    <span @click="pushCloud(v)">推送云仓</span>
                    <span @click="orderInfo(v)" style="margin:0 15px 0 15px">订单详情</span>
                    <el-popover placement="bottom" width="150" v-model="v.isShowPop" trigger="click">
                        <span slot="reference" style="cursor:pointer">标记 &nbsp <span class="star"
                                                                                     :style="{color:v.starColor}">★</span></span>
                        <span v-for="(v1,k1) in markArr" :key="k1" @click="changeColor(v1,v)"
                              :style="{color:v1.label,fontSize:'22px',cursor:'pointer',marginRight:'5px'}">★</span>
                        <el-input v-model="v.markTip" placeholder="请输入备注"></el-input>
                    </el-popover>
                </div>
            </div>
            <div class="tab-content">
                <div class="left">
                    <div v-for="(value,index) in v.orderProduct" :key="index" class="bar">
                        <div class="name">
                            <img :src="value.imgUrl" alt="">
                            <span class="pro-name">{{value.productName}}</span>
                            <span class="pro-spec">{{value.spec}}</span>
                        </div>
                        <div class="price">{{value.price}}</div>
                        <div class="num">{{value.num}}</div>
                        <div class="consignee">{{value.receiver}}</div>
                    </div>
                </div>
                <div class="center">
                    <div class="status"
                         :style="{height:120*v.orderProduct.length+v.orderProduct.length-1+'px',lineHeight:120*v.orderProduct.length+v.orderProduct.length-1+'px'}">
                        <template>{{status}}</template>
                    </div>
                    <div class="collection"
                         :style="{height:120*v.orderProduct.length+v.orderProduct.length-1+'px',paddingTop:120*v.orderProduct.length/2-30+'px'}">
                        <span>{{v.totalPrice | handleMoney}}<br>（含运费：{{v.postAge | handleMoney}}）</span>
                    </div>
                </div>
                <div class="right">
                    <div v-for="(value,index) in v.orderProduct" :key="index" class="bar">
                        <div class="shipper">{{value.origin}}</div>
                        <div class="operate">
                            <el-button v-if='value.status == "4"' type="primary">以自提</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                layout="total, prev, pager, next, jumper"
                :total="page.totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import * as api from "@/api/OrderManage/OrderManage/index.js";
import * as pApi from "@/privilegeList/OrderManage/OrderManage/index.js";
import utils from "@/utils/index.js";
export default {
  props: ["name"],

  components: {},

  data() {
    return {
      // 权限控制
      p: {
        addProduct: false,
        queryProductStockList: false,
        querySaleSpecList: false,
        queryProductPriceSaleSpecList: false,
        findProductAllDataById: false,
        updateProductShelves: false,
        findProductById: false,
        updateProductStatus: false
      },
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
      markArr: [
        { label: "red", value: "1" },
        { label: "skyblue", value: "2" },
        { label: "lightgreen",value: "3" },
        { label: "orange", value: "4" },
        { label: "purple", value: "5" }
      ],
      tableData: [],
      tableLoading: false,
      page: {
        currentPage: 1,
        totalPage: 0
      },
      form: {
        name: "",
        brandId: "",
        barCode: "",
        firstCategoryId: "",
        secondCategoryId: "",
        saleMin: "",
        saleMax: "",
        priceMin: "",
        priceMax: ""
      },
      url: "", //请求地址
      priUrl: "" //权限地址
    };
  },
  activated() {
    this.pControl();
    this.getList(1);
  },
  mounted() {
    console.log(this.name);
    let n = this.name;
    if (n == "allOrder") {
      //所有订单
      this.url = "";
      this.status = "";
    } else if (n == "toBePaid") {
      //待支付订单
      this.url = "4";
      this.status = "待支付";
    } else if (n == "toBeSend") {
      //待发货订单
      this.url = "5";
      this.status = "待发货";
    } else if (n == "auditProduct") {
      //待支付订单
      this.url = "";
      this.status = "待支付";
    } else if (n == "toBeStay") {
      //待自提订单
      this.url = api.queryPickUpByCustomerOrderPageList;
      this.priUrl = pApi.queryPickUpByCustomerOrderPageList;
      this.status = "待自提";
    } else if (n == "toBeConfirm") {
      //待确认订单
      this.url = "3";
      this.status = "待确认";
    } else if (n == "refund") {
      //退款中订单
      this.url = "3";
      this.status = "退款中";
    } else if (n == "finished") {
      //已完成订单
      this.url = "3";
      this.status = "已完成";
    } else if (n == "closed") {
      //已关闭订单
      this.url = "3";
      this.status = "已关闭";
    } else if (n == "freeze") {
      //已冻结订单
      this.url = "3";
      this.status = "已冻结";
    }
    this.pControl();
    this.getList(1);
  },
  methods: {
    // 权限控制
    pControl() {
      for (const k in this.p) {
        this.p[k] = utils.pc(pApi[k]);
      }
    },
    // 获取列表数据
    getList(val) {
      let data = {};
      let that = this;
      data = this.form;
      data.page = val;
      data.status = this.status;
      data.url = this.priUrl;
      this.tableLoading = true;
      this.$axios
        .post(that.url, data)
        .then(res => {
          this.tableData = [];
          for (let i in res.data.data.data[0]) {
            res.data.data.data[0][i].isShowPop = false;
            this.tableData.push(res.data.data.data[0][i]);
          }
          this.page.totalPage = res.data.data.resultCount;
          this.tableLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.tableLoading = false;
        });
    },
    // 修改星级
    changeColor(v1, v) {
        let data = {};
        data.orderId = v.id;
        data.star = v1.value;
        data.remarks = v.markTip == undefined?'':v.markTip;
        this.$axios.post(api.orderSign,data)
        .then((res) => {
            this.$message.success(res.data.data);
            v.starColor = v1.label;
            v.isShowPop = false;
        }).catch((err) => {
            console.log(res)
        });
    },
    // 推送云仓
    pushCloud(row) {
      console.log(row);
    },
    // 订单详情
    orderInfo(row) {
      sessionStorage.setItem("orderInfoId", row.id);
      this.$router.push({ name: "orderInfo", query: { orderInfoId: row.id } });
    },
    // 订单多选框
    orderCheckBox(row) {
      console.log(row);
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getList(val);
    }
  }
};
</script>
<style lang='less' scoped>
.order-manage-tab {
  width: 100%;
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
        span {
          color: #33b4ff;
          cursor: pointer;
        }
      }
    }
    .tab-content {
      .left {
        float: left;
        width: 53%;
        border-right: 1px solid #eee;
        .bar {
          padding: 10px;
          box-sizing: border-box;
          font-size: 14px;
          overflow: hidden;
          border-bottom: 1px solid #eee;
          .name {
            float: left;
            position: relative;
            display: inline-block;
            height: 100px;
            width: 43%;
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
          .price {
            float: left;
            display: inline-block;
            width: 16%;
            height: 100px;
            margin-left: 4%;
            text-align: center;
            line-height: 100px;
          }
          .num {
            float: left;
            display: inline-block;
            width: 16%;
            height: 100px;
            text-align: center;
            line-height: 100px;
          }
          .consignee {
            float: left;
            display: inline-block;
            width: 16%;
            height: 100px;
            margin-left: 4%;
            text-align: center;
            line-height: 100px;
          }
        }
        .bar:last-child {
          border-bottom: none;
        }
      }
      .center {
        float: left;
        border-right: 1px solid #eee;
        width: 21%;
        font-size: 14px;
        .status {
          display: inline-block;
          float: left;
          width: 50%;
          text-align: center;
          border-right: 1px solid #eee;
        }
        .collection {
          display: inline-block;
          float: left;
          width: 46%;
          text-align: center;
          box-sizing: border-box;
        }
      }
      .right {
        float: left;
        width: 25%;
        .bar {
          padding: 10px;
          box-sizing: border-box;
          font-size: 14px;
          overflow: hidden;
          border-bottom: 1px solid #eee;
          .shipper {
            float: left;
            width: 36%;
            height: 100px;
            text-align: center;
            line-height: 100px;
          }
          .operate {
            float: left;
            width: 63%;
            height: 100px;
            text-align: center;
            line-height: 100px;
          }
        }
        .bar:last-child {
          border: none;
        }
      }
    }
  }
}
</style>
