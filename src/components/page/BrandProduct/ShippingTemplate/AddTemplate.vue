<template>
    <div>
        <v-breadcrumb :nav="['品牌产品管理','运费模板','添加模板']"></v-breadcrumb>
        <div class="container">
            <div class="shipping-box">
                <el-form :model="form" ref="form">
                    <el-form-item prop="name" label="模板名称">
                        <el-input placeholder="请输入模板名称(模板名称最少必须由1个字组成，最多不能超过25个字)" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="shippingAddress" label="产品发货地址">
                        <el-select v-model="form.shippingAddress">
                            <el-option label="中国" value="1">中国</el-option>
                            <el-option label="海外" value="2">海外</el-option>
                        </el-select>
                        <div>
                            <region :regionMsg='address'></region>
                        </div>
                    </el-form-item>
                    <el-form-item prop="shippingTime" label="发货时间">
                        <el-select v-model="form.shippingTime">
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
                        <el-radio-group v-model="form.status">
                            <el-radio label="1">自定义运费</el-radio>
                            <el-radio label="2">平台承担运费</el-radio>
                            <el-radio label="3">满<el-input></el-input>元包邮</el-radio>
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
                    <el-form-item>
                        默认运费 <el-input></el-input>件内 <el-input></el-input>元，每增加 <el-input></el-input>件，增加运费 <el-input></el-input>元
                        <div class="tips">应输入0.00至999.99的数字，小数保留两位</div>
                        <el-table :data="tableData"  border>
                            <el-table-column label="选择地区" width="60" align="center">
                                <template slot-scope="scope">
                                    <template>{{scope.row.data}}</template>
                                    <span style="float: right">
                                        <span class="color-blue">编辑</span>
                                        <span class="color-blue">删除</span>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="首件数(公斤)" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.data"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="运费(元)" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.data"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="续件数(公斤)" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.data"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="续费(元)" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.data"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="tips">增加制定省市运费设置</div>
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
    </div>

</template>

<script>
    import icon from "../../../common/ico";
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import region from '../../../common/Region';
    import * as api from '../../../../api/api'
    import * as pApi from '../../../../privilegeList/index.js';
    export default {
        components: {vBreadcrumb,icon,region},
        data() {
            return {
                times:[{label:'2小时发货',id:0},
                    {label:'4小时发货',id:1},
                    {label:'8小时发货',id:2},
                    {label:'12小时发货',id:3},
                    {label:'当日发货',id:4},
                    {label:'2天内',id:5},
                    {label:'3天内',id:6},
                    {label:'4天内',id:7},
                    {label:'7天内',id:8},
                    {label:'8天内',id:9},
                    {label:'10天内',id:10},
                    {label:'12天内',id:11},
                    {label:'15天内',id:12},
                    {label:'18天内',id:13},
                    {label:'20天内',id:14},
                    {label:'25天内',id:15},
                    {label:'30天内',id:16},
                    {label:'35天内',id:17},
                    {label:'45天内',id:18},
                ],
                form:{
                    name:'',
                    area:'',
                    shippingTime:4,
                    shippingAddress:'1',
                    priceStyle:'1'
                },
                tableData:[{data:111}],
                btnLoading:false,
                address: '',
            }
        },
        methods: {
            //确认保存
            submitForm(){

            },
            //取消
            cancel(){
                this.$router.path('/shippingTemplate')
            }
        }
    }
</script>

<style lang="less" scoped>
.shipping-box{
    .express{
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #eeeeee;
        padding: 0 10px;
    }
}
</style>
