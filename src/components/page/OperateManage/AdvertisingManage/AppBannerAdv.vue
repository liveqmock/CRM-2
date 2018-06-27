<template>
  <div class="app-banner-adv">
    <v-breadcrumb :nav="['运营管理','广告位管理','APP首页banner广告位']"></v-breadcrumb>
    <el-card :body-style="{ padding: '20px 40px' }">
        <el-button @click="addBanImg" type="primary" style="margin-bottom:20px">添加banner图片</el-button>
        <el-table border :data="tableData">
          <el-table-column prop="id" label="编号" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template slot-scope="scope">
              <img class="img" :src="scope.row.img">            
            </template>
          </el-table-column>
          <el-table-column prop="id" label="链接" align="center"></el-table-column>
          <el-table-column prop="id" label="备注" align="center"></el-table-column>
          <el-table-column prop="id" label="投放时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary">编辑</el-button>
              <el-button type="warning">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <el-dialog title="添加Banner图片" :visible.sync="isAddBanner" width="30%">
      <el-form :model="form" ref="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item prop="img" label="选择banner图">
            <el-input class="input-style" readonly v-model="form.img"></el-input>
            <span class="tip">建议图片尺寸350*750</span>
            <el-upload class="icon-uploader" action="/commonAPI/ossClient/aliyunOSSUploadImage" :on-success="handleAvatarSuccess">
                <el-button size="small" type="primary"><i class="el-icon-upload"></i>上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item prop="idUrl" label="添加指向链接/ID">
            <el-input class="input-style" placeholder="请输入指向链接/ID" v-model="form.idUrl"></el-input>
        </el-form-item>
        <el-form-item prop="tip" label="备注说明">
            <el-input class="input-style" placeholder="请输入备注说明" v-model="form.tip"></el-input>
        </el-form-item>
        <el-form-item prop="time" label="备注说明">
          <el-date-picker class="input-style" v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isAddBanner = false">确 定</el-button>
        <el-button @click="isAddBanner = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vBreadcrumb from "../../../common/Breadcrumb.vue";
import utils from "@/utils/index.js";
export default {
  components: { vBreadcrumb },

  data() {
    return {
      isAddBanner: false,
      formLabelWidth: "130px",
      tableData: [{ id: 1,img:'src/assets/images/avatar.jpg' }],
      form: { img: "" ,idUrl:"",tip:"",time:""},
      rules:{img:[{ required: true, message: ' ', trigger: 'blur' }],idUrl:[{ required: true, message: '请输入指向链接/ID', trigger: 'blur' }]}
    };
  },

  activated() {
    this.getList();
  },

  methods: {
    // 获取数据
    getList() {},
    // 添加banner图
    addBanImg() {
      utils.cleanFormData(this.form)
      this.isAddBanner = true;
    },
    // 上传图片成功回调
    handleAvatarSuccess(res) {
      this.form.img = res.data.imageUrl;
    }
  }
};
</script>
<style lang='less'>
.app-banner-adv {
  .el-dialog__header {
    border-bottom: 1px solid #ccc;
    .el-dialog__title {
      color: #ff4e4e;
      font-weight: 700;
    }
  }
  .input-style {
    width: 240px;
  }
  .el-input__suffix {
    line-height: 24px;
  }
  .icon-uploader {
    float: right;
    margin-right: 31px;
    height: 33px;
  }
  .icon-uploader .el-button--small {
    border-radius: 5px;
    width: 100px;
  }
  .el-upload--text{
    width: 100px;
    height: 40px;
    border: none;
  }
  .el-upload--text .el-icon-upload {
    line-height: 0;
    margin: 0;
    color: #fff;
    font-size: 14px;
  }
  .el-upload-list {
    display: none;
  }
  .img{
    width: 200px;
    height: 100px;
  }
  .tip{
    color: #ff4e4e;
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 80%;
  }
}
</style>