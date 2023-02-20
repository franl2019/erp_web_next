<template>
  <erp-full-screen-dialog
      :title="'请选择'+valueName.product"
      @clicked-confirm="clickedOkSelectedDialog"
      @clicked-cancel="clickedCloseSelectedDialog"
  >
    <template #left>
      <div class="flex flex-col h-full pr-4">
        <erp-title title="类别"></erp-title>
        <div class="flex-grow overflow-y-auto">
          <erp-product-area-tree
              :haveRootNode="true"
              @node-click="categoryTreeClicked"
          ></erp-product-area-tree>
        </div>
      </div>
    </template>
    <template #default>
      <erp-title>
        <template v-slot:input>
          <erp-input-round
              v-model="findProductDto.search"
              class="md:w-52"
              placeholder="输入关键词"
              @change="onSearchChange"
          >
          </erp-input-round>
          <erp-check-box
              v-model="multipleClickSelectReturn"
              class="md:w-20 md:h-10"
          >多选
          </erp-check-box>
        </template>
      </erp-title>
      <erp-table
          ref="productTableRef"
          :find-dto="findProductDto"
          :getRowNodeId="getRowNodeId"
          :table-state="selectProductTableState"
          @rowDoubleClicked="onProductTableDoubleClick">
      </erp-table>
      <erp-title
          v-show="multipleClickSelectReturn===1"
          :title="'已选'+valueName.product">
      </erp-title>
      <erp-table
          v-show="multipleClickSelectReturn===1"
          ref="selectedTableRef"
          :find-dto="{}"
          :getRowNodeId="getRowNodeId"
          :table-state="selectedProductTableState"
      >
        <template #topBox>
          <erp-button
              size="small"
              type="danger"
              @click="clickedDeleteSelected"
          >
            删除已选
          </erp-button>
          <erp-button
              size="small"
              @click="clickedClearSelected"
          >
            清空已选
          </erp-button>
        </template>
      </erp-table>
    </template>
  </erp-full-screen-dialog>
</template>

<script lang='ts'>
import {selectedProductTableState} from "@/view/product/tableConfig/selectedProductTableState";
import {selectProductTableState} from "@/view/product/tableConfig/selectProductTableState";
import {defineComponent, onMounted, PropType, ref} from "vue";
import {FindProductDto, IFindProductDto} from "@/module/product/dto/findProduct.dto";
import {IProduct} from "@/module/product/product";
import {ITableRef} from "@/components/table/type";
import {IProductArea} from "@/module/productArea/productArea";
import {RowDoubleClickedEvent} from "ag-grid-community";
import {valueName} from "@/config/valueName";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpProductAreaTree from "@/components/tree/component/ErpProductAreaTree.vue";
import ErpFullScreenDialog from "@/components/dialog/ErpFullScreenDialog.vue";
import ErpCheckBox from "@/components/input/ErpCheckbox.vue";

export default defineComponent({
  name: "ErpSelectProductDialog",
  components: {
    ErpCheckBox,
    ErpButton,
    ErpTitle,
    ErpInputRound,
    ErpTable,
    ErpProductAreaTree,
    ErpFullScreenDialog,
  },
  props: {
    resolve_dialog: {
      type: Function as PropType<(value: unknown) => void>,
      required: true
    },
    reject_dialog: {
      type: Function as PropType<(reason?: any) => void>,
      required: true
    },
    unmount: {
      type: Function,
      default: () => {
      },
    },
  },
  setup(props) {
    const productTableRef = ref<ITableRef>()
    const findProductDto = ref<IFindProductDto>(new FindProductDto());

    //表格行id设置
    function getRowNodeId(data: IProduct) {
      return data.productid
    }

    onMounted(() => {
      productTableRef.value?.initTableData();
      document.onkeydown = (event) => {
        if (event.key === 'Escape') {
          clickedCloseSelectedDialog();
        }
      }
    })

    //类别树点击事件
    async function categoryTreeClicked(productAreaItem: IProductArea) {
      findProductDto.value.productareaid = productAreaItem.productareaid;
      await productTableRef.value?.initTableData();
    }

    //搜索栏
    async function onSearchChange() {
      await productTableRef.value?.initTableData();
    }

    // 0 单选 1 多选
    const multipleClickSelectReturn = ref(0);

    //产品资料表行双击
    function onProductTableDoubleClick(event: RowDoubleClickedEvent) {
      if(multipleClickSelectReturn.value === 0){
        clickedOkSelectedDialog()
      }else{
        if (event.data && !isAdded(event.data)) {
          addSelectedProductInfo([event.data]);
        }
      }
    }

    async function clickedOkSelectedDialog() {
      if(multipleClickSelectReturn.value === 0){
        props.resolve_dialog(getProductInfoTableSelectedList());
        props.unmount();
      }else{
        props.resolve_dialog(getMultipleTableDataList());
        props.unmount();
      }
    }

    async function clickedCloseSelectedDialog() {
      props.resolve_dialog(null);
      props.unmount();
    }

    //已选表Ref
    const selectedTableRef = ref<ITableRef>()

    //增加已选
    function addSelectedProductInfo(productList: IProduct[]) {
      selectedTableRef.value?.getGridApi().applyTransaction({add: productList});
    }

    //删除已选
    function deleteSelectedProductInfo(productList: IProduct[]) {
      selectedTableRef.value?.getGridApi().applyTransaction({remove: productList});
    }

    //获取产品表格选中
    function getProductInfoTableSelectedList(): IProduct[] {
      return productTableRef.value?.getGridApi().getSelectedRows() as IProduct[]
    }

    //获取已选
    function getMultipleTableDataList(): IProduct[] {
      const selectedProductList: IProduct[] = [];
      selectedTableRef.value?.getGridApi().forEachNode(rowNode => {
        selectedProductList.push(rowNode.data);
      })
      return selectedProductList
    }

    //删除已选按钮事件
    function clickedDeleteSelected() {
      const productList = selectedTableRef.value?.getGridApi().getSelectedRows();
      if (productList) {
        deleteSelectedProductInfo(productList);
      }
    }

    //清空已选按钮事件
    function clickedClearSelected() {
      selectedTableRef.value?.getGridApi().setRowData([]);
    }

    //是已添加？
    function isAdded(product: IProduct): boolean {
      const selectedProductList: IProduct[] = getMultipleTableDataList();
      return selectedProductList.indexOf(product) !== -1;
    }

    return {
      selectedProductTableState,
      selectProductTableState,
      valueName,
      productTableRef,
      selectedTableRef,
      findProductDto,
      multipleClickSelectReturn,
      getRowNodeId,
      categoryTreeClicked,
      onSearchChange,
      onProductTableDoubleClick,
      clickedOkSelectedDialog,
      clickedCloseSelectedDialog,
      clickedDeleteSelected,
      clickedClearSelected,
    };
  },
});
</script>