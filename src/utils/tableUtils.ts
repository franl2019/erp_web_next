import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {ErpInboundMxMath} from "@/module/math/erpInboundMxMath";
import {bignumber, round} from 'mathjs'
import {ErpOutboundMxMath} from "@/module/math/erpOutboundMxMath";

export function useFormatInboundMxNumber(params: ValueSetterParams) {
    //判断是否为数字
    if (!isNaN(Number(params.newValue))) {
        //给单元格赋值
        params.data[params.column.getColId()] = Number(round(bignumber(params.newValue), 4));

        //为相关的单元格计算
        new ErpInboundMxMath(params).calculate();

        //刷新本行
        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}

export function useFormatOutboundMxNumber(params: ValueSetterParams) {
    //判断是否为数字
    if (!isNaN(Number(params.newValue))) {
        //给单元格赋值
        params.data[params.column.getColId()] = Number(round(bignumber(params.newValue), 4));

        //为相关的单元格计算
        new ErpOutboundMxMath(params).calculate();

        //刷新本行
        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}

export function useFormatBuyPayMxNumber(params: ValueSetterParams) {
    //判断是否为数字
    if (!isNaN(Number(params.newValue))) {
        //给单元格赋值
        params.data[params.column.getColId()] = Number(round(bignumber(params.newValue), 4));

        // //为相关的单元格计算
        // new ErpOutboundMxMath(params).calculate();

        //刷新本行
        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}