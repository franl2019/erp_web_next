import {ButtonState} from "@/composables/ButtonState";
import {Ref, ref} from "vue";
import {SaleOutboundFindDto} from "@/module/saleOutbound/dto/outbound/saleOutboundFindDto";
import {SaleOutboundMxFindDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxFind.dto";
import {useSaleOutboundFindPageRouter} from "@/view/saleOutbound/hock/router/useSaleOutboundFindPageRouter";
import {ITableRef} from "@/components/table/type";
import {SaleOutboundMxService} from "@/module/saleOutbound/service/saleOutboundMx.service";
import {useErpTable} from "@/components/table/hock/useErpTable";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IOutbound} from "@/module/outbound/types/IOutbound";
import {SaleOutboundService} from "@/module/saleOutbound/service/saleOutbound.service";

export function useSaleOutboundFindPage(
    //销售单头表格ref
    saleOutboundTableRef: Ref<ITableRef | undefined>,
    //销售明细表格ref
    saleOutboundMxTableRef: Ref<ITableRef | undefined>,
) {

    //按钮可视状态
    const buttonState = ref(new ButtonState());
    //销售单服务
    const saleOutboundService = new SaleOutboundService();
    //销售单明细服务
    const saleOutboundMxService = new SaleOutboundMxService();
    //销售单查询页单头查询请求参数
    const saleOutboundFindDto = ref(new SaleOutboundFindDto());

    //使用路由
    const {
        routerToEditOutboundPage,
        routerToCreateOutboundPage
    } = useSaleOutboundFindPageRouter();

    const {
        deleteAllData: deleteAllSaleOutbound,
        setData: setSaleOutboundData,
        selectRow: selectSaleOutboundRow,
        getSelectedRow: getSelectedSaleOutbound
    } = useErpTable<IOutbound>(saleOutboundTableRef);

    const {
        deleteAllData: deleteAllSaleOutboundMx,
        setData: setSaleOutboundMxData
    } = useErpTable<IOutboundMx>(saleOutboundMxTableRef);

    //加载销售订单单头
    async function loadSaleOutbound(findDto: SaleOutboundFindDto) {
        const data = await saleOutboundService.find(findDto);
        const selectedSaleOutbound = await getSelectedSaleOutbound();

        await deleteAllSaleOutbound();
        await setSaleOutboundData(data);

        if (selectedSaleOutbound && selectedSaleOutbound.outboundid !== 0) {
            await selectSaleOutboundRow(selectedSaleOutbound.outboundid);
        }
    }

    //加载销售订单明细
    async function loadSaleOutboundMx(outboundId: number) {
        const findDto = new SaleOutboundMxFindDto(outboundId);
        const data = await saleOutboundMxService.find(findDto);
        await deleteAllSaleOutboundMx();
        await setSaleOutboundMxData(data);
    }

    //点击新增按钮
    function onClickCreate() {
        routerToCreateOutboundPage();
    }

    //点击编辑按钮
    async function onClickEdit() {
        const selectedSaleOutbound = await getSelectedSaleOutbound();
        if (!selectedSaleOutbound) return
        routerToEditOutboundPage(selectedSaleOutbound.outboundid)
    }

    //点击审核按钮
    async function onClickL1Review() {
        const selectedSaleOutbound = await getSelectedSaleOutbound();
        if (!selectedSaleOutbound) return
        await saleOutboundService.l1Review(selectedSaleOutbound.outboundid);
        await onRefresh();
    }

    //点击取消审核按钮
    async function onClickUnL1Review() {
        const selectedSaleOutbound = await getSelectedSaleOutbound();
        if (!selectedSaleOutbound) return
        await saleOutboundService.unL1Review(selectedSaleOutbound.outboundid);
        await onRefresh();
    }

    //点击财务审核按钮
    async function onClickL2Review() {
        const selectedSaleOutbound = await getSelectedSaleOutbound();
        if (!selectedSaleOutbound) return
        await saleOutboundService.l2Review(selectedSaleOutbound.outboundid);
        await onRefresh();
    }

    //点击取消财务审核按钮
    async function onClickUnL2Review() {
        const selectedSaleOutbound = await getSelectedSaleOutbound();
        if (!selectedSaleOutbound) return
        await saleOutboundService.unL2Review(selectedSaleOutbound.outboundid);
        await onRefresh();
    }

    //点击删除按钮
    async function onClickDelete() {
        const selectedSaleOutbound = await getSelectedSaleOutbound();
        if (!selectedSaleOutbound) return
        await saleOutboundService.delete_data(selectedSaleOutbound.outboundid);
        await onRefresh();
    }

    //点击销售单头表格行
    async function onClickSaleOutboundRow() {
        const selectedSaleOutbound = await getSelectedSaleOutbound();
        if (!selectedSaleOutbound) return
        buttonState.value.updateButtonState(selectedSaleOutbound);
        await loadSaleOutboundMx(selectedSaleOutbound.outboundid);
    }

    //点击刷新
    async function onRefresh() {
        await loadSaleOutbound(saleOutboundFindDto.value);
        const selectedSaleOutbound = await getSelectedSaleOutbound();
        await deleteAllSaleOutboundMx();
        if (!selectedSaleOutbound) return
        await selectSaleOutboundRow(selectedSaleOutbound.outboundid)
    }

    return {
        buttonState,
        saleOutboundFindDto,
        onClickCreate,
        onClickEdit,
        onClickL1Review,
        onClickUnL1Review,
        onClickL2Review,
        onClickUnL2Review,
        onClickDelete,
        onClickSaleOutboundRow,
        onRefresh
    }
}