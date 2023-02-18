import {RouteRecordRaw} from "vue-router";

export const moneyModuleRouter: Array<RouteRecordRaw> = [
    {
        name: "account",
        path: "/account",
        meta: {
            title: "出纳账号管理"
        }, component: () => import(/* webpackChunkName: "account" */ '@/view/account/accountFindView.vue'),
    },
    {
        name: "currency",
        path: "/currency", meta: {
            title: "币种管理"
        }, component: () => import(/* webpackChunkName: "currency" */ '@/view/currency/currencyFindView.vue'),
    },
    {
        name: "accountInComeFind",
        path: "/accountInComeFind",
        meta: {
            title: "销售收款单"
        },
        component: () => import(/* webpackChunkName: "accountInComeFind" */ '@/view/accountInCome/accountInComeFind.vue'),
    },
    {
        name: "accountInComeCreate",
        path: "/accountInComeCreate",
        meta: {
            title: "新增销售收款单"
        },
        component: () => import(/* webpackChunkName: "accountInComeCreate" */ '@/view/accountInCome/accountInComeEdit.vue'),
    },
    {
        name: "accountInComeEdit",
        path: "/accountInComeEdit",
        meta: {
            title: "修改销售收款单"
        },
        component: () => import(/* webpackChunkName: "accountInComeEdit" */ '@/view/accountInCome/accountInComeEdit.vue'),
    },


    {
        name: "accountExpenditureFind",
        path: "/accountExpenditureFind",
        meta: {
            title: "采购付款单"
        },
        component: () => import(/* webpackChunkName: "accountExpenditureFind" */ '@/view/accountExpenditure/accountExpenditureFind.vue'),
    },
    {
        name: "accountExpenditureCreate",
        path: "/accountExpenditureCreate",
        meta: {
            title: "新增采购付款单"
        },
        component: () => import(/* webpackChunkName: "accountExpenditureCreate" */ '@/view/accountExpenditure/accountExpenditureEdit.vue'),
    },
    {
        name: "accountExpenditureEdit",
        path: "/accountExpenditureEdit",
        meta: {
            title: "修改采购付款单"
        },
        component: () => import(/* webpackChunkName: "accountExpenditureEdit" */ '@/view/accountExpenditure/accountExpenditureEdit.vue'),
    },


    {
        name: "accountsVerifySheetFind",
        path: "/accountsVerifySheetFind",
        meta: {
            title: "核销单"
        },
        component: () => import(/* webpackChunkName: "accountsVerifySheetFind" */ '@/view/accountsVerifySheet/accountsVerifySheetFindView.vue'),
    },
    {
        name: "accountsVerifySheetCreate",
        path: "/accountsVerifySheetCreate",
        meta: {
            title: "新增核销单"
        },
        component: () => import(/* webpackChunkName: "accountsVerifySheetCreate" */ '@/view/accountsVerifySheet/accountsVerifySheetEditView.vue'),
    },
    {
        name: "accountsVerifySheetEdit",
        path: "/accountsVerifySheetEdit",
        meta: {
            title: "修改核销单"
        },
        component: () => import(/* webpackChunkName: "accountsVerifySheetEdit" */ '@/view/accountsVerifySheet/accountsVerifySheetEditView.vue'),
    },
]