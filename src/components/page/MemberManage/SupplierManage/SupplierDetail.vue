<template>
    <div>
        <v-breadcrumb :nav="['会员管理','供应商管理','供应商详情']"></v-breadcrumb>
        <div class="container" v-loading="loading">
            <div class="basic-inf-area line">
                <div class="item-row">
                    供应商名称：{{detail.levelName}}
                </div>
                <div class="item-row">
                    供应商ID：{{detail.levelName}}
                </div>
                <div class="item-row">
                    供应商类型：
                    <span v-if="detail.invite_type==1">网信经销商</span>
                    <span v-if="detail.invite_type==2">供货经销商</span>
                    <span v-if="detail.invite_type==3">网红经销商</span>
                </div>

                <div class="item-row">
                    供应商姓名：
                    {{detail.adminName}}
                </div>
                <div class="item-row">
                    联系方式：
                    {{detail.phone}}
                </div>
                <div class="item-row">
                    手机：
                    {{detail.phone}}
                </div>
                <div class="item-row">
                    供应商账户：
                    {{detail.phone}}
                </div>
                <div class="item-row">
                    供应商地址：
                    {{detail.phone}}
                </div>
                <div class="item-row">
                    供应产品品类品牌：
                    {{detail.phone}}
                </div>

            </div>
            <div style="margin:50px">
                <el-button type="primary" @click="backToList">返回列表</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import icon from '../../../common/ico.vue';
    import * as api from '../../../../api/api';
    import * as pApi from '../../../../privilegeList/index.js';
    export default {
        components: {
            icon, vBreadcrumb,
        },
        data: function () {
            return {
                detail: {},
                id: '',
                loading: false,
                list: ''
            }
        },
        activated() {
            this.id =
                this.$route.query.id ||
                JSON.parse(sessionStorage.getItem("inviteDetail").id);
            this.getDetail()
        },
        methods: {
            //获取详情
            getDetail() {
                let that = this;
                let data = {
                    id: that.id,
                    url:pApi.findInviteInfo
                };
                that.$axios
                    .post(api.findInviteInfo, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.loading = false;
                            that.detail = res.data.data.invite;
                            that.list = res.data.data.list;
                            console.log(that.list)
                        } else {
                            that.$message.warning(res.data.msg);
                            that.loading = false;
                        }
                    })
                    .catch(err => {
                        that.loading = false;
                        console.log(err)
                    })
            },
            //返回列表
            backToList() {
                this.$router.push('/joinManage')
            },
            //跳到用户详情页面
            toUserDetail(item) {
                localStorage.setItem('memberDetail', item.id);
                this.$router.push({path: '/memberDetail', query: {id: item.id}})
            }
        }
    }
</script>
<style scoped>
    .container {
        font-size: 14px;
        color: #606266;
        height: auto;
        margin-bottom: 20px;
        padding: 30px 0 30px 80px;
    }

    .title {
        margin-bottom: 10px;
        font-size: 16px;
        color: #666
    }

    .tags-area {
        margin-top: 10px
    }

    .line {
        border-bottom: 1px solid #e2e2e2;
        margin-bottom: 20px;
    }

    .left {
        float: left;
        width: 60px;
    }

    .center {
        float: left;
        width: 100px;
    }

    .right {
        float: right;
        text-align: right;
    }

    .clearfix {
        clear: both
    }

    .item-row {
        height: 40px;
        line-height: 40px;
    }

    .color-blue {
        color: #20a0ff;
        cursor: pointer;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #999;
    }

    .el-tag {
        height: 32px;
        line-height: 32px;
        margin-right: 10px;
        vertical-align: middle;
    }

    .input-new-tag {
        width: 200px
    }

    .succ-item {
        width: 370px;
        height: 52px;
        line-height: 27px;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        padding: 8px 12px;
        display: inline-block;
        margin: 0 10px 10px 0;
    }
</style>
