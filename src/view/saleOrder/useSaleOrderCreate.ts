import {ref, Ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {SaleOrderCreateDto} from "@/module/saleOrder/dto/head/saleOrderCreate.dto";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";
import {SaleOrderCreateAndMxDto} from "@/module/saleOrder/dto/sheet/saleOrderCreateAndMx.dto";
import {useErpSelectProductDialog} from "@/components/dialog/selectInfo/product/useErpSelectProductDialog";
import {IProduct} from "@/module/product/product";
import {SaleOrderCreateMxAndProductAndAmt} from "@/module/saleOrder/saleOrderCreateMxAndProductAndAmt";

export function useSaleOrderCreate(
    saleOrderEditTableRef: Ref<ITableRef | undefined>
) {

    const saleOrderCreateDto = ref(new SaleOrderCreateDto());
    const saleOrderService = new SaleOrderService();

    async function onClickSaveButton() {
        const saleOrderCreateAndMxDto = new SaleOrderCreateAndMxDto()
        saleOrderCreateAndMxDto.setSaleOrder(saleOrderCreateDto.value);
        saleOrderCreateAndMxDto.setSaleOrderCreateMxList([]);
        console.log(saleOrderCreateAndMxDto)
        const saleOrderAndMxDto = (await saleOrderService.create(saleOrderCreateAndMxDto))[0];
    }

    function onClickL1ReviewButton() {

    }

    function onClickUnL1ReviewButton() {

    }

    function onClickDeleteButton() {

    }

    function onClientChange() {

    }

    async function onClickAddSaleOrderMxButton() {
        const productList = await useErpSelectProductDialog<IProduct[]>();
        addSaleOrderMx(productList);
    }

    function addSaleOrderMx(productList: IProduct[]) {
        const saleOrderCreateMxAndProductList: SaleOrderCreateMxAndProductAndAmt[] = [];

        for (let i = 0; i < productList.length; i++) {
            const product = productList[i]
            const saleOrderCreateMxAndProductDto = new SaleOrderCreateMxAndProductAndAmt();
            saleOrderCreateMxAndProductDto.selectedProduct(product);
            saleOrderCreateMxAndProductList.push(saleOrderCreateMxAndProductDto);
        }
        saleOrderEditTableRef.value?.getGridApi().applyTransaction({
            add: saleOrderCreateMxAndProductList
        })
    }

    return {
        saleOrderCreateDto,
        onClickSaveButton,
        onClickL1ReviewButton,
        onClickUnL1ReviewButton,
        onClickDeleteButton,
        onClientChange,
        onClickAddSaleOrderMxButton,
    }
}