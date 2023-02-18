import {tabMenu} from "@/components/router_tab/useRouterTab";
import router from "@/router";
import {useRouterPage} from "@/utils";
import {useRoute} from "vue-router";

export function useSaleOrderRoute() {

    //路由参数
    const route = useRoute();

    function routeToFindSaleOrderPage() {
        tabMenu.closeTab(route.fullPath)
        const newRoute = router.resolve({
            name: "saleOrder"
        });
        useRouterPage(newRoute.fullPath, route.meta.title as string);
    }

    function routeToNewSaleOrderPage() {
        const route = router.resolve({
            name: "newSaleOrder"
        })
        useRouterPage(route.fullPath, route.meta.title as string)
    }

    function routeToEditSaleOrderPage(saleOrderId: number, option: {
        closeTab: boolean
    } = {closeTab: true}) {
        if (option.closeTab) tabMenu.closeTab(route.fullPath)
        const newRoute = router.resolve({
            name: "editSaleOrder", query: {
                saleOrderId
            }
        });
        useRouterPage(newRoute.fullPath, `${saleOrderId}`);
    }


    return {
        routeToFindSaleOrderPage,
        routeToNewSaleOrderPage,
        routeToEditSaleOrderPage,
    }

}