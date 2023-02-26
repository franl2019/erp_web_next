import {tabMenu} from "@/components/router_tab/useRouterTab";
import {useRouterPage} from "@/utils";
import router from "@/router";
import {useRoute} from "vue-router";

export function useSaleOutboundEditorPageRouter() {

    const route = useRoute();

    function routeToSaleOutboundFindPage() {
        tabMenu.closeTab(route.fullPath)
        const newRoute = router.resolve({
            name: "saleOutbound"
        });
        useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
    }

    function routeToSaleOutboundEditPage(outboundcode:string) {
        tabMenu.closeTab(route.fullPath)
        const newRoute = router.resolve({
            name: "editOutbound", query: {
                outboundcode: outboundcode
            }
        });
        useRouterPage(newRoute.fullPath, outboundcode);
    }

    return {
        routeToSaleOutboundFindPage,
        routeToSaleOutboundEditPage
    }
}