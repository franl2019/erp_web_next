import {ButtonState} from "@/composables/ButtonState";
import {Ref, ref} from "vue";
import {SaleOutboundFindDto} from "@/module/saleOutbound/dto/outbound/saleOutboundFindDto";
import {SaleOutboundMxFindDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxFind.dto";
import {useSaleOutboundFindPageRouter} from "@/view/saleOutbound/hock/router/useSaleOutboundFindPageRouter";
import {ITableRef} from "@/components/table/type";
import {useErpTable} from "@/components/table/hock/useErpTable";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IOutbound} from "@/module/outbound/types/IOutbound";
import {SaleOutboundService} from "@/module/saleOutbound/service/saleOutbound.service";
import {SaleOutboundMxService} from "@/module/saleOutbound/service/saleOutboundMx.service";

//出仓单hock
export function useOutboundFindPage(
    //单头表格ref
    outboundTableRef: Ref<ITableRef | undefined>,
    //明细表格ref
    outboundMxTableRef: Ref<ITableRef | undefined>,
    OutboundServiceCtor:typeof SaleOutboundService,
    OutboundMxService:typeof SaleOutboundMxService,
    OutboundFindDtoCtor:typeof SaleOutboundFindDto
) {

    //按钮可视状态
    const buttonState = ref(new ButtonState());
    //销售单服务
    const outboundService = new OutboundServiceCtor();
    //销售单明细服务
    const outboundMxService = new OutboundMxService();
    const outboundFindDto = ref(new OutboundFindDtoCtor)

    //使用路由
    const {
        routerToEditOutboundPage,
        routerToCreateOutboundPage
    } = useSaleOutboundFindPageRouter();

    const {
        deleteAllData: deleteAllOutbound,
        setData: setOutboundData,
        selectRow: selectOutboundRow,
        getSelectedRow: getSelectedOutbound
    } = useErpTable<IOutbound>(outboundTableRef);

    const {
        deleteAllData: deleteAllOutboundMx,
        setData: setOutboundMxData
    } = useErpTable<IOutboundMx>(outboundMxTableRef);

    //加载销售订单单头
    async function loadOutbound(findDto: SaleOutboundFindDto) {
        const data = await outboundService.find(findDto);
        const selectedOutbound = await getSelectedOutbound();

        await deleteAllOutbound();
        await setOutboundData(data);

        if (selectedOutbound && selectedOutbound.outboundid !== 0) {
            await selectOutboundRow(selectedOutbound.outboundid);
        }
    }

    //加载销售订单明细
    async function loadOutboundMx(outboundId: number) {
        const findDto = new SaleOutboundMxFindDto(outboundId);
        const data = await outboundMxService.find(findDto);
        await deleteAllOutboundMx();
        await setOutboundMxData(data);
    }

    //点击新增按钮
    function onClickCreate() {
        routerToCreateOutboundPage();
    }

    //点击编辑按钮
    async function onClickEdit() {
        const selectedOutbound = await getSelectedOutbound();
        if (!selectedOutbound) return
        routerToEditOutboundPage(selectedOutbound.outboundid)
    }

    //点击审核按钮
    async function onClickL1Review() {
        const selectedOutbound = await getSelectedOutbound();
        if (!selectedOutbound) return
        await outboundService.l1Review(selectedOutbound.outboundid);
        await onRefresh();
    }

    //点击取消审核按钮
    async function onClickUnL1Review() {
        const selectedOutbound = await getSelectedOutbound();
        if (!selectedOutbound) return
        await outboundService.unL1Review(selectedOutbound.outboundid);
        await onRefresh();
    }

    //点击财务审核按钮
    async function onClickL2Review() {
        const selectedOutbound = await getSelectedOutbound();
        if (!selectedOutbound) return
        await outboundService.l2Review(selectedOutbound.outboundid);
        await onRefresh();
    }

    //点击取消财务审核按钮
    async function onClickUnL2Review() {
        const selectedOutbound = await getSelectedOutbound();
        if (!selectedOutbound) return
        await outboundService.unL2Review(selectedOutbound.outboundid);
        await onRefresh();
    }

    //点击删除按钮
    async function onClickDelete() {
        const selectedOutbound = await getSelectedOutbound();
        if (!selectedOutbound) return
        await outboundService.delete_data(selectedOutbound.outboundid);
        await onRefresh();
    }

    //点击销售单头表格行
    async function onClickOutboundRow() {
        const selectedOutbound = await getSelectedOutbound();
        if (!selectedOutbound) return
        buttonState.value.updateButtonState(selectedOutbound);
        await loadOutboundMx(selectedOutbound.outboundid);
    }

    //点击刷新
    async function onRefresh() {
        await loadOutbound(outboundFindDto.value);
        const selectedOutbound = await getSelectedOutbound();
        await deleteAllOutboundMx();
        if (!selectedOutbound) return
        await selectOutboundRow(selectedOutbound.outboundid)
    }

    return {
        buttonState,
        outboundFindDto,
        onClickCreate,
        onClickEdit,
        onClickL1Review,
        onClickUnL1Review,
        onClickL2Review,
        onClickUnL2Review,
        onClickDelete,
        onClickOutboundRow,
        onRefresh
    }
}