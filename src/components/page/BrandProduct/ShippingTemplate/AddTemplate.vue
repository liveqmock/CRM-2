<template>
    <div class="shipping">
        <v-breadcrumb :nav="['品牌产品管理','运费模板','添加模板']"></v-breadcrumb>
        <div class="container">
            <div class="shipping-box">
                <el-form :model="form" ref="form">
                    <el-form-item prop="name" label="模板名称">
                        <el-input class="lar-inp" placeholder="请输入模板名称(模板名称最少必须由1个字组成，最多不能超过25个字)"
                                  v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="shippingAddress" class="address-item" label="产品发货地">
                        <el-select v-model="form.shippingAddress" class="small-inp" @change="productArea">
                            <el-option label="中国" value="1">中国</el-option>
                            <el-option label="海外" value="2">海外</el-option>
                        </el-select>
                        <div class="address-area">
                            <region :regionMsg='address' :isDisabled="!areaDisabled"></region>
                        </div>
                    </el-form-item>
                    <el-form-item prop="shippingTime" label="发货时间">
                        <el-select v-model="form.shippingTime" class="mid-inp">
                            <el-option
                                v-for="(item,index) in times"
                                :key="index"
                                :label="item.label"
                                :value="item.id"
                            >
                                {{item.label}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="status" label="是否包邮">
                        <el-radio-group v-model="form.status" @change="chooseStyle">
                            <el-radio label="1">自定义运费</el-radio>
                            <el-radio label="2">平台承担运费</el-radio>
                            <el-radio label="3">满
                                <el-input class="small-inp"></el-input>
                                元包邮
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="status" label="计价方式">
                        <el-radio-group v-model="form.priceStyle">
                            <el-radio label="1">按重量</el-radio>
                            <el-radio label="2">按体积</el-radio>
                            <el-radio label="3">按件数量</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="express">
                        <span>物流快递</span>
                    </div>
                    <el-form-item class="express-area">
                        默认运费
                        <el-input class="small-inp"></el-input>
                        件内
                        <el-input class="small-inp"></el-input>
                        元，每增加
                        <el-input class="small-inp"></el-input>
                        件，增加运费
                        <el-input class="small-inp"></el-input>
                        元
                        <div class="color-red">应输入0.00至999.99的数字，小数保留两位</div>
                        <el-table :data="tableData" border>
                            <el-table-column label="选择地区" align="center">
                                <template slot-scope="scope">
                                    <template>{{scope.row.data}}</template>
                                    <span style="float: right">
                                        <span class="color-blue" @click="editAddress(scope.row)">编辑</span>
                                        <span class="color-blue" @click="delItem(scope.row,scope.$index)" style="margin-left: 10px">删除</span>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="首件数(公斤)" align="center">
                                <template slot-scope="scope">
                                    <el-input class="mini-inp" v-model="scope.row.data"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="运费(元)" align="center">
                                <template slot-scope="scope">
                                    <el-input class="mini-inp" v-model="scope.row.data"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="续件数(公斤)" align="center">
                                <template slot-scope="scope">
                                    <el-input class="mini-inp" v-model="scope.row.data"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="续费(元)" align="center">
                                <template slot-scope="scope">
                                    <el-input class="mini-inp" v-model="scope.row.data"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="color-blue" @click="addSetting">增加制定省市运费设置</div>
                    </el-form-item>
                    <el-form-item prop="status" label="是否启用">
                        <el-radio-group v-model="form.status">
                            <el-radio label="1">启用</el-radio>
                            <el-radio label="2">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="submit-btn">
                        <el-button type="primary" v-loading="btnLoading" @click="submitForm('form')">确认保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <!--选择区域-->
        <choose-area  @msg='chooseAreaToast' v-if="isShowArea"></choose-area>
        <!--平台承担运费弹窗-->
        <div class="pwd-mask" v-if="showTips">
            <div class="box">
                <div class="mask-title"><icon class="ico" ico='icon-jinggao'/>  温馨提示</div>
                <div class="mask-content">
                    <span class="del-tip">选择"卖家承担运费"后，所有区域的运费将设置为0元，且原运费设置无法恢复，请保存原有运费设置。</span>
                    <div class="del-btn-group">
                        <el-button :loading="btnLoading" @click="showTips=false" class="del-btn" type="primary">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import icon from "../../../common/ico";
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import region from '../../../common/Region';
    import chooseArea from '../../../common/chooseArea';
    import * as api from '../../../../api/api';
    import * as pApi from '../../../../privilegeList/index.js';

    export default {
        components: {vBreadcrumb, icon, region,chooseArea},
        data() {
            return {
                times: [{label: '2小时发货', id: 0},
                    {label: '4小时发货', id: 1},
                    {label: '8小时发货', id: 2},
                    {label: '12小时发货', id: 3},
                    {label: '当日发货', id: 4},
                    {label: '2天内', id: 5},
                    {label: '3天内', id: 6},
                    {label: '4天内', id: 7},
                    {label: '7天内', id: 8},
                    {label: '8天内', id: 9},
                    {label: '10天内', id: 10},
                    {label: '12天内', id: 11},
                    {label: '15天内', id: 12},
                    {label: '18天内', id: 13},
                    {label: '20天内', id: 14},
                    {label: '25天内', id: 15},
                    {label: '30天内', id: 16},
                    {label: '35天内', id: 17},
                    {label: '45天内', id: 18},
                ],
                form: {
                    name: '',
                    area: '',
                    shippingTime: 4,
                    shippingAddress: '1',
                    priceStyle: '1'
                },
                tableData: [{data: 111}],
                btnLoading: false,
                address: '',
                isShowArea: false,
                areaDisabled:true,
                showTips:false
            }
        },
        methods: {
            //确认保存
            submitForm() {

            },
            //产品发货地选择
            productArea(){
                this.areaDisabled=this.form.shippingAddress===1;
            },
            //是否包邮
            chooseStyle(){
                this.showTips=this.form.status==2;
            },
            //取消
            cancel() {
                this.$router.path('/shippingTemplate')
            },
            //编辑区域
            editAddress() {
                let that=this;
                that.isShowArea=true;
            },
            //删除制定省市运费设置
            delItem(row,index){
                this.tableData.splice(index,1)
            },
            //选择区域
            chooseAreaToast(msg){
                this.isShowArea = false;
                console.log(msg)
            },
            //增加制定省市运费设置
            addSetting(){
                this.tableData.push({data:222})
            }
        }
    }
</script>

<style lang="less">
    .shipping {
        .shipping-box {
            padding: 0 30px;
            .el-form-item__label {
                text-align: left;
                width: 70px;
                height: 40px;
                line-height: 40px;
            }
            .el-form-item__content {
                line-height: 40px;
            }
            .el-input__inner {
                height: 40px;
                line-height: 40px;
            }
            .express {
                width: 100%;
                height: 50px;
                line-height: 50px;
                background: #eee;
                padding: 0 10px;
                margin-left: -15px;
            }
            .express-area {
                margin: 20px 0;
            }
            .address-item {
                .el-form-item__label {
                    line-height: 20px
                }
            }
            .el-radio {
                width: 110px
            }
            .lar-inp {
                width: 550px
            }
            .mid-inp {
                width: 210px
            }
            .small-inp {
                width: 120px;
                margin: 0 5px;
            }
            .mini-inp {
                width: 90px
            }
            .address-area {
                display: inline-block;
                .el-select {
                    width: 120px
                }
            }
            .color-blue {
                color: #33b4ff;
                cursor: pointer;
            }
            .color-red {
                color: #ff6868;
                margin-left: 60px
            }
            .el-table {
                margin: 30px 0 0;
            }
            .has-gutter, .el-table th {
                background-color: #eee !important;
            }
            .el-table {
                width: 70%;
                td {
                    border-right: none
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
                    .del-btn-group {
                      text-align: right;
                        margin-top: 100px;
                    }
                }
            }
        }
    }
</style>
