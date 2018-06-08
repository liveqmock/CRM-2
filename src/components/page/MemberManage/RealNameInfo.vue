<template>
    <div class="realname-info">
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <div class="wrap">
                <span class='title'>基本信息</span>
                <p>证件类型：{{certificateType}}</p>
                <p>姓名：{{name}}</p>
                <p>身份证号：{{idCard}}</p>
                <span class='title'>图片</span>
                <div class="info">
                    <div class="card" v-for="(v,k) in img" :key="k">
                        <img src="../../../assets/images/avatar.jpg" alt="">
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import breadcrumb from '../../common/Breadcrumb'
import * as api from '../../../api/api.js';
import * as pApi from '../../../privilegeList/index.js';
export default {
    components: {
        breadcrumb
    },
    data () {
        return {
            nav: ["会员管理", "经销商会员管理", "会员详情","实名认证"],
            certificateType:'身份证',
            name:'张三',
            idCard:'150123456789123456',
            img:[1,2,3,4,5,6]
        }
    },
    activated(){

    },
    methods:{
    }
}
</script>
<style lang='less' scoped>
.realname-info{
    .wrap{
        margin: 10px 50px;
        color: #666;
        .title{
            font-size: 16px;
            line-height: 40px;
        }
        p{
            font-size: 14px;
            line-height: 25px;
        }
        .info{
            .card{
                display: inline-block;
                width: 265px;
                height: 165px;
                border: 1px solid #ccc;
                border-radius: 5px;
                margin: 5px 11px;
                padding: 10px;
                box-sizing: border-box;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>


