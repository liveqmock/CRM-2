<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理','活跃度参数设置']"></v-breadcrumb>
    </div>
</template>


<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';

    export default {
        components: {
            vBreadcrumb
        },
        activated() {
            this.id = this.$route.query.memberId || JSON.parse(sessionStorage.getItem("memberId"));
        },
        data: function () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>

</style>
