import {RouteRecordRaw} from "vue-router";

export const saleOrderRouter: Array<RouteRecordRaw> = [
    {
        name: "saleOrder",
        path: "/saleOrder",
        meta: {
            title: "销售订单"
        },
        component: () => import(/* webpackChunkName: "saleOrder" */ '@/view/saleOrder/saleOrderFindView.vue'),
    },
    {
        name: "newSaleOrder",
        path: "/newSaleOrder",
        meta: {
            title: "新增销售订单"
        },
        component: () => import(/* webpackChunkName: "newSaleOrder" */ '@/view/saleOrder/saleOrderEditView.vue'),
        props: true
    }, {
        name: "editSaleOrder",
        path: "/editSaleOrder",
        meta: {
            title: "编辑销售订单"
        },
        component: () => import(/* webpackChunkName: "editSaleOrder" */ '@/view/saleOrder/saleOrderEditView.vue'),
        props: true
    },

]