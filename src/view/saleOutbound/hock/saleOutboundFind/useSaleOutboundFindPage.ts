import {Ref} from "vue";
import {SaleOutboundFindDto} from "@/module/saleOutbound/dto/outbound/saleOutboundFindDto";
import {ITableRef} from "@/components/table/type";
import {SaleOutboundMxService} from "@/module/saleOutbound/service/saleOutboundMx.service";
import {SaleOutboundService} from "@/module/saleOutbound/service/saleOutbound.service";
import {useOutboundFindPage} from "@/view/saleOutbound/hock/saleOutboundFind/useOutboundFindPage";

export function useSaleOutboundFindPage(
    //销售单头表格ref
    saleOutboundTableRef: Ref<ITableRef | undefined>,
    //销售明细表格ref
    saleOutboundMxTableRef: Ref<ITableRef | undefined>,
) {

   const {
       buttonState,
       outboundFindDto:saleOutboundFindDto,
       onClickCreate,
       onClickEdit,
       onClickL1Review,
       onClickUnL1Review,
       onClickL2Review,
       onClickUnL2Review,
       onClickDelete,
       onClickOutboundRow:onClickSaleOutboundRow,
       onRefresh
   } = useOutboundFindPage(
       saleOutboundTableRef,
       saleOutboundMxTableRef,
       SaleOutboundService,
       SaleOutboundMxService,
       SaleOutboundFindDto
   )

    return {
        buttonState,
        saleOutboundFindDto,
        onClickCreate,
        onClickEdit,
        onClickL1Review,
        onClickUnL1Review,
        onClickL2Review,
        onClickUnL2Review,
        onClickDelete,
        onClickSaleOutboundRow,
        onRefresh
    }
}