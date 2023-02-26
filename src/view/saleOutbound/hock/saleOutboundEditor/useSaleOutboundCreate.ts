import {useSaleOutboundEditorPageRouter} from "@/view/saleOutbound/hock/router/useSaleOutboundEditorPageRouter";
import {SaleOutboundService} from "@/module/saleOutbound/service/saleOutbound.service";
import {Ref} from "vue";
import {ITableRef} from "@/components/table/type";

export function useSaleOutboundCreate(
    saleOutboundEditTableRef:Ref<ITableRef | undefined>
) {

    const saleOutboundService = new SaleOutboundService();


    const {
        routeToSaleOutboundFindPage,
        routeToSaleOutboundEditPage
    } = useSaleOutboundEditorPageRouter();

    function f() {

    }

    return{

    }

}