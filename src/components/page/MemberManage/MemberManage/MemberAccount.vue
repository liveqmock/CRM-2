<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理','会员详情','TA的账户']"></v-breadcrumb>
        <div class="accountInfod">
            <ul class="card-box">
                <li>
                    <div class="card-title">
                        <icon class="ico" ico='icon-jinggao'/>
                        现金账户 （元）
                    </div>
                    <div class="card-content">
                        <div class="card-amout">
                            可提现：600.00
                        </div>
                        <div class="frozen">
                            冻结中：850.00
                        </div>
                    </div>
                    <span class="spanBtn" @click="btnClicked(1)">收支明细</span>
                </li>
                <li>
                    <div class="card-title">
                        <icon class="ico" ico='icon-jinggao'/>
                        代币账户（币）
                    </div>
                    <div class="card-content">
                        <div class="card-amout">
                            积分数：1582
                        </div>
                    </div>
                    <span class="spanBtn" @click="btnClicked(2)">收支明细</span>
                </li>
                <li>
                    <div class="card-title">
                        <icon class="ico" ico='icon-jinggao'/>
                        分红账户（点）
                    </div>
                    <div class="card-content">
                        <div class="card-amout">
                            分红点数：1574
                        </div>
                    </div>
                    <span class="spanBtn"  @click="btnClicked(3)">收支明细</span>
                </li>
                <li>
                    <div class="card-title">
                        <icon class="ico" ico='icon-jinggao'/>
                        积分账户（分）
                    </div>
                    <div class="card-content">
                        <div class="card-amout">
                            积分数：1582
                        </div>
                    </div>
                    <span class="spanBtn" @click="btnClicked(4)">收支明细</span>
                </li>
                <li>
                    <div class="card-title">
                        <icon class="ico" ico='icon-jinggao'/>
                        银行卡（张）
                    </div>
                    <div class="card-content">
                        <div class="card-amout">
                            已绑定银行卡：6
                        </div>
                    </div>
                    <span class="spanBtn"  @click="btnClicked(5)">查看详情</span>
                </li>
            </ul>

        </div>
    </div>
</template>


<script>
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import icon from '../../../common/ico.vue';

    export default {
        components: {
            icon, vBreadcrumb
        },
        data: function () {
            return {
                // 权限控制
            }
        },
        activated() {

        },
        methods: {
            btnClicked(id) {
                switch(id) {
                    case 1:
                        this.$router.push({path:'/cashAccountBalance'});
                        break;
                    case 2:
                        this.$router.push({path:'/tokenAccountBalance'});
                        break;
                    case 3:
                        this.$router.push({path:'/shareAccountBalance'});
                        break;
                    case 4:
                        this.$router.push({path:'/integralAccountBalance'});
                        break;
                    case 5:
                        this.$router.push({path:'/MemberCard'});
                        break;
                    default:
                }
            },
        }
    }
</script>


<style  lang="less" scoped>
    ol, ul, li { list-style:none; }
    .svg-icon{
        width: 25px;
        height: 25px;
        margin-right: 13px;
    }
    .card-box{
        overflow: hidden;
        display: flex;
        flex-wrap:wrap;
        padding:40px 0 40px 40px;
        color:#fff;
        li{
            margin:0 10px 20px 10px;
            border:1px solid #ddd;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            width: 420px;
            height: 240px;
            border-radius: 20px;
            box-sizing: border-box;
            padding:29px 22px 30px 30px;
            background: orange;
            .card-title{
                font-size: 18px;
                margin-bottom: 20px;
                display: flex;
            }
            .card-content{
                display: flex;
                flex-direction:column;
                align-items: center;
                height:70px;
                justify-content: center;
                .card-amout{
                    font-size:30px ;
                }
                .frozen{
                    font-size: 20px;
                    margin-top: 10px;
                }
            }
            .spanBtn{
                display: block;
                margin: auto;
                margin-top: 27px;
                width:109px;
                height:40px;
                border:2px solid;
                border-radius:5px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
            }
        }
    }

</style>
