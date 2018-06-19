<template>
  <div class="order-manage-tab">
      <div class="tab-title">{{name}}</div>
      
  </div>
</template>

<script>
export default {
  props: ["name"],

  components: {},

  data() {
    return {};
  },

  mounted() {
    console.log(this.name);
  },
  methods: {}
};
</script>
<style lang='less' scoped>
.order-manage-tab{
    background-color: red;
    .tab-title{
        height: 60px;
        line-height: 60px;
        background-color: #f7f7f7;
    }
}
</style>