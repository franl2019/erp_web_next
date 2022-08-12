import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {useFormatProductToInboundMx} from "@/module/buyInbound/utils/useFormatProductToInboundMx";

export function buyInboundSelectProductValueSetter(params: ValueSetterParams) {
    //判断是否为数字
    if (
        params.newValue !== null
        && params.newValue.productid !== undefined
        && params.newValue.productid !== 0
    ) {
        const product = params.newValue

        useFormatProductToInboundMx(product,params.data);

        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}