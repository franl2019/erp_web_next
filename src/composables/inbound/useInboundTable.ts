import {IInboundMx} from "@/module/inboundMx/IInboundMx";
import {IInbound} from "@/module/inbound/IInbound";

export function useInboundTable() {
    //获取进仓单表头行数据ID
    function getHeadTableRowNodeId(data: IInbound) {
        return data.inboundid
    }

    //获取进仓单明细表行数据ID
    function getMxTableRowNodeId(data: IInboundMx) {
        return data.printid
    }

    return{
        getHeadTableRowNodeId,
        getMxTableRowNodeId
    }
}