<template>
    <div class="delivery-address">
        <v-breadcrumb :nav="['运营管理','提货地址设置']"></v-breadcrumb>
        <div class="table-block">
            <el-button type="primary" style="margin-bottom: 20px" @click="addAddress">添加提货点</el-button>
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column type="index" label="编号" width="60" align="center"></el-table-column>
                    <el-table-column label="详细地址" align="center">
                        <template slot-scope="scope">
                            <template>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
                    <el-table-column prop="telephone" label="联系电话" align="center"></el-table-column>
                    <el-table-column v-if="isShowOperate" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" size="small" @click="editItem(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="delItem(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!--添加/编辑类目弹窗-->
        <el-dialog title="添加提货点" :visible.sync="addMask">
            <el-form v-model="addForm" label-width="100px">
                <el-form-item label="详细地址" class=" address-area">
                    <el-select v-model="addForm.country" class="small-inp" @change="changeArea">
                        <el-option label="中国" value="1">中国</el-option>
                        <el-option label="海外" value="2">海外</el-option>
                    </el-select>
                    <div class="address">
                        <region @regionMsg='getRegion' :regionMsg='address' :isDisabled="!areaDisabled"></region>
                    </div>
                    <el-input class="lar-inp" v-model="addForm.address" placeholder="请输入详细地址" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="addForm.contacts" auto-complete="off" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="addForm.telephone" auto-complete="off" placeholder="请输入联系电话"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addOrEdit('addForm')">确 认</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑提货点" :visible.sync="editMask">
            <el-form v-model="form" label-width="100px">
                <el-form-item label="详细地址" class=" address-area">
                    <el-select v-model="form.country" class="small-inp" @change="changeArea">
                        <el-option label="中国" value="1">中国</el-option>
                        <el-option label="海外" value="2">海外</el-option>
                    </el-select>
                    <div class="address">
                        <region @regionMsg='getRegion' :regionMsg='address' :isDisabled="!areaDisabled"></region>
                    </div>
                    <el-input class="lar-inp" v-model="form.address" placeholder="请输入详细地址" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="form.contacts" auto-complete="off" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.telephone" auto-complete="off" placeholder="请输入联系电话"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addOrEdit('form')">确 认</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!--删除弹窗-->
        <delete-toast :id='delId' :url='delUrl' :uri='delUri' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
    </div>
</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import region from '../../common/Region';
    import deleteToast from "../../common/DeleteToast";
    import * as api from '../../../api/OperateManage/DeliveryAddress';
    import utils from '../../../utils/index.js'
    import * as pApi from '../../../privilegeList/OperateManage/DeliveryAddress';

    export default {
        components: {
            vBreadcrumb, icon,region,deleteToast
        },
        data() {
            return {
                // 权限控制
                p: {},
                isShowOperate: true,

                address: '',
                form: {
                    contacts: "",
                    telephone: "",
                },
                addForm: {
                    contacts: "",
                    telephone: "",
                },
                addMask: false,
                editMask: false,
                id: "",
                itemId: "",
                tableData: [],
                page: {
                    currentPage: 1,
                    totalPage: 0
                },
                height: '',
                tipsMask: false,
                info: '',
                form: {
                    wordName: '',
                },
                isShowDelToast: false,
                btnLoading: false,
                areaDisabled:true,
                itype:'',
                provinceCode:'',
                cityCode:'',
                areaCode:''
            }
        },
        created() {
            let winHeight = window.screen.availHeight - 520;
            this.height = winHeight;
            this.pControl();
        },
        activated() {
            this.getList();
            this.pControl();
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
            },
            // 获取省市区
            getRegion(msg) {
                this.address = msg;
                console.log(this.address)
            },
            //获取列表
            getList() {
                let that = this;
                let data = {
                    url: pApi.queryStoreHouseList
                };
                that.tableLoading = true;
                that.$axios
                    .post(api.queryStoreHouseList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.tableLoading = false;
                            that.tableData = res.data.data;
                        } else {
                            that.$message.warning(res.data.msg);
                            that.tableLoading = false;
                        }
                    })
                    .catch(err => {
                        that.tableLoading = false;
                        console.log(err)
                    })
            },
            // 添加二级类目
            addAddress() {
                this.addMask = true;
                this.addForm.contacts='';
                this.addForm.telephone='';
                this.addForm.country='1';
                this.address='';
                this.itype = "add";
                this.areaDisabled=true
            },
            //详细地址选择
            changeArea() {
                if(this.itype=='add'){
                    this.areaDisabled = this.addForm.country == 1;
                }else{
                    this.areaDisabled = this.form.country == 1;
                }
            },
            //编辑
            editItem(row) {
                this.editMask = true;
                row.country = row.country.toString();
                this.form = row;
                this.itemId = row.id;
                this.itype = "edit";
                if(row.country==1){
                    this.areaDisabled=true;
                    let reginArr=[];
                    reginArr.push(Number(this.form.provinceCode),Number(this.form.cityCode),Number(this.form.areaCode));
                    this.address=reginArr;
                    console.log(this.address)
                }else{
                    this.areaDisabled=false;
                    this.address=''
                }
            },
            //添加修改确定
            addOrEdit(formName) {
                let url = "";
                let data = {};
                data.contacts = this[formName].contacts;
                data.telephone = this[formName].telephone;
                data.country = this[formName].country;
                data.provinceCode = this.address[0];
                data.cityCode = this.address[1];
                data.areaCode = this.address[2];
                data.address = this[formName].address;
                if(data.country==1){
                    if(!this.address[0]||!this.address[1]||!this.address[2]){
                        this.$message.warning('请选择省市区!');
                        return
                    }
                }
                if(!data.address){
                    this.$message.warning('请输入详细地址!');
                    return
                }
                if(!data.contacts){
                    this.$message.warning('请输入联系人!');
                    return
                }
                if(!data.telephone){
                    this.$message.warning('请输入联系电话!');
                    return
                }
                if (this.itype == "add") {
                    url = api.addStoreHouse;
                    data.url = pApi.addStoreHouse;
                } else {
                    url = api.updateStoreHouse;
                    data.id = this.itemId;
                    data.url = pApi.updateStoreHouse;
                }
                this.btnLoading = true;
                this.$axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg);
                            this.btnLoading = false;
                            this.addMask = false;
                            this.editMask = false;
                            this.getList(this.page.currentPage);
                        } else {
                            this.btnLoading = false;
                            this.$message.warning(res.data.msg);
                            this.getList(this.page.currentPage);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //删除
            delItem(id) {
                this.delId = id;
                this.delUrl = api.updateStoreHouseDeleteById;
                this.delUri = pApi.updateStoreHouseDeleteById;
                this.isShowDelToast = true;
            },
            // 删除弹窗
            deleteToast(msg) {
                this.isShowDelToast = msg;
                this.getList();
            },
            //取消
            cancel() {
                this.addMask = false;
                this.editMask = false;
                this.getList();
            }
        }
    }
</script>

<style lang="less">
    .delivery-address {
        .breadcrumb {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            height: 30px;
            overflow: hidden;
            background: white;
            padding-left: 40px;
            box-sizing: border-box;
        }
        .bread-item {
            line-height: 30px;
        }
        .ico {
            margin-right: 5px;
            color: #33b4ff;
            font-size: 18px;
        }
        .tab-item {
            width: 116px;
            height: 50px;
            line-height: 50px;
            border-radius: 0 0 5px 5px;
            text-align: center;
            color: #fff;
            background: #dddddd;
            display: inline-block;
            cursor: pointer;
        }
        .checked {
            background: #ff6868;
        }
        /*表格样式*/
        .table-block {
            padding: 20px 20px 60px;
            background: #fff
        }
        .block {
            float: right;
            margin-top: 10px
        }
        .content {
            padding: 40px 40px 0
        }
        .table-block .el-form-item {
            margin-bottom: 0 !important;
        }
        .search-area {
            margin-bottom: 20px
        }
        .search-area .el-input__inner {
            width: 160px
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
            width: 675px;
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
            width: 180px;
        }
        .el-select .el-input__inner {
            width: 200px;
        }

        .icon-area .el-input__inner {
            width: 240px;
        }
        .el-input__suffix {
            line-height: 24px;
        }

        .el-dialog__footer {
            margin-right: 30px;
        }
        .address-area{
            .address{
                margin-bottom: 10px;
                display: inline-block;
            }
            width: 100%;
            .el-input__inner {
                width: 120px
            }
            .lar-inp{
                margin-top: 20px;
                .el-input__inner {
                    width: 492px
                }
            }
        }
    }


</style>
