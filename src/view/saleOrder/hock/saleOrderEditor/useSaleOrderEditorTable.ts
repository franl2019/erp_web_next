import {Ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {IProduct} from "@/module/product/product";
import {ISaleOrderMx, ISaleOrderMxAndProductAndAmt} from "@/module/saleOrder/saleOrderMx";
import {SaleOrderCreateMxAndProductAndAmt} from "@/module/saleOrder/saleOrderCreateMxAndProductAndAmt";

export function useSaleOrderEditorTable(
    saleOrderEditTableRef: Ref<ITableRef | undefined>
) {

    //明细表格colId 唯一
    let printIdCount: number = 0;

    //销售订单明细表格 停止编辑状态
    function stopEditSaleOrderMxTable() {
        saleOrderEditTableRef.value?.getGridApi().stopEditing();
    }

    //获取销售订单明细表格数据
    function getSaleOrderMx() {
        stopEditSaleOrderMxTable();
        const saleOrderMxList: SaleOrderCreateMxAndProductAndAmt[] = []
        saleOrderEditTableRef.value?.getGridApi().forEachNode((rowNode, index) => {
            //明细顺序
            rowNode.data.printid = index;
            saleOrderMxList.push(rowNode.data)
        })
        return saleOrderMxList
    }

    //获取表格选中明细
    async function getSelectedSaleOrderMx() {

        stopEditSaleOrderMxTable();

        const saleOrderMxList: ISaleOrderMx[] | undefined = saleOrderEditTableRef.value?.getGridApi().getSelectedRows();
        if(saleOrderMxList === undefined){
            return Promise.reject(new Error('没有已选中明细'))
        }

        return saleOrderMxList
    }

    //产品添加到销售订单明细
    function addSaleOrderMxForProduct(productList: IProduct[],saleOrderId:number = 0) {
        const saleOrderCreateMxAndProductList: SaleOrderCreateMxAndProductAndAmt[] = [];

        for (let i = 0; i < productList.length; i++) {
            //增加printid
            printIdCount = printIdCount + 1
            const product = productList[i];
            const saleOrderCreateMxAndProductDto = new SaleOrderCreateMxAndProductAndAmt();
            saleOrderCreateMxAndProductDto.saleOrderId = saleOrderId;
            saleOrderCreateMxAndProductDto.printid = printIdCount;
            saleOrderCreateMxAndProductDto.selectedProduct(product);
            saleOrderCreateMxAndProductList.push(saleOrderCreateMxAndProductDto);
        }
        saleOrderEditTableRef.value?.getGridApi().applyTransaction({
            add: saleOrderCreateMxAndProductList
        })

    }

    //service data 添加到销售订单明细
    function addSaleOrderMx(saleOrderMxAndProductAndAmtList: ISaleOrderMxAndProductAndAmt[]) {
        const saleOrderCreateMxAndProductList: SaleOrderCreateMxAndProductAndAmt[] = [];

        for (let i = 0; i < saleOrderMxAndProductAndAmtList.length; i++) {
            //增加printid
            printIdCount = printIdCount + 1
            const saleOrderMx = saleOrderMxAndProductAndAmtList[i];
            const saleOrderCreateMxAndProductDto = new SaleOrderCreateMxAndProductAndAmt();
            saleOrderCreateMxAndProductDto.printid = printIdCount;
            saleOrderCreateMxAndProductDto.setValue(saleOrderMx);
            saleOrderCreateMxAndProductDto.recountCol('outqty');
            saleOrderCreateMxAndProductList.push(saleOrderCreateMxAndProductDto);
        }
        saleOrderEditTableRef.value?.getGridApi().applyTransaction({
            add: saleOrderCreateMxAndProductList
        });

    }

    //删除销售订单明细表格数据
    function deleteAllSaleOrderMxInTableData(saleOrderMxList:ISaleOrderMx[]) {
        saleOrderEditTableRef.value?.getGridApi().applyTransaction({
            remove: saleOrderMxList
        })
    }

    return {
        addSaleOrderMxForProduct,
        getSelectedSaleOrderMx,
        getSaleOrderMx,
        addSaleOrderMx,
        deleteAllSaleOrderMxInTableData
    }
}