import useErpDialog from "@/components/dialog/useErpDialog";
import {getButtonState, IButtonState} from "@/composables/useSheetButtonState";
import {useRouter} from "vue-router";
import {SaleOutboundService} from "@/module/saleOutbound/service/saleOutbound.service";
import {
    useSaleOutboundFindViewHock
} from "@/module/saleOutbound/hock/findView/useSaleOutboundFindViewHock";
import {SaleOutboundFindDataDto, ISaleOutboundFindDataDto} from "@/module/saleOutbound/dto/outbound/saleOutboundFindData.dto";
import {Ref} from "vue";
import {ISaleOutboundMxFindDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxFind.dto";
import {ITableRef} from "@/components/table/type";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {useRouterPage} from "@/utils";


export function useSaleOutboundFindViewEvent(
    option: {
        saleOutboundHeadFindDto: Ref<ISaleOutboundFindDataDto>;
        saleOutboundMxFindDto: Ref<ISaleOutboundMxFindDto>;
        buttonVisibleState: Ref<IButtonState>;
        outboundHeadRef: Ref<ITableRef | undefined>;
        outboundMxRef: Ref<ITableRef | undefined>;
    }
) {

    //service
    const router = useRouter();
    const outboundService = new SaleOutboundService();
    const {saleOutboundHeadFindDto, buttonVisibleState} = option
    const {getSelectRow,selectRow, initPage, initOutboundHeadTable, initOutboundMx} = useSaleOutboundFindViewHock(option);
    const {warehouseid} = useWarehouseSelect(saleOutboundHeadFindDto);

    //在搜索条件改变
    async function onChange() {
        await initOutboundHeadTable();
        await initOutboundMx();
        buttonVisibleState.value = getButtonState()
    }

    //出仓单单头表格点击事件
    async function onSelectedRows() {
        //获取出仓单
        const outbound = await getSelectRow();
        if(outbound){
            //设置按钮状态
            buttonVisibleState.value = getButtonState(outbound.level1review, outbound.level2review);
            //按出仓单显示出仓单的明细
            await initOutboundMx(outbound.outboundid);
        }else{
            await initOutboundMx();
        }
    }

    //筛选确定事件
    async function clickedFilterOkBtn() {
        await onChange()
    }

    //筛选按钮关闭
    async function clickedFilterCloseBtn() {
        await onChange()
    }

    async function clickedFilterResetBtn() {
        //重置查询参数
        for (let valueKey in saleOutboundHeadFindDto.value) {
            (saleOutboundHeadFindDto.value as any)[valueKey] = (new SaleOutboundFindDataDto() as any)[valueKey]
        }
        await initPage()
    }

    //btn event
    function clickedCreateBtn() {
        const route = router.resolve({
            name: "newOutbound", query: {
                warehouseid: warehouseid.value
            }
        })
        useRouterPage(route.fullPath,route.meta.title as string)
    }

    async function clickedEditBtn() {
        const outbound = await getSelectRow();
        if (outbound && outbound.outboundid !== 0) {
            const route = router.resolve({
                name: "editOutbound", query: {
                    outboundid: outbound.outboundid
                }
            });
            useRouterPage(route.fullPath,route.meta.title as string);
        }
    }

    //审核出仓单按钮
    async function clickedL1Review() {
        const {outboundid,outboundcode} = await getSelectRow();
        useErpDialog({
            title: "提示",
            message: `是否审核,单号:${outboundcode}`,
            ok: async () => {
                await outboundService.l1Review(outboundid);
                await initOutboundHeadTable();
                await selectRow(outboundid);
            }
        })
    }

    //撤审出仓单按钮
    async function clickedUnL1Review() {
        const {outboundid,outboundcode} = await getSelectRow();
        useErpDialog({
            title: "提示",
            message: `是否撤审,单号:${outboundcode}`,
            ok: async () => {
                await outboundService.unL1Review(outboundid);
                await initOutboundHeadTable();
                await selectRow(outboundid);
            }
        })
    }

    //审核出仓单按钮
    async function clickedL2Review() {
        const {outboundid,outboundcode} = await getSelectRow();
        useErpDialog({
            title: "提示",
            message: `是否财审,单号:${outboundcode}`,
            ok: async () => {
                await outboundService.l2Review(outboundid);
                await initOutboundHeadTable();
                await selectRow(outboundid);
            }
        })
    }

    //撤审出仓单按钮
    async function clickedUnL2Review() {
        const {outboundid,outboundcode} = await getSelectRow();
        useErpDialog({
            title: "提示",
            message: `是否撤审财审,单号:${outboundcode}`,
            ok: async () => {
                await outboundService.unL2Review(outboundid);
                await initOutboundHeadTable();
                await selectRow(outboundid);
            }
        })
    }

    async function clickedDeleteData() {
        const {outboundid,outboundcode} = await getSelectRow();
        useErpDialog({
            title: "提示",
            message: `是否删除,单号:${outboundcode}`,
            ok: async () => {
                await outboundService.delete_data(outboundid);
                await initOutboundMx();
                await initOutboundHeadTable();
                buttonVisibleState.value = getButtonState()
            }
        })
    }

    return {
        onChange,
        onSelectedRows,
        clickedCreateBtn,
        clickedEditBtn,
        clickedL1Review,
        clickedUnL1Review,
        clickedL2Review,
        clickedUnL2Review,
        clickedDeleteData,
        clickedFilterOkBtn,
        clickedFilterResetBtn,
        clickedFilterCloseBtn
    }
}