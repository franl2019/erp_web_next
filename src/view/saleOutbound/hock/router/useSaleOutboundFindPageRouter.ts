import {useRouterPage} from "@/utils";
import router from "@/router";

export function useSaleOutboundFindPageRouter() {

    function routerToCreateOutboundPage() {
        const route = router.resolve({
            name: "newOutbound"
        })
        useRouterPage(route.fullPath, route.meta.title as string);
    }

    function routerToEditOutboundPage(outboundid:number) {
        const route = router.resolve({
            name: "editOutbound", query: {
                outboundid:outboundid
            }
        });
        useRouterPage(route.fullPath, route.meta.title as string);
    }


    return{
        routerToCreateOutboundPage,
        routerToEditOutboundPage
    }
}