<template>
    <div class="product-list">
        <v-breadcrumb :nav='nav'></v-breadcrumb>
        <el-card class="query-panue" :body-style="{ padding: '20px 20px'}">
            <el-form :model="form" ref="form" inline label-width="120px">
                <el-form-item prop="orderNum" label="订单编号">
                    <el-input v-model="form.orderNum" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                <el-form-item prop="productName" label="产品名称">
                    <el-input v-model="form.productName" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item prop="stars" label="订单标记">
                    <el-select v-model="form.stars" placeholder="请选择订单标记">
                      <el-option v-for="(v,k) in starArr" :key="k" :label="v.label" :value="v.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="receiver" label="收货人姓名">
                    <el-input v-model="form.receiver" placeholder="请输入收货人姓名"></el-input>
                </el-form-item>
                <el-form-item prop="recevicePhone" label="收货人手机">
                    <el-input v-model="form.recevicePhone" placeholder="请输入收货人手机号"></el-input>
                </el-form-item>
                <el-form-item prop="shutDownStatus" label="关闭状态">
                    <el-select v-model="form.closeReason" placeholder="请选择">
                      <el-option label="暂不选择" value=""></el-option>
                      <el-option label="已关闭（超时关闭）" value="1"></el-option>
                      <el-option label="已关闭（用户关闭）" value="2"></el-option>
                      <el-option label="已关闭（退款关闭）" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="pickUp" label="完成类型">
                    <el-select v-model="form.pickUp" placeholder="请选择">
                      <el-option label="暂不选择" value=""></el-option>
                      <el-option label="已完成（快递收货）" value="1"></el-option>
                      <el-option label="已完成（买家自提）" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="applyForType" label="申请类型">
                    <el-select v-model="form.applyForType" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="申请退款（退款退货）" value="1"></el-option>
                      <el-option label="申请退换（退货）" value="2"></el-option>
                      <el-option label="退款成功" value="3"></el-option>
                      <el-option label="退换成功" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="serviceStatus" label="售后状态">
                    <el-select v-model="form.serviceStatus" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="申请售后" value="1"></el-option>
                      <el-option label="售后成功" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="dateRange" label="下单时间">
                  <el-date-picker
                        v-model="dateRange"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm(1)">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style='margin-top:20px;minHeight:90vh' :body-style="{ padding: '20px 50px' }">
            <div class="btn-group">
                <el-button type="primary">批量导出</el-button>
                <el-button type="warning" @click="orderBtn('today')">今日订单</el-button>
                <el-button type="warning" @click="orderBtn('yesterday')">昨日订单</el-button>
                <el-button type="warning" @click="orderBtn('threeMonths')">最近三个月订单</el-button>
            </div>
            <template>
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
                            <span @click="orderInfo(v)" style="margin:0 15px 0 15px">订单详情</span>
                            <el-popover placement="bottom" width="150" v-model="v.isShowPop" trigger="click">
                                <span slot="reference" style="cursor:pointer">标记 &nbsp <span class="star"
                                                                                            :style="{color:v.starColor}">★</span></span>
                                <span v-for="(v1,k1) in markArr" :key="k1" @click="changeColor(v1,v)"
                                    :style="{color:v1.label,fontSize:'22px',cursor:'pointer',marginRight:'5px'}">★</span>
                                <el-input v-model="v.adminRemark" placeholder="请输入备注"></el-input>
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
                                <template v-if='v.status == 1'>待支付</template>
                                <template v-if='v.status == 2'>待发货</template>
                                <template v-if='v.status == 3'>待确认</template>
                                <template v-if='v.status == 4'>待自提</template>
                                <template v-if='v.status == 5'>已冻结</template>
                                <template v-if='v.status == 6'>退货中</template>
                                <template v-if='v.status == 7'>已完成</template>
                                <template v-if='v.status == 8'>已关闭</template>
                            </div>
                            <div class="collection"
                                :style="{height:120*v.orderProduct.length+v.orderProduct.length-1+'px',paddingTop:120*v.orderProduct.length/2-30+'px'}">
                                <span>{{v.totalPrice | handleMoney}}<br>（含运费：{{v.freightPrice | handleMoney}}）</span>
                            </div>
                        </div>
                        <div class="right">
                            <div v-for="(value,index) in v.orderProduct" :key="index" class="bar">
                                <div class="shipper">{{value.origin}}</div>
                                <div class="operate">
                                    <el-button v-if='value.status == "4"' type="primary">已自提</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
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
        </el-card>
    </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import * as api from "@/api/OrderManage/OrderManage/index.js";
import * as pApi from "@/privilegeList/OrderManage/OrderManage/index.js";
import utils from "@/utils/index.js";
import moment from 'moment';

export default {
  components: {
    vBreadcrumb
  },

  data() {
    return {
      nav: ["订单管理", "订单管理","待处理订单"],
      tabLoading: false,
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
      starArr: [
        { label: "红色标记", value: "1" },
        { label: "蓝色标记", value: "2" },
        { label: "绿色标记", value: "3" },
        { label: "黄色标记", value: "4" },
        { label: "紫色标记", value: "5" }
      ],
      markArr: [
        { label: "red", value: "1" },
        { label: "skyblue", value: "2" },
        { label: "lightgreen", value: "3" },
        { label: "orange", value: "4" },
        { label: "purple", value: "5" }
      ],
      status: "",
      dateRange:[],
      form: {
        orderNum: "",
        productName: "",
        receiver: "",
        recevicePhone: "",
        stars: "",
        today: "",
        yesterday: "",
        threeMonths: "",
        closeReason:"",
        pickUp:"",
        applyForType:'',
        serviceStatus:''
      },
      url: "", //请求地址
      priUrl: "", //权限地址,
      tableData: [],
      page: {
        currentPage: 1,
        totalPage: 0
      }
    };
  },

  created() {
    this.priUrl = pApi.queryAllOrderPageList;
  },

  activated() {
    this.pControl();
    this.submitForm(1);
  },

  methods: {
    // 权限控制
    pControl() {
      for (const k in this.p) {
        this.p[k] = utils.pc(pApi[k]);
      }
    },
    // 提交表单
    submitForm(val) {
      this.page.currentPage = 1;
      this.tableData = [];
      let data = {};
      data.startTime =this.dateRange.length!=0?moment(this.dateRange[0]).format('YYYY-MM-DD HH:mm:ss'):'';
      data.endTime = this.dateRange.length!=0?moment(this.dateRange[1]).format('YYYY-MM-DD HH:mm:ss'):'';
      Object.assign(data, this.form);
      data.page = val;
      data.url = this.priUrl;
      this.tabLoading = true;
      this.$axios
        .post(api.queryPendingOrderPageList, data)
        .then(res => {
          this.tabLoading = false;
          for (let i in res.data.data.data) {
            res.data.data.data[i].isShowPop = false;
            res.data.data.data[i].starColor =
              this.markArr[res.data.data.data[i].stars] == undefined
                ? "#ccc"
                : this.markArr[res.data.data.data[i].stars - 1].label;
            this.tableData.push(res.data.data.data[i]);
          }
          this.page.totalPage = res.data.data.resultCount;
            this.form.today = '';
            this.form.yesterday = '';
            this.form.threeMonths = '';
        })
        .catch(err => {
          this.tabLoading = false;
          console.log(err);
        });
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.submitForm(val);
    },
    //  重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.today = "";
      this.form.yesterday = "";
      this.form.threeMonths = "";
      this.dateRange = []
    },
    // 修改星级
    changeColor(v1, v) {
      let data = {};
      data.orderId = v.id;
      data.star = v1.value;
      data.remarks = v.adminRemark;
      this.$axios
        .post(api.orderSign, data)
        .then(res => {
          this.$message.success(res.data.data);
          v.starColor = v1.label;
          v.isShowPop = false;
        })
        .catch(err => {
          console.log(res);
        });
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
    // 订单按钮
    orderBtn(status) {
      if (status == "today") {
        this.form.today = "yes";
        this.form.yesterday = "";
        this.form.threeMonths = "";
      } else if (status == "yesterday") {
        this.form.today = "";
        this.form.yesterday = "yes";
        this.form.threeMonths = "";
      } else if (status == "threeMonths") {
        this.form.today = "";
        this.form.yesterday = "";
        this.form.threeMonths = "yes";
      }
      this.submitForm(1);
    },
    // 更改订单状态（单个）
    changeStatus(url, row) {
      this.$axios
        .post(url, { orderProductId: row.id })
        .then(res => {
          this.$message.success(res.data.data);
          this.submitForm(1);
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>
<style lang='less'>
.product-list {
  .el-tabs__active-bar {
    background-color: #ff1e30;
  }
  .el-tabs__item.is-active,
  .el-tabs__item:hover {
    color: #ff1e30;
  }
  .query-panue {
    .el-input--small .el-input__inner,
    .el-input--small {
      width: 220px;
    }
  }
  .btn-group {
    margin-bottom: 10px;
  }
  .block {
    margin: 20px 0px;
  }
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
