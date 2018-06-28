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
                                     @change="handleAllProvince(item,index)" :disabled="checkAll[index].isDisabled">
                            {{item.name}}
                        </el-checkbox>
                        <!--<el-checkbox-group v-model="checkedProvinces" @change="handleCheckedCitiesChange"-->
                        <!--style="margin-left: 20px">-->
                        <div style="margin-left: 20px">
                            <template v-for="(province,k) in item.value">
                                <el-checkbox :key="k" v-model="checkAll[index].provinceCheck[k].isChecked"
                                             @change="handleCheckAllChange(province,k,index)"
                                             :disabled="checkAll[index].provinceCheck[k].isDisabled"></el-checkbox>
                                <span class="expand-item" @click="expandItem(province,k,index)">
                                    {{province.name}}
                                <template><i style="margin-right: 10px" class="el-icon-caret-bottom"></i></template>
                                 <template>
                                    <el-card v-if="showCities&&expandId==province.zipcode" class="city-area">
                                        <i style="margin-right: 10px;" class="el-icon-close"
                                           @click.stop="showCities=false"></i>
                                        <el-checkbox-group v-model="checkAll[index].provinceCheck[k].ids"
                                                           @change="handleCheckedCitiesChange(checkAll[index].provinceCheck[k].ids,k,index)">
                                            <el-checkbox :label="city.zipcode"
                                                         :disabled="checkAll[index].provinceCheck[k].cityDisabled[kk]"
                                                         v-for="(city,kk) in checkAll[index].provinceCheck[k].checkedCities"
                                                         :key="kk">
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
    import index from "../../router";

    export default {
        components: {},
        props: ['index', 'chooseData', 'preData'],
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
                    //     provinceCheck: [false, false, false]
                    // }, {
                    //     isChecked: false,
                    //     count: 0,
                    //     provinceCheck: [false, false, false]
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
                ids: [],
                orgIds: [],
                tempValue: [],
                orgValue: [],
                tempIds: [],
                checkedNames: [],//点击过的省的名称
                preNames: [],//选中表格行的省的名称
                preIds: []//选中表格行的省的id
            }
        },
        created() {
            let that = this;
            that.getProvinceListGroupByDistrict();
            // console.log(that.preData)
            that.preNames = that.getFirstValue(that.preData.includeAreaName);
            setTimeout(function () {
                that.preIds = that.getFirstValue(that.preData.includeArea);
            }, 100)
        },

        methods: {
            getFirstValue(first) {
                let that = this;
                that.tempValue = [];
                that.ids = [];
                that.orgIds = [];
                that.orgValue = [];
                // that.preNames = [];
                // that.preIds = [];
                if (first) {
                    that.changeData(first);
                    return that.ids;
                }
            },
            //
            changeData(str) {
                this.changeStr(str);
                this.getIds();
                this.getValue();
            },
            changeStr(str) {
                let that = this;
                if (str.indexOf(':') != -1) {
                    let index = str.indexOf(':');
                    let id = str.substring(0, index);
                    if (that.ids.indexOf(id) == -1) {
                        that.ids.push(id);
                        that.orgIds.push(id);
                        str = str.substring(index + 1);
                        that.tempValue.push(str);
                        that.orgValue.push(str);
                        this.changeStr(str);
                    }
                }
            },
            getIds() {
                let ids = this.orgIds;
                this.orgIds[0] = ids[0];
                for (let i = 1; i < ids.length; i++) {
                    if (ids[i].indexOf(',') != -1) {
                        let index = ids[i].lastIndexOf(',');
                        this.ids[i] = ids[i].substring(index + 1)
                    }
                }
            },
            getValue() {
                let tempValue = this.orgValue;
                let ids = this.orgIds;
                for (let i = 0; i < ids.length - 1; i++) {
                    if (tempValue[i].indexOf(',') != -1 && tempValue[i].indexOf(':') != -1) {
                        let index = tempValue[i].indexOf(':');
                        this.tempValue[i] = tempValue[i].substring(0, index - 7)
                    }
                }
            },
            //获取省
            getProvinceListGroupByDistrict() {
                let that = this;
                that.ids = [];
                that.tempValue = [];
                that.orgIds = [];
                that.orgValue = [];
                let data = {};
                that.$axios
                    .post(api.getProvinceListGroupByDistrict, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            let arr = ['', '华东', '华南', '华中', '华北', '西北', '西南', '东北', '港澳台', '海外'];
                            for (let i in res.data.data) {
                                let temp = {
                                    isChecked: false,
                                    isDisabled: false,
                                    count: 0,
                                    provinceCheck: []
                                };
                                for (let j in res.data.data[i]) {
                                    let tempprovinceCheck = {
                                        isChecked: false,
                                        isDisabled: false,
                                        cityCheck: [],
                                        cityDisabled: [],
                                        name: res.data.data[i][j].name,
                                        zipcode: res.data.data[i][j].zipcode,
                                        count: 0,
                                        ids: [],
                                        names: [],
                                        checkedCities: [],
                                    };
                                    for (let c in that.chooseData) {//根据表格中的数据回显数据的选中和可选效果
                                        if (that.chooseData[c].includeArea) {
                                            this.changeData(that.chooseData[c].includeArea);
                                            var includeArea = that.ids;
                                            for (let k in includeArea) {
                                                if (includeArea[k] == res.data.data[i][j].zipcode) {
                                                    tempprovinceCheck.isChecked = true;
                                                    if (!that.preData.includeArea) {
                                                        tempprovinceCheck.isDisabled = true;
                                                    } else {
                                                        that.ids = [];
                                                        that.orgIds = [];
                                                        this.changeData(that.preData.includeArea);
                                                        var preId = that.ids;
                                                        let id = res.data.data[i][j].zipcode;
                                                        if (preId.join(',').indexOf(id) == -1 && includeArea.join(',').indexOf(id) != -1) {
                                                            tempprovinceCheck.isDisabled = true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    temp.provinceCheck.push(tempprovinceCheck);
                                }
                                that.checkAll.push(temp);
                                // console.log(that.checkAll)
                                let tempArea = {
                                    name: arr[i],
                                    id: i,
                                    value: res.data.data[i]
                                };
                                that.area.push(tempArea);
                            }

                        } else {
                            that.$message.warning(res.data.msg)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });

            },
            //获取省对应的市
            getCityList(id, isChecked, index, k, name) {
                let that = this;
                that.ids = [];
                that.tempValue = [];
                that.orgIds = [];
                that.orgValue = [];
                let data = {
                    fatherZipcode: id
                };
                that.$axios
                    .post(api.getCityList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.checkAll[index].provinceCheck[k].checkedCities = res.data.data;
                            if (res.data.data.length && !that.showCities) {
                                that.showCities = true;
                            }
                            that.checkAll[index].provinceCheck[k].count = res.data.data.length;
                            let newNames = [];
                            for (let kk in res.data.data) {
                                let v = res.data.data[kk];
                                that.checkAll[index].provinceCheck[k].cityCheck[kk] = false;
                                that.checkAll[index].provinceCheck[k].cityDisabled[kk] = false;
                                for (let c in that.chooseData) {//根据表格中的数据回显数据的选中和可选效果
                                    if (that.chooseData[c].includeArea) {
                                        this.changeData(that.chooseData[c].includeArea);
                                        var includeArea = JSON.stringify(that.tempValue);
                                        if (includeArea.indexOf(v.zipcode) != -1) {
                                            if (that.checkAll[index].provinceCheck[k].ids.indexOf(v.zipcode) == -1 && that.tempIds.indexOf(v.zipcode) == -1) {
                                                that.checkAll[index].provinceCheck[k].ids.push(v.zipcode);
                                                that.checkAll[index].provinceCheck[k].names.push(v.name);
                                                that.checkAll[index].provinceCheck[k].cityCheck[kk] = true;
                                                if (!that.preData.includeArea) {
                                                    that.checkAll[index].provinceCheck[k].cityDisabled[kk] = true;
                                                } else {
                                                    that.ids = [];
                                                    that.tempValue = [];
                                                    that.orgIds = [];
                                                    that.orgValue = [];
                                                    this.changeData(that.preData.includeArea);
                                                    var preId = JSON.stringify(that.tempValue);
                                                    let id = v.zipcode;
                                                    if (preId.indexOf(id) == -1 && includeArea.indexOf(id) != -1) {
                                                        that.checkAll[index].provinceCheck[k].cityDisabled[kk] = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (that.checkAll[index].provinceCheck[k].ids.indexOf(v.zipcode) == -1 && isChecked == 'checked') {
                                    that.checkAll[index].provinceCheck[k].ids.push(v.zipcode);
                                    that.checkAll[index].provinceCheck[k].names.push(v.name);
                                }
                                if (isChecked == 'checked') {
                                    if (!that.checkAll[index].provinceCheck[k].isChecked) {
                                        that.checkAll[index].provinceCheck[k].ids = [];
                                        that.checkAll[index].provinceCheck[k].names = [];
                                    }
                                }
                                if (isChecked == 'expand') {
                                    for (let k2 in that.checkAll[index].provinceCheck[k].ids) {
                                        let v2 = that.checkAll[index].provinceCheck[k].ids[k2];
                                        if (v2 == v.zipcode) {
                                            if (newNames.indexOf(v.name) == -1) {
                                                newNames.push(v.name);
                                            }
                                        }
                                    }
                                    that.checkAll[index].provinceCheck[k].names = newNames;
                                }
                            }
                        } else {
                            that.$message.warning(res.data.msg)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                if(that.preNames){
                    that.preNames.forEach(function (v, k) {
                        if (v == name) {
                            if (that.preNames.indexOf(v) == -1) {
                                that.preNames.splice(k, 1);
                                that.preIds.splice(k, 1);
                            }
                        }
                    })
                }
            },
            //区域选择操作
            closeToask(opr) {
                let that = this;
                if (that.preNames) {
                    for (let p in that.preNames) {
                        that.checkNames.push(that.getValueByIndex(that.preData.includeAreaName, that.preNames[p]))
                    }
                    for (let p in that.preIds) {
                        that.checkIds.push(that.getValueByIndex(that.preData.includeArea,that.preIds[p]))
                    }
                }
                for (let i in that.checkAll) {
                    for (let j in that.checkAll[i].provinceCheck) {
                        let length = that.checkAll[i].provinceCheck[j].names.length;
                        if (length > 0) {
                            let count = that.checkAll[i].provinceCheck[j].count;
                            let name = that.checkAll[i].provinceCheck[j].name;
                            let id = that.checkAll[i].provinceCheck[j].zipcode;
                            var tempName = name + ':', tempId = id + ':';
                            // if (count == length) {
                            //     var tempName = name + ':', tempId = id + ':';
                            // } else {
                            //     var tempName = name + ':', tempId = '111111' + ':';
                            // }
                            for (let k in that.checkAll[i].provinceCheck[j].names) {
                                if (k == length - 1) {
                                    tempName += that.checkAll[i].provinceCheck[j].names[k];
                                    tempId += that.checkAll[i].provinceCheck[j].ids[k];
                                } else {
                                    tempName += that.checkAll[i].provinceCheck[j].names[k] + ',';
                                    tempId += that.checkAll[i].provinceCheck[j].ids[k] + ',';
                                }
                            }
                            that.checkNames.push(tempName);
                            that.checkIds.push(tempId);
                        }
                    }
                }
                if (opr) {
                    that.$emit('getArea', that.checkNames + 'IDS:' + that.checkIds);
                } else {
                    that.$emit("getArea", false);
                }
            },
            getValueByIndex(str, name) {
                if(str.indexOf(name)!=-1){
                    let index0 = str.indexOf(name);
                    let index, newStr, temStr, temIndex,tempIndex;
                    tempIndex=parseInt(parseInt(index0) + 1 + parseInt(name.length));
                    newStr = str.substring(tempIndex);
                    if (newStr.indexOf(':') != -1) {
                        index = newStr.indexOf(':');
                        tempIndex=parseInt(index)+tempIndex;
                        temStr = str.substring(index0, tempIndex);
                        temIndex = temStr.lastIndexOf(',');
                        return temStr.substring(0,temIndex)
                    } else {
                        return str.substring(index0)
                    }
                }
            },
            //区域全选
            handleAllProvince(value, index) {
                let that = this;
                if (that.checkAll[index].isChecked) {
                    that.checkAll[index].provinceCheck.forEach(function (v, k) {
                        that.checkAll[index].provinceCheck[k].isChecked = true;
                        // console.log(that.checkAll[index].provinceCheck[k])
                        that.checkAll[index].provinceCheck[k].checkedCities.forEach(function (v, k) {
                            if (that.checkAll[index].provinceCheck[k].ids.indexOf(v.zipcode) == -1) {
                                that.checkAll[index].provinceCheck[k].names.push(v.name);
                                that.checkAll[index].provinceCheck[k].ids.push(v.zipcode);
                            }
                        })
                    });
                } else {
                    that.checkAll[index].provinceCheck.forEach(function (v, k) {
                        that.checkAll[index].provinceCheck[k].isChecked = false;
                        that.checkAll[index].provinceCheck[k].names = [];
                        that.checkAll[index].provinceCheck[k].ids = [];
                        that.checkAll[index].provinceCheck[k].checkedCities = [];
                        that.$set(that.checkAll[index].provinceCheck[k].checkedCities, k, that.checkAll[index].provinceCheck[k].checkedCities);
                    });
                }
            },
            //省对应的全选操作
            handleCheckAllChange(val, k, index) {
                let that = this;
                that.getCityList(val.zipcode, 'checked', index, k, val.name);
                that.areaCheckedAll(index);
            },
            expandItem(val, k, index) {
                this.expandId = val.zipcode;
                this.getCityList(val.zipcode, 'expand', index, k, val.name);
            },
            handleCheckedCitiesChange(value, k, index) {
                let checkedCount = value.length;
                let that = this;
                let temp = [];
                that.checkAll[index].provinceCheck[k].ids = value;
                that.checkAll[index].provinceCheck[k].checkedCities.forEach(function (v) {
                    temp.push(v.zipcode);
                });
                temp.forEach(function (v1) {
                    if (value.indexOf(v1) == -1) {
                        that.tempIds.push(v1)
                    }
                });
                that.checkAll[index].provinceCheck[k].isChecked = checkedCount === temp.length;
                that.$set(that.checkAll[index].provinceCheck[k], k, that.checkAll[index].provinceCheck[k].isChecked);
                that.areaCheckedAll(index);
            },
            //区域全选
            areaCheckedAll(index) {
                let that = this;
                let count = 0;
                that.checkAll[index].provinceCheck.forEach(function (v) {
                    if (v.isChecked) {//选中
                        ++count;
                    } else {
                        --count;
                    }
                });
                that.checkAll[index].isChecked = count === that.checkAll[index].provinceCheck.length
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
                width: 870px;
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
