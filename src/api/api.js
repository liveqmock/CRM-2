// 登陆接口
export const LOGIN = '/mock/5a9dec734a2b3e6652a9c8f1/example/login';

//获取产品分类列表
export const getProductList='/mock/5aeac1c6c186102e067af3f3/test/getBrandProductList';
//获取产品二级分类列表
export const getSecondProductList='/mock/5aeac1c6c186102e067af3f3/test/getSecondProductList';


//获取层级管理列表
export const getLevelList='/mock/5aeac1c6c186102e067af3f3/test/getLevelList';
//获取会员管理列表
export const getManageList='/mock/5aeac1c6c186102e067af3f3/test/getManageList';

// -----------------------------------------------------正式接口--------------------------------------
// 登陆相关
    // 密码登陆 
    export const loginByPwd ='/admin/adminLogin/pswLogin';
    // 获取验证码
    export const getCode = '/commonAPI/phoneCode/sendLoginCode';
    // 验证码登陆
    export const loginByCode = '/admin/adminLogin/codeLogin';

// 首页
    // 修改密码短信验证
    export const sendUpdatePwdCode = '/commonAPI/phoneCode/sendUpdatePwdCode';
    // 修改密码验证码校验
    export const loginUpdateCheckCode = ' /admin/adminLogin/loginUpdateCheckCode';
    // 修改密码
    export const loginUpdatePassword = '/admin/adminLogin/loginUpdatePassword';
    // 修改密码2
    export const updateAdminUserPassword = '/admin/adminUser/updateAdminUserPassword';

// 授权管理
    // 获取渠道列表
    export const permitChannelGetList = '/admin/permitChannel/getList';
    // 渠道类目添加
    export const addPermitChannel = '/admin/permitChannel/addPermitChannel';
    // 编辑渠道类目
    export const updatePermitChannel ='/admin/permitChannel/updatePermitChannel';
    // 续约审核
    export const queryPermitRecordList ='/admin/permitRecord/queryPermitRecordList';

// 溯源管理
    // 获取所有防伪码模板列表
    export const rootsGetCodeTplList = '/admin/securityCodeTemplate/getAll';
    // 新增防伪码模板
    export const rootsAddCodeTplList = '/admin/securityCodeTemplate/add';
    // 查询防伪码模板
    export const rootsQueryCodeTplList = '/admin/securityCodeTemplate/findById';
    // 修改防伪码模板
    export const rootsEditCodeTplList = '/admin/securityCodeTemplate/updateById';
    // 删除防伪码模板
    export const rootsDelCodeTplList = '/admin/securityCodeTemplate/deleteById';
    // 根据id失效防伪码模板
    export const loseById = '/admin/securityCodeTemplate/loseById';
    // 防伪码参数列表
    export const getAllCategoryBrand = '/admin/categoryBrand/getAllCategoryBrand';
    // 管理员防伪码参数短信
    export const sendSecurityCodeCode = '/commonAPI/phoneCode/sendSecurityCodeCode';
    // 新增参数
    export const addCategoryBrandCode = '/admin/categoryBrand/addCategoryBrandCode';
    // 生成防伪码全码
    export const productAllCode = '/securityCode/securityCode/productAllCode';
    // 失效编码
    export const loseCategoryBrandCode = '/admin/categoryBrand/loseCategoryBrandCode';

// 权限管理
    // 查询部门列表
    export const queryDepartmentList = '/admin/role/queryDepartmentList';
    // 查询岗位列表
    export const queryJobList = '/admin/role/queryJobList';
    // 获取管理员列表
    export const getMangerList = '/admin/adminUser/queryAdminUserPageList';
    // 查看管理员操作日志
    export const getMangerLog = '/admin/logAdminuser/getPage';
    // 获取管理员权限列表
    export const getRoleList = '/admin/privilege/queryPrivilegeList';
    // 添加管理员
    export const addManger = '/admin/adminUser/addAdminUser';
    // 重置登陆密码
    export const resetPassword = '/admin/adminUser/resetPassword';
    // 开启/关闭管理员账号
    export const updateAdminUserStatus = '/admin/adminUser/updateAdminUserStatus';
    // 删除管理员账号
    export const deleteAdminUser = '/admin/adminUser/deleteAdminUser';
    // 根据ID查找管理员信息
    export const findAdminUserbyId = '/admin/adminUser/findAdminUserbyId';
    // 编辑管理员
    export const updateAdminUser = '/admin/adminUser/updateAdminUser';
    // 岗位列表查询
    export const queryRolePageList = '/admin/role/queryRolePageList';
    // 添加岗位
    export const addRole = '/admin/role/addRole';
    // 根据id查询岗位
    export const findRoleById = '/admin/role/findRoleById';
    // 修改岗位
    export const updateRole = '/admin/role/updateRole';
    // 删除岗位
    export const deleteRole = '/admin/role/deleteRole';
    // 查询权限三级模块列表
    export const queryPrivilegeList = '/admin/privilege/queryPrivilegeList';
    // 添加权限
    export const addPrivilege = '/admin/privilege/addPrivilege';
    // 获取一级模块列表
    export const queryTopMenuList = '/admin/privilege/queryTopMenuList';
    // 新增功能模块
    export const addFunctionModule = '/admin/privilege/addFunctionModule';
    // 修改头像
    export const updateAdminUserFace = 'admin/adminUser/updateAdminUserFace';

// 品牌产品管理
    // 获取一二级类目列表
    export const getCategoryList = '/admin/productCategory/queryProductCategoryPageList';
    // 添加一二级类目
    export const addCategory = '/admin/productCategory/addProductCategory';
    // 编辑一二级类目
    export const editCategory = '/admin/productCategory/updateProductCategory';
    // 删除一二级类目
    export const deleteCategory = '/admin/productCategory/deleteProductCategory';
    // 获取品牌列表
    export const getBrandList='/admin/brand/queryBrandPageList';
    export const getFirstList='/admin/productCategory/queryProductCategoryName';
    export const getSecondList='/admin/productCategory/queryProductCategoryFatherid';
    export const queryCategoryBrandCid='admin/categoryBrand/queryCategoryBrandCid';
    //添加品牌
    export const addBrand='/admin/brand/addBrand';
    //修改品牌
    export const updateBrand='/admin/brand/updateBrand';
    //删除品牌
    export const deleteBrand='/admin/brand/deleteBrand';
    //根据ID查找详情
    export const findBrandById='/admin/brand/findBrandById';


//上传图片、文件、音乐
    //上传图片
    export const addImg='/commonAPI/ossClient/aliyunOSSUploadImage';
    //上传文件
    export const addFile='/commonAPI/ossClient/aliyunOSSUpload';
    //上传音乐
    export const addMusic='/commonAPI/ossClient/aliyunOSSUploadMusic';
    // 获取省、市、区
    export const getProvinced = '/admin/area/getProvinceList';
    export const getCity = '/admin/area/getCityList';
    export const getArea = '/admin/area/getAreaList';


// 问题反馈
    // 反馈列表
    export const feedbackList='/admin/feedback/queryFeedbackList';
    // 问题详情
    export const feedbackDetail='/admin/feedback/findFeedbackByid';
    //修改反馈详情
    export const updateFeedback='/admin/feedback/updateFeedback';

//经销商层级管理
    // 查询经销商层级列表
    export const getDealerLevelList='/admin/dealerLevel/getList';
    // 添加经销商层级
    export const addDealerLevel='/admin/dealerLevel/addDealerLevel';
    // 修改经销商层级
    export const updateDealerLevel='/admin/dealerLevel/updateDealerLevel';
    // 根据id删除
    export const deleteDealerLevelById='/admin/dealerLevel/deleteDealerLevelById';
    //发起——邀请层级接口
    export const getLevelListWithDealerCount='/admin/dealerLevel/getLevelListWithDealerCount';
    //发起——授权渠道
    export const getStatusONList='/admin/permitChannel/getStatusONList';
    //发起——授权品牌
    export const getList='/admin/brand/getList';
    //发起——根据品牌获取品类
    export const getProductCategoryList='/admin/productCategory/queryProductCategoryByBrandId';

//经销商加盟管理
    // 发起经销商接口
    export const addInvite='/admin/invite/addInvite';
    //经销商列表接口
    export const getInvitePageList='/admin/invite/queryInvitePageList';
    //查看用户邀请详情
    export const findInviteInfo='/admin/invite/findInviteInfo';

// 经销商会员管理
        //会员列表
        export const getDealerPageList='/admin/dealer/queryDealerPageList';
        //会员详情
        export const findDealerById='/admin/dealer/findDealerById';
        //修改授权信息
        export const updateDealerPermitById='/admin/dealer/updateDealerPermitById';
        //根据id修改经销商信息
        export const updateDealerById='/admin/dealer/updateDealerById';
        //用户的树状结构
        export const findDealerTreeById='/admin/dealer/findDealerTreeById';
        //关闭用户
        export const stopDealerById='/admin/dealer/stopDealerById';
        //开启用户
        export const openDealerById='/admin/dealer/openDealerById';
        //导出
        export const exportDealerListExcel='/admin/dealer/exportDealerListExcel';


// 公告通知
    // 公告列表
    export const getNoticeList='/admin/notice/queryNoticeList';
    // 公告详情
    export const getNoticeDetailById='/admin/notice/findNoticeDetailById';
    //发布通知/公告
    export const addNotice='/admin/notice/addNotice';
    // 修改公告/通知状态
    export const updateNoticeStatus='/admin/notice/updateNoticeStatus';