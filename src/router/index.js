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
                    meta: { title: '运费模板',url:'/admin/freightTemplate/queryFreightTemplateList'}
                },
                {
                    name:'addTemplate',
                    path: '/addTemplate',
                    component: resolve => require(['../components/page/BrandProduct/ShippingTemplate/AddTemplate.vue'], resolve),
                    meta: { title: '添加模板',url:'/admin/freightTemplate/addFreightTemplate'}
                },
                {
                    name:'editTemplate',
                    path: '/editTemplate',
                    component: resolve => require(['../components/page/BrandProduct/ShippingTemplate/EditTemplate.vue'], resolve),
                    meta: { title: '编辑模板',url:'/admin/freightTemplate/updateFreightTemplateById'}
                },
                {
                    name:'giftManage',
                    path: '/giftManage',
                    component: resolve => require(['../components/page/BrandProduct/GiftManage.vue'], resolve),
                    meta: { title: '礼包管理'}
                },
                {
                    name:'addGift',
                    path: '/addGift',
                    component: resolve => require(['../components/page/BrandProduct/GiftManage/AddGift.vue'], resolve),
                    meta: { title: '发布礼包'}
                },
                {
                    name:'editGift',
                    path: '/editGift',
                    component: resolve => require(['../components/page/BrandProduct/GiftManage/EditGift.vue'], resolve),
                    meta: { title: '编辑礼包'}
                },
                // 拼店店铺管理
                {
                    name:'shopLevelSet',
                    path: '/shopLevelSet',
                    component: resolve => require(['../components/page/SpellShopManage/ShopLevel/ShopLevelSet.vue'], resolve),
                    meta: { title: '店铺等级设置'}
                },
                {
                    name:'promotionShop',
                    path: '/promotionShop',
                    component: resolve => require(['../components/page/SpellShopManage/ShopLevel/PromotionShop.vue'], resolve),
                    meta: { title: '店铺晋升设置'}
                },
                {
                    name:'demotionShop',
                    path: '/demotionShop',
                    component: resolve => require(['../components/page/SpellShopManage/ShopLevel/DemotionShop.vue'], resolve),
                    meta: { title: '店铺降级设置'}
                },
                {
                    name:'shopList',
                    path: '/shopList',
                    component: resolve => require(['../components/page/SpellShopManage/ShopManage/ShopList.vue'], resolve),
                    meta: { title: '店铺列表'}
                },
                {
                    name:'shopInfo',
                    path: '/shopInfo',
                    component: resolve => require(['../components/page/SpellShopManage/ShopManage/ShopInfo.vue'], resolve),
                    meta: { title: '店铺详情'}
                },
                {
                    name:'spellShopAccount',
                    path: '/spellShopAccount',
                    component: resolve => require(['../components/page/SpellShopManage/ShopManage/SpellShopAccount.vue'], resolve),
                    meta: { title: '拼店账户'}
                },
                {
                    name:'shopMemberManage',
                    path: '/shopMemberManage',
                    component: resolve => require(['../components/page/SpellShopManage/ShopManage/MemberManage.vue'], resolve),
                    meta: { title: '成员管理'}
                },
                {
                    name:'shareBonusInfo',
                    path: '/shareBonusInfo',
                    component: resolve => require(['../components/page/SpellShopManage/ShopManage/ShareBonusInfo.vue'], resolve),
                    meta: { title: '分红详情'}
                },
                {
                    name:'shareBonusCom',
                    path: '/shareBonusCom',
                    component: resolve => require(['../components/page/SpellShopManage/ShopManage/ShareBonusCom.vue'], resolve),
                    meta: { title: '分红详情'}
                },
                {
                    name:'shopAnnouncement',
                    path: '/shopAnnouncement',
                    component: resolve => require(['../components/page/SpellShopManage/ShopManage/ShopAnnouncement.vue'], resolve),
                    meta: { title: '店铺公告'}
                },
                {
                    name:'tradeInfo',
                    path: '/tradeInfo',
                    component: resolve => require(['../components/page/SpellShopManage/ShopManage/TradeInfo.vue'], resolve),
                    meta: { title: '账户交易明细'}
                },
                {
                    name:'recruitShopManage',
                    path: '/recruitShopManage',
                    component: resolve => require(['../components/page/SpellShopManage/RecruitShopManage/RecruitShopManage.vue'], resolve),
                    meta: { title: '招募店铺管理'}
                },
                {
                    name:'recruitShopInfo',
                    path: '/recruitShopInfo',
                    component: resolve => require(['../components/page/SpellShopManage/RecruitShopManage/RecruitShopInfo.vue'], resolve),
                    meta: { title: '招募店铺详情'}
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
                    meta: { title: '会员账户',url:'/admin/dealer/queryDealerAccount' }
                },
                {
                    name:'MemberCard',
                    path: '/MemberCard',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/MemberCard.vue'], resolve),
                    meta: { title: '会员银行卡',url:'/admin/bindBankInfo/findBindBankInfoBydealerId' }
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
                    meta: { title: '现金账户收支明细',url:'/admin/detailBalance/queryDetailBalanceList' }
                },
                {
                    name:'tokenAccountBalance',
                    path: '/tokenAccountBalance',
                    component: resolve => require(['../components/page/MemberManage/UserAccount/TokenAccountBalance.vue'], resolve),
                    meta: { title: '代币账户收支明细',url:'/admin/detailTokencoin/queryDetailTokencoinList' }
                },
                {
                    name:'shareAccountBalance',
                    path: '/shareAccountBalance',
                    component: resolve => require(['../components/page/MemberManage/UserAccount/ShareAccountBalance.vue'], resolve),
                    meta: { title: '分红账户收支明细',url:'/admin/detailBonuspoint/queryDetailBonuspointList' }
                },
                {
                    name:'integralAccountBalance',
                    path: '/integralAccountBalance',
                    component: resolve => require(['../components/page/MemberManage/UserAccount/IntegralAccountBalance.vue'], resolve),
                    meta: { title: '积分账户收支明细',url:'/admin/detailUserscore/queryDetailUserscorePageList' }
                },
                {
                    name:'accountRecharge',
                    path: '/accountRecharge',
                    component: resolve => require(['../components/page/MemberManage/AccountRecharge.vue'], resolve),
                    meta: { title: '账户充值',url:'/admin/rechargeRecord/queryRechargeRecordPageList' }
                },
                {
                    name:'realNameInfo',
                    path: '/realNameInfo',
                    component: resolve => require(['../components/page/MemberManage/RealNameInfo.vue'], resolve),
                    meta: { title: '实名信息',url:'/admin/dealerRealName/findDealerRealNameInfo' }
                },
                {
                    name:'realNameAuthentication',
                    path: '/realNameAuthentication',
                    component: resolve => require(['../components/page/MemberManage/realNameAuthentication.vue'], resolve),
                    meta: { title: '实名认证审核',url:'/admin/dealerRealName/queryDealerRealNamePageList' }
                },
                {
                    name:'activityParams',
                    path: '/activityParams',
                    component: resolve => require(['../components/page/MemberManage/activityParams.vue'], resolve),
                    meta: { title: '活跃度参数设置' }
                },
                {
                    name:'supplierManage',
                    path: '/supplierManage',
                    component: resolve => require(['../components/page/MemberManage/SupplierManage.vue'], resolve),
                    meta: { title: '供应商管理',url:'/admin/supplier/querySupplierPageList' }
                },
                {
                    name:'supplierDetail',
                    path: '/supplierDetail',
                    component: resolve => require(['../components/page/MemberManage/SupplierManage/SupplierDetail.vue'], resolve),
                    meta: { title: '供应商详情',url:'/admin/supplier/findSupplierById' }
                },
                {
                    name:'addSupplier',
                    path: '/addSupplier',
                    component: resolve => require(['../components/page/MemberManage/SupplierManage/AddSupplier.vue'], resolve),
                    meta: { title: '添加供应商',url:'/admin/supplier/addSupplier' }
                },
                {
                    name:'editSupplier',
                    path: '/editSupplier',
                    component: resolve => require(['../components/page/MemberManage/SupplierManage/EditSupplier.vue'], resolve),
                    meta: { title: '编辑供应商',url:'/admin/supplier/updateSupplier' }
                },
                {
                    name:'promotionManage',
                    path: '/promotionManage',
                    component: resolve => require(['../components/page/MemberManage/PromotionManage.vue/PromotionManage.vue'], resolve),
                    meta: { title: '晋升设置',url:'/promotionManage' }
                },
                {
                    name:'degradeManage',
                    path: '/degradeManage',
                    component: resolve => require(['../components/page/MemberManage/DegradeManage.vue/DegradeManage.vue'], resolve),
                    meta: { title: '降级设置',url:'/degradeManage' }
                },
                {
                    name:'productList',
                    path: '/productList',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/ProductList.vue'], resolve),
                    meta: { title: '产品管理',url:'/admin/product/queryProductPageList' }
                },
                {
                    name:'releaseProduct',
                    path: '/releaseProduct',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/ReleaseProduct.vue'], resolve),
                    meta: { title: '发布产品',url:'/admin/product/addProduct' }
                },
                {
                    name:'editProduct',
                    path: '/editProduct',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/EditProduct.vue'], resolve),
                    meta: { title: '编辑产品',url:'/admin/product/findProductAllDataById' }
                },
                {
                    name:'productSpecifications',
                    path: '/productSpecifications',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/ProductSpecifications.vue'], resolve),
                    meta: { title: '产品规格',url:"/admin/saleSpec/querySaleSpecList" }
                },
                {
                    name:'productInfo',
                    path: '/productInfo',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/ProductInfo.vue'], resolve),
                    meta: { title: '产品详情',url:"/admin/product/findProductById" }
                },
                {
                    name:'priceManage',
                    path: '/priceManage',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/PriceManage.vue'], resolve),
                    meta: { title: '产品价格管理',url:"/admin/price/queryProductPriceSaleSpecList" }
                },
                {
                    name:'productInventory',
                    path: '/productInventory',
                    component: resolve => require(['../components/page/BrandProduct/ProductManage/ProductInventory.vue'], resolve),
                    meta: { title: '产品库存管理',url:"/admin/price/queryProductStockList" }
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
                // 运营管理
                {
                    name:'helpCenter',
                    path: '/helpCenter',
                    component: resolve => require(['../components/page/OperateManage/HelpCenter/HelpCenter.vue'], resolve),
                    meta: { title: '帮助中心管理',url:"/admin/helpType/queryHelpTypePageList" }
                },
                {
                    name:'questionList',
                    path: '/questionList',
                    component: resolve => require(['../components/page/OperateManage/HelpCenter/QuestionList.vue'], resolve),
                    meta: { title: '问题列表',url:"/admin/helpQuestion/queryHelpQuestionPageList" }
                },
                {
                    name:'addQuestion',
                    path: '/addQuestion',
                    component: resolve => require(['../components/page/OperateManage/HelpCenter/AddQuestion.vue'], resolve),
                    meta: { title: '添加问题',url:"/admin/helpQuestion/addHelpQuestion" }
                },
                {
                    name:'editQuestion',
                    path: '/editQuestion',
                    component: resolve => require(['../components/page/OperateManage/HelpCenter/EditQuestion.vue'], resolve),
                    meta: { title: '编辑问题',url:"/admin/helpQuestion/updateHelpQuestion" }
                },
                {
                    name:'questionInfo',
                    path: '/questionInfo',
                    component: resolve => require(['../components/page/OperateManage/HelpCenter/QuestionInfo.vue'], resolve),
                    meta: { title: '问题详情',url:"/admin/helpQuestion/deleteHelpQuestion" }
                },
                {
                    name:'currencyRatio',
                    path: '/currencyRatio',
                    component: resolve => require(['../components/page/OperateManage/CurrencyRatio.vue'], resolve),
                    meta: { title: '货币比例设置',url:'/admin/sysConfig/updateSysConfigByCurrency'}
                },
                {
                    name:'baseParamsSet',
                    path: '/baseParamsSet',
                    component: resolve => require(['../components/page/OperateManage/BaseParamsSet.vue'], resolve),
                    meta: { title: '交易基础参数设置',url:'/admin/sysConfig/updateSysConfigByTransaction'}
                },
                {
                    name:'groupBaseParamsSet',
                    path: '/groupBaseParamsSet',
                    component: resolve => require(['../components/page/OperateManage/GroupBaseParamsSet.vue'], resolve),
                    meta: { title: '拼店基础参数设置',url:'/admin/sysConfig/updateSysConfigByTransaction'}
                },
                {
                    name:'advertisingManage',
                    path: '/advertisingManage',
                    component: resolve => require(['../components/page/OperateManage/AdvertisingManage.vue'], resolve),
                    meta: { title: '广告位管理',url:'/advertisingManage'}
                },
                {
                    name:'featuredManage',
                    path: '/featuredManage',
                    component: resolve => require(['../components/page/OperateManage/FeaturedManage.vue'], resolve),
                    meta: { title: '推荐位管理',url:'/featuredManage'}
                },
                {
                    name:'featured',
                    path: '/featured',
                    component: resolve => require(['../components/page/OperateManage/Featured.vue'], resolve),
                    meta: { title: '推荐位管理',url:'/featured'}
                },
                {
                    name:'appBannerAdv',
                    path: '/appBannerAdv',
                    component: resolve => require(['../components/page/OperateManage/AdvertisingManage/AppBannerAdv.vue'], resolve),
                    meta: { title: 'app首页Banner广告位'}
                },
                {
                    name:'recommendList',
                    path: '/recommendList',
                    component: resolve => require(['../components/page/OperateManage/AdvertisingManage/RecommendList.vue'], resolve),
                    meta: { title: '推荐位管理'}
                },
                {
                    name:'recommendMange',
                    path: '/recommendMange',
                    component: resolve => require(['../components/page/OperateManage/AdvertisingManage/RecommendMange.vue'], resolve),
                    meta: { title: '推荐产品管理'}
                },
                {
                    name:'keyWords',
                    path: '/keyWords',
                    component: resolve => require(['../components/page/OperateManage/AdvertisingManage/KeyWords.vue'], resolve),
                    meta: { title: '搜索热门搜索关键词',url:'/admin/hotWord/getHotWordsByPage'}
                },
                {
                    name:'allKeyWords',
                    path: '/allKeyWords',
                    component: resolve => require(['../components/page/OperateManage/AllKeyWords.vue'], resolve),
                    meta: { title: '搜索关键词',url:'/admin/hotWord/getAllWordsByPage'}
                },
                {
                    name:'deliveryAddress',
                    path: '/deliveryAddress',
                    component: resolve => require(['../components/page/OperateManage/DeliveryAddress.vue'], resolve),
                    meta: { title: '提货地址设置',url:'/admin/storeHouse/queryStoreHouseList'}
                },
                // 订单管理
                {
                    name:'orderList',
                    path: '/orderList',
                    component: resolve => require(['../components/page/OrderManage/OrderManage/OrderList.vue'], resolve),
                    meta: { title: '订单管理',url:'/orderManage'}
                },
                {
                    name:'undealOrder',
                    path: '/undealOrder',
                    component: resolve => require(['../components/page/OrderManage/OrderManage/UndealOrder.vue'], resolve),
                    meta: { title: '待处理订单',url:'/admin/order/queryPendingOrderPageList'}
                },
                {
                    name:'orderInfo',
                    path: '/orderInfo',
                    component: resolve => require(['../components/page/OrderManage/OrderManage/OrderInfo.vue'], resolve),
                    meta: { title: '订单详情',url:'/admin/order/getOrderDetail'}
                },
                {
                    name:'afterSaleOpr',
                    path: '/afterSaleOpr',
                    component: resolve => require(['../components/page/OrderManage/OrderManage/AfterSaleOpr.vue'], resolve),
                    meta: { title: '申请操作'}
                },
                {
                    name:'logistics',
                    path: '/logistics',
                    component: resolve => require(['../components/page/OrderManage/OrderManage/Logistics.vue'], resolve),
                    meta: { title: '物流详情'}
                }
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
