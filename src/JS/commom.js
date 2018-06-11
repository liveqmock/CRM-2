/**
 * Created by weiwei on 2018/6/11.
 */
const getUserId = {
    methods: {
        getUserId(){
            this.id = this.$route.query.memberId || JSON.parse(sessionStorage.getItem("memberId"));
        }
    }
}
const myMixinTable  = {
    data () {
        return {
            page:{
                currentPage:1,
                totalPage:20
            },
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page.currentPage=val;
            this.getList(val)
        },
        getTbaleHeight(){
            let winHeight=window.screen.availHeight-520;
            this.height=winHeight;
        }
    }
}

export { getUserId, myMixinTable }
