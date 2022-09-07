const BASE_PATH = '/api';
const API_URL = {

    TEXT: BASE_PATH + 'erp/buyArea/test',

    //auth
    USER_LOGIN: BASE_PATH + '/auth/login',
    USER_REGISTER: BASE_PATH + '/auth/register',
    USER_UPDATE: BASE_PATH + '/users/update',


    //user
    USER_SELECT: BASE_PATH + '/erp/users/select',
    USER_SELECT_BY_ID: BASE_PATH + '/erp/users/select_by_id',
    USER_FLAG: BASE_PATH + '/users/flag',
    USER_DELETE: BASE_PATH + '/users/delete',

    //clientArea
    CLIENTAREA_SELECT: BASE_PATH + '/erp/clientarea/find',
    CLIENTAREA_ADD: BASE_PATH + '/erp/clientarea/create',
    CLIENTAREA_UPDATE: BASE_PATH + '/erp/clientarea/update',
    CLIENTAREA_DELETE: BASE_PATH + '/erp/clientarea/delete',

    //client
    CLIENT_SELECT: BASE_PATH + '/erp/client/select',
    CLIENT_ADD: BASE_PATH + '/erp/client/add',
    CLIENT_UPDATE: BASE_PATH + '/erp/client/update',
    CLIENT_DELETE: BASE_PATH + '/erp/client/delete',
    CLIENT_LEVEL1REVIEW: BASE_PATH + '/erp/client/level1Review',
    CLIENT_LEVEL2REVIEW: BASE_PATH + '/erp/client/level2Review',
    CLIENT_UN_LEVEL1REVIEW: BASE_PATH + '/erp/client/unLevel1Review',
    CLIENT_UN_LEVEL2REVIEW: BASE_PATH + '/erp/client/unLevel2Review',

    //buy
    BUY_FIND_ONE: BASE_PATH + '/erp/buy/findOne',
    BUY_SELECT: BASE_PATH + '/erp/buy/find',
    BUY_ADD: BASE_PATH + '/erp/buy/create',
    BUY_UPDATE: BASE_PATH + '/erp/buy/update',
    BUY_DELETE: BASE_PATH + '/erp/buy/delete',
    BUY_LEVEL1REVIEW: BASE_PATH + '/erp/buy/level1Review',
    BUY_LEVEL2REVIEW: BASE_PATH + '/erp/buy/level2Review',
    BUY_UN_LEVEL1REVIEW: BASE_PATH + '/erp/buy/unLevel1Review',
    BUY_UN_LEVEL2REVIEW: BASE_PATH + '/erp/buy/unLevel2Review',

    //buyArea
    BUYAREA_SELECT: BASE_PATH + '/erp/buyarea/select',
    BUYAREA_ADD: BASE_PATH + '/erp/buyarea/add',
    BUYAREA_UPDATE: BASE_PATH + '/erp/buyarea/update',
    BUYAREA_DELETE: BASE_PATH + '/erp/buyarea/delete',

    //product
    PRODUCT_FIND: BASE_PATH + '/erp/product/find',
    PRODUCT_FIND_ONE: BASE_PATH + '/erp/product/findOne',
    PRODUCT_CREATE: BASE_PATH + '/erp/product/create',
    PRODUCT_UPDATE: BASE_PATH + '/erp/product/update',
    PRODUCT_DELETE: BASE_PATH + '/erp/product/delete',
    PRODUCT_LEVEL1REVIEW: BASE_PATH + '/erp/product/level1Review',
    PRODUCT_UN_LEVEL1REVIEW: BASE_PATH + '/erp/product/unLevel1Review',
    PRODUCT_LEVEL2REVIEW: BASE_PATH + '/erp/product/level2Review',
    PRODUCT_UN_LEVEL2REVIEW: BASE_PATH + '/erp/product/unLevel2Review',

    //productOtherUnit
    PRODUCT_OTHER_UNIT_FIND : BASE_PATH + '/erp/productOtherUnit/find',
    PRODUCT_OTHER_UNIT_CREATE : BASE_PATH + '/erp/productOtherUnit/create',
    PRODUCT_OTHER_UNIT_UPDATE : BASE_PATH + '/erp/productOtherUnit/update',
    PRODUCT_OTHER_UNIT_DELETE : BASE_PATH + '/erp/productOtherUnit/delete_data',

    //productArea
    PRODUCTAREA_SELECT: BASE_PATH + '/erp/productarea/select',
    PRODUCTAREA_ADD: BASE_PATH + '/erp/productarea/add',
    PRODUCTAREA_UPDATE: BASE_PATH + '/erp/productarea/update',
    PRODUCTAREA_DELETE: BASE_PATH + '/erp/productarea/delete',

    //warehouse
    WAREHOUSE_SELECT: BASE_PATH + '/erp/warehouse/select',
    WAREHOUSE_SELECT_AUTH: BASE_PATH + '/erp/warehouse/select_auth',
    WAREHOUSE_SELECT_AUTH_DEFAULT: BASE_PATH + '/erp/warehouse/select_auth_default',
    WAREHOUSE_ADD: BASE_PATH + '/erp/warehouse/add',
    WAREHOUSE_UPDATE: BASE_PATH + '/erp/warehouse/update',
    WAREHOUSE_DELETE: BASE_PATH + '/erp/warehouse/delete',

    //operateArea
    OPERATEAREA_SELECT: BASE_PATH + '/erp/operateArea/select',
    OPERATEAREA_FIND_DEFAULT: BASE_PATH + '/erp/operateArea/findDefaultOperatearea',
    OPERATEAREA_ADD: BASE_PATH + '/erp/operateArea/add',
    OPERATEAREA_UPDATE: BASE_PATH + '/erp/operateArea/update',
    OPERATEAREA_DELETE: BASE_PATH + '/erp/operateArea/delete',

    //currency
    CURRENCY_SELECT: BASE_PATH + '/erp/currency/select',
    CURRENCY_ADD: BASE_PATH + '/erp/currency/add',
    CURRENCY_UPDATE: BASE_PATH + '/erp/currency/update',
    CURRENCY_DELETE: BASE_PATH + '/erp/currency/delete_data',


    //tableConfig
    TABLE_COLUMN_STATE_SELECT: BASE_PATH + '/erp/table_column_state/select',
    TABLE_COLUMN_STATE_ADD: BASE_PATH + '/erp/table_column_state/add',
    TABLE_COLUMN_STATE_DELETE: BASE_PATH + '/erp/table_column_state/delete_data',

    //Inventory
    INVENTORY_SELECT: BASE_PATH + '/erp/inventory/select',
    INVENTORY_ADD: BASE_PATH + '/erp/inventory/add',
    INVENTORY_UPDATE: BASE_PATH + '/erp/inventory/update',
    INVENTORY_DELETE: BASE_PATH + '/erp/inventory/delete',

    //user_warehouse_mx
    USER_WAREHOUSE_MX_FIND: BASE_PATH + '/erp/user_warehouse_mx/select',
    USER_WAREHOUSE_MX_FIND_INFO: BASE_PATH + '/erp/user_warehouse_mx/findInfo',
    USER_WAREHOUSE_MX_ADD: BASE_PATH + '/erp/user_warehouse_mx/add',
    USER_WAREHOUSE_MX_DELETE: BASE_PATH + '/erp/user_warehouse_mx/delete',

    //user_operatearea_mx 操作区域权限明细
    USER_OPERATEAREA_MX_FIND: BASE_PATH + '/erp/user_operatearea_mx/select',
    USER_OPERATEAREA_MX_FIND_INFO: BASE_PATH + '/erp/user_operatearea_mx/findInfo',
    USER_OPERATEAREA_MX_DEFAULT: BASE_PATH + '/erp/user_operatearea_mx/findDefaultUserOperateArea',
    USER_OPERATEAREA_MX_ADD: BASE_PATH + '/erp/user_operatearea_mx/add',
    USER_OPERATEAREA_MX_DELETE: BASE_PATH + '/erp/user_operatearea_mx/delete',

    //user_account_mx 出纳账户权限明细
    USER_ACCOUNT_MX_FIND: BASE_PATH + 'erp/user_account_mx/find',
    USER_ACCOUNT_MX_CREATE: BASE_PATH + 'erp/user_account_mx/create',
    USER_ACCOUNT_MX_DELETE: BASE_PATH + 'erp/user_account_mx/delete_data',
    //productionInbound
    INBOUND_FIND_MX: BASE_PATH + '/erp/inboundmx/select',

    //production_inbound
    INBOUND_PRODUCTION_FIND: BASE_PATH + '/erp/production_inbound/select',
    INBOUND_PRODUCTION_CREATE: BASE_PATH + '/erp/production_inbound/add',
    INBOUND_PRODUCTION_UPDATE: BASE_PATH + '/erp/production_inbound/update',
    INBOUND_PRODUCTION_LEVEL1REVIEW: BASE_PATH + '/erp/production_inbound/level1Review',
    INBOUND_PRODUCTION_UN_LEVEL1REVIEW: BASE_PATH + '/erp/production_inbound/unLevel1Review',
    INBOUND_PRODUCTION_DELETE: BASE_PATH + '/erp/production_inbound/delete',
    INBOUND_PRODUCTION_FIND_MX: BASE_PATH + '/erp/inboundmx/select',

    //saleOutbound
    OUTBOUND_FIND_MX: BASE_PATH + '/erp/outbound_mx/find',

    //sale_outbound
    SALE_OUTBOUND_FIND: BASE_PATH + '/erp/saleOutbound/find',
    SALE_OUTBOUND_FIND_SHEET_STATE: BASE_PATH + '/erp/saleOutbound/findSheetState',
    SALE_OUTBOUND_CREATE: BASE_PATH + '/erp/saleOutbound/create',
    SALE_OUTBOUND_CREATE_L1REVIEW: BASE_PATH + '/erp/saleOutbound/create_l1Review',
    SALE_OUTBOUND_UPDATE: BASE_PATH + '/erp/saleOutbound/update',
    SALE_OUTBOUND_UPDATE_L1REVIEW: BASE_PATH + '/erp/saleOutbound/updateAndL1Review',
    SALE_OUTBOUND_DELETE: BASE_PATH + '/erp/saleOutbound/delete_data',
    SALE_OUTBOUND_UN_DELETE: BASE_PATH + '/erp/saleOutbound/undelete_data',
    SALE_OUTBOUND_L1REVIEW: BASE_PATH + '/erp/saleOutbound/l1Review',
    SALE_OUTBOUND_UN_L1REVIEW: BASE_PATH + '/erp/saleOutbound/unL1Review',
    SALE_OUTBOUND_L2REVIEW: BASE_PATH + '/erp/saleOutbound/l2Review',
    SALE_OUTBOUND_UN_L2REVIEW: BASE_PATH + '/erp/saleOutbound/unL2Review',

    //buyInbound 采购进仓
    BUY_INBOUND_FIND: BASE_PATH + '/erp/buyInbound/find',
    BUY_INBOUND_FIND_SHEET_COMPLETE_STATE: BASE_PATH + '/erp/buyInbound/findSheetCompleteState',
    BUY_INBOUND_CREATE: BASE_PATH + '/erp/buyInbound/create',
    BUY_INBOUND_CREATE_L1REVIEW: BASE_PATH + '/erp/buyInbound/create_l1Review',
    BUY_INBOUND_UPDATE: BASE_PATH + '/erp/buyInbound/update',
    BUY_INBOUND_UPDATE_L1REVIEW: BASE_PATH + '/erp/buyInbound/update_l1Review',
    BUY_INBOUND_DELETE: BASE_PATH + '/erp/buyInbound/delete',
    BUY_INBOUND_UN_DELETE: BASE_PATH + '/erp/buyInbound/unDelete',
    BUY_INBOUND_L1REVIEW: BASE_PATH + '/erp/buyInbound/level1Review',
    BUY_INBOUND_UN_L1REVIEW: BASE_PATH + '/erp/buyInbound/unLevel1Review',
    BUY_INBOUND_L2REVIEW: BASE_PATH + '/erp/buyInbound/level2Review',
    BUY_INBOUND_UN_L2REVIEW: BASE_PATH + '/erp/buyInbound/unLevel2Review',


    //buyPay 采购付款单
    BUY_PAY_FIND: BASE_PATH + '/erp/buyPay/find',
    BUY_PAY_MX_FIND: BASE_PATH + '/erp/buyPayMx/find',
    BUY_PAY_CREATE: BASE_PATH + '/erp/buyPay/create',
    BUY_PAY_UPDATE: BASE_PATH + '/erp/buyPay/update',
    BUY_PAY_DELETE: BASE_PATH + '/erp/buyPay/delete_data',

    //应付账款
    ACCOUNT_PAYABLE_FIND: BASE_PATH + '/erp/accountsPayable/find',

    //应收账款
    ACCOUNT_RECEIVABLE_FIND: BASE_PATH + '/erp/accountsReceivable/find',
    //出纳账户
    ACCOUNT_FIND: BASE_PATH + '/erp/account/find',
    ACCOUNT_AUTH_FIND: BASE_PATH + '/erp/account/findAccountAuth',
    ACCOUNT_CREATE: BASE_PATH + '/erp/account/create',
    ACCOUNT_UPDATE: BASE_PATH + '/erp/account/update',
    ACCOUNT_DELETE: BASE_PATH + '/erp/account/delete_data',

    //出纳收支明细

    //出纳收入单
    ACCOUNT_INCOME_FIND: BASE_PATH + '/erp/accountInCome/find',
    ACCOUNT_INCOME_FIND_SHEET_STATE: BASE_PATH + '/erp/accountInCome/findSheetState',
    ACCOUNT_INCOME_AMOUNT_MX_FIND: BASE_PATH + '/erp/accountInComeAmountMx/find',
    ACCOUNT_INCOME_SHEET_MX_FIND: BASE_PATH + '/erp/accountInComeSheetMx/find',
    ACCOUNT_INCOME_CREATE: BASE_PATH + '/erp/accountInCome/create',
    ACCOUNT_INCOME_CREATE_L1REVIEW: BASE_PATH + '/erp/accountInCome/create_l1Review',
    ACCOUNT_INCOME_UPDATE: BASE_PATH + '/erp/accountInCome/update',
    ACCOUNT_INCOME_UPDATE_L1REVIEW: BASE_PATH + '/erp/accountInCome/update_l1Review',
    ACCOUNT_INCOME_DELETE: BASE_PATH + '/erp/accountInCome/delete_data',
    ACCOUNT_INCOME_L1REVIEW: BASE_PATH + '/erp/accountInCome/level1Review',
    ACCOUNT_INCOME_UN_L1REVIEW: BASE_PATH + '/erp/accountInCome/unLevel1Review',

    //支出单
    ACCOUNT_EXPENDITURE_FIND: BASE_PATH + '/erp/accountExpenditure/find',
    ACCOUNT_EXPENDITURE_FIND_STATE: BASE_PATH + '/erp/accountExpenditure/findAccountExpenditureState',
    ACCOUNT_EXPENDITURE_CREATE: BASE_PATH + '/erp/accountExpenditure/create',
    ACCOUNT_EXPENDITURE_CREATE_L1REVIEW: BASE_PATH + '/erp/accountExpenditure/create_l1Review',
    ACCOUNT_EXPENDITURE_UPDATE: BASE_PATH + '/erp/accountExpenditure/update',
    ACCOUNT_EXPENDITURE_UPDATE_L1REVIEW: BASE_PATH + '/erp/accountExpenditure/update_l1Review',
    ACCOUNT_EXPENDITURE_DELETE: BASE_PATH + '/erp/accountExpenditure/deleteById',
    ACCOUNT_EXPENDITURE_L1REVIEW: BASE_PATH + '/erp/accountExpenditure/level1Review',
    ACCOUNT_EXPENDITURE_UN_L1REVIEW: BASE_PATH + '/erp/accountExpenditure/unLevel1Review',
    //支出单收款明细
    ACCOUNT_EXPENDITURE_AMOUNT_MX_FIND: BASE_PATH + '/erp/accountExpenditureAmountMx/find',
    //支出单核销明细
    ACCOUNT_EXPENDITURE_SHEET_MX_FIND: BASE_PATH + '/erp/accountExpenditureSheetMx/find',


    //核销单
    ACCOUNTS_VERIFY_SHEET_FIND: BASE_PATH + '/erp/accountsVerifySheet/find',
    ACCOUNTS_VERIFY_SHEET_FIND_STATE: BASE_PATH + '/erp/accountsVerifySheet/findAccountsVerifySheetState',
    ACCOUNTS_VERIFY_SHEET_CREATE: BASE_PATH + '/erp/accountsVerifySheet/create',
    ACCOUNTS_VERIFY_SHEET_CREATE_L1REVIEW: BASE_PATH + '/erp/accountsVerifySheet/create_l1Review',
    ACCOUNTS_VERIFY_SHEET_UPDATE: BASE_PATH + '/erp/accountsVerifySheet/update',
    ACCOUNTS_VERIFY_SHEET_UPDATE_L1REVIEW: BASE_PATH + '/erp/accountsVerifySheet/update_l1Review',
    ACCOUNTS_VERIFY_SHEET_DELETE: BASE_PATH + '/erp/accountsVerifySheet/delete_data',
    ACCOUNTS_VERIFY_SHEET_L1REVIEW: BASE_PATH + '/erp/accountsVerifySheet/level1Review',
    ACCOUNTS_VERIFY_SHEET_UNL1REVIEW: BASE_PATH + '/erp/accountsVerifySheet/unLevel1Review',
    ACCOUNTS_VERIFY_SHEET_MX_FIND: BASE_PATH + '/erp/accountsVerifySheetMx/find',


    //报表

    //销售单报表

    //销售单明细表
    SALE_OUTBOUND_MX_REPORT: BASE_PATH + `/erp/report/saleOutboundMxReport`,
    //销售单产品汇总表
    SALE_OUTBOUND_PRODUCT_COLLECT_REPORT: BASE_PATH + `/erp/report/saleOutboundProductSummaryReport`,
    //销售单客户产品汇总表
    SALE_OUTBOUND_CLIENT_PRODUCT_COLLECT_REPORT: BASE_PATH + `/erp/report/saleOutboundClientProductSummaryReport`,

    //采购进仓单报表

    //采购进仓单明细表
    BUY_INBOUND_MX_REPORT: BASE_PATH + `/erp/report/buyInboundMxReport`,
    //采购进仓单产品汇总表
    BUY_INBOUND_PRODUCT_SUM_REPORT: BASE_PATH + `/erp/report/buyInboundSummaryReport`,

    //现金银行存款日记账
    CASH_BANK_DEPOSIT_JOURNAL: BASE_PATH + `/erp/report/cashBankDepositJournalReport`,

    //应收账款报表
    //应收账款明细表
    ACCOUNT_RECEIVABLE_MX_REPORT: BASE_PATH + `/erp/report/accountsReceivableMxReport`,
    //应收账款汇总表
    ACCOUNT_RECEIVABLE_SUM_REPORT: BASE_PATH + `/erp/report/accountsReceivableSumReport`,

    //应付账款报表
    //应付账款明细表
    ACCOUNT_PAYABLE_MX_REPORT: BASE_PATH + `/erp/report/accountPayableMxReport`,

    //应付账款汇总表
    ACCOUNT_PAYABLE_SUM_REPORT: BASE_PATH + `/erp/report/accountPayableSumReport`,

    //进销存月报表
    PSI_MONTH_REPORT: BASE_PATH + `/erp/report/psiMonthReport`,

    //进销存记录相关
    WEIGHTED_AVERAGE_RECORD_CHECK_IF_COUNT_IS_REQUIRED: BASE_PATH + `/erp/weightedAverageRecord/checkIfCountIsRequired`,
    WEIGHTED_AVERAGE_RECORD_COUNT_MX: BASE_PATH + `/erp/weightedAverageRecordMx/countWeightedAverageRecordMx`,
    WEIGHTED_AVERAGE_RECORD_L1REVIEW:BASE_PATH+ `/erp/weightedAverageRecord/l1Review`,
    WEIGHTED_AVERAGE_RECORD_UNL1REVIEW:BASE_PATH+ `/erp/weightedAverageRecord/unl1Review`,

    //销售毛利汇总表
    SALE_GROSS_MARGIN_SUM_REPORT:BASE_PATH+ `/erp/report/saleGrossMarginSum`,
    //销售毛利明细表
    SALE_GROSS_MARGIN_MX_REPORT:BASE_PATH+ `/erp/report/saleGrossMarginMx`
}

export {
    API_URL
}