import {ITableRef} from "@/components/table/type";
import {ref, Ref} from "vue";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";
import {ButtonState} from "@/composables/ButtonState";
import {useSaleOrderFindHeadTable} from "@/view/saleOrder/hock/saleOrderFind/useSaleOrderFindHeadTable";
import {useSaleOrderFindMxTable} from "@/view/saleOrder/hock/saleOrderFind/useSaleOrderFindMxTable";
import {useSaleOrderRoute} from "@/view/saleOrder/hock/route/useSaleOrderRoute";

export function useSaleOrderFind(
    saleOrderHeadTableRef: Ref<ITableRef | undefined>,
    saleOrderMxTableRef: Ref<ITableRef | undefined>
) {

    const saleOrderService = new SaleOrderService();
    const buttonState = ref(new ButtonState());

    const {
        loadSaleOrderHeadTable,
        getSaleOrderHeadTableSelectedOrder,
        getRowNodeId,
        selectSaleOrder,
        saleOrderFindDto
    } = useSaleOrderFindHeadTable(saleOrderHeadTableRef);

    const {
        loadSaleOrderMxTable,
        emptySaleOrderMxTable,
        saleOrderFindMxDto,
    } = useSaleOrderFindMxTable(saleOrderMxTableRef);

    const {
        routeToNewSaleOrderPage,
        routeToEditSaleOrderPage,
    } = useSaleOrderRoute();

    async function onClickedCreateBtn() {
        routeToNewSaleOrderPage()
    }

    async function onClickedEditBtn() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        if (!saleOrder) return
        routeToEditSaleOrderPage(saleOrder.saleOrderId, {closeTab: false});
    }

    async function onClickedDeleteBtn() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        if (!saleOrder) return
        await saleOrderService.delete_data(saleOrder.saleOrderId);
        await onRefresh()
    }

    async function onClickedL1Review() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        if (!saleOrder) return
        await saleOrderService.l1ReviewDto(saleOrder.saleOrderId);
        await onRefresh()
    }

    async function onClickedUnL1Review() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        if (!saleOrder) return
        await saleOrderService.unl1ReviewDto(saleOrder.saleOrderId);
        await onRefresh()
    }

    async function onClickedL2Review() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        if (!saleOrder) return
        await saleOrderService.l2ReviewDto(saleOrder.saleOrderId);
        await onRefresh()
    }

    async function onClickedUnL2Review() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        if (!saleOrder) return
        await saleOrderService.unl2ReviewDto(saleOrder.saleOrderId);
        await onRefresh()
    }

    async function onChangeSaleOrderCodeInput() {
        await onRefresh()
    }

    async function onSelectedRows() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder()
        if (!saleOrder) return
        buttonState.value.updateButtonState(saleOrder.level1Review, saleOrder.level2Review);
        await loadSaleOrderMxTable(saleOrder.saleOrderId);
    }

    async function onRefresh() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        if (saleOrder) {
            await loadSaleOrderHeadTable();
            await selectSaleOrder(saleOrder.saleOrderId);
        } else {
            await loadSaleOrderHeadTable();
            emptySaleOrderMxTable();
            buttonState.value.init();
        }
    }


    return {
        buttonState,
        saleOrderFindDto,
        saleOrderFindMxDto,
        getRowNodeId,
        onClickedCreateBtn,
        onClickedEditBtn,
        onClickedDeleteBtn,
        onClickedL1Review,
        onClickedUnL1Review,
        onClickedL2Review,
        onClickedUnL2Review,
        onChangeSaleOrderCodeInput,
        onSelectedRows,
        onRefresh,
    }
}