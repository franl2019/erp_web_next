import {Ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {IFindOutboundDto} from "@/module/saleOutbound/dto/findOutboundSale.dto";
import {IFindOutboundMxDto} from "@/module/saleOutbound/dto/findOutboundMxSale.dto";
import {getButtonState, IButtonState} from "@/composables/useSheetButtonState";
import {IOutbound} from "@/module/saleOutbound/outboundSale";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {VerifyParamError} from "@/types/error/verifyParamError";

//销售单hock
export function useSaleOutboundFindViewHock(option:{
    saleOutboundHeadFindDto:Ref<IFindOutboundDto>;
    saleOutboundMxFindDto:Ref<IFindOutboundMxDto>;
    buttonVisibleState:Ref<IButtonState>;
    outboundHeadRef:Ref<ITableRef | undefined>;
    outboundMxRef:Ref<ITableRef | undefined>;
}) {
    
    const {saleOutboundHeadFindDto,saleOutboundMxFindDto,buttonVisibleState,outboundHeadRef,outboundMxRef } = option
    const {setDefaultAllWarehouse} = useWarehouseSelect(saleOutboundHeadFindDto);

    async function initPage() {
        buttonVisibleState.value = getButtonState()
        await setDefaultAllWarehouse();
        await outboundHeadRef.value?.initTableData();
        await outboundMxRef.value?.getGridApi().setRowData([]);

    }

    async function initOutboundHeadTable(){
        await outboundHeadRef.value?.initTableData();
    }

    async function selectRow(outboundid:number){
        await outboundHeadRef.value?.getGridApi().getRowNode(String(outboundid))?.setSelected(true);
    }

    async function initOutboundMxTable(outboundid?: number) {
        if (outboundid && outboundid !== 0) {
            saleOutboundMxFindDto.value.outboundid = outboundid;
            await outboundMxRef.value?.initTableData();
        } else {
            await outboundMxRef.value?.getGridApi().setRowData([]);
        }
    }

    function getSelectRow() {
        const rows = outboundHeadRef.value?.getGridApi().getSelectedRows();
        if (rows) {
            return rows[0] as IOutbound
        } else {
            return Promise.reject(new VerifyParamError("没有选中销售单"))
        }
    }

    function getHeadTableRowNodeId(data: IOutbound) {
        return data.outboundid
    }

    function getMxTableRowNodeId(data: IOutboundMx) {
        return data.printid
    }

    return {
        initPage,
        initOutboundHeadTable,
        initOutboundMx: initOutboundMxTable,
        getSelectRow,
        selectRow,
        getHeadTableRowNodeId,
        getMxTableRowNodeId
    }
}