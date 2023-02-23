import {ref, Ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";
import {SaleOrderUpdateDto} from "@/module/saleOrder/dto/head/saleOrderUpdate.dto";
import {SaleOrderUpdateAndMxDto} from "@/module/saleOrder/dto/sheet/saleOrderUpdateAndMx.dto";
import {SaleOrderFindDto} from "@/module/saleOrder/dto/find/saleOrderFind.dto";
import {SaleOrderMxService} from "@/module/saleOrder/saleOrderMx.service";
import {SaleOrderFindMxDto} from "@/module/saleOrder/dto/find/saleOrderMxFind.dto";
import {ButtonState} from "@/composables/ButtonState";
import {useSaleOrderEditorTable} from "@/view/saleOrder/hock/saleOrderEditor/useSaleOrderEditorTable";
import useErpDialog from "@/components/dialog/useErpDialog";
import {useSaleOrderRoute} from "@/view/saleOrder/hock/route/useSaleOrderRoute";
import {useErpSelectProductDialog} from "@/components/dialog/selectInfo/product/useErpSelectProductDialog";
import {IProduct} from "@/module/product/product";
import {useSaleOrderStopQtyDialog} from "@/view/saleOrder/hock/saleOrderEditor/useSaleOrderStopQtyDialog";

export function useSaleOrderEdit(
    saleOrderEditTableRef: Ref<ITableRef | undefined>
) {

    const {routeToFindSaleOrderPage} = useSaleOrderRoute();

    const {
        addSaleOrderMxForProduct,
        getSelectedSaleOrderMx,
        addSaleOrderMx,
        getSaleOrderMx,
        deleteAllSaleOrderMxInTableData
    } = useSaleOrderEditorTable(saleOrderEditTableRef);
    //销售订单对象(单头)
    const saleOrderUpdateDto = ref(new SaleOrderUpdateDto());
    //按钮状态
    const buttonState = ref(new ButtonState());
    //销售订单crud服务
    const saleOrderService = new SaleOrderService();
    //销售订单明细查询服务
    const saleOrderMxService = new SaleOrderMxService();
    //查询参数对象
    const saleOrderFindDto = new SaleOrderFindDto();

    //加载销售订单
    async function loadSaleOrder(saleOrderId: number, reLoad: boolean = false) {
        if (saleOrderId === 0) {
            await useErpDialog({
                closeBtnVisible: false,
                message: "销售订单参数错误"
            })
            routeToFindSaleOrderPage();
        }

        //如果是重新加载删除表格明细
        if (reLoad) deleteAllSaleOrderMxInTableData(getSaleOrderMx());

        saleOrderFindDto.saleOrderId = saleOrderId;
        const saleOrder = (await saleOrderService.find(saleOrderFindDto))[0];
        saleOrderUpdateDto.value.setValue(saleOrder);

        const saleOrderMxFindDto = new SaleOrderFindMxDto();
        saleOrderMxFindDto.saleOrderId = saleOrder.saleOrderId;
        const saleOrderMxList = await saleOrderMxService.find(saleOrderMxFindDto);
        addSaleOrderMx(saleOrderMxList);

        //更新单据合计金额
        onAddSaleOrderMxChanged();

        //更新按钮状态
        buttonState.value.updateButtonState(saleOrder);
    }

    //创建更新dto
    function getSaleOrderUpdateAndMxDto() {
        const saleOrderUpdateAndMxDto = new SaleOrderUpdateAndMxDto();
        //设置单头属性
        saleOrderUpdateAndMxDto.setSaleOrder(saleOrderUpdateDto.value);
        //设置明细属性
        saleOrderUpdateAndMxDto.setSaleOrderCreateMxList(getSaleOrderMx());
        return saleOrderUpdateAndMxDto
    }

    //增加销售订单明细事件
    function onAddSaleOrderMxChanged() {
        const saleOrderUpdateAndMxDto = new SaleOrderUpdateAndMxDto();
        saleOrderUpdateAndMxDto.setSaleOrderCreateMxList(getSaleOrderMx());
        saleOrderUpdateAndMxDto.sumAmt();
        saleOrderUpdateDto.value.amt = saleOrderUpdateAndMxDto.amt;
    }

    //保存按钮事件
    async function onClickSaveButton() {
        const saleOrderUpdateAndMxDto = getSaleOrderUpdateAndMxDto();
        await saleOrderService.update(saleOrderUpdateAndMxDto);
        await loadSaleOrder(saleOrderFindDto.saleOrderId, true);
    }

    //审核按钮事件
    async function onClickL1ReviewButton() {
        const saleOrderUpdateAndMxDto = getSaleOrderUpdateAndMxDto();
        await saleOrderService.updateAndL1Review(saleOrderUpdateAndMxDto);
        await loadSaleOrder(saleOrderFindDto.saleOrderId, true);
    }

    //取消审核按钮事件
    async function onClickUnL1ReviewButton() {
        await saleOrderService.unl1ReviewDto(saleOrderFindDto.saleOrderId);
        await loadSaleOrder(saleOrderFindDto.saleOrderId, true);
    }

    //财务审核按钮事件
    async function onClickL2ReviewButton() {
        await saleOrderService.l2ReviewDto(saleOrderFindDto.saleOrderId);
        await loadSaleOrder(saleOrderFindDto.saleOrderId, true);
    }

    //取消财务审核按钮事件
    async function onClickUnL2ReviewButton() {
        await saleOrderService.unl2ReviewDto(saleOrderFindDto.saleOrderId);
        await loadSaleOrder(saleOrderFindDto.saleOrderId, true);
    }

    //删除按钮事件
    async function onClickDeleteButton() {
        await saleOrderService.delete_data(saleOrderFindDto.saleOrderId);
        routeToFindSaleOrderPage();
    }

    //客户重新选择事件
    function onClientChange() {
        deleteAllSaleOrderMxInTableData(getSaleOrderMx());
    }

    //增加销售订单明细按钮事件
    async function onClickAddSaleOrderMxButton() {
        const productList = await useErpSelectProductDialog<IProduct[]|undefined>();
        if(!productList)return
        addSaleOrderMxForProduct(productList,saleOrderUpdateDto.value.saleOrderId);
    }

    //删除表格选中明细
    async function onClickDeleteMx(){
        deleteAllSaleOrderMxInTableData(await getSelectedSaleOrderMx())
    }

    async function onClickStopReviewButton(){
        await saleOrderService.stopReview(saleOrderFindDto.saleOrderId);
        await loadSaleOrder(saleOrderFindDto.saleOrderId,true);
    }

    async function onClickUnStopReviewButton() {
        await saleOrderService.unStopReview(saleOrderFindDto.saleOrderId);
        await loadSaleOrder(saleOrderFindDto.saleOrderId,true);
    }

    //停止明细
    async function onClickStopMx(){
        const saleOrderMx = (await getSelectedSaleOrderMx())[0];
        if(!saleOrderMx)return
        const stopQty = await useSaleOrderStopQtyDialog<number>(saleOrderMx.stopQty);
        await saleOrderService.stopMx(saleOrderMx.saleOrderId,saleOrderMx.printid,stopQty);
        await loadSaleOrder(saleOrderFindDto.saleOrderId,true);
    }

    //关闭整行
    async function onClickLineClose(){
        const saleOrderMx = (await getSelectedSaleOrderMx())[0];
        if(!saleOrderMx)return
        await saleOrderService.lineClose(saleOrderMx.saleOrderId,saleOrderMx.printid,!saleOrderMx.lineClose);
        await loadSaleOrder(saleOrderFindDto.saleOrderId,true);
    }

    return {
        saleOrderDto: saleOrderUpdateDto,
        buttonState,
        loadSaleOrder,
        onClickSaveButton,
        onClickL1ReviewButton,
        onClickUnL1ReviewButton,
        onClickL2ReviewButton,
        onClickUnL2ReviewButton,
        onClickDeleteButton,
        onClientChange,
        onAddSaleOrderMxChanged,
        onClickAddSaleOrderMxButton,
        onClickDeleteMx,
        onClickStopMx,
        onClickLineClose,
        onClickStopReviewButton,
        onClickUnStopReviewButton
    }
}