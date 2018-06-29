<template>
    <div class="apply-opr">
        <!--换货-->
        <div v-if="opr==1">
            <v-breadcrumb :nav='nav'></v-breadcrumb>
            <el-card :body-style="{ padding: '28px 50px' }">
                <!-- 订单状态 -->
                <div class="order-status">
                    <div :class="{'s-block':true,'s-block-bgcolor':boolFirst}">
                        <div class="s-block-content">买家申请换货</div>
                    </div>
                    <div :class="{'s-block':true,'s-block-bgcolor':boolsec}">
                        <div class="s-block-content">买家退货</div>
                    </div>
                    <div :class="{'s-block':true,'s-block-bgcolor':boolThr}">
                        <div class="s-block-content">换货完毕</div>
                    </div>
                </div>
                <div>
                    <div class="left">
                        <div class="info-area">
                            <div class="title red" v-if="status==1">请等待买家退货还剩{{day}}天{{time}}</div>
                            <div class="title red" v-if="status==2">买家已发货</div>
                            <div class="title red" v-if="status==3">换货完毕</div>
                            <div v-if="status==3">
                                <div class="tips">交易完成</div>
                                <div class="tips" style="margin-top: 30px">
                                    <span>买家已寄出</span><span>物流公司：邮政小包</span><span>物流单号：465165464164651</span><span
                                    class="blue" @click="watchLogistics">查看物流</span></div>
                                <div class="tips" style="margin-top: 10px">
                                    <span>商家已寄出</span><span>物流公司：邮政小包</span><span>物流单号：465165464164651</span><span
                                    class="blue" @click="watchLogistics">查看物流</span></div>
                            </div>
                            <div v-else>
                                <div class="tips">提示：收到买家退货时，请验货后同意退款</div>
                                <div class="tips" style="margin-left: 40px">如果买家再超时结束前未退货，退货申请将自动关闭</div>
                                <div class="tips" style="margin-top: 10px" v-if="status==2"><span>买家已寄出</span><span>物流公司：邮政小包</span><span>物流单号：465165464164651</span><span
                                    class="blue" @click="watchLogistics">查看物流</span></div>
                                <div style="margin-top: 30px" v-if="status==2">
                                    <el-button type="danger" @click="reGoodsClick(1)">同意换货</el-button>
                                    <el-button type="primary" @click="reGoodsClick(2)">变更退货</el-button>
                                    <el-button type="warning" @click="reGoodsClick(3)">产品报损</el-button>
                                </div>
                            </div>

                        </div>
                        <div class="info-other" v-if="status==3">
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了换货申请</span><span>2018-12-12 12:12:12</span></div>
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了换货申请</span><span>2018-12-12 12:12:12</span></div>
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了换货申请</span><span>2018-12-12 12:12:12</span></div>
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了换货申请</span><span>2018-12-12 12:12:12</span></div>
                        </div>
                        <div class="info-other" v-else>
                            <span>{{name}}</span><span>发起了换货申请</span><span>2018-12-12 12:12:12</span>
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <div class="title">换货详情</div>
                            <div>
                                <img src="../../../../assets/images/avatar.jpg" alt="" class="img">
                                <div class="goods-info">
                                    <div><p class="">苹果8xApple/苹果 iPhone X 4G手机</p>
                                        <p>phonex苹果x屏</p></div>
                                    <div>iphone X 金色 128G</div>
                                </div>
                                <div class="item">买家：{{name}}</div>
                                <div class="item">订单编号：{{orderNum}}</div>
                                <div class="item">成交时间：2018-12-12 12:12:12</div>
                                <div class="item">单价：¥80.50*1(数量)</div>
                                <div class="item">邮费：¥8.00</div>
                                <div class="item">商品总价：¥88.50</div>
                                <div class="item">原因：我不想买了</div>
                                <div class="item">要求：换货</div>
                                <div class="item">更换型号：32G，黑色，全网通 数量*1</div>
                                <div class="item">买家说明：我是刷单的.....</div>
                                <div class="item">图片：</div>
                                <div>
                                    <img src="../../../../assets/images/avatar.jpg" alt="" class="img">
                                    <img src="../../../../assets/images/avatar.jpg" alt="" class="img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </el-card>
        </div>
        <!--退货弹窗-->
        <div v-if="opr==2">
            <v-breadcrumb :nav='nav'></v-breadcrumb>
            <el-card :body-style="{ padding: '28px 50px' }">
                <!-- 订单状态 -->
                <div class="order-status">
                    <div :class="{'s-block':true,'s-block-bgcolor':boolFirst}">
                        <div class="s-block-content">买家申请退货退款</div>
                    </div>
                    <div :class="{'s-block':true,'s-block-bgcolor':boolsec}">
                        <div class="s-block-content">买家退货</div>
                    </div>
                    <div :class="{'s-block':true,'s-block-bgcolor':boolThr}">
                        <div class="s-block-content">退货退款完毕</div>
                    </div>
                </div>
                <div>
                    <div class="left">
                        <div class="info-area">
                            <div class="title red" v-if="status==1">请等待买家退货还剩{{day}}天{{time}}</div>
                            <div class="title red" v-if="status==2">买家已发货</div>
                            <div class="title red" v-if="status==3">退款成功</div>
                            <div v-if="status==3">
                                <div class="tips">退款成功时间：2018-06-12 00:04:25</div>
                                <div class="tips">退款余额：￥2.00</div>
                                <div class="tips">退款代币：2代币</div>
                                <div class="tips">退还积分：23积分</div>
                                <div class="tips">退还金额：￥90.00元</div>
                                <div class="tips" style="margin-top: 10px">
                                    <span>买家已寄出</span><span>物流公司：邮政小包</span><span>物流单号：465165464164651</span><span
                                    class="blue" @click="watchLogistics">查看物流</span></div>
                            </div>
                            <div v-else>
                                <div class="tips">提示：收到买家退货时，请验货后同意退款</div>
                                <div class="tips" style="margin-left: 40px">如果买家再超时结束前未退货，退货申请将自动关闭</div>
                                <div class="tips" style="margin-top: 10px" v-if="status==2"><span>买家已寄出</span><span>物流公司：邮政小包</span><span>物流单号：465165464164651</span><span
                                    class="blue" @click="watchLogistics">查看物流</span></div>
                                <div style="margin-top: 30px" v-if="status==2">
                                    <el-button type="danger" @click="refundClick(1)">同意退款</el-button>
                                    <el-button type="primary" @click="refundClick(2)">拒绝退款</el-button>
                                    <el-button type="warning" @click="reGoodsClick(3)">产品报损</el-button>
                                </div>
                            </div>

                        </div>
                        <div class="info-other" v-if="status==3">
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了退货申请</span><span>2018-12-12 12:12:12</span></div>
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了退货申请</span><span>2018-12-12 12:12:12</span></div>
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了退货申请</span><span>2018-12-12 12:12:12</span></div>
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了退货申请</span><span>2018-12-12 12:12:12</span></div>
                        </div>
                        <div class="info-other" v-else>
                            <span>{{name}}</span><span>发起了退货退款申请</span><span>2018-12-12 12:12:12</span>
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <div class="title">退款详情</div>
                            <div>
                                <img src="../../../../assets/images/avatar.jpg" alt="" class="img">
                                <div class="goods-info">
                                    <div><p class="">苹果8xApple/苹果 iPhone X 4G手机</p>
                                        <p>phonex苹果x屏</p></div>
                                    <div>iphone X 金色 128G</div>
                                </div>
                                <div class="item">买家：{{name}}</div>
                                <div class="item">订单编号：{{orderNum}}</div>
                                <div class="item">成交时间：2018-12-12 12:12:12</div>
                                <div class="item">单价：¥80.50*1(数量)</div>
                                <div class="item">邮费：¥8.00</div>
                                <div class="item">商品总价：¥88.50</div>
                                <div class="item">退款编号：{{orderNum}}</div>
                                <div class="item">退款金额：¥88.50</div>
                                <div class="item">原因：我不想买了</div>
                                <div class="item">要求：换货</div>
                                <div class="item">买家说明：我是刷单的.....</div>
                                <div class="item">图片：</div>
                                <div>
                                    <img src="../../../../assets/images/avatar.jpg" alt="" class="img">
                                    <img src="../../../../assets/images/avatar.jpg" alt="" class="img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <!--仅退款弹窗-->
        <div v-if="opr==3">
            <v-breadcrumb :nav='nav'></v-breadcrumb>
            <el-card :body-style="{ padding: '28px 50px' }">
                <!-- 订单状态 -->
                <div class="order-status">
                    <div :class="{'s-block':true,'s-block-bgcolor':boolFirst}">
                        <div class="s-block-content">买家申请仅退款</div>
                    </div>
                    <div :class="{'s-block':true,'s-block-bgcolor':boolsec}">
                        <div class="s-block-content">卖家处理退款申请</div>
                    </div>
                    <div :class="{'s-block':true,'s-block-bgcolor':boolThr}">
                        <div class="s-block-content">退款完毕</div>
                    </div>
                </div>
                <div>
                    <div class="left">
                        <div class="info-area">
                            <div class="title red" v-if="status==1">请等待买家退货还剩{{day}}天{{time}}</div>
                            <div class="title red" v-if="status==2">请处理退款申请</div>
                            <div class="title red" v-if="status==3">退款完毕</div>
                            <div v-if="status==3">
                                <div class="tips">退款成功时间：2018-06-12 00:04:25</div>
                                <div class="tips">退款余额：￥2.00</div>
                                <div class="tips">退款代币：2代币</div>
                                <div class="tips">退还积分：23积分</div>
                                <div class="tips">退还金额：￥90.00元</div>
                            </div>
                            <div v-else>
                                <div class="tips">提示：如果未发货，请点击同意退款给买家</div>
                                <div class="tips" style="margin-left: 40px">如果实际已发货，请主动与买家联系</div>
                                <div style="margin-top: 30px" v-if="status==2">
                                    <el-button type="danger" @click="refundClick(1)">同意退款</el-button>
                                    <el-button type="primary" @click="refundClick(2)">拒绝退款</el-button>
                                </div>
                            </div>

                        </div>
                        <div class="info-other" v-if="status==3">
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了退款申请</span><span>2018-12-12 12:12:12</span></div>
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了退货申请</span><span>2018-12-12 12:12:12</span></div>
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了退货申请</span><span>2018-12-12 12:12:12</span></div>
                            <div class="recode-item">
                                <span>{{name}}</span><span>发起了退货申请</span><span>2018-12-12 12:12:12</span></div>
                        </div>
                        <div class="info-other" v-else>
                            <span>{{name}}</span><span>发起了退款申请</span><span>2018-12-12 12:12:12</span>
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <div class="title">退款详情</div>
                            <div>
                                <img src="../../../../assets/images/avatar.jpg" alt="" class="img">
                                <div class="goods-info">
                                    <div><p class="">苹果8xApple/苹果 iPhone X 4G手机</p>
                                        <p>phonex苹果x屏</p></div>
                                    <div>iphone X 金色 128G</div>
                                </div>
                                <div class="item">买家：{{name}}</div>
                                <div class="item">订单编号：{{orderNum}}</div>
                                <div class="item">成交时间：2018-12-12 12:12:12</div>
                                <div class="item">单价：¥80.50*1(数量)</div>
                                <div class="item">邮费：¥8.00</div>
                                <div class="item">商品总价：¥88.50</div>
                                <div class="item">退款编号：{{orderNum}}</div>
                                <div class="item">退款金额：¥88.50</div>
                                <div class="item">原因：我不想买了</div>
                                <div class="item">要求：换货</div>
                                <div class="item">买家说明：我是刷单的.....</div>
                                <div class="item">图片：</div>
                                <div>
                                    <img src="../../../../assets/images/avatar.jpg" alt="" class="img">
                                    <img src="../../../../assets/images/avatar.jpg" alt="" class="img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </el-card>
        </div>
        <!--消息确认弹窗-->
        <div class="pwd-mask" v-if="tipsMask">
            <div class="box">
                <div class="mask-title">
                    <icon class="ico" ico='icon-jinggao'/>
                    温馨提示
                </div>
                <div class="mask-content">
                    <span class="del-tip">{{info}}</span>
                    <div class="del-btn-group">
                        <el-button :loading="btnLoading" @click="oprSure(true)" class="del-btn" type="danger">
                            {{btnInf}}
                        </el-button>
                        <el-button @click="tipsMask=false">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!--产品报损弹窗-->
        <el-dialog title="产品报损" :visible.sync="badDebtMask">
            <el-form v-model="form" label-width="100px">
                <el-form-item label="报损原因">
                    <el-select v-model="form.reason" placeholder="请选择报损原因">
                        <el-option label="影响产品二次销售" value="1"></el-option>
                        <el-option label="产品并非出售产品" value="2"></el-option>
                        <el-option label="其他" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报损说明">
                    <el-input type="textarea" v-model="form.remark" auto-complete="off"
                              placeholder="请输入说明文字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">确认提交</el-button>
                <el-button @click="badDebtMask=false">取 消</el-button>
            </div>
        </el-dialog>
        <!--同意退款弹窗-->
        <el-dialog title="确认退款金额" class="agreeMask" :visible.sync="agreeMask">
            <el-form v-model="form" label-width="110px">
                <el-form-item label="买家支付方式：">第三方支付+余额支付+代币支付</el-form-item>
                <div class="row">
                    <el-form-item label="退还代币">
                        <el-input v-model="form.remark" auto-complete="off" placeholder="请输入退还代币"></el-input>
                        <span class="mar-left5">枚</span>
                    </el-form-item>
                    <el-form-item label="退还余额">
                        <el-input v-model="form.remark" auto-complete="off" placeholder="请输入退还余额"></el-input>
                        <span class="mar-left5">元</span>
                    </el-form-item>
                </div>
                <div class="row">
                    <el-form-item label="退还积分">
                        <el-input v-model="form.remark" auto-complete="off" placeholder="请输入退还积分"></el-input>
                        <span class="mar-left5">分</span>
                    </el-form-item>
                    <el-form-item label="退还金额">
                        <el-input v-model="form.remark" auto-complete="off" placeholder="请输入退还金额"></el-input>
                        <span class="mar-left5">元</span>
                    </el-form-item>
                </div>
                <div class="row">
                    <el-form-item label="支付手续费">
                        <el-input v-model="form.remark" auto-complete="off" placeholder="请输入支付手续费"></el-input>
                        <span class="mar-left5">元</span>
                    </el-form-item>
                    <el-form-item label="退款手续费">
                        <el-input v-model="form.remark" auto-complete="off" placeholder="请输入退款手续费"></el-input>
                        <span class="mar-left5">元</span>
                    </el-form-item>
                </div>
                <el-form-item label="退款账户：">支付宝 中国建设银行 6212***********1203</el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="refundSubmit(1)">确认退款金额</el-button>
            </div>
        </el-dialog>
        <!--拒绝退款弹窗-->
        <el-dialog title="拒绝退款" :visible.sync="rejectMask">
            <el-form v-model="form" label-width="100px">
                <el-form-item label="拒绝原因">
                    <el-select v-model="form.reason" placeholder="请选择报损原因">
                        <el-option label="影响产品二次销售" value="1"></el-option>
                        <el-option label="产品并非出售产品" value="2"></el-option>
                        <el-option label="其他" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="拒绝说明">
                    <el-input type="textarea" v-model="form.remark" auto-complete="off"
                              placeholder="请输入说明文字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="refundSubmit(2)">确认提交</el-button>
                <el-button @click="rejectMask=false">取 消</el-button>
            </div>
        </el-dialog>
        <!--物流详情弹窗-->
        <v-logistics v-if="isShowLogistics" @msg="logisticsMask"></v-logistics>
    </div>
</template>

<script>
    import vBreadcrumb from "@/components/common/Breadcrumb.vue";
    import vLogistics from "@/components/common/logistics.vue";
    import icon from "../../../common/ico.vue";
    export default {
        components: {vBreadcrumb,icon,vLogistics},

        data() {
            return {
                nav: ["订单管理", "申请操作"],
                productId:'',
                opr: 3,//1换货2退货3仅退款
                boolFirst: true,
                boolsec: false,
                boolThr: false,
                orderStatus: '1', //订单状态
                name: '张三',
                day: 1,
                time: '23:15:45',
                orderNum: '6652498468464646',
                status: 2,//3种售后对应的状态值
                info: '',//温馨提示信息
                btnInf: '',//按钮信息
                tipsMask: false,
                btnLoading: false,
                badDebtMask: false,
                agreeMask: false,
                rejectMask: false,
                isShowLogistics: false,
                form: {
                    reason: '',
                    remark: ''
                }
            };
        },

        activated() {
            this.productId = this.$route.query.afterSaleOprId || sessionStorage.getItem('afterSaleOprId');
            console.log(this.productId)
            this.getInfo();
        },

        methods: {
            getInfo() {

            },
            //退换货,产品报损按钮
            reGoodsClick(num) {
                let that = this;
                if (num == 3) {
                    that.badDebtMask = true
                } else {
                    that.tipsMask = true;
                }
                if (num == 1) {
                    that.info = '请确保产品不影响二次销售';
                    that.btnInf = '确认收货'
                }
            },
            oprSure() {
                this.tipsMask = false
            },
            //是否同意退款按钮
            refundClick(num) {
                let that = this;
                if (num == 1) {//同意
                    that.agreeMask = true
                } else {//拒绝
                    that.rejectMask = true;
                }
            },
            //报损提交
            submit() {
                this.badDebtMask = false
            },
            //是否同意退款提交
            refundSubmit(num) {
                let that = this;
                if (num == 1) {
                    that.agreeMask = false
                } else {
                    that.rejectMask = false
                }
            },
            //查看物流
            watchLogistics(){
                this.isShowLogistics=true
            },
            // 关闭物流弹窗
            logisticsMask(msg) {
                this.isShowLogistics = msg;
            },
        }
    }

</script>
<style lang='less'>
    .apply-opr {
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
        .title {
            font-size: 24px;
            height: 40px;
            line-height: 40px;
        }
        .left {
            float: left;
            width: 55%;
            padding: 40px 0 0 40px;
            .red {
                color: #ff6868;
            }
            .tips {
                font-size: 14px;
                color: #999999;
                height: 24px;
                line-height: 24px;
                span:nth-child(2) {
                    margin: 0 40px;
                }
                .blue {
                    color: #33b4ff;
                    margin-left: 40px;
                    cursor: pointer;
                }
            }
            .info-area {
                height: 300px
            }
            .info-other {
                font-size: 14px;
                color: #666666;
                .recode-item {
                    height: 30px;
                    line-height: 30px;
                }
            }
            .info-other span:nth-child(2) {
                margin: 0 40px;
            }
        }
        .right {
            float: right;
            width: 38%;
            padding: 40px 0 40px 40px;
            border-left: 1px solid #dddddd;
            color: #222222;
            .item {
                font-size: 14px;
                height: 30px;
                line-height: 30px;
            }
            .img {
                width: 100px;
                height: 100px;
                background-color: #ffffff;
                border: solid 1px #eeeeee;
                margin-right: 10px;
                vertical-align: top;
            }
            .goods-info {
                display: inline-block;
                font-size: 14px;
                margin-top: 10px;
                div:first-child {
                    height: 60px;
                }
            }
        }
        .pwd-mask {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            .box {
                position: relative;
                width: 530px;
                height: 305px;
                background-color: #fff;
                border-radius: 10px;
                overflow: hidden;
                .mask-title {
                    width: 100%;
                    height: 56px;
                    border-bottom: 1px solid #ccc;
                    padding-left: 45px;
                    box-sizing: border-box;
                    text-align: center;
                    line-height: 56px;
                    color: #ff6868;
                    font-weight: 700;
                    .ico {
                        position: absolute;
                        top: 16px;
                        left: 228px;
                        color: red;
                        font-size: 20px;
                    }
                }
                .mask-content {
                    position: relative;
                    width: 100%;
                    height: 248px;
                    overflow: hidden;
                    padding: 30px 45px 0 45px;
                    box-sizing: border-box;
                    .del-tip {
                        position: absolute;
                        top: 30%;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 22px;
                    }
                    .del-btn-group {
                        width: 180px;
                        display: flex;
                        justify-content: space-between;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        bottom: 15%;
                        .del-btn {
                            background-color: #ff6868;
                        }
                    }
                }
            }
        }
        /*弹窗样式*/
        .el-dialog {
            width: 530px;
            border-radius: 10px;
        }
        .el-dialog__header {
            border-bottom: 1px solid #eee;
            padding: 20px 20px 10px 50px;
        }
        .el-dialog__title {
            color: #ff6868;
        }
        .el-dialog .el-input {
            display: inline;
        }
        .el-dialog .el-input__inner {
            width: 300px;
        }
        .el-select .el-input__inner {
            width: 300px;
        }

        .icon-area .el-input__inner {
            width: 300px;
        }
        .el-input__suffix {
            line-height: 24px;
        }

        .el-dialog__footer {
            margin-right: 30px;
        }
        .el-textarea__inner {
            width: 300px;
            height: 90px;
            resize: none;
        }
        .agreeMask{
            .el-dialog {
                width: 710px;
            }
            .el-dialog .el-input__inner {
                width: 180px;
            }
            .el-select .el-input__inner {
                width: 180px;
            }

            .icon-area .el-input__inner {
                width: 180px;
            }
            .el-dialog__footer {
                text-align: center;
            }
            .el-form-item--small.el-form-item{
                display: inline-block;
            }
            .mar-left5{
                margin-left: 5px;
            }
        }
    }
</style>
