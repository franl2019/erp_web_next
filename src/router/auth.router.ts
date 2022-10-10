import {RouteRecordRaw} from "vue-router";

export const authRouter: Array<RouteRecordRaw> = [
    {
        name: "auth",
        meta: {
            title: "权限管理"
        },
        path: "/auth",
        component: () => import(/* webpackChunkName: "auth" */ '@/view/auth/auth.vue'),
        children: [
            {
                name: "user_warehouse_mx",
                path: "/user_warehouse_mx",
                component: () => import(/* webpackChunkName: "user_warehouse_mx" */ '@/view/auth/user_warehouse_mx/user_warehouse_mx.vue')
            },
            {
                name: "user_client_operatearea_mx",
                path: "/user_client_operatearea_mx",
                component: () => import(/* webpackChunkName: "user_client_operatearea_mx" */ '@/view/auth/user_operatearea_mx/client/user_client_operatearea_mx.vue'),
            },
            {
                name: "user_buy_operatearea_mx",
                path: "/user_buy_operatearea_mx",
                component: () => import(/* webpackChunkName: "user_buy_operatearea_mx" */ '@/view/auth/user_operatearea_mx/buy/user_buy_operatearea_mx.vue'),
            },
            {
                name: "user_account_mx",
                path: "/user_account_mx",
                component: () => import(/* webpackChunkName: "user_account_mx" */ '@/view/auth/user_account_mx/user_account_mx.vue'),
            }
        ],
    },
    {
        name: "role",
        meta: {
            title: "用户角色管理"
        },
        path: "/role", component: () => import(/* webpackChunkName: "role" */"@/view/role/role.vue")
    }
]