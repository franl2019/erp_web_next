import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";

export function buyInboundSelectProductValueSetter(params: ValueSetterParams) {
    //判断是否为数字
    if (
        params.newValue !== null
        && params.newValue.productid !== undefined
        && params.newValue.productid !== 0
    ) {
        const product = params.newValue

        params.data.productid = product.productid;
        params.data.productcode = product.productcode;
        params.data.productname = product.productname;
        params.data.spec = product.spec;
        params.data.materials = product.materials;
        params.data.unit = product.unit;
        params.data.packqty = product.packqty;

        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}