<template>
    <div class="header">
        <transition name="bounce">
            <div v-if="isShowTitle" class="logo">欢迎进入后台管理系统</div>
        </transition>
        <!-- 折叠按钮 -->
        <div class="collapse-btn" :class="{'btn-color':!isShowTitle}" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="tag">
          <v-tags></v-tags>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
                <div v-if="face" class="user-avator"><img :src="face"></div>
                <div v-else class="user-avator"><img src="../../assets/images/avatar.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='editMangerMsg'>个人信息</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import bus from "../common/bus";
import vTags from "./Tags.vue";
import * as api from '../../api/api.js';
export default {
  components: {
    vTags
  },
  data() {
    return {
      isShowTitle: true,
      collapse: false,
      fullscreen: false,
      face: "",
      name: "请登陆",
      message: 2
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    }
  },
  created() {
    this.id = localStorage.getItem("ms_userID");
    this.$axios
      .post(api.findAdminUserbyId, { id: this.id })
      .then(res => {
        if (res.data.code == 200) {
          this.face = res.data.data.face;
        } else {
          this.$message.warning(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push("/login");
      } else if (command == "editMangerMsg") {
        sessionStorage.setItem("editMangerMsg", "admin");
        this.$router.push({
          name: "editMangerMsg",
          params: { editMangerMsg: "admin" }
        });
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
      this.isShowTitle = !this.collapse;
    },

    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: #ff6868;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.btn-color {
  background-color: #222d32;
}
.header .logo {
  float: left;
  width: 200px;
  text-align: center;
  line-height: 70px;
  background-color: #fb1f30;
  font-size: 16px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.bounce-enter-active {
  animation: bounce-out 0.35s;
}
.bounce-leave-active {
  animation: bounce-in 0.35s;
}
.tag {
  float: left;
  margin-top: 20px;
  left: 300px;
  width: 69%;
  height: 30px;
}
@keyframes bounce-in {
  0% {
    width: 200px;
  }
  100% {
    width: 0px;
  }
}
@keyframes bounce-out {
  0% {
    width: 0px;
  }
  100% {
    width: 200px;
  }
}
</style>
