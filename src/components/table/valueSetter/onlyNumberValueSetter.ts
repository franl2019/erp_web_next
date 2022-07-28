//销售收款单 金额值设置器
import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";

export function onlyNumberValueSetter(params: ValueSetterParams):boolean {
    if (!isNaN(Number(params.newValue)) && Number(params.newValue) >= 0) {
        //给单元格赋值
        params.data[params.column.getColId()] = Number(params.newValue);
        return true
    }

    return false
}