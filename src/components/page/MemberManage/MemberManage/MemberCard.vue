<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理','会员详情','TA的账户']"></v-breadcrumb>
        <div class="accountInfod">
            <ul class="card-box">
                <li>
                    <div class="card-num">
                        <span>****</span>
                        <span>****</span>
                        <span>****</span>
                        <span>889</span>
                    </div>
                    <div class="delete">
                        <div>持卡人：杨*萌</div>
                        <div class="spanBtn">删除</div>
                    </div>
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


        }
    }
</script>


<style  lang="less" scoped>
    ol, ul, li { list-style:none; }
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
            padding:130px 21px 19px 35px;
            background: orange;
            .card-num{
               font-size: 24px;
               display: flex;
               align-items: center;
               justify-content: space-between;
               width:290px;
               margin: auto;
               margin-bottom:20px;
            }
            .delete{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .spanBtn{
                    display: inline-block;
                    width: 89px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    border: 1px solid;
                    border-radius: 5px;
                }
            }
        }
    }

</style>
