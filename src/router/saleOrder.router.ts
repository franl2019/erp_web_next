import {RouteRecordRaw} from "vue-router";
import saleOrderEditView from '@/view/saleOrder/saleOrderEditView.vue'
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
        component:saleOrderEditView,
        props: true
    }, {
        name: "editSaleOrder",
        path: "/editSaleOrder",
        meta: {
            title: "编辑销售订单"
        },
        component:saleOrderEditView,
        props: true
    },
]