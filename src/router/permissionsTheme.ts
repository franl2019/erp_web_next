import {RouteRecordRaw} from "vue-router";

export const permissionsTheme: Array<RouteRecordRaw> = [
    {
        name: 'permissionsTheme',
        path: '/permissionsTheme',
        meta: {
            title: "权限主题管理"
        },
        component: () => import(/* webpackChunkName: "permissionsTheme" */ '@/view/permissionsTheme/permissionsTheme.vue')
    }
]