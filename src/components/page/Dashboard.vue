<template>
    <div>
        <breadcrumb :nav='["首页"]'></breadcrumb>
        <el-row>
            <el-col :span="24">
                <el-card class="top-card clearfix">
                    <div slot="header" class="clearfix">
                        <span class="card-title-rect"></span>
                        <span>数据类模块</span>
                    </div>
                    <div class="top-wrap">
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-zhucedengluyonghuming' /> 今日会员注册</div>
                            <div class="ocontent">66</div>
                        </div>
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-huiyuan' /> 本月会员注册</div>
                            <div class="ocontent">66</div>
                        </div>
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-huiyuanjifenshixiaobaobiao' /> 今日晋升会员</div>
                            <div class="ocontent">66</div>
                        </div>
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-huiyuanjifenshixiaobaobiao' /> 本月晋升会员</div>
                            <div class="ocontent">66</div>
                        </div>
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-yubeifeiyong' /> 本日自动续约</div>
                            <div class="ocontent">66</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row >
        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="10">
                <el-card class="top-card clearfix">
                    <div slot="header" class="clearfix">
                        <span class="card-title-rect"></span>
                        <span>待处理模块</span>
                    </div>
                    <div class="left-wrap">
                        <div class='left-content'>
                            <div class="ico-wrap"><img src="../../assets/images/icon-1.png" alt=""></div>
                            <span class='l-title'>待反馈问题</span>
                            <span class="l-content">666666</span>
                        </div>
                        <div class='left-content'>
                            <div class="ico-wrap"><img src="../../assets/images/icon-2.png" alt=""></div>
                            <span class='l-title'>待处理晋升审核</span>
                            <span class="l-content">666666</span>
                        </div>
                        <div class='left-content'>
                            <div class="ico-wrap"><img src="../../assets/images/icon-3.png" alt=""></div>
                            <span class='l-title'>待审核产品</span>
                            <span class="l-content">666666</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card class="top-card clearfix">
                    <div slot="header" class="clearfix">
                        <span class="card-title-rect"></span>
                        <span>快捷操作模块</span>
                    </div>
                    <div class="right-wrap">
                        <!-- <router-link to="/brandProductClassify" tag="div"> -->
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-chanpin1' /></div>
                            <span class="r-content">发布产品</span>
                        </div>
                        <!-- </router-link> -->
                        <router-link to="/addNoticeInform" tag="div">
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-tongzhi' /></div>
                            <span class="r-content">发布公告/通知</span>
                        </div>
                        </router-link>
                        <router-link to="/addManger" tag="div">
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-huiyuan' /></div>
                            <span class="r-content">创建管理员账号</span>
                        </div>
                        </router-link>
                        <router-link to="/sendInvite" tag="div">
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-huiyuantianjiakehu' /></div>
                            <span class="r-content">会员邀请</span>
                        </div>
                        </router-link>
                        <router-link to="/rootsCodeQuery" tag="div">
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-chaxun' /></div>
                            <span class="r-content">防伪码查询</span>
                        </div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <act-account-code @status='isShowCode' v-if="isShowActAccCode"></act-account-code>
        <act-account-pwd @status='isShowPwd' v-if="isShowActAccPwd"></act-account-pwd>
    </div>
</template>

<script>
import icon from "../common/ico";
import breadcrumb from "../common/Breadcrumb";
import actAccountPwd from "./Dashboard/actAccountPwd";
import actAccountCode from './Dashboard/actAccountCode';

import * as api from '../../api/api'

export default {
  components: {
    icon,
    breadcrumb,
    actAccountPwd,
    actAccountCode
  },
  data() {
    return {
      isShowActAccPwd: false,
      isShowActAccCode:false
    };
  },
  created(){
      if(localStorage.getItem('ms_hadFirstLogin') == 1){
          this.isShowActAccCode = true;
      }
  },
  methods: {
    //  激活账号弹窗
    isShowCode(msg) {
        this.isShowActAccCode = msg;
        this.isShowActAccPwd = !msg;
    },
    isShowPwd(msg){
        this.isShowActAccPwd = false;
    },
  }
};
</script>


<style scoped>
@import "../../assets/css/dashboard/dashboard.css";
</style>
