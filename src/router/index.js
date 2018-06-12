import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    name:'dashboard',
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页',url:'/dashboard' }
                },
                // 授权管理
                {
                    name:'channelItemManage',
                    path: '/channelItemManage',
                    component: resolve => require(['../components/page/Authorization/ChannelItemManage.vue'], resolve),
                    meta: { title: '渠道类目管理',url:'/channelItemManage' }
                },
                {
                    name:'secondChannel',
                    path: '/secondChannel',
                    component: resolve => require(['../components/page/Authorization/SecondChannel.vue'], resolve),
                    meta: { title: '二级渠道',url:'/admin/permitChannel/addPermitChannel_2' }
                },
                {
                    name:'certificateUse',
                    path: '/certificateUse',
                    component: resolve => require(['../components/page/Authorization/CertificateUse.vue'], resolve),
                    meta: { title: '授权证书模板',url:'/certificateUse' }
                },
                {
                    name:'contractReview',
                    path: '/contractReview',
                    component: resolve => require(['../components/page/Authorization/ContractReview.vue'], resolve),
                    meta: { title: '续约审核',url:'/contractReview' }
                },
                // 品牌产品管理
                {
                    name:'brandProductClassify',
                    path: '/brandProductClassify',
                    component: resolve => require(['../components/page/BrandProduct/BrandProductClassify.vue'], resolve),
                    meta: { title: '产品分类管理',url:'/admin/productCategory/queryProductCategoryPageList_1' }
                },
                {
                    name:'secondClassify',
                    path: '/secondClassify',
                    component: resolve => require(['../components/page/BrandProduct/SecondClassify.vue'], resolve),
                    meta: { title: '二级类目',url:'/admin/productCategory/queryProductCategoryPageList_2' }
                },
                {
                    name:'brandManage',
                    path: '/brandManage',
                    component: resolve => require(['../components/page/BrandProduct/BrandManage.vue'], resolve),
                    meta: { title: '品牌管理',url:'/admin/brand/queryBrandPageList' }
                },
                {
                    name:'addBrand',
                    path: '/addBrand',
                    component: resolve => require(['../components/page/BrandProduct/BrandManage/AddBrand.vue'], resolve),
                    meta: { title: '添加品牌',url:'/admin/brand/addBrand' }
                },
                {
                    name:'editBrand',
                    path: '/editBrand',
                    component: resolve => require(['../components/page/BrandProduct/BrandManage/EditBrand.vue'], resolve),
                    meta: { title: '编辑品牌',url:'/admin/brand/updateBrand' }
                },
                {
                    name:'shippingTemplate',
                    path: '/shippingTemplate',
                    component: resolve => require(['../components/page/BrandProduct/ShippingTemplate.vue'], resolve),
                    meta: { title: '运费模板'}
                },
                {
                    name:'addTemplate',
                    path: '/addTemplate',
                    component: resolve => require(['../components/page/BrandProduct/ShippingTemplate/AddTemplate.vue'], resolve),
                    meta: { title: '添加模板'}
                },
                {
                    name:'editTemplate',
                    path: '/editTemplate',
                    component: resolve => require(['../components/page/BrandProduct/ShippingTemplate/EditTemplate.vue'], resolve),
                    meta: { title: '编辑模板'}
                },
                // 会员管理
                {
                    name:'levelManage',
                    path: '/levelManage',
                    component: resolve => require(['../components/page/MemberManage/LevelManage.vue'], resolve),
                    meta: { title: '经销商层级管理',url:'/admin/dealerLevel/getList' }
                },
                {
                    name:'joinManage',
                    path: '/joinManage',
                    component: resolve => require(['../components/page/MemberManage/JoinManage.vue'], resolve),
                    meta: { title: '经销商加盟管理',url:'/admin/invite/queryInvitePageList' }
                },
                {
                    name:'memberManage',
                    path: '/memberManage',
                    component: resolve => require(['../components/page/MemberManage/MemberManage.vue'], resolve),
                    meta: { title: '经销商会员管理',url:'/admin/dealer/queryDealerPageList' }
                },
                {
                    name:'lowerMemberManage',
                    path: '/lowerMemberManage',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/LowerMemberManage.vue'], resolve),
                    meta: { title: '下级代理',url:'/admin/dealer/queryDealerPageList' }
                },
                {
                    name:'MemberAccount',
                    path: '/MemberAccount',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/MemberAccount.vue'], resolve),
                    meta: { title: '会员账户',url:'' }
                },
                {
                    name:'MemberCard',
                    path: '/MemberCard',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/MemberCard.vue'], resolve),
                    meta: { title: '会员银行卡',url:'' }
                },
                {
                    name:'memberDetail',
                    path: '/memberDetail',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/MemberDetail.vue'], resolve),
                    meta: { title: '会员详情',url:'/admin/dealer/findDealerById' }
                },
                {
                    name:'memberTree',
                    path: '/memberTree',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/MemberTree.vue'], resolve),
                    meta: { title: '会员树状图',url:'/admin/dealer/findDealerTreeById' }
                },
                {
                    name:'sendInvite',
                    path: '/sendInvite',
                    component: resolve => require(['../components/page/MemberManage/JoinManage/SendInvite.vue'], resolve),
                    meta: { title: '邀请发起',url:'/admin/invite/addInvite' }
                },
                {
                    name:'inviteDetail',
                    path: '/inviteDetail',
                    component: resolve => require(['../components/page/MemberManage/JoinManage/InviteDetail.vue'], resolve),
                    meta: { title: '邀请详情',url:'/admin/invite/findInviteInfo' }
                },
                {
                    name:'inviteLink',
                    path: '/inviteLink',
                    component: resolve => require(['../components/page/MemberManage/JoinManage/InviteLink.vue'], resolve),
                    meta: { title: '邀请链接' }
                },
                {
                    name:'operateLog',
                    path: '/operateLog',
                    component: resolve => require(['../components/page/MemberManage/OperateLog/OperateLog.vue'], resolve),
                    meta: { title: '查看会员操作日志' }
                },
                {
                    name:'cashAccountBalance',
                    path: '/cashAccountBalance',
                    component: resolve => require(['../components/page/MemberManage/UserAccount/CashAccountBalance.vue'], resolve),
                    meta: { title: '现金账户收支明细' }
                },
                {
                    name:'tokenAccountBalance',
                    path: '/tokenAccountBalance',
                    component: resolve => require(['../components/page/MemberManage/UserAccount/TokenAccountBalance.vue'], resolve),
                    meta: { title: '代币账户收支明细' }
                },
                {
                    name:'shareAccountBalance',
                    path: '/shareAccountBalance',
                    component: resolve => require(['../components/page/MemberManage/UserAccount/ShareAccountBalance.vue'], resolve),
                    meta: { title: '分红账户收支明细' }
                },
                {
                    name:'integralAccountBalance',
                    path: '/integralAccountBalance',
                    component: resolve => require(['../components/page/MemberManage/UserAccount/IntegralAccountBalance.vue'], resolve),
                    meta: { title: '积分账户收支明细' }
                },
                {
                    name:'accountRecharge',
                    path: '/accountRecharge',
                    component: resolve => require(['../components/page/MemberManage/AccountRecharge.vue'], resolve),
                    meta: { title: '账户充值' }
                },
                {
                    name:'realNameInfo',
                    path: '/realNameInfo',
                    component: resolve => require(['../components/page/MemberManage/RealNameInfo.vue'], resolve),
                    meta: { title: '实名信息' }
                },
                {
                    name:'realNameAuthentication',
                    path: '/realNameAuthentication',
                    component: resolve => require(['../components/page/MemberManage/realNameAuthentication.vue'], resolve),
                    meta: { title: '实名认证审核' }
                },
                {
                    name:'activityParams',
                    path: '/activityParams',
                    component: resolve => require(['../components/page/MemberManage/activityParams.vue'], resolve),
                    meta: { title: '活跃度参数设置' }
                },
                {
                    name:'promotionManage',
                    path: '/promotionManage',
                    component: resolve => require(['../components/page/MemberManage/PromotionManage.vue/PromotionManage.vue'], resolve),
                    meta: { title: '晋升设置' }
                },
                {
                    name:'productList',
                    path: '/productList',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/ProductList.vue'], resolve),
                    meta: { title: '产品管理' }
                },
                {
                    name:'releaseProduct',
                    path: '/releaseProduct',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/ReleaseProduct.vue'], resolve),
                    meta: { title: '发布产品' }
                },
                {
                    name:'editProduct',
                    path: '/editProduct',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/EditProduct.vue'], resolve),
                    meta: { title: '编辑产品' }
                },
                {
                    name:'productSpecifications',
                    path: '/productSpecifications',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/ProductSpecifications.vue'], resolve),
                    meta: { title: '产品规格' }
                },
                {
                    name:'auditProduct',
                    path: '/auditProduct',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/AuditProduct.vue'], resolve),
                    meta: { title: '产品审核' }
                },
                {
                    name:'productInfo',
                    path: '/productInfo',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/ProductInfo.vue'], resolve),
                    meta: { title: '产品详情' }
                },

                //服务管理
                {
                    name:'noticeInformManage',
                    path: '/noticeInformManage',
                    component: resolve => require(['../components/page/ServiceManage/NoticeInformManage.vue'], resolve),
                    meta: { title: '公告通知管理',url:'/admin/notice/queryNoticeList' }
                },
                {
                    name:'addNoticeInform',
                    path: '/addNoticeInform',
                    component: resolve => require(['../components/page/ServiceManage/NoticeInformManage/AddNoticeInform.vue'], resolve),
                    meta: { title: '发布通知/公告',url:'/admin/notice/addNotice' }
                },
                {
                    name:'noticeInformDetail',
                    path: '/noticeInformDetail',
                    component: resolve => require(['../components/page/ServiceManage/NoticeInformManage/NoticeInformDetail.vue'], resolve),
                    meta: { title: '通知/公告详情',url:'/admin/notice/findNoticeDetailById' }
                },
                {
                    name:'feedBack',
                    path: '/feedBack',
                    component: resolve => require(['../components/page/ServiceManage/FeedBack.vue'], resolve),
                    meta: { title: '问题反馈',url:'/admin/feedback/queryFeedbackList' }
                },
                {
                    name:'feedDetail',
                    path: '/feedDetail',
                    component: resolve => require(['../components/page/ServiceManage/FeedBack/FeedbackDetail.vue'], resolve),
                    meta: { title: '问题详情',url:'/admin/feedback/findFeedbackByid' }
                },
                // 溯源管理
                {
                    name:'rootsCodeMange',
                    path: '/rootsCodeMange',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeMange.vue'], resolve),
                    meta: { title: '溯源防伪码管理',url:'/securityCode/securityCodeRecord/getRecordPage' }
                },
                {
                    name:'rootsCodeQuery',
                    path: '/rootsCodeQuery',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeQuery.vue'], resolve),
                    meta: { title: '防伪码查询' }
                },
                {
                    name:'rootsCodeTpl',
                    path: '/rootsCodeTpl',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeTpl.vue'], resolve),
                    meta: { title: '防伪码模板',url:'/admin/securityCodeTemplate/getAll' }
                },
                {
                    name:'rootsCodeParams',
                    path: '/rootsCodeParams',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeParams.vue'], resolve),
                    meta: { title: '防伪码参数设置',url:'/admin/categoryBrand/getAllCategoryBrand'}
                },
                // 权限管理
                {
                    name:'manageList',
                    path: '/manageList',
                    component: resolve => require(['../components/page/Permission/ManageList.vue'], resolve),
                    meta: { title: '账号管理',url:'/manageList' }
                },
                {
                    name:'addManger',
                    path: '/addManger',
                    component: resolve => require(['../components/page/Permission/AddManger.vue'], resolve),
                    meta: { title: '添加管理员',url:'/admin/adminUser/addAdminUser' }
                },
                {
                    name:'editManger',
                    path: '/editManger',
                    component: resolve => require(['../components/page/Permission/EditManger.vue'], resolve),
                    meta: { title: '编辑管理员',url:'/admin/adminUser/updateAdminUser' }
                },
                {
                    name:'showMangeLog',
                    path: '/showMangeLog',
                    component: resolve => require(['../components/page/Permission/ShowMangeLog.vue'], resolve),
                    meta: { title: '操作日志',url:'/admin/logAdminuser/getPage' }
                },
                {
                    name:'jobsPermissionMange',
                    path: '/jobsPermissionMange',
                    component: resolve => require(['../components/page/Permission/JobsPermissionMange.vue'], resolve),
                    meta: { title: '岗位权限管理',url:'/jobsPermissionMange' }
                },
                {
                    name:'addJobsPermission',
                    path: '/addJobsPermission',
                    component: resolve => require(['../components/page/Permission/AddJobsPermission.vue'], resolve),
                    meta: { title: '添加岗位权限',url:'/admin/role/addRole' }
                },
                {
                    name:'editJobsPermission',
                    path: '/editJobsPermission',
                    component: resolve => require(['../components/page/Permission/EditJobsPermission.vue'], resolve),
                    meta: { title: '编辑岗位权限',url:'/admin/role/updateRole' }
                },
                {
                    name:'setPermission',
                    path: '/setPermission',
                    component: resolve => require(['../components/page/Permission/SetPermission.vue'], resolve),
                    meta: { title: '权限设置',url:'/setPermission' }
                },
                {
                    name:'editMangerMsg',
                    path: '/editMangerMsg',
                    component: resolve => require(['../components/page/Permission/EditMangerMsg.vue'], resolve),
                    meta: { title: '管理员基础信息修改',url:'/editMangerMsg' }
                },
                {
                    name:'organizeMange',
                    path: '/organizeMange',
                    component: resolve => require(['../components/page/Permission/OrganizeMange/OrganizeMange.vue'], resolve),
                    meta: { title: '组织结构管理',url:'/admin/role/queryDepartmentList' }
                },
            ]
        },
        {
            name:'login',
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            name:'404',
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
    ]
})
