import {RouteRecordRaw} from "vue-router";

export const productionInboundRouter: Array<RouteRecordRaw> = [
    {
        name: "ProductionInbound",
        path: "/productionInbound",
        meta: {
            title: "生产进仓单"
        },
        component: () => import(/* webpackChunkName: "productionInbound" */ '@/view/productionInbound/ProductionInboundFind.vue'),
    }, {
        name: "editInboundProduction",
        path: "/editInboundProduction",
        meta: {
            title: "新增/修改生产进仓单"
        },
        component: () => import(/* webpackChunkName: "editInboundProduction" */ '@/view/productionInbound/ProductionInboundEdit.vue'),
        props: true
    }
]