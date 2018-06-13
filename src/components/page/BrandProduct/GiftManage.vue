<template>
    <div class="gift">
        <v-breadcrumb :nav="['品牌产品管理','礼包管理']"></v-breadcrumb>
        <div class="el-card">
            <div class="tab-content">
                <el-button @click="addGift" class="add-gift" type="primary">添加礼包</el-button>
                <el-table border :data="tableData" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column prop="name" label="产品名称" align="center" min-width="300"></el-table-column>
                    <el-table-column prop="" label="产品类目" align="center" min-width="120"></el-table-column>
                    <el-table-column label="礼包售价" align="center" min-width="50">
                        <template slot-scope="scope">
                            {{scope.row.price | formatPrice}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="库存" align="center" min-width="50"></el-table-column>
                    <el-table-column prop="" label="销售" align="center" min-width="50"></el-table-column>
                    <el-table-column prop="" label="可购买等级" align="center" min-width="50"></el-table-column>
                    <el-table-column prop="" label="发布时间/发布人" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="" label="状态" align="center" min-width="50"></el-table-column>
                    <el-table-column label="操作" align="center" width="280">
                        <template slot-scope="scope">
                            <div class="operate">
                                <el-button @click="editgift(scope.row)" type="success">编辑礼包</el-button>
                                <el-button @click="specificationsManage(scope.row)" disabled type="primary">价格库存
                                </el-button>
                                <el-button @click="giftStatus(scope.row)" disabled type="danger">礼包上架</el-button>
                                <el-button @click="giftInfo(scope.row)" type="primary">查看详情</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
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
                <div class="operate-table">
                    <el-button>删除</el-button>
                    <el-button>下架</el-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import * as api from '../../../api/api';
    import * as pApi from '../../../privilegeList/index.js';

    export default {
        props: ["name"],
        components: {vBreadcrumb, icon},

        created() {
            this.id = this.name;
        },

        data() {
            return {
                id: "",
                itemList: [{label: "数码家电", value: "1"}],
                form: {
                    name: "",
                    id: "",
                    code: "",
                    item: "",
                    sellMin: "",
                    sellMax: "",
                    priceMin: "",
                    priceMax: ""
                },
                tableData: [
                    {id: '1', name: "数码家电", price: 200},
                    {id: '2', name: "零食", price: 300}
                ],
                multipleSelection: [],
                page: {
                    currentPage: 1,
                    totalPage: 1
                }
            };
        },

        methods: {
            //   重置表单
            resetForm(formName) {
                this.form.sellMax = "";
                this.form.priceMax = "";
                this.$refs[formName].resetFields();
            },
            // 全选
            handleSelectionChange(val) {
                let that = this;
                this.multipleSelection = [];
                val.forEach((v, k) => {
                    that.multipleSelection.push(v.id);
                })
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.currentPage = val;
                this.getList(val)
            },
            // 添加礼包
            addGift() {
                this.$router.push({name: 'addGift'});
            },
            // 编辑礼包
            editgift(row) {
                sessionStorage.setItem('giftId', row.id);
                this.$router.push({name: 'editGift', query: {giftId: row.id}});
            },

            // 产品上架/下架
            giftStatus(row, status) {
                console.log(row);
            },
            // 查看详情
            giftInfo(row) {
                console.log(row);
            },
        },
        filters: {
            formatPrice(val) {
                return `￥${val}`;
            }
        }
    };
</script>
<style lang='less'>
    .gift {
        .el-card {
            padding: 20px;
            .tab-content {
                .add-gift {
                    margin: 0 0 20px 0;
                }
                .search-pane {
                    width: 100%;
                    padding: 30px 0 0 0;
                    margin-bottom: 20px;
                    background-color: #f7f7f7;
                    box-sizing: border-box;
                }
                .el-input-group__append,
                .el-input-group__prepend {
                    padding: 0 4px;
                }
                .operate {
                    button {
                        margin-right: 10px;
                        margin-top: 5px;
                    }
                    button:nth-child(3) {
                        margin:0 10px 0 0;
                    }
                }
                .operate-table {
                    margin-top: 10px;
                }
                .block {
                    float: right;
                    margin-top: 10px
                }
            }
        }

    }

</style>
