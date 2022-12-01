import {RouteRecordRaw} from "vue-router";

export const permissionsTheme: Array<RouteRecordRaw> = [
    {
        name: 'permissionsTheme',
        path: '/permissionsTheme',
        meta: {
            title: "权限类别管理"
        },
        component: () => import(/* webpackChunkName: "permissionsTheme" */ '@/view/permissionsTheme/permissionsTheme.vue')
    },
    {
        name: 'permissions',
        path: '/permissions',
        meta: {
            title: "权限资料管理"
        },
        component: () => import(/* webpackChunkName: "permissions" */ '@/view/permissions/permissions.vue')
    },
    {
        name: 'rolePermissions',
        path: '/rolePermissions',
        meta:{
            title: "角色权限明细管理"
        },
        component: ()=> import(/* webpackChunkName: "rolePermissions" */ '@/view/rolePermissionsMx/rolePermissionsMx.vue')
    },
    {
        name: 'userRoleMx',
        path: '/userRoleMx',
        meta:{
            title: "角色管理"
        },
        component: ()=> import(/* webpackChunkName: "userRoleMx" */ '@/view/auth/userRoleMx/userRoleMx.vue')
    }
]