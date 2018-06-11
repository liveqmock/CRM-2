<template>
  <div class="release-product">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 45px' }">
          <div class="pro-title">基本信息</div>
          <el-form :model="form" ref="form">
            <el-form-item label="产品名称">
                <el-input style="width:300px" v-model="form.name" placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item label="产品图片">
                <draggable style="display:inline-block" v-model="imgArr" :move="getdata" @update="datadragEnd">
                    <transition-group>
                        <div class="img-wrap" v-for="(v,k) in imgArr" :key="k">
                            <div class="delImg" @click="deleteImg(v)"><icon ico='icon-shanchu'></icon></div>
                            <img class="uImg" :src="v">
                        </div>
                    </transition-group> 
                </draggable>
                <el-upload class="img-uploader" :action="uploadImg" :show-file-list="false" :on-success="successUpload" :disabled="isUseUpload" multiple >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="upload-tip">建议尺寸：800*800,拖拽图片可以改变顺序，第一张为默认头图</div>
            </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
import draggable from "vuedraggable";
import icon from '@/components/common/ico';
import * as api from "@/api/api.js";
import * as pApi from "@/privilegeList/index.js";
export default {
  components: {
    draggable,
    vBreadcrumb,
    icon
  },

  data() {
    return {
      nav: ["品牌产品管理", "产品管理", "发布产品"],
      isUseUpload: false,
      uploadImg: "",
      imgArr: [],
      form: {}
    };
  },

  activated() {
    this.uploadImg = api.addImg;
  },

  methods: {
    //  图片上传/拖拽
    getdata(evt) {
    //   console.log(evt.draggedContext.element.url);
    },
    datadragEnd(evt) {
    //   console.log(this.imgArr);
    },
    successUpload(res) {
      this.$message.warning("上传中...");
      if (res.code == 200) {
        if (this.imgArr.length >= 5) {
          this.isUseUpload = true;
          this.$message.warning('最多只能上传五张图片');
          return;
        }
        this.imgArr.push(res.data.imageUrl);
        this.$message.success("上传成功");
      } else {
        this.$message.warning(res.data.msg);
      }
    },
    // 删除图片
    deleteImg(img){
        let index = this.imgArr.indexOf(img);
        if(index == -1){
            return;
        }
        this.imgArr.splice(index,1);
        if(this.imgArr.length < 5){
            this.isUseUpload = false;
        }
    }
  }
};
</script>
<style lang='less'>
.release-product {
  .pro-title {
    width: 100%;
    height: 60px;
    background-color: #f7f7f7;
    line-height: 60px;
    padding: 0 25px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .img-wrap {
      display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    margin-right: 10px;
    border-radius: 10px;
    overflow: hidden;
    .uImg {
      position: relative;
      display: inline-block;
      width: 100px;
      height: 100px;
    }
    .delImg {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 15px;
      color: white;
      background-color: red;
      z-index: 99999;
      line-height: 15px;
      text-align: center;
      font-weight: 900;
      cursor: pointer;
    }
  }
  .upload-tip{
      color: #999;
      font-size: 12px;
      margin:-10px 0 0 70px;
  }
  .img-uploader {
    display: inline-block;
  }
  .el-upload--text {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
}
</style>