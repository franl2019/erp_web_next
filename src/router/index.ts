import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Login from "../view/login.vue";
import {clientRouter} from "@/router/client.router";
import {clientAreaRouter} from "@/router/clientArea.router";
import {authRouter} from "@/router/auth.router";
import {buyInboundRouter} from "@/router/buyInbound.router";
import {productionInboundRouter} from "@/router/productionInbound.router";
import {outboundRouter} from "@/router/outbound.router";
import {moneyModuleRouter} from "@/router/moneyModuleRouter";
import {reportRouter} from "@/router/report.router";
import {valueName} from "@/config/valueName";
import {tabMenu} from "@/components/router_tab/useRouterTab";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        meta: {
            title: "登录页"
        },
        component: Login
    },
    {
        name: "login",
        path: "/login",
        meta: {
            title: "登录页"
        },
        component: Login
    },
    {
        name: 'test',
        path: "/test", meta: {
            title: "测试页"
        }, component: () => import(/* webpackChunkName: "test" */ '@/view/test/test.vue')
    },
    {
        name: 'home',
        path: "/home",
        component: () => import(/* webpackChunkName: "home" */ '../view/web_home.vue'),
        meta: {
            title: "ERP企业管理软件"
        },
        children: [
            {
                name: 'controlHome',
                path: "/controlHome", meta: {
                    title: "首页"
                }, component: () => import(/* webpackChunkName: "controlHome" */ '@/view/home/controlHome.vue')
            },
            {
                name: 'saleHome',
                path: "/saleHome", meta: {
                    title: "销售管理"
                }, component: () => import(/* webpackChunkName: "saleHome" */ '@/view/home/saleHome.vue')
            },
            {
                name: 'buyHome',
                path: "/buyHome", meta: {
                    title: "采购管理"
                }, component: () => import(/* webpackChunkName: "buyHome" */ '@/view/home/buyHome.vue')
            },
            {
                name: 'moneyHome',
                path: "/moneyHome", meta: {
                    title: "资金管理"
                }, component: () => import(/* webpackChunkName: "moneyHome" */ '@/view/home/moneyHome.vue')
            },
            {
                name: 'baseInfoHome',
                path: "/baseInfoHome", meta: {
                    title: "基础资料管理"
                }, component: () => import(/* webpackChunkName: "baseInfoHome" */ '@/view/home/baseInfoHome.vue')
            },
            {
                name: 'warehouseHome',
                path: "/warehouseHome", meta: {
                    title: "仓库管理"
                }, component: () => import(/* webpackChunkName: "warehouseHome" */ '@/view/home/warehouseHome.vue')
            },
            {
                name: 'systemHome',
                path: "/systemHome", meta: {
                    title: "系统设置"
                }, component: () => import(/* webpackChunkName: "systemHome" */ '@/view/home/systemHome.vue')
            },
            ...clientAreaRouter,
            ...clientRouter,
            {
                name: 'buyArea',
                path: "/buyArea",
                meta: {
                    title: "供应商地区管理"
                },
                component: () => import(/* webpackChunkName: "buyArea" */ '@/view/buyArea/buyArea.vue')
            },
            {
                name: 'buy', meta: {
                    title: "供应商管理"
                }, path: "/buy", component: () => import(/* webpackChunkName: "buy" */ '@/view/buy/buy.vue')
            },
            {
                name: 'product',
                path: "/product",
                meta: {
                    title: `${valueName.product}查询`
                },
                component: () => import(/* webpackChunkName: "product" */ '@/view/product/product.vue')
            },
            {
                name: "productArea",
                path: "/productArea",
                meta: {
                    title: `${valueName.product}类别管理`
                },
                component: () => import(/* webpackChunkName: "productArea" */ '@/view/productArea/productArea.vue')
            },
            {
                name: "warehouse",
                path: "/warehouse",
                meta: {
                    title: "仓库管理"
                },
                component: () => import(/* webpackChunkName: "warehouse" */ '@/view/warehouse/warehouse.vue')
            },
            {
                name: "productOtherUnit",
                path: "/productOtherUnit",
                meta: {
                    title: "辅助单位管理"
                },
                component: () => import(/* webpackChunkName: "productOtherUnit" */ '@/view/productOtherUnit/productOtherUnit.vue')
            },
            ...authRouter,
            ...buyInboundRouter,
            ...productionInboundRouter,
            {
                name: "inventory",
                path: "/inventory", meta: {
                    title: "库存管理"
                },
                component: () => import(/* webpackChunkName: "inventory" */ '@/view/inventory/inventory.vue'),
            },
            ...outboundRouter,
            //资金管理
            ...moneyModuleRouter,
            ...reportRouter
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.afterEach(to => {
    const title = String(to.meta.title) || ""
    if (to.fullPath !== "/"
        && to.fullPath !== "/user_warehouse_mx"
        && to.fullPath !== "/user_client_operatearea_mx"
        && to.fullPath !== "/user_buy_operatearea_mx"
        && to.fullPath !== "/user_account_mx"
    ) {
        tabMenu.addTab({
            key: to.fullPath,
            activation: false,
            showCloseButton: true,
            title
        })
    }
})

export default router
