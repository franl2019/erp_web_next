import {RouteRecordRaw} from "vue-router";

export const clientRouter:Array<RouteRecordRaw> = [
    {
        name: "client",
        path: "/client",
        meta:{
            title:"客户管理"
        },
        component: () => import(/* webpackChunkName: "client" */ '@/view/client/client.vue')
    },
]