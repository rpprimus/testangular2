export enum AppUrl {

    settings = "./assets/settings.json",
    getToken = "user/v1/token",
    logout = "user/v1/logout",
    getUserInfo = 'user/v1/userinfo',
    getRoles = "user/v1/roles",
    getClient = "user/v1/clients",
    getFilteredClient = "user/v1/getclients",
    user = "user/v1/user",
    getUsers = "user/v1/users",
    changeStatusforUser = "user/v1/status",
    getClientById = "user/v1/client",
    storeUser = "user/v1/stores",
    warehouseList = "user/v1/warehouses",
    warehouse = "user/v1/warehouse",
    updateStoreUser = "user/v1/store",
    getAccountManagerList = "user/v1/accountmanagers",

    clients = "client/v1/clients",
    changeStatusforClient = "client/v1/status",
    clientDetailById = "client/v1/client",
    clientSetting = "client/v1/settings",
    clientThemeSettings = "client/v1/theme",
    downloadLogo = "client/v1/download/logo",
    createStore = "client/v1/store",
    moduleServicePage = 'client/v1/servicepage',
    getClientModuleSetting = 'client/v1/modules',
    getHierarchies = "client/v1/hierarchies",
    changeStatusforStore = "user/v1/store/status",
    resendEmail = "user/v1/store/verification",
    orderingDetail = 'client/v1/orderingDetails',
    clientSignUpModule = 'client/v1/signup',
    clientEvent = "client/v1/event",
    getRegionalManager = "client/v1/regionalmanagers",
    getVisibilityGroup = "client/v1/visibilitygroups",
    saveCategories = "client/v1/categories",
    saveInfoCategory = "client/v1/categories/info",
    getCategories = 'client/v1/categories',
    changeStatusForCategory = "client/v1/category/status",
    getCategoryList = "client/v1/categorylist",
    eventReport = "client/v1/eventsreport",
    updateCategorySequence = "client/v1/categories/sequence",
    

    //Product Url
    getProductList = "product/v1/products",
    changeStatusForProduct = "product/v1/status",
    productResource = "product/v1/resource",
    productDetail = "product/v1/detail",
    productResourcePrimary = "product/v1/resource/isprimary",
    getInventory = "product/v1/inventoryproducts",
    getInventoryHistory = "product/v1/inventories/history",
    getUpdateInventoryReason = "product/v1/inventoryupdatereasons",
    getInventoryDetail = "product/v1/inventories",
    updateInventoryDetail = "product/v1/inventory",
    getInventoryAvailability = "product/v1/inventory/availability",

    // Store URL

    storeLogin = "external/user/v1/token",
    validateStore = "/external/user/v1/validatestore",
    logoDownload = "/external/user/v1/download/logo",
    signupClient = "external/user/v1/signup",
    passwordResetRequest = "external/user/v1/resetRequest",
    resetPassword = "external/user/v1/resetCredential",
    getStoreHierarchies = "external/user/v1/hierarchies",
    verification = "external/user/v1/verification",
    getThumbnailImage = "product/v1/download/thumbnail",
    stepAssociatedProduct = "product/v1/associate/product",
    stepAssociated = "product/v1/associate/step",
    otpCheck = "common/v1/otpCheck",
    resendOtp = "common/v1/reSendOpt",

    //order URL
    browseProductList = "order/v1/products",
    activeOrderingDetails = "client/v1/orderingModules",
    placeOrder = "order/v1/order",
    getOrderList = "order/v1/orders",
    getCountries = "common/v1/countries",
    getStates = "common/v1/states",
    getStatus = "order/v1/statuses",
    cancelOrder = "order/v1/cancel",
    getRequestors = "order/v1/requestors",
    onDemandProductImg = "order/v1/resource",
    getHeaderFooter = "/common/v1/section",
    cartDetailsJson = "order/v1/cartdetails",
    getOrders = "order/v1/getorder",
    updateorderToConfirm = "order/v1/updateordertoconfirm",
    searchproduct = "order/v1/products",
    getProductInfo = "order/v1/productInfo",
    updateQuantity = "order/v1/updateproduct",
    addProduct = "order/v1/addproduct",
    changeStatusToProcessing = "order/v1/process",
    updateorder = "order/v1/updateorder",
    eventDetail = "order/v1/event",
    getAllEvents = "/order/v1/events",
    changeStatustoReadyToShip = "order/v1/readytoship",
    updateFreigthDetails = "order/v1/freightdetails",
    getShipmentReason = "order/v1/shipmentreasons",
    updateCarrierDetails = "order/v1/carrierdetails",
    changeStatusToShipped = "order/v1/shipped",
    updateReceivingDetail = "order/v1/returndetails",
    changeStatusToReturned = "order/v1/returned",
    changeStatusToComplete = "order/v1/completed",
    kitList = "product/v1/kits",
    changeStatusForKit = "product/v1/kit/status",
    kitDetail="product/v1/kitdetail",
    addKitResource = "product/v1/kitdetail/resource",
    downloadKitResource = "product/v1/kitdetail/download",
    markKitImagePrimary = "product/v1/kitdetail/isprimary",
    searchProductOnKit = "product/v1/detail/kitdetail",
    getDamageProducts = "product/v1/damage",
    downloadDamageResource = "product/v1/damage/download",
    updateOrDeleteDamageResource = "product/v1/damage/resource",
    getDashboard = "order/v1/dashboard",
    getSteps = "order/v1/getsteps",

    getProducts = "common/v1/products",
    getAllCategories = "common/v1/categories",
    browseKitList = "order/v1/browse/kit",
    kitStoreDetail = "order/v1/kitinfo",

    getBrowseCategories = "client/v1/browsecategories",
    deleteProduct = "order/v1/deleteproduct",

    helpNResource = "client/v1/resource",
    onDemandGraphic = "order/v1/resource",


    //Migration url
    getMigrationList = "migration/v1/list",
    renameExcelUpload = "migration/v1/rename",
    downloadExcel = "migration/v1/download",
    uploadExcel = "migration/v1/upload",
    deleteExcelFile = "migration/v1/delete",

    //report url
    orderSummaryReport = "report/v1/ordersummaryreport",
    orderDetailReport = "report/v1/orderdetailsreport",
    inventoryReport = "report/v1/inventoryreport",
    productUsageReport = "report/v1/productusagereport",
    productListingReport = "report/v1/productlistingreport",
    orderMonthlyReport = "report/v1/order-monthly-report",
    productUsageMonthlyReport = "report/v1/product-monthly-usage-report",
    damageproductreport = "report/v1/damageproductreport",
    printOrder = "report/v1/printorder",

    //credit card
    saveCreditCard = "user/v1/addcarddetail",
    getCreditCard = "user/v1/getcardbyid",
    getUserCreditCards = "user/v1/getcardbyuserid",
    getCreditCardInfo = "user/v1/get-cardbyid-userid",
    deleteCardInfo = "user/v1/deletecardbyid",
    
    getDetailSequence = "common/v1/sequence"
}
