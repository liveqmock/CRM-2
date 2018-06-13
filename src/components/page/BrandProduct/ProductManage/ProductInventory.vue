<template>
  <div class="product-inventory">
    <v-breadcrumb :nav='nav'></v-breadcrumb>
      <el-card :body-style="{ padding: '20px 45px' }">
        <el-table :data="tableData" border>
          <template v-if="tableData.length != 0">
            <el-table-column v-for="(v,k) in Object.keys(tableData[0])" v-if="k<oldtableLength" :key="k" :prop="v" :label="v" align="center"></el-table-column>
          </template>
          <el-table-column  label="总库存" align="center" :render-header="renderHeader">
            <template slot-scope="scope">
              <el-input style="width:150px" v-model="scope.row.settlePrice"></el-input>
              <span>{{unitName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="仓库A" align="center">
            <template slot-scope="scope">
              <el-input style="width:150px" v-model="scope.row.oldPrice"></el-input>
              <span>{{unitName}}</span>
            </template>
          </el-table-column>
            <el-table-column label="仓库B" align="center">
            <template slot-scope="scope">
              <el-input style="width:150px" v-model="scope.row.oldPrice"></el-input>
              <span>{{unitName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="saveMsg(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px">
            <el-button type="primary">确认提交</el-button>
            <el-button>取消</el-button>
        </div>
      </el-card>
      
  </div>
</template>

<script>
import vBreadcrumb from "@/components/common/Breadcrumb.vue";
export default {
  components: {
    vBreadcrumb
  },

  data() {
    return {
      nav: ["品牌产品管理", "产品管理", "产品库存管理"],
      oldtableLength: 0,
      unit: "1",
      unitArr: [{ label: "件", value: "1" }, { label: "箱", value: "2" }],
      tableData: [
        { color: "红色", guige: "128GB", address: "中国" },
        { color: "红色", guige: "256GB", address: "中国" },
        { color: "红色", guige: "64GB", address: "中国" },
        { color: "红色", guige: "32GB", address: "中国" },
        { color: "金色", guige: "128GB", address: "中国" },
        { color: "金色", guige: "256GB", address: "中国" },
        { color: "金色", guige: "64GB", address: "中国" },
        { color: "金色", guige: "32GB", address: "中国" }
      ]
    };
  },

  computed: {
    unitName() {
      let u = "";
      this.unitArr.forEach((v, k) => {
        if (v.value == this.unit) {
          u = v.label;
        }
      });
      return u;
    }
  },

  activated() {
    this.ambData();
  },

  methods: {
    // 组装表格数据
    ambData() {
      this.oldtableLength =
        this.tableData.length == 0 ? 0 : Object.keys(this.tableData[0]).length;
    },
    // 保存表单信息
    saveMsg(row) {
      console.log(row);
    },
    // 表头下拉框改变
    tableHeadChange(value) {
      this.unit = value;
    },
    // 表头处理
    renderHeader(h, { column, $index }) {
      return [
        h(
          "div",
          {
            style: {
              margin: "8px -20px 0 0"
            }
          },
          ["总库存"]
        ),
        h(
          "el-select",
          {
            style: {
              display: "inline-block",
              width: "120px",
              "margin-top": "8px"
            },
            attrs: {
              value: this.unit,
              placeholder: ""
            },
            on: {
              change: this.tableHeadChange
            }
          },
          this.unitArr.map((v, k) => {
            return h("el-option", {
              attrs: {
                label: v.label,
                value: v.value
              }
            });
          })
        )
      ];
    }
  }
};
</script>
<style lang='less'>
.product-inventory {
  .el-input__suffix {
    right: 13px;
  }
}
</style>