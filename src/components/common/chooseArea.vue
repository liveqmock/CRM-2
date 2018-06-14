<template>
    <div class="choose-area">
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
                                <el-checkbox :key="k" v-model="checkAll[index].childCheck[k].isChecked"
                                             @change="handleCheckAllChange(province,k,index)"></el-checkbox>
                                <span class="expand-item" @click="expandItem(province,k)">
                                    {{province.name}}
                                <template><i style="margin-right: 10px" class="el-icon-caret-bottom"></i></template>
                                 <template>
                                    <el-card v-if="showCities&&expandId==province.zipcode" class="city-area">
                                        <i style="margin-right: 10px;" class="el-icon-close"
                                           @click.stop="showCities=false"></i>
                                        <el-checkbox-group v-model="checkedProvinceIDs"
                                                           @change="handleCheckedCitiesChange(checkedProvinceIDs,k,index)">
                                            <el-checkbox :label="city.zipcode" v-for="(city,k) in checkedCities" :key="k">
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
        props: ['index'],
        data() {
            return {
                area: [//区域列表
                    //     {
                    //     name: '华东',
                    //     id: 0,
                    //     value: [{name: '上海市', id: '01'}, {name: '江苏省', id: '02'}, {name: '浙江省', id: '03'}]
                    // },
                    //     {
                    //         name: '华北',
                    //         id: 1,
                    //         value: [{name: '北京市', id: '11'}, {name: '天津', id: '12'}, {name: '山西省', id: '13'}]
                    //     },
                ],
                checkAll: [//选中状态
                    //     {
                    //     isChecked: false,
                    //     count: 0,
                    //     childCheck: [false, false, false]
                    // }, {
                    //     isChecked: false,
                    //     count: 0,
                    //     childCheck: [false, false, false]
                    // }
                ],
                checkedProvinces: [],
                checkedProvinceIDs: [],
                checkedCities: [//展开当前选中省对应的市的列表
                    //     {name: '杭州市', id: '11'}, {name: '宁波市', id: '12'}, {name: '温州市', id: '13'}, {
                    //     name: '嘉兴市',
                    //     id: '13'
                    // }, {name: '湖州市', id: '13'}
                ],
                showCities: false,
                expandId: -1,
                checkNames: [],//选中的名称
                checkIds: [],//选中的id
                btnLoading: false,
            }
        },
        // watch(){
        //
        // },
        created() {
            this.getProvinceListGroupByDistrict();
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
                            let arr = ['', '华东', '华南', '华中', '华北', '西北', '西南', '东北', '港澳台', '海外'];
                            for (let i in res.data.data) {
                                let temp = {
                                    isChecked: false,
                                    count: 0,
                                    childCheck: []
                                };
                                for (let j in res.data.data[i]) {
                                    let tempChildCheck = {
                                        isChecked: false,
                                        children: []
                                    };
                                    temp.childCheck.push(tempChildCheck)
                                }
                                that.checkAll.push(temp);
                                let tempArea = {
                                    name: arr[i],
                                    id: i,
                                    value: res.data.data[i]
                                };
                                that.area.push(tempArea);
                            }
                            console.log(that.checkAll)
                        } else {
                            that.$message.warning(res.data.msg)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //获取省对应的市
            getCityList(id, isChecked, index) {
                let that = this;
                let data = {
                    fatherZipcode: id
                };
                that.$axios
                    .post(api.getCityList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.checkedCities = res.data.data;
                            if (res.data.data.length && !that.showCities) {
                                that.showCities = true;
                            }
                            res.data.data.forEach(function (v, k) {
                                if (that.checkIds.indexOf(v.zipcode) == -1 && isChecked == 'checked') {
                                    that.checkNames.push(v.name);
                                    that.checkIds.push(v.zipcode);
                                }
                                if(isChecked=='expand'){
                                    that.checkIds.forEach(function (v2,k2) {
                                        if(v2==v.zipcode){
                                            if(that.checkNames.indexOf(v.name)==-1){
                                                that.checkNames.push(v.name);
                                            }
                                        }
                                    })
                                }
                            });
                            console.log(that.checkNames)
                        } else {
                            that.$message.warning(res.data.msg)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //区域选择操作
            closeToask(opr) {
                if (opr) {
                    this.$emit('getArea', this.checkNames + 'IDS:' + this.checkIds);
                } else {
                    this.$emit("getArea", false);
                }
            },

            //区域下省的操作
            handleAllProvince(value, index) {
                let that = this;
                if (that.checkAll[index].isChecked) {
                    that.checkAll[index].childCheck.forEach(function (v, k) {
                        that.checkAll[index].childCheck[k].isChecked = true;
                        that.checkedCities.forEach(function (v, k) {
                            that.checkedProvinces.push(v.name);
                            that.checkedProvinceIDs.push(v.zipcode);
                        })
                    });
                } else {
                    that.checkAll[index].childCheck.forEach(function (v, k) {
                        that.checkAll[index].childCheck[k].isChecked = false;
                        that.checkedProvinces = [];
                        that.checkedProvinceIDs = [];
                    });
                }
            },
            //省对应的全选操作
            handleCheckAllChange(val, k, index) {
                let that = this;
                that.getCityList(val.zipcode, 'checked', index);
                // that.checkedProvinces=[];
                setTimeout(function () {
                    // console.log(this.checkAll[index].childCheck)
                    if (that.checkAll[index].childCheck[k].isChecked) {
                        that.checkedCities.forEach(function (v, k) {
                            that.checkedProvinces.push(v.name);
                            that.checkedProvinceIDs.push(v.zipcode);
                        })
                    } else {
                        that.checkedProvinces = [];
                        that.checkedProvinceIDs = [];
                    }
                }, 100);
                that.areaCheckedAll(index);
            },
            expandItem(val, k, index) {
                this.expandId = val.zipcode;
                this.getCityList(val.zipcode, 'expand', index);
            },
            handleCheckedCitiesChange(value, k, index) {
                let checkedCount = value.length;
                let that=this;
                let temp = [];
                that.checkedCities.forEach(function (v) {
                    temp.push(v.name);
                });
                value.forEach(function (v, k) {
                    if (that.checkIds.indexOf(v) == -1) {
                        that.checkIds.push(v)
                    }
                });
                // console.log(that.checkIds)
                // console.log(value)
                // that.checkIds.forEach(function (v1,k1) {
                //     value.forEach(function (v2,k2) {
                //         if(v2!=v1){
                //             that.checkIds.splice(k1,1)
                //         }else{
                //             if(that.checkIds.indexOf(v2)){
                //                 that.checkIds.push(v2)
                //             }
                //         }
                //     })
                // });

                that.checkAll[index].childCheck[k].isChecked = checkedCount === temp.length;
                that.$set(that.checkAll[index].childCheck[k], k, that.checkAll[index].childCheck[k].isChecked);
                that.areaCheckedAll(index);
            },
            //区域全选
            areaCheckedAll(index) {
                let that = this;
                let count = 0;
                that.checkAll[index].childCheck.forEach(function (v) {
                    if (v.isChecked) {//选中
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
    .choose-area {
        .pwd-mask {
            .el-icon-close {
                position: absolute;
                right: 0;
            }
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
                width: 845px;
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
                        width: 320px;
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
                        margin: 50px 0;
                        text-align: right;
                    }
                }
            }
        }
    }

</style>
