import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {BuyInboundMxCreateInTableDto} from "@/module/buyInbound/dto/inboundMx/buyInboundMxCreateInTable.dto";

export function buyInboundSelectProductValueSetter(params: ValueSetterParams) {

    if (params.newValue && params.newValue.productid !== 0) {
        BuyInboundMxCreateInTableDto.useFormatProductToInboundMx(
            params.newValue, params.data
        );
        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}