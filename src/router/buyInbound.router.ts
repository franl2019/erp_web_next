import {RouteRecordRaw} from "vue-router";

export const buyInboundRouter:Array<RouteRecordRaw> = [
    {
        name: "buyInbound",
        path: "/buyInbound",
        meta:{
            title:"采购进仓单"
        },
        component: () => import(/* webpackChunkName: "buyInbound" */ '@/view/buyInbound/BuyInboundFindView.vue'),
    },
    {
        name: "createBuyInbound",
        path: "/createBuyInbound",
        meta:{
            title:"新增采购进仓单"
        },
        component: () => import(/* webpackChunkName: "createBuyInbound" */ '@/view/buyInbound/BuyInboundEditView.vue'),
    },
    {
        name: "editBuyInbound",
        path: "/editBuyInbound",
        meta:{
            title:"修改采购进仓单"
        },
        component: () => import(/* webpackChunkName: "editBuyInbound" */ '@/view/buyInbound/BuyInboundEditView.vue'),
    }
]