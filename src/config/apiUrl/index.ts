import {RoleApiUrl} from "@/config/apiUrl/role";
import {AuthApiUrl} from "@/config/apiUrl/auth";
import {UserApiUrl} from "@/config/apiUrl/user";
import {ClientAreaApiUrl} from "@/config/apiUrl/clientArea";
import {ClientApiUrl} from "@/config/apiUrl/client";
import {BuyApiUrl} from "@/config/apiUrl/buy";
import {BuyAreaApiUrl} from "@/config/apiUrl/buyArea";
import {ProductApiUrl} from "@/config/apiUrl/product";
import {ProductOtherUnitApiUrl} from "@/config/apiUrl/productOtherUnit";
import {ProductAreaApiUrl} from "@/config/apiUrl/productArea";
import {WarehouseApiUrl} from "@/config/apiUrl/warehouse";
import {OperateArea} from "@/config/apiUrl/operateArea";
import {Currency} from "@/config/apiUrl/currency";
import {TableConfigApiUrl} from "@/config/apiUrl/tableConfig";

//引用到了utils/axios
export const API_URL = {
    ...RoleApiUrl,
    ...AuthApiUrl,
    ...UserApiUrl,
    ...ClientAreaApiUrl,
    ...ClientApiUrl,
    ...BuyApiUrl,
    ...BuyAreaApiUrl,
    ...ProductApiUrl,
    ...ProductAreaApiUrl,
    ...ProductOtherUnitApiUrl,
    ...WarehouseApiUrl,
    ...OperateArea,
    ...Currency,
    ...TableConfigApiUrl,
    //Inventory
    INVENTORY_SELECT: '/erp/inventory/select',
    INVENTORY_ADD: '/erp/inventory/add',
    INVENTORY_UPDATE: '/erp/inventory/update',
    INVENTORY_DELETE: '/erp/inventory/delete',

    //user_warehouse_mx
    USER_WAREHOUSE_MX_FIND: '/erp/user_warehouse_mx/select',
    USER_WAREHOUSE_MX_FIND_INFO: '/erp/user_warehouse_mx/findInfo',
    USER_WAREHOUSE_MX_ADD: '/erp/user_warehouse_mx/add',
    USER_WAREHOUSE_MX_DELETE: '/erp/user_warehouse_mx/delete',

    //user_operatearea_mx 操作区域权限明细
    USER_OPERATEAREA_MX_FIND: '/erp/user_operatearea_mx/select',
    USER_OPERATEAREA_MX_FIND_INFO: '/erp/user_operatearea_mx/findInfo',
    USER_OPERATEAREA_MX_DEFAULT: '/erp/user_operatearea_mx/findDefaultUserOperateArea',
    USER_OPERATEAREA_MX_ADD: '/erp/user_operatearea_mx/add',
    USER_OPERATEAREA_MX_DELETE: '/erp/user_operatearea_mx/delete',

    //user_account_mx 出纳账户权限明细
    USER_ACCOUNT_MX_FIND: 'erp/user_account_mx/find',
    USER_ACCOUNT_MX_CREATE: 'erp/user_account_mx/create',
    USER_ACCOUNT_MX_DELETE: 'erp/user_account_mx/delete_data',
    //productionInbound
    INBOUND_FIND_MX: '/erp/inboundmx/select',

    //production_inbound
    INBOUND_PRODUCTION_FIND: '/erp/production_inbound/select',
    INBOUND_PRODUCTION_CREATE: '/erp/production_inbound/add',
    INBOUND_PRODUCTION_UPDATE: '/erp/production_inbound/update',
    INBOUND_PRODUCTION_LEVEL1REVIEW: '/erp/production_inbound/level1Review',
    INBOUND_PRODUCTION_UN_LEVEL1REVIEW: '/erp/production_inbound/unLevel1Review',
    INBOUND_PRODUCTION_DELETE: '/erp/production_inbound/delete',
    INBOUND_PRODUCTION_FIND_MX: '/erp/inboundmx/select',

    //saleOutbound
    OUTBOUND_FIND_MX: '/erp/outbound_mx/find',

    //sale_outbound
    SALE_OUTBOUND_FIND: '/erp/saleOutbound/find',
    SALE_OUTBOUND_FIND_SHEET_STATE: '/erp/saleOutbound/findSheetState',
    SALE_OUTBOUND_CREATE: '/erp/saleOutbound/create',
    SALE_OUTBOUND_CREATE_L1REVIEW: '/erp/saleOutbound/create_l1Review',
    SALE_OUTBOUND_UPDATE: '/erp/saleOutbound/update',
    SALE_OUTBOUND_UPDATE_L1REVIEW: '/erp/saleOutbound/updateAndL1Review',
    SALE_OUTBOUND_DELETE: '/erp/saleOutbound/delete_data',
    SALE_OUTBOUND_UN_DELETE: '/erp/saleOutbound/undelete_data',
    SALE_OUTBOUND_L1REVIEW: '/erp/saleOutbound/l1Review',
    SALE_OUTBOUND_UN_L1REVIEW: '/erp/saleOutbound/unL1Review',
    SALE_OUTBOUND_L2REVIEW: '/erp/saleOutbound/l2Review',
    SALE_OUTBOUND_UN_L2REVIEW: '/erp/saleOutbound/unL2Review',

    //buyInbound 采购进仓
    BUY_INBOUND_FIND: '/erp/buyInbound/find',
    BUY_INBOUND_FIND_SHEET_COMPLETE_STATE: '/erp/buyInbound/findSheetCompleteState',
    BUY_INBOUND_CREATE: '/erp/buyInbound/create',
    BUY_INBOUND_CREATE_L1REVIEW: '/erp/buyInbound/create_l1Review',
    BUY_INBOUND_UPDATE: '/erp/buyInbound/update',
    BUY_INBOUND_UPDATE_L1REVIEW: '/erp/buyInbound/update_l1Review',
    BUY_INBOUND_DELETE: '/erp/buyInbound/delete',
    BUY_INBOUND_UN_DELETE: '/erp/buyInbound/unDelete',
    BUY_INBOUND_L1REVIEW: '/erp/buyInbound/level1Review',
    BUY_INBOUND_UN_L1REVIEW: '/erp/buyInbound/unLevel1Review',
    BUY_INBOUND_L2REVIEW: '/erp/buyInbound/level2Review',
    BUY_INBOUND_UN_L2REVIEW: '/erp/buyInbound/unLevel2Review',


    //buyPay 采购付款单
    BUY_PAY_FIND: '/erp/buyPay/find',
    BUY_PAY_MX_FIND: '/erp/buyPayMx/find',
    BUY_PAY_CREATE: '/erp/buyPay/create',
    BUY_PAY_UPDATE: '/erp/buyPay/update',
    BUY_PAY_DELETE: '/erp/buyPay/delete_data',

    //应付账款
    ACCOUNT_PAYABLE_FIND: '/erp/accountsPayable/find',

    //应收账款
    ACCOUNT_RECEIVABLE_FIND: '/erp/accountsReceivable/find',
    //出纳账户
    ACCOUNT_FIND: '/erp/account/find',
    ACCOUNT_AUTH_FIND: '/erp/account/findAccountAuth',
    ACCOUNT_CREATE: '/erp/account/create',
    ACCOUNT_UPDATE: '/erp/account/update',
    ACCOUNT_DELETE: '/erp/account/delete_data',

    //出纳收支明细

    //出纳收入单
    ACCOUNT_INCOME_FIND: '/erp/accountInCome/find',
    ACCOUNT_INCOME_FIND_SHEET_STATE: '/erp/accountInCome/findSheetState',
    ACCOUNT_INCOME_AMOUNT_MX_FIND: '/erp/accountInComeAmountMx/find',
    ACCOUNT_INCOME_SHEET_MX_FIND: '/erp/accountInComeSheetMx/find',
    ACCOUNT_INCOME_CREATE: '/erp/accountInCome/create',
    ACCOUNT_INCOME_CREATE_L1REVIEW: '/erp/accountInCome/create_l1Review',
    ACCOUNT_INCOME_UPDATE: '/erp/accountInCome/update',
    ACCOUNT_INCOME_UPDATE_L1REVIEW: '/erp/accountInCome/update_l1Review',
    ACCOUNT_INCOME_DELETE: '/erp/accountInCome/delete_data',
    ACCOUNT_INCOME_L1REVIEW: '/erp/accountInCome/level1Review',
    ACCOUNT_INCOME_UN_L1REVIEW: '/erp/accountInCome/unLevel1Review',

    //支出单
    ACCOUNT_EXPENDITURE_FIND: '/erp/accountExpenditure/find',
    ACCOUNT_EXPENDITURE_FIND_STATE: '/erp/accountExpenditure/findAccountExpenditureState',
    ACCOUNT_EXPENDITURE_CREATE: '/erp/accountExpenditure/create',
    ACCOUNT_EXPENDITURE_CREATE_L1REVIEW: '/erp/accountExpenditure/create_l1Review',
    ACCOUNT_EXPENDITURE_UPDATE: '/erp/accountExpenditure/update',
    ACCOUNT_EXPENDITURE_UPDATE_L1REVIEW: '/erp/accountExpenditure/update_l1Review',
    ACCOUNT_EXPENDITURE_DELETE: '/erp/accountExpenditure/deleteById',
    ACCOUNT_EXPENDITURE_L1REVIEW: '/erp/accountExpenditure/level1Review',
    ACCOUNT_EXPENDITURE_UN_L1REVIEW: '/erp/accountExpenditure/unLevel1Review',
    //支出单收款明细
    ACCOUNT_EXPENDITURE_AMOUNT_MX_FIND: '/erp/accountExpenditureAmountMx/find',
    //支出单核销明细
    ACCOUNT_EXPENDITURE_SHEET_MX_FIND: '/erp/accountExpenditureSheetMx/find',


    //核销单
    ACCOUNTS_VERIFY_SHEET_FIND: '/erp/accountsVerifySheet/find',
    ACCOUNTS_VERIFY_SHEET_FIND_STATE: '/erp/accountsVerifySheet/findAccountsVerifySheetState',
    ACCOUNTS_VERIFY_SHEET_CREATE: '/erp/accountsVerifySheet/create',
    ACCOUNTS_VERIFY_SHEET_CREATE_L1REVIEW: '/erp/accountsVerifySheet/create_l1Review',
    ACCOUNTS_VERIFY_SHEET_UPDATE: '/erp/accountsVerifySheet/update',
    ACCOUNTS_VERIFY_SHEET_UPDATE_L1REVIEW: '/erp/accountsVerifySheet/update_l1Review',
    ACCOUNTS_VERIFY_SHEET_DELETE: '/erp/accountsVerifySheet/delete_data',
    ACCOUNTS_VERIFY_SHEET_L1REVIEW: '/erp/accountsVerifySheet/level1Review',
    ACCOUNTS_VERIFY_SHEET_UNL1REVIEW: '/erp/accountsVerifySheet/unLevel1Review',
    ACCOUNTS_VERIFY_SHEET_MX_FIND: '/erp/accountsVerifySheetMx/find',


    //报表

    //销售单报表

    //销售单明细表
    SALE_OUTBOUND_MX_REPORT: `/erp/report/saleOutboundMxReport`,
    //销售单产品汇总表
    SALE_OUTBOUND_PRODUCT_COLLECT_REPORT: `/erp/report/saleOutboundProductSummaryReport`,
    //销售单客户产品汇总表
    SALE_OUTBOUND_CLIENT_PRODUCT_COLLECT_REPORT: `/erp/report/saleOutboundClientProductSummaryReport`,

    //采购进仓单报表

    //采购进仓单明细表
    BUY_INBOUND_MX_REPORT: `/erp/report/buyInboundMxReport`,
    //采购进仓单产品汇总表
    BUY_INBOUND_PRODUCT_SUM_REPORT: `/erp/report/buyInboundSummaryReport`,

    //现金银行存款日记账
    CASH_BANK_DEPOSIT_JOURNAL: `/erp/report/cashBankDepositJournalReport`,

    //应收账款报表
    //应收账款明细表
    ACCOUNT_RECEIVABLE_MX_REPORT: `/erp/report/accountsReceivableMxReport`,
    //应收账款汇总表
    ACCOUNT_RECEIVABLE_SUM_REPORT: `/erp/report/accountsReceivableSumReport`,

    //应付账款报表
    //应付账款明细表
    ACCOUNT_PAYABLE_MX_REPORT: `/erp/report/accountPayableMxReport`,

    //应付账款汇总表
    ACCOUNT_PAYABLE_SUM_REPORT: `/erp/report/accountPayableSumReport`,

    //进销存月报表
    PSI_MONTH_REPORT: `/erp/report/psiMonthReport`,

    //进销存记录相关
    WEIGHTED_AVERAGE_RECORD_CHECK_IF_COUNT_IS_REQUIRED: `/erp/weightedAverageRecord/checkIfCountIsRequired`,
    WEIGHTED_AVERAGE_RECORD_COUNT_MX: `/erp/weightedAverageRecordMx/countWeightedAverageRecordMx`,
    WEIGHTED_AVERAGE_RECORD_L1REVIEW:`/erp/weightedAverageRecord/l1Review`,
    WEIGHTED_AVERAGE_RECORD_UNL1REVIEW:`/erp/weightedAverageRecord/unl1Review`,

    //销售毛利汇总表
    SALE_GROSS_MARGIN_SUM_REPORT:`/erp/report/saleGrossMarginSum`,
    //销售毛利明细表
    SALE_GROSS_MARGIN_MX_REPORT:`/erp/report/saleGrossMarginMx`
}

export const BASE_PATH = '/api';
