import {useRouter} from "vue-router";
import {useRouterPage} from "@/utils";
import {ITableRef} from "@/components/table/type";
import {ref, Ref} from "vue";
import {ISaleOrder} from "@/module/saleOrder/saleOrder";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";
import {ButtonState} from "@/composables/ButtonState";

export function useSaleOrderFind(
    saleOrderHeadTableRef: Ref<ITableRef | undefined>,
    saleOrderMxTableRef: Ref<ITableRef | undefined>
) {

    const router = useRouter();
    const saleOrderService = new SaleOrderService();
    const buttonState = ref(new ButtonState());

    async function getSaleOrderHeadTableSelectedOrder(): Promise<ISaleOrder> {
        const saleOrderSelectedList = saleOrderHeadTableRef.value?.getGridApi().getSelectedRows() as ISaleOrder[];
        if (saleOrderSelectedList && saleOrderSelectedList.length > 0) {
            return saleOrderSelectedList[0]
        } else {
            return Promise.reject(new Error('未选择销售订单'))
        }
    }

    async function onClickedCreateBtn() {
        const route = router.resolve({
            name: "newSaleOrder"
        })
        useRouterPage(route.fullPath, route.meta.title as string)
    }

    async function onClickedEditBtn() {
        const route = router.resolve({
            name: "editSaleOrder"
        })
        useRouterPage(route.fullPath, route.meta.title as string)
    }

    async function onClickedDeleteBtn() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        await saleOrderService.delete_data(saleOrder.saleOrderId);
    }

    async function onClickedL1Review() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        await saleOrderService.l1ReviewDto(saleOrder.saleOrderId);
    }

    async function onClickedUnL1Review() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        await saleOrderService.unl1ReviewDto(saleOrder.saleOrderId);
    }

    async function onClickedL2Review() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        await saleOrderService.l2ReviewDto(saleOrder.saleOrderId);
    }

    async function onClickedUnL2Review() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder();
        await saleOrderService.unl2ReviewDto(saleOrder.saleOrderId);
    }

    function onChangeSaleOrderCodeInput() {
        refresh()
    }

    async function onSelectedRows() {
        const saleOrder = await getSaleOrderHeadTableSelectedOrder()
        buttonState.value.updateButtonState(saleOrder.level1Review, saleOrder.level2Review)
    }

    function onInitPage() {
        saleOrderHeadTableRef.value?.initTableData();
        buttonState.value.init();
    }

    function refresh() {
        saleOrderHeadTableRef.value?.initTableData();
        saleOrderMxTableRef.value?.initTableData();
    }


    return {
        buttonState,
        onClickedCreateBtn,
        onClickedEditBtn,
        onClickedDeleteBtn,
        onClickedL1Review,
        onClickedUnL1Review,
        onClickedL2Review,
        onClickedUnL2Review,
        onInitPage,
        onChangeSaleOrderCodeInput,
        onSelectedRows
    }
}