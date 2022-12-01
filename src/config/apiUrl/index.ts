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
import {OperateAreaApiUrl} from "@/config/apiUrl/operateArea";
import {CurrencyUrlApi} from "@/config/apiUrl/currency";
import {TableConfigApiUrl} from "@/config/apiUrl/tableConfig";
import {SaleOutboundApiUrl} from "@/config/apiUrl/saleOutbound";
import {ProductInbound} from "@/config/apiUrl/productInbound";
import {BuyInboundApiUrl} from "@/config/apiUrl/buyInbound";
import {BuyPayUrlApi} from "@/config/apiUrl/buyPay";
import {AccountInComeApiUrl} from "@/config/apiUrl/accountInCome";
import {AccountExpenditureApiUrl} from "@/config/apiUrl/accountExpenditure";
import {AccountVerifySheetApiUrl} from "@/config/apiUrl/accountVerifySheet";
import {ReportApiUrl} from "@/config/apiUrl/report";
import {AccountApiUrl} from "@/config/apiUrl/account";
import {InventoryApiUrl} from "@/config/apiUrl/inventory";
import {UserWarehouseMxApiUrl} from "@/config/apiUrl/userWarehouseMx";
import {UserAccountMxApiUrl} from "@/config/apiUrl/userAccountMx";
import {UserOperateareaMxApiUrl} from "@/config/apiUrl/userOperateareaMx";
import {PermissionsApiUrl} from "@/config/apiUrl/permissions";
import {UserRoleMxUrl} from "@/config/apiUrl/userRoleMx";

//引用到了utils/axios
export const API_URL = {
    //productionInbound
    INBOUND_FIND_MX: '/erp/inboundmx/select',
    //saleOutbound
    OUTBOUND_FIND_MX: '/erp/outbound_mx/find',
    //应付账款
    ACCOUNT_PAYABLE_FIND: '/erp/accountsPayable/find',
    //应收账款
    ACCOUNT_RECEIVABLE_FIND: '/erp/accountsReceivable/find',

    ...RoleApiUrl,
    ...AuthApiUrl,
    ...AccountApiUrl,
    ...AccountInComeApiUrl,
    ...AccountExpenditureApiUrl,
    ...AccountVerifySheetApiUrl,
    ...BuyApiUrl,
    ...BuyAreaApiUrl,
    ...BuyInboundApiUrl,
    ...BuyPayUrlApi,
    ...ClientAreaApiUrl,
    ...ClientApiUrl,
    ...ProductInbound,
    ...ProductApiUrl,
    ...ProductAreaApiUrl,
    ...ProductOtherUnitApiUrl,
    ...WarehouseApiUrl,
    ...OperateAreaApiUrl,
    ...CurrencyUrlApi,
    ...TableConfigApiUrl,
    ...SaleOutboundApiUrl,
    ...InventoryApiUrl,
    ...UserApiUrl,
    ...UserOperateareaMxApiUrl,
    ...UserWarehouseMxApiUrl,
    ...UserAccountMxApiUrl,
    ...UserRoleMxUrl,
    ...ReportApiUrl,
    ...PermissionsApiUrl,

}

export const BASE_PATH = '/api';
