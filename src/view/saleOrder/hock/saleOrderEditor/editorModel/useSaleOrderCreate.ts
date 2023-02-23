import {ref, Ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";
import {ButtonState} from "@/composables/ButtonState";
import {SaleOrderCreateDto} from "@/module/saleOrder/dto/head/saleOrderCreate.dto";
import {SaleOrderCreateAndMxDto} from "@/module/saleOrder/dto/sheet/saleOrderCreateAndMx.dto";
import {useSaleOrderEditorTable} from "@/view/saleOrder/hock/saleOrderEditor/useSaleOrderEditorTable";
import {useSaleOrderRoute} from "@/view/saleOrder/hock/route/useSaleOrderRoute";
import {useErpSelectProductDialog} from "@/components/dialog/selectInfo/product/useErpSelectProductDialog";
import {IProduct} from "@/module/product/product";

export function useSaleOrderCreate(
    saleOrderEditTableRef: Ref<ITableRef | undefined>
) {

    const {routeToEditSaleOrderPage} = useSaleOrderRoute();

    const {
        addSaleOrderMxForProduct,
        getSelectedSaleOrderMx,
        getSaleOrderMx,
        deleteAllSaleOrderMxInTableData
    } = useSaleOrderEditorTable(
        saleOrderEditTableRef
    );

    //销售订单对象(单头)
    const saleOrderCreateDto = ref(new SaleOrderCreateDto());
    //按钮状态
    const buttonState = ref(new ButtonState());
    //销售订单crud服务
    const saleOrderService = new SaleOrderService();

    //加载销售订单
    async function loadSaleOrder(saleOrderId: number, reLoad: boolean = false) {
        if (reLoad) routeToEditSaleOrderPage(saleOrderId)
    }

    function getSaleOrderCreateAndMxDto() {
        const saleOrderCreateAndMxDto = new SaleOrderCreateAndMxDto()
        //设置单头属性
        saleOrderCreateAndMxDto.setSaleOrder(saleOrderCreateDto.value);
        //设置明细属性
        saleOrderCreateAndMxDto.setSaleOrderCreateMxList(getSaleOrderMx());
        return saleOrderCreateAndMxDto
    }

    //增加销售订单明细事件
    function onAddSaleOrderMxChanged() {
        const saleOrderCreateAndMxDto = new SaleOrderCreateAndMxDto();
        saleOrderCreateAndMxDto.setSaleOrderCreateMxList(getSaleOrderMx());
        saleOrderCreateAndMxDto.sumAmt();
        saleOrderCreateDto.value.amt = saleOrderCreateAndMxDto.amt;
    }

    //保存按钮事件
    async function onClickSaveButton() {
        const saleOrderCreateAndMxDto = getSaleOrderCreateAndMxDto()
        const saleOrder = (await saleOrderService.create(saleOrderCreateAndMxDto))[0]
        await loadSaleOrder(saleOrder.saleOrderId, true);
    }

    //审核按钮事件
    async function onClickL1ReviewButton() {
        const saleOrderCreateAndMxDto = getSaleOrderCreateAndMxDto()
        const saleOrder = (await saleOrderService.createAndL1Review(saleOrderCreateAndMxDto))[0]
        await loadSaleOrder(saleOrder.saleOrderId, true);
    }

    //取消审核按钮事件
    async function onClickUnL1ReviewButton() {
    }

    //财务审核按钮事件
    async function onClickL2ReviewButton() {
    }

    //取消财务审核按钮事件
    async function onClickUnL2ReviewButton() {
    }

    //删除按钮事件
    async function onClickDeleteButton() {
    }

    //客户重新选择事件
    function onClientChange() {
        deleteAllSaleOrderMxInTableData(getSaleOrderMx());
    }

    //增加销售订单明细按钮事件
    async function onClickAddSaleOrderMxButton() {
        const productList = await useErpSelectProductDialog<IProduct[]|undefined>();
        if(!productList)return
        addSaleOrderMxForProduct(productList);
    }

    //删除表格选中明细
    async function onClickDeleteMx(){
        deleteAllSaleOrderMxInTableData(await getSelectedSaleOrderMx())
    }

    async function onClickStopReviewButton(){
    }

    async function onClickUnStopReviewButton() {
    }

    //停止明细
    async function onClickStopMx(){
    }

    //关闭整行明细
    async function onClickLineClose(){
    }

    return {
        saleOrderDto: saleOrderCreateDto,
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