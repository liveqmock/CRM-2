<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理','会员详情','TA的账户']"></v-breadcrumb>
        <div class="accountInfod">
            <ul class="card-box">
                <li class="Account">
                    <div class="card-title">
                        <icon class="ico" ico='icon-ffffff'/>
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
                <li class="userToken">
                    <div class="card-title">
                        <icon class="ico" ico='icon-jinbiqian'/>
                        代币账户（币）
                    </div>
                    <div class="card-content">
                        <div class="card-amout">
                            积分数：1582
                        </div>
                    </div>
                    <span class="spanBtn" @click="btnClicked(2)">收支明细</span>
                </li>
                <li class="UserBonus">
                    <div class="card-title">
                        <icon class="ico" ico='icon-xianjindai'/>
                        分红账户（点）
                    </div>
                    <div class="card-content">
                        <div class="card-amout">
                            分红点数：1574
                        </div>
                    </div>
                    <span class="spanBtn"  @click="btnClicked(3)">收支明细</span>
                </li>
                <li class="userIntegral">
                    <div class="card-title">
                        <icon class="ico" ico='icon-youhuiquan'/>
                        积分账户（分）
                    </div>
                    <div class="card-content">
                        <div class="card-amout">
                            积分数：1582
                        </div>
                    </div>
                    <span class="spanBtn" @click="btnClicked(4)">收支明细</span>
                </li>
                <li class="userCard">
                    <div class="card-title">
                        <icon class="ico" ico='icon-tubiaolunkuo-'/>
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
                id:''
                // 权限控制
            }
        },
        activated() {
            this.id =
                this.$route.query.memberId ||
                JSON.parse(sessionStorage.getItem("memberId"));
        },
        methods: {
            btnClicked(id) {
                let that=this;
                // sessionStorage.setItem('memberId', that.id);
                switch(id) {
                    case 1:
                        this.$router.push({path:'/cashAccountBalance',query:{'memberId':that.id}});
                        break;
                    case 2:
                        this.$router.push({path:'/tokenAccountBalance',query:{'memberId':that.id}});
                        break;
                    case 3:
                        this.$router.push({path:'/shareAccountBalance',query:{'memberId':that.id}});
                        break;
                    case 4:
                        this.$router.push({path:'/integralAccountBalance',query:{'memberId':that.id}});
                        break;
                    case 5:
                        this.$router.push({path:'/MemberCard',query:{'memberId':that.id}});
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
    #bgImg ( @url){
        background:url(@url) no-repeat;
    }
    #displayFlex(){
        display: flex;
        align-items: center;
    }
    .card-box{
        overflow: hidden;
        #displayFlex;
        flex-wrap:wrap;
        padding:40px 0 40px 60px;
        color:#fff;
        background:#fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        .userToken{
            #bgImg('../../../../assets/images/userToken.png');
        }

        .Account{
            #bgImg('../../../../assets/images/userAccount.png');
        }
        .UserBonus{
            #bgImg('../../../../assets/images/userFH.png');
        }
        .userCard{
            #bgImg('../../../../assets/images/userCard.png');
        }
        .userIntegral{
            #bgImg('../../../../assets/images/userJF.png');
        }
        li{
            /*margin:0 10px 20px 10px;*/
            /*box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);*/
            width: 460px;
            height:272px;
            border-radius: 20px;
            box-sizing: border-box;
            padding:44px 32px 40px 45px;
            .card-title{
                font-size: 18px;
                margin-bottom: 20px;
                display: flex;
            }
            .card-content{
                #displayFlex;
                flex-direction:column;
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
