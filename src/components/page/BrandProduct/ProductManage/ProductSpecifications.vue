<template>
  <div class="product-specification">
      <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 45px'}">
        <div class="spe-title">产品规格</div>
        <div class="spe-wrap">
            <div v-for="(value,index) in specificationArr" :key="index">
                <div class="small-spe-title">
                    <span>类型：</span>
                    <div v-if='index>=3' @mouseover="showFirstDelBtn(index)" @mouseout="deleteFirstItem = ''" class="delete-big-tit">
                        <div class="del-big-btn" @click="deleteType(index)" v-if='index == deleteFirstItem'>×</div>
                        <el-input v-model="specificationArr[index].type" style="width:70px"></el-input>
                    </div>
                    <el-button v-else size="large">{{value.type}}</el-button>
                </div>
                <div class="small-spe-content">
                    <span>规格值：</span>
                    <div class="des-wrap" v-for="(v,k) in value.speArr" @mouseover="showDeleteBtn(v)" @mouseout="deleteItem = ''" :key="k">
                        <div class="delete-btn" v-if='v == deleteItem' @click="deleteSpe(index,k)">×</div>
                        <el-input v-model="value.speArr[k]" class="des-inp"></el-input>
                    </div>
                    <span class="add-spe" @click="addSpe(index)">添加规格</span>
                </div>
            </div>
            <div class="small-spe-title">
                <el-button @click="addType">添加类型</el-button>
            </div>
        </div>
        <el-button type="primary" style="margin:10px 0 50px 0">生成列表</el-button>
        <p style="margin:0 0 18px 10px">规格表</p>
        <el-table :data="tableData" border :span-method='mergeRow'>
          <el-table-column v-for="(v,k) in Object.keys(tableData[0])" :prop="v" :key="k" :label="v" align="center"></el-table-column>
        </el-table>
      </el-card>
      
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: {
      vBreadcrumb
  },

  data () {
    return {
        nav:['品牌产品管理','产品管理','发布产品'],
        deleteFirstItem:'',
        deleteItem:'',
        specificationArr:[
            {type:'颜色',speArr:['红色','金色','白色']},
            {type:'版本',speArr:['全网通','联通']},
            {type:'规格',speArr:['32GB','64GB','128GB','256GB']},
        ],
        tableData:[
            {color:'红色',guige:'128GB',address:'中国'},
            {color:'红色',guige:'256GB',address:'中国'},
            {color:'红色',guige:'64GB',address:'中国'},
            {color:'红色',guige:'32GB',address:'中国'},
            {color:'金色',guige:'128GB',address:'中国'},
            {color:'金色',guige:'256GB',address:'中国'},
            {color:'金色',guige:'64GB',address:'中国'},
            {color:'金色',guige:'32GB',address:'中国'},
        ],
    };
  },

  activated(){
    
  },

  methods: {
    //  添加规格
    addSpe(index){
        this.specificationArr[index].speArr.push("");
    },
    // 删除规格
    deleteSpe(index,k){
        this.specificationArr[index].speArr.splice(k,1);
    },
    // 删除类型
    deleteType(index){
        this.specificationArr.splice(index,1);
    },
    // 删除一级按钮
    showFirstDelBtn(v){
        this.deleteFirstItem = v;
    },
    //删除二级按钮
    showDeleteBtn(v){
        this.deleteItem = v;
    },
    // 添加类型
    addType(){
        this.specificationArr.push({type:'',speArr:[]})
    },
    // 合并行(第几行开始合并，合并几行)
    mergeRow({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
          if (rowIndex % 4 === 0) {
            return [4,1];
          } else {
            return [0,0];
          }
        }
    }
  }
}

</script>
<style lang='less' scoped>
.product-specification{
    .spe-title{
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        background-color: #f7f7f7;
        box-sizing: border-box;
    }
    .spe-wrap{
        width: 100%;
        border: 1px solid #ddd;
        margin-top: 20px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        color: #666;
        .small-spe-title{
            width: 100%;
            height: 60px;
            line-height: 60px;
            background-color: #f7f7f7;
            padding: 0 30px;
            box-sizing: border-box;
            .delete-big-tit{
                display: inline-block;
                position: relative;
                .del-big-btn{
                    position: absolute;
                    top: 8px;
                    right: -5px;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                    background-color: #fff;
                    cursor: pointer;
                    z-index: 1000;
                    line-height: 15px;
                    text-align: center;
                    color: #ccc;
                }
            }
        }
        .small-spe-content{
            width: 100%;
            padding: 20px 0 10px 70px;
            box-sizing: border-box;
            overflow: hidden;
            .des-wrap{
                position: relative;
                display: inline-block;
                .delete-btn{
                    position: absolute;
                    top: -6px;
                    right: 5px;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                    background-color: #fff;
                    cursor: pointer;
                    z-index: 1000;
                    line-height: 15px;
                    text-align: center;
                    color: #ccc;
                }
                .des-inp{
                    width: 160px;
                    margin:0 10px 10px 0;
                }
            }
            .add-spe{
                color: #33b4ff;
                cursor: pointer;
            }
        }
    }
}
</style>