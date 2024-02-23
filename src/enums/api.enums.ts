export enum API_URL {
    HOST = "https://api.banvebank.com.vn",
    LOGIN = "users/login",
    REGISTER = "users/register",
    REFRESH_TOKEN = "users/refreshtoken",
    GET_USER_INFO = "users/profile",
    GET_ALL_USERS = "Admin/all-user",
    USER_STATISTIC = "Admin/statistic-account-management",
    BLOCK_USER = "Admin/block-user",
    GET_SKETCHS = "Admin/all-product",
    OVERVIEW_STATISTIC = "Admin/overview-statistic",
    STATISTIC_SKETCH = "Admin/statistic-products",
    OVERVIEW_STATISTIC_DAY = "Admin/overview-statistic-day",
    OVERVIEW_STATISTIC_MONTH = "Admin/overview-statistic-month",
    OVERVIEW_STATISTIC_QUARTER = "Admin/overview-statistic-quarter",
    OVERVIEW_STATISTIC_YEAR = "Admin/overview-statistic-year",
    USER_STATISTIC_DAY = "Admin/get-user-day",
    SELLER_STATISTIC_DAY = "Admin/get-seller-day",
    GET_ALL_REPORT = "Admin/statistic-report",
    STATISTIC_REPORT = "Admin/statistic-report",
    SELLER_REQUEST = "sellers/registration-form",
    SELLER_APPROVE = "sellers/approve/",
    WITHDRAW_REQUEST = "withdrawal-requests/",
    GET_BILLS = "Admin/get-all-order",
    DETAIL_BILL = "orders/",
    BLOCK_SKETCH = "Admin/disable-product",
    DELETE_SKETCH = "products/delete-product-by-id",
    GET_ALL_STYLE = "type-of-architectures",
    GET_TOP_ARCHITECT = "Admin/priority-seller",
    GET_OUT_TOP_ARCHITECT = "Admin/seller-nonpriority",
    SAVE_TOP_ARCHITECT = "Admin/edit-index-seller",


    //Custom page
    MISSION_PAGE_DATA = "custom-pages",
    BANNER_HOME_PAGE_DATA = "custom-banners",

    //Buyer demand
    CUSTOMER_NEED = "customer-need"
}