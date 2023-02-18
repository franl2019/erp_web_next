import {RouteRecordRaw} from "vue-router";

export const saleOutboundRouter: Array<RouteRecordRaw> = [
    {
        name: "saleOutbound",
        path: "/saleOutbound",
        meta: {
            title: "销售单"
        },
        component: () => import(/* webpackChunkName: "saleOutbound" */ '@/view/saleOutbound/SaleOutboundFindView.vue'),
    },
    {
        name: "newOutbound",
        path: "/newOutbound",
        meta: {
            title: "新增销售单"
        },
        component: () => import(/* webpackChunkName: "newOutbound" */ '@/view/saleOutbound/SaleOutboundEditView.vue'),
        props: true
    },
    {
        name: "editOutbound",
        path: "/editOutbound",
        meta: {
            title: "修改销售单"
        },
        component: () => import(/* webpackChunkName: "editOutbound" */ '@/view/saleOutbound/SaleOutboundEditView.vue'),
        props: true
    }, {
        name: "saleOutboundPrint",
        path: "/saleOutboundPrintView",
        meta: {
            title: "打印销售单"
        },
        component: () => import(/* webpackChunkName: "SaleOutboundPrintView" */ '@/view/saleOutbound/SaleOutboundPrintView.vue')
    },
]