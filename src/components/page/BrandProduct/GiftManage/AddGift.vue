<template>
    <div class="add-gift">
        <v-breadcrumb :nav='nav'></v-breadcrumb>
        <el-card :body-style="{ padding: '20px 45px',color:'#666' }">
            <div class="pro-title">基本信息</div>
            <el-form :model="form" ref="form" label-width="100px">
                <el-form-item label="产品名称">
                    <el-input style="width:300px" v-model="form.name" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item label="产品图片">
                    <draggable style="display:inline-block" v-model="imgArr" :move="getdata" @update="datadragEnd">
                        <transition-group>
                            <div class="img-wrap" v-for="(v,k) in imgArr" :key="k">
                                <div class="delImg" @click="deleteImg(v)">
                                    <icon ico='icon-shanchu'></icon>
                                </div>
                                <img class="uImg" :src="v">
                            </div>
                        </transition-group>
                    </draggable>
                    <el-upload class="img-uploader" :action="uploadImg" :show-file-list="false"
                               :on-success="successUpload" :disabled="isUseUpload" multiple>
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="upload-tip">建议尺寸：800*800,拖拽图片可以改变顺序，第一张为默认头图</div>
                </el-form-item>
                <el-form-item label="产品分类">
                    <el-select v-model="form.proCategory" placeholder="请选择">
                        <el-option v-for="(v,k) in proCategoryArr" :key="k" :label="v.label"
                                   :value="v.value"></el-option>
                    </el-select>
                    <span style="margin-left:30px">产品品牌</span>
                    <el-select v-model="form.proBrand" placeholder="请选择">
                        <el-option v-for="(v,k) in proCategoryArr" :key="k" :label="v.label"
                                   :value="v.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商">
                    <el-select v-model="form.supplier" placeholder="下拉搜索供应商">
                        <el-option v-for="(v,k) in proCategoryArr" :key="k" :label="v.label"
                                   :value="v.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发货地">
                    <el-select v-model="form.originAddress" placeholder="选择发货地">
                        <el-option v-for="(v,k) in proCategoryArr" :key="k" :label="v.label"
                                   :value="v.value"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="产品重量">-->
                <!--<el-input class="pro-weight" v-model="form.weight"></el-input>kg-->
                <!--</el-form-item>-->
                <!--<el-form-item label="产品体积">-->
                <!--<el-input class="pro-weight" v-model="form.volume"></el-input>m³-->
                <!--</el-form-item>-->
                <el-form-item label="产品参数">
                    <div class="product-param">
                        <span>产品颜色</span>
                        <el-input class="inp-param" v-model="form.proColor"></el-input>
                        <span>产品尺寸</span>
                        <el-input class="inp-param" v-model="form.proSize"></el-input>
                        <span>产品款式</span>
                        <el-input class="inp-param" v-model="form.proStyle"></el-input>
                        <span>产品种类</span>
                        <el-input class="inp-param" v-model="form.proClass"></el-input>
                    </div>
                </el-form-item>
                <div class="pro-title">运费其他</div>
                <el-form-item label="选择运费模板">
                    <el-select v-model="form.freightTpl" placeholder="请选择模板">
                        <el-option v-for="(v,k) in proCategoryArr" :key="k" :label="v.label"
                                   :value="v.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="售后周期">
                    <transition name="fade">
                        <el-select v-if="!showSaleTime" v-model="form.saleTime" placeholder="请选择售后周期">
                            <el-option v-for="(v,k) in proCategoryArr" :key="k" :label="v.label"
                                       :value="v.value"></el-option>
                        </el-select>
                        <el-input v-if='showSaleTime' v-model="form.saleTime" style="width:215px"
                                  placeholder="请输入售后周期"></el-input>
                    </transition>
                    <el-button @click="defSaleTime">自定义</el-button>
                </el-form-item>
                <el-form-item label="交易默认时间">
                    <transition name="fade">
                        <el-select v-model="form.defaultTime">
                            <el-option
                                v-for="(item,index) in times"
                                :key="index"
                                :label="item.label"
                                :value="item.id"
                            >
                                {{item.label}}
                            </el-option>
                        </el-select>
                    </transition>
                    <el-button @click="defSaleTime">自定义</el-button>
                </el-form-item>
                <el-form-item label="可延长收货时间" class="address-item">
                    <transition name="fade">
                        <el-select v-model="form.deliveryTime" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in times"
                                :key="index"
                                :label="item.label"
                                :value="item.id"
                            >
                                {{item.label}}
                            </el-option>
                        </el-select>
                    </transition>
                    <el-button @click="defSaleTime">自定义</el-button>
                </el-form-item>
                <div class="pro-title">产品详情</div>
                <el-form-item>
                    <quill-editor v-model="form.editorContent" ref="myQuillEditor" :options="editorOption"
                                  @change="onEditorChange($event)"></quill-editor>
                    <el-upload :action="qnLocation" :before-upload='beforeUpload' :data="uploadData"
                               :on-success='upScuccess' ref="upload" style="display:none">
                        <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传
                        </el-button>
                    </el-upload>
                </el-form-item>
                <div class="pro-title">礼包可购买角色设置</div>
                <el-form-item label="请选择角色层级" class="role-choose">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                        全部用户
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedUsers" @change="handleCheckedUsersChange">
                        <el-checkbox v-for="(item,index) in users" :label="item" :key="index">{{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                    <div class="tips">选择层级之后，根据用户的等级，购买受到限制</div>
                </el-form-item>
                <div class="pro-title">规格/售价/库存</div>
                <div class="gift-info-wrap">
                    <div v-for="(v,k) in giftInfoArr" :key="k" class="gift-info-item">
                        <div class="gift-info-title">
                            <span class="delete-btn" @click="deleteGiftType()">×</span>
                            <span style="font-weight:600;font-size:14px;margin-right:10px">礼包类型</span>
                            <el-input style="width:210px" v-model="v.giftType"></el-input>
                        </div>
                        <div class="gift-info-content">
                            <span style="font-size:12px;margin-right:10px;vertical:top">售价</span>
                            <el-input style="width:210px;margin-right:20px" v-model="v.giftPrice"><template slot="prepend">￥</template></el-input>
                            <span style="font-size:12px;margin-right:10px;vertical:top">库存</span>
                            <el-input style="width:210px" v-model="v.inventory"></el-input>
                            <el-select style="width:80px" v-model="v.unit">
                              <el-option v-for="(value,key) in unitArr" :key="key" :label="value.label" :value="value.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="gift-info-footer">
                        <span>添加礼包类型</span>
                    </div>
                </div>
                <div class="selected-tag">
                    <span v-if="form.selectedTagArr.length == 0" class="tag-tip">请选择标签</span>
                    <el-tag class="tag" type="info" closable v-for="(v,k) in form.selectedTagArr" :key="k"
                            @close="handleClose(k,v)">{{v.label}}
                    </el-tag>
                </div>
                <div class="add-tag">
                    <el-input style="width:215px;margin-right:20px" v-model="tagName"
                              placeholder="请输入标签/至多可添加20个"></el-input>
                    <el-button type="primary" @click="addTag">添加标签</el-button>
                </div>
                <el-button type="primary">确认发布</el-button>
                <el-button>取消</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import vBreadcrumb from "@/components/common/Breadcrumb.vue";
    import draggable from "vuedraggable";
    import Quill from "quill";
    import icon from "@/components/common/ico";
    import * as api from "@/api/api.js";
    import * as pApi from "@/privilegeList/index.js";
    import utils from "@/utils/index.js";

    export default {
        components: {
            draggable,
            vBreadcrumb,
            icon
        },

        data() {
            return {
                nav: ["品牌产品管理", "礼包管理", "发布礼包"],
                isUseUpload: false,
                showSaleTime: false,
                uploadImg: "",
                unitArr:[{label:'件',value:'1'}],
                imgArr: [],
                giftInfoArr:[{giftType:'',giftPrice:'',inventory:'',unit:'1'}],
                proCategoryArr: [{label: "电子数码", value: 1}],
                times: [{label: '7', id: 0},
                    {label: '10', id: 1},
                    {label: '15', id: 2},
                    {label: '20', id: 3},
                    {label: '25', id: 4},
                    {label: '30', id: 5},
                ],
                checkAll: false,
                checkedUsers: [],
                users: [],
                isIndeterminate: false,
                form: {
                    name: "",
                    proCategory: "",
                    proBrand: "",
                    supplier: "",
                    originAddress: "",
                    weight: "",
                    volume: "",
                    proColor: "",
                    proSize: "",
                    proStyle: "",
                    proClass: "",
                    freightTpl: "",
                    saleTime: "",
                    shippingTime: 2,
                    deliveryTime: '',
                    editorContent: "",
                    selectedTagArr: []
                },
                editorOption: {
                    placeholder: "请输入内容",
                    modules: {
                        // 配置富文本
                        toolbar: [
                            ["bold", "italic", "underline", "strike"],
                            ["blockquote", "code-block"],
                            [{header: 1}, {header: 2}],
                            [{direction: "rtl"}],
                            [{size: ["small", false, "large", "huge"]}],
                            [{header: [1, 2, 3, 4, 5, 6, false]}],
                            [{color: []}, {background: []}],
                            [{font: []}],
                            [{align: []}],
                            ["clean"],
                            ["link", "image"]
                        ]
                    }
                },
                uploadData: {},
                uploadType: "", // 上传的文件类型（图片、视频）,
                tagArr: [],
                tagName: ''
            };
        },

        computed: {
            qnLocation() {
                return location.protocol === "http:" ? api.addImg : api.addImg;
            }
        },

        activated() {
            this.uploadImg = api.addImg;
            this.imgArr = [];
            utils.cleanFormData(this.form);
            this.getLevelList();//加载用户层级
        },

        mounted() {
            // 为图片ICON绑定事件 getModule 为编辑器的内部属性
            this.$refs.myQuillEditor.quill
                .getModule("toolbar")
                .addHandler("image", this.imgHandler);
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
                        this.$message.warning("最多只能上传五张图片");
                        return;
                    }
                    this.imgArr.push(res.data.imageUrl);
                    this.$message.success("上传成功");
                } else {
                    this.$message.warning(res.data.msg);
                }
            },
            // 删除图片
            deleteImg(img) {
                let index = this.imgArr.indexOf(img);
                if (index == -1) {
                    return;
                }
                this.imgArr.splice(index, 1);
                if (this.imgArr.length < 5) {
                    this.isUseUpload = false;
                }
            },
            // 自定义售后周期
            defSaleTime() {
                this.form.saleTime = "";
                this.showSaleTime = !this.showSaleTime;
            },
            // 富文本编辑器
            onEditorChange({editor, html, text}) {
                console.log("editor change!", html);
                this.form.editorContent = html;
            },
            beforeUpload(file) {
                return this.qnUpload(file);
            },
            qnUpload(file) {
                this.fullscreenLoading = true;
                const suffix = file.name.split(".");
                const ext = suffix.splice(suffix.length - 1, 1)[0];
                console.log(this.uploadType);
                if (this.uploadType === "image") {
                    this.$message.warning("正在上传");
                    return this.$axios(api.addImg).then(res => {
                        this.uploadData = {
                            key: `image/${suffix.join(".")}_${new Date().getTime()}.${ext}`,
                            token: res.data
                        };
                    });
                }
            },
            // 图片上传成功回调 插入到编辑器中
            upScuccess(e, file, fileList) {
                this.fullscreenLoading = false;
                let vm = this;
                let url = "";
                if (this.uploadType === "image") {
                    // 获得文件上传后的URL地址
                    url = e.data.imageUrl;
                    this.form.original_img = e.data.imageUrl;
                    this.form.small_img = e.data.imageThumbUrl;
                    console.log(e);
                }
                if (url != null && url.length > 0) {
                    // 将文件上传后的URL地址插入到编辑器文本中
                    let value = url;
                    // this.$refs.myTextEditor.quillEditor.getSelection();
                    // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
                    vm.addRange = vm.$refs.myQuillEditor.quill.getSelection();
                    value = value.indexOf("http") !== -1 ? value : "http:" + value;
                    vm.$refs.myQuillEditor.quill.insertEmbed(
                        vm.addRange !== null ? vm.addRange.index : 0,
                        vm.uploadType,
                        value,
                        Quill.sources.USER
                    ); // 调用编辑器的 insertEmbed 方法，插入URL
                    this.$message.success("插入成功");
                } else {
                    this.$message.error(`${vm.uploadType}插入失败`);
                }
                this.$refs["upload"].clearFiles(); // 插入成功后清除input的内容
            },
            // 点击图片ICON触发事件
            imgHandler(state) {
                this.addRange = this.$refs.myQuillEditor.quill.getSelection();
                if (state) {
                    let fileInput = document.getElementById("imgInput");
                    fileInput.click(); // 加一个触发事件
                }
                this.uploadType = "image";
            },
            // 关闭标签
            handleClose(index, value) {
                this.form.selectedTagArr.splice(index, 1);
            },
            // 加入新的标签
            addTag() {
                if (this.tagName == '') {
                    this.$message.warning('请输入正确的标签');
                    return;
                }
                this.tagArr.push({label: this.tagName, value: new Date().getTime(), selected: false});
                // let data = {};
                // this.$axios.post()
                // .then(res=>{
                //   console.log(res);
                // })
                // .catch(err=>{
                //   console.log(err)
                // })
            },
            //获取用户层级列表
            getLevelList() {
                let that = this;
                let data = {};
                that.$axios
                    .post(api.getDealerLevelList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.users = res.data.data;
                        } else {
                            that.$message.warning(res.data.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //推送人群选择
            handleCheckAllChange(val) {
                let that = this;
                that.checkedUsers = val ? that.users : [];
                that.isIndeterminate = false;
                if (val) {
                    let result = '';
                    for (let i = 0; i < that.users.length; i++) {
                        result += that.users[i].id + ',';
                    }
                    that.form.pushWay = result;
                } else {
                    that.form.pushWay = ''
                }
            },
            handleCheckedUsersChange(value) {
                let that = this;
                let checkedCount = value.length;
                let result = '';
                for (let i in that.users) {
                    for (let j in value) {
                        if (that.users[i].id == value[j].id) {
                            result += that.users[i].id + ',';
                        }
                    }
                }
                that.form.pushWay = result;
                that.checkAll = checkedCount === that.users.length;
                that.isIndeterminate = checkedCount > 0 && checkedCount < that.users.length;
            },
            // 删除礼包类型
            deleteGiftType(){
                
            },
            // 提交表单
            submitForm() {
                console.log(this.form);
            }
        }
    };
</script>
<style lang='less'>
    .add-gift {
        color: #666;
        .address-item {
            .el-form-item__label {
                line-height: 20px
            }
        }
        .quill-editor {
            margin-left: -100px;
        }
        .role-choose {
            .el-form-item__label {
                width: 120px !important;
            }
        }
        .el-checkbox-group{
            margin-left: 20px;
        }
        .tips{
            margin-left: 20px;
            font-size: 12px;
            color: #ff6868;
        }
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
        .upload-tip {
            color: #999;
            font-size: 12px;
            margin: -10px 0 0 10px;
        }
        .img-uploader {
            display: inline-block;
        }
        .el-upload--text {
            width: 100px;
            height: 100px;
            line-height: 100px;
        }
        .pro-weight {
            width: 80px;
            margin-right: 10px;
        }
        .product-param {
            width: 95%;
            height: 58px;
            border: 1px solid #e8edf0;
            line-height: 58px;
            padding: 0 15px;
            .inp-param {
                width: 90px;
                margin: 0 50px 0 10px;
            }
        }
        .selected-tag {
            width: 100%;
            padding: 6px 22px;
            box-sizing: border-box;
            border: 1px solid #e8edf0;
            border-radius: 5px;
            margin-top: 20px;
            .tag {
                margin-right: 5px;
            }
            .tag-tip {
                font-size: 14px;
                color: #9a9a9a;
            }
        }
        .add-tag {
            width: 100%;
            margin-top: 20px;
        }
        .tag-list {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #e8edf0;
            border-radius: 5px;
            margin: 10px 0 20px 0;
            .tag-tip {
                font-size: 14px;
                color: #9a9a9a;
            }
            .selected-btn {
                background-color: #409EFF;
                border-color: #409EFF;
                color: #fff;
            }
        }
        .gift-info-wrap{
            width: 100%;
            border: 1px solid  #eee;
            padding: 10px;
            box-sizing: border-box;
            .gift-info-item{
                width: 100%;
                .gift-info-title{
                    position: relative;
                    width: 100%;
                    height: 60px;
                    line-height: 40px;
                    padding: 10px 30px;
                    box-sizing: border-box;
                    background-color: #f7f7f7;
                    .delete-btn{
                        position: absolute;
                        top: 16px;
                        right: 30px;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        border: 2px solid #a5a5a5;
                        cursor: pointer;
                        text-align: center;
                        line-height: 24px;
                        color: #a5a5a5;
                        font-size: 18px;
                        font-weight: 700;
                    }
                }
                .gift-info-content{
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    height: 40px;
                    line-height:40px;
                    padding-left: 60px;
                    margin: 20px 0;
                    box-sizing: border-box;
                    .el-input--small .el-input__inner{
                        line-height: 30px;
                    }
                    .el-input-group__append, .el-input-group__prepend{
                        padding: 0 5px;
                    }
                }
            }
            .gift-info-footer{
                display: inline-block;
                color: #22aeff;
                font-size: 14px;
                margin-left: 30px;
                cursor: pointer;
            }
        }
    }
</style>
