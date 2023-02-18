import {IInboundMx} from "@/module/inboundMx/IInboundMx";
import {IInbound} from "@/module/inbound/IInbound";
import { GetRowIdParams } from "ag-grid-community";

export function useInboundTable() {
    //获取进仓单表头行数据ID
    function getHeadTableRowNodeId(params: GetRowIdParams<IInbound>) : string{
        return String(params.data.inboundid)
    }

    //获取进仓单明细表行数据ID
    function getMxTableRowNodeId(params: GetRowIdParams<IInboundMx>) : string{
        return String(params.data.printid)
    }

    return{
        getHeadTableRowNodeId,
        getMxTableRowNodeId
    }
}