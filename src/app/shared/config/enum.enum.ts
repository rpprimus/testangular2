export enum Enum {
        Module_EventDetails = 1,
        Module_ShipmentDetails = 2,
        Module_PickupDetails = 3,
        Module_AdditionalDetail = 4,
        Module_ServicePage = 5,
        Module_Event = 6,
        Module_SignUp = 7,

        OtherResources = "OTHER_RESOURCES",
        ProductImages = "PRODUCT_IMAGES",

        Store_Signup_Varification_Success = 1,
        Store_Signup_Varification_Expired = 2,
        Store_Signup_Varification_AlreadyVarified = 3,
        Store_Signup_Varification_NoUser = 4,


        Order_Placed = 'PLACED',
        Order_Confirmed = 'CONFIRMED',
        Order_Processing = 'PROCESSING',
        Order_Ready_to_ship = 'READY_TO_SHIP',
        Order_Shipped = 'SHIPPED',
        Order_Received = 'RECEIVED',
        Order_Complete = 'COMPLETE',
        Order_Canceled = 'CANCELED',

        Order_PLACED = 1,
        Order_CONFIRMED = 2,
        Order_PROCESSING = 3,
        Order_READY_TO_SHIP = 4,
        Order_SHIPPED = 5,
        Order_RECEIVED = 6,
        Order_COMPLETE = 7,
        Order_CANCELED = 8,

        Kit_OtherResources = 1,
        Kit_ProductImages = 0,

        ADMIN = "ADMIN",
        MANAGER = "ACCOUNT_MANAGER",
        TEAM = "WORKSHOP_TEAM",
        Store_Admin = "STORE_ADMIN",
        Store_Regional_Manager = "REGIONAL_MANAGER",
        Store_User = "USER",
        CreditCard_Admin = "CREDIT_CARD_ADMIN",

        // type enum for dynamic form fields
        Manage_Order = 4,
        Product_Status_On_Hold = "ON_HOLD",

        //type for Migration excel report
        Product_Migration = "PRODUCT_MIGRATION",
        STORE_USER_MIGRATION = "STORE_USER_MIGRATION",
        Event_Migration = "EVENT_MIGRATION",
        component = "component",

        // type for Client Store Users
        Store_Admin_Id = 4,

        //status of product and kit
        Approval_awaited = "Approval Awaited",
        WAITING_APPROVAL = "Waiting Approval",
        Active = "ACTIVE",
        Inactive = "INACTIVE",
        OnHold = "ON HOLD",

        //type enum for list pages
        user = "USER",
        client = "CLIENT",
        store_user = "STORE_USER",
        product = "PRODUCT",
        kit = "KIT",
        order = "ORDER",
        inventory = "INVENTORY",
        damage = "DAMAGE"

}
