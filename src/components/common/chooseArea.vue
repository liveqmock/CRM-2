<template>
    <div>
        <div class="pwd-mask">
            <div class="box">
                <div class="mask-title">
                    选择区域
                </div>
                <div class="mask-content">
                    <div v-for="(item,index) in area" style="margin-bottom: 10px">
                        <el-checkbox v-model="checkAll[index].isChecked"
                                     @change="handleAllProvince(item,index)">
                            {{item.name}}
                        </el-checkbox>
                        <!--<el-checkbox-group v-model="checkedProvinces" @change="handleCheckedCitiesChange"-->
                        <!--style="margin-left: 20px">-->
                        <div style="margin-left: 20px">
                            <template v-for="(province,k) in item.value">
                                <el-checkbox :key="k" v-model="checkAll[index].childCheck[k]"
                                             @change="handleCheckAllChange(province,k,index)"></el-checkbox>
                                <span class="expand-item" @click="expandItem(province,k)">
                                    {{province.name}}
                                <template><i style="margin-right: 10px" class="el-icon-caret-bottom"></i></template>
                                 <template>
                                    <el-card v-if="showCities&&expandId==province.id" style="" class="city-area">
                                        <el-checkbox-group v-model="checkedProvinces"
                                                           @change="handleCheckedCitiesChange(checkedProvinces,k,index)">
                                            <el-checkbox :label="city.name" v-for="(city,k) in checkedCities" :key="k">
                                                {{city.name}}
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </el-card>
                                </template>
                                </span>
                                <!--<template><i style="font-size:12px;margin-right: 10px" class="el-icon-caret-bottom"></i>-->
                                <!--</template>-->
                            </template>
                        </div>
                        <!--</el-checkbox-group>-->
                    </div>

                    <div class="del-btn-group">
                        <el-button :loading="btnLoading" @click="closeToask(true)" class="del-btn" type="primary">确认
                        </el-button>
                        <el-button @click="closeToask(false)">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import * as api from '../../api/BrandProduct/ShippingTemplate/index'

    export default {
        components: {},
        props: [],
        data() {
            return {
                area: [{
                    name: '华东',
                    id: 0,
                    value: [{name: '上海市', id: '01'}, {name: '江苏省', id: '02'}, {name: '浙江省', id: '03'}]
                },
                    {
                        name: '华北',
                        id: 1,
                        value: [{name: '北京市', id: '11'}, {name: '天津', id: '12'}, {name: '山西省', id: '13'}]
                    },
                ],
                isIndeterminate: false,
                checkAll: [{
                    isChecked: false,
                    count: 0,
                    childCheck: [false, false, false]
                }, {
                    isChecked: false,
                    count: 0,
                    childCheck: [false, false, false]
                }],
                checkedProvinces: [],
                checkedCities: [{name: '杭州市', id: '11'}, {name: '宁波市', id: '12'}, {name: '温州市', id: '13'}, {
                    name: '嘉兴市',
                    id: '13'
                }, {name: '湖州市', id: '13'}],
                showCities: false,
                expandId: -1,
                btnLoading: false
            }
        },
        // watch(){
        //
        // },
        created() {
            this.getProvinceListGroupByDistrict()
        },
        methods: {
            //获取省
            getProvinceListGroupByDistrict() {
                let that = this;
                let data = {};
                that.$axios
                    .post(api.getProvinceListGroupByDistrict, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            res.data.data = that.area;
                            res.data.data.forEach(function (v, k) {
                                let temp = {
                                    isChecked: false,
                                    count: 0,
                                    childCheck: []
                                };
                                that.checkAll.push(temp)
                            });
                            that.area = res.data.data;
                        } else {
                            that.$message.warning(res.data.msg)
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //
            closeToask() {
                this.$emit("msg", false);
            },

            //区域下省的操作
            handleAllProvince(value, index) {
                let that = this;
                if (that.checkAll[index].isChecked) {
                    that.checkAll[index].childCheck.forEach(function (v, k) {
                        that.checkAll[index].childCheck[k] = true;
                        that.checkedCities.forEach(function (v, k) {
                            that.checkedProvinces.push(v.name)
                        })
                    });
                } else {
                    that.checkAll[index].childCheck.forEach(function (v, k) {
                        that.checkAll[index].childCheck[k] = false;
                        that.checkedProvinces = []
                    });
                }

            },
            //省对应的全选操作
            handleCheckAllChange(val, k, index) {
                let that = this;
                if (that.checkAll[index].childCheck[k]) {
                    that.checkedCities.forEach(function (v, k) {
                        that.checkedProvinces.push(v.name)
                    })
                } else {
                    that.checkedProvinces = []
                }
                that.areaCheckedAll(index);
            },
            expandItem(val, k) {
                this.expandId = val.id;
                this.showCities = true;
            },
            handleCheckedCitiesChange(value, k, index) {
                let checkedCount = value.length;
                let temp = [];
                this.checkedCities.forEach(function (v) {
                    temp.push(v.name);
                });
                this.checkAll[index].childCheck[k] = checkedCount === temp.length;
                this.$set(this.checkAll[index].childCheck, k, this.checkAll[index].childCheck[k]);
                this.areaCheckedAll(index);
            },
            //区域全选
            areaCheckedAll(index) {
                let that = this;
                let count = 0;
                that.checkAll[index].childCheck.forEach(function (v) {
                    if (v) {//选中
                        ++count;
                    } else {
                        --count;
                    }
                });
                that.checkAll[index].isChecked = count === that.checkAll[index].childCheck.length
            }
        }
    }
</script>

<style lang="less">

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
            width: 750px;
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
                overflow: hidden;
                padding: 10px 45px 0 45px;
                line-height: 30px;
                box-sizing: border-box;
                .el-checkbox + .el-checkbox {
                    margin-left: 0;
                }
                .el-card {
                    z-index: 9999;
                    position: absolute;
                    top: 20px;
                    left: 0;
                    .el-checkbox {
                        margin-right: 20px
                    }
                    width: 280px;
                }
                .el-checkbox, .el-checkbox__input {
                    white-space: normal;
                }
                .el-card__body {
                    padding: 10px
                }
                .expand-item {
                    position: relative;
                    color: #666;
                    font-size: 14px;
                    cursor: pointer;
                }
                .del-btn-group {
                   margin: 30px 0;
                    text-align: right;
                }
            }
        }

    }
</style>
