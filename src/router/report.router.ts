import {RouteRecordRaw} from "vue-router";

export const reportRouter: Array<RouteRecordRaw> = [
    //采购进仓单报表

    //采购进仓单明细表
    {
        name: "buyInboundMxReport",
        path: "/buyInboundMxReport",
        meta: {
            title: "采购进仓单明细表"
        },
        component: () => import(/* webpackChunkName: "buyInboundMxReport" */ '@/view/report/buyInbound/buyInboundMxReport/buyInboundMxReport.vue'),
    },
    //采购进仓单产品汇总表
    {
        name: "buyInboundProductSumReport",
        path: "/buyInboundProductSumReport",
        meta: {
            title: "采购进仓单产品汇总表"
        },
        component: () => import(/* webpackChunkName: "buyInboundProductSumReport" */ '@/view/report/buyInbound/buyInboundProductSumReport/buyInboundProductSumReport.vue'),
    },

    //销售单报表
    {
        name: "saleOutboundMxReport",
        path: "/saleOutboundMxReport",
        meta: {
            title: "销售单明细表"
        },
        component: () => import(/* webpackChunkName: "saleOutboundMxReport" */ '@/view/report/saleOutbound/saleOutboundMxReport/saleOutboundMxReport.vue'),
    },

    {
        name: "saleOutboundProductSummaryReport",
        path: "/saleOutboundProductSummaryReport",
        meta: {
            title: "销售单产品汇总表"
        },
        component: () => import(/* webpackChunkName: "saleOutboundProductSummaryReport" */ '@/view/report/saleOutbound/saleOutboundProductSummaryReport/saleOutboundProductSummaryReport.vue'),
    },

    {
        name: "saleOutboundClientProductSummaryReport",
        path: "/saleOutboundClientProductSummaryReport",
        meta: {
            title: "销售单客户产品汇总表"
        },
        component: () => import(/* webpackChunkName: "saleOutboundClientProductSummaryReport" */ '@/view/report/saleOutbound/saleOutboundClientProductSummaryReport/saleOutboundClientProductSummaryReport.vue'),
    },

    {
        name: "cashBankDepositJournal",
        path: "/cashBankDepositJournal",
        meta: {
            title: "现金银行日记账"
        },
        component: () => import(/* webpackChunkName: "cashBankDepositJournal" */ '@/view/report/cashBankDepositJournal/cashBankDepositJournalFindView.vue'),
    },
    {
        name: "accountReceivableMxReport",
        path: "/accountReceivableMxReport",
        meta: {
            title: "应收账款明细表"
        },
        component: () => import(/* webpackChunkName: "accountReceivableMxReport" */ '@/view/report/accountsReceivable/accountReceivableMxReport/accountReceivableMxReportView.vue'),
    },
    {
        name: "accountReceivableSumReport",
        path: "/accountReceivableSumReport",
        meta: {
            title: "应收账款汇总表"
        },
        component: () => import(/* webpackChunkName: "accountReceivableSumReport" */ '@/view/report/accountsReceivable/accountReceivableSumReport/accountReceivableSumReportView.vue'),
    },


    {
        name: "accountPayableMxReport",
        path: "/accountPayableMxReport",
        meta: {
            title: "应付账款明细表"
        },
        component: () => import(/* webpackChunkName: "accountPayableMxReport" */ '@/view/report/accountPayable/accountPayableMxReport/accountPayableMxReportView.vue'),
    },
    {
        name: "accountPayableSumReport",
        path: "/accountPayableSumReport",
        meta: {
            title: "应付账款汇总表"
        },
        component: () => import(/* webpackChunkName: "accountPayableSumReport" */ '@/view/report/accountPayable/accountPayableSumReport/accountPayableSumReportView.vue'),
    },

    {
        name: "psiMonthReport",
        path: "/psiMonthReport",
        meta: {
            title: "进销存月报表"
        },
        component: () => import(/* webpackChunkName: "psiMonthReport" */ '@/view/report/psiMonth/psiMonthReportFindView.vue'),
    },

    {
        name: "saleGrossMarginMx",
        path: "/saleGrossMarginMx",
        meta: {
            title: "销售毛利明细表"
        },
        component: () => import(/* webpackChunkName: "saleGrossMarginMx" */ '@/view/report/saleGrossMargin/saleGrossMarginMx/saleGrossMarginMx.vue'),
    },

    {
        name: "saleGrossMarginSum",
        path: "/saleGrossMarginSum",
        meta: {
            title: "销售毛利汇总表"
        },
        component: () => import(/* webpackChunkName: "saleGrossMarginSum" */ '@/view/report/saleGrossMargin/saleGrossMarginSum/saleGrossMarginSum.vue'),
    }
]