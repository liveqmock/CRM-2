<template>
    <div class="sidebar">
        <div v-if="isShowLogo" class="search-area">
            <img class="logo-img" src="../../assets/images/logo.png" alt="" />
        </div>
        <el-menu :unique-opened='true' class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#222d32"
            text-color="#b1b1b1" active-text-color="#fff" router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                          <icon :ico="item.icon"></icon><span style="margin-left:6px" slot="title">{{ item.title }}</span>
                            <!-- <i :class="item.icon"></i><span slot="title">{{ item.title }}</span> -->
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <icon :ico="item.icon"></icon><span style="margin-left:6px" slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../common/bus";
import icon from "./ico";
export default {
  components: {
    icon
  },
  data() {
    return {
      collapse: false,
      isShowLogo: true,
      items: [
        {
          icon: "icon-shouye",
          index: "dashboard",
          title: "系统首页"
        },
        {
          icon: "icon-shouquanfuwu",
          index: "3",
          title: "授权管理",
          subs: [
            {
              index: "channelItemManage",
              title: "渠道类目管理"
            }
            // {
            //   index: "certificateUse",
            //   title: "授权证书模板"
            // },
            // {
            //   index: "contractReview",
            //   title: "续约审核"
            // }
          ]
        },
        {
          icon: "icon-suyuan",
          index: "101",
          title: "溯源管理",
          subs: [
            {
              index: "rootsCodeMange",
              title: "溯源防伪码管理"
            },
            {
              index: "rootsCodeQuery",
              title: "防伪码查询"
            },
            {
              index: "rootsCodeTpl",
              title: "防伪码模板"
            },
            {
              index: "rootsCodeParams",
              title: "防伪码参数设置"
            }
          ]
        },
        {
          icon: "icon-fenlei",
          index: "4",
          title: "品牌产品管理",
          subs: [
            {
              index: "brandProductClassify",
              title: "产品分类管理"
            },
            {
              index: "brandManage",
              title: "品牌管理"
            },
            {
              index: "productList",
              title: "产品管理"
            },
            {
              index: "shippingTemplate",
              title: "运费模板"
            },
            {
              index: "giftManage",
              title: "产品礼包设置"
            }
          ]
        },
        {
          icon: "icon-huiyuanzhanghaoguanli",
          index: "6",
          title: "会员管理",
          subs: [
            {
              index: "levelManage",
              title: "经销商层级管理"
            },
            {
              index: "joinManage",
              title: "经销商加盟管理"
            },
            {
              index: "memberManage",
              title: "经销商会员管理"
            },
            {
              index: "accountRecharge",
              title: "账户充值"
            },
            {
              index: "realNameAuthentication",
              title: "实名制认证审核"
            },
            {
              index: "activityParams",
              title: "活跃度参数设置"
            }
          ]
        },
        {
          icon: "icon-huiyuanzhanghaoguanli",
          index: "9",
          title: "服务管理",
          subs: [
            {
              index: "noticeInformManage",
              title: "公告通知管理"
            },
            {
              index: "feedBack",
              title: "问题反馈"
            }
          ]
        },
        {
          icon: "icon-yunying",
          index: "运营管理",
          title: "运营管理",
          subs: [
            {
              index: "helpCenter",
              title: "帮助中心管理"
            },
            {
              index: "currencyRatio",
              title: "货币比例设置"
            },
            {
              index: "baseParamsSet",
              title: "基础参数设置"
            },
          ]
        },
        {
          icon: "icon-shezhi",
          index: "7",
          title: "权限管理",
          subs: [
            {
              index: "organizeMange",
              title: "组织结构管理"
            },
            {
              index: "manageList",
              title: "管理员账号管理"
            },
            {
              index: "setPermission",
              title: "权限设置"
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
      this.isShowLogo = !msg;
    });
  }
};
</script>

<style lang='less'>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background-color: #222d32;
  .el-submenu__title {
    font-size: 16px;
  }
  .el-menu-item {
    font-size: 16px;
  }
  .el-menu-item .is-active,
  .el-submenu .is-active {
    border-left: 5px solid #ff1e30;
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
  .el-menu-item:hover {
    color: white !important;
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
  .search-area {
    height: 150px;
    text-align: center;
    .logo-img {
      width: 128px;
      height: 128px;
      margin-top: 15px;
      border-radius: 64px;
      background-color: white;
    }
  }
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
