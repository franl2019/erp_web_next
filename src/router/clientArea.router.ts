import {RouteRecordRaw} from "vue-router";

export const clientAreaRouter:Array<RouteRecordRaw> = [
    {
        name: "clientArea",
        path: "/clientArea",
        meta:{
            title:"客户地区管理"
        },
        component: () => import(/* webpackChunkName: "clientArea" */ '@/view/clientArea/clientArea.vue')
    },
]