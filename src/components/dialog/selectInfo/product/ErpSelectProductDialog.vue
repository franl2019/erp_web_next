<template>
  <erp-left-right-structure-dialog>
    <template v-slot:left>
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
    <template v-slot:default>
      <erp-title :title="'请选择'+valueName.product">
        <template v-slot:input>
          <erp-input-round
              v-model="findProductDto.search"
              class="md:w-52"
              placeholder="输入关键词"
              @change="onSearchChange"
          >
          </erp-input-round>
        </template>
        <erp-button ref="defaultFocus" type="success" @click="clickedOkSelectedDialog">确定选择</erp-button>
        <erp-button @click="clickedCloseSelectedDialog">关闭选择</erp-button>
      </erp-title>
      <erp-table ref="productTableRef" :find-dto="findProductDto" :getRowNodeId="getRowNodeId"
                 :table-state="selectProductTableState" @rowDoubleClicked="onProductTableDoubleClick"></erp-table>
      <erp-title :title="'已选'+valueName.product">
        <erp-button type="danger" @click="clickedDeleteSelected">删除已选</erp-button>
        <erp-button @click="clickedClearSelected">清空已选</erp-button>
      </erp-title>
      <erp-table ref="selectedTableRef" :find-dto="{}" :getRowNodeId="getRowNodeId"
                 :table-state="selectedProductTableState"></erp-table>
    </template>
  </erp-left-right-structure-dialog>
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
import ErpLeftRightStructureDialog from "@/components/dialog/ErpLeftRightLayoutDialog.vue";

export default defineComponent({
  name: "ErpSelectProductDialog",
  components: {
    ErpButton,
    ErpTitle,
    ErpInputRound,
    ErpTable,
    ErpProductAreaTree,
    ErpLeftRightStructureDialog,
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

    const defaultFocus = ref();

    onMounted(() => {
      defaultFocus.value.getNode().focus();
      productTableRef.value?.initTableData();
      document.onkeydown = (event) => {
        if (event.key === 'Escape') {
          props.unmount();
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

    //产品资料表行双击
    function onProductTableDoubleClick(event: RowDoubleClickedEvent) {
      if (event.data && !isAdded(event.data)) {
        addSelectedProductInfo([event.data]);
      }
    }

    async function clickedOkSelectedDialog() {
      props.resolve_dialog(getSelectedProductInfoList());
      props.unmount();
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

    //获取已选
    function getSelectedProductInfoList(): IProduct[] {
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
      const selectedProductList: IProduct[] = getSelectedProductInfoList();
      return selectedProductList.indexOf(product) !== -1;
    }

    return {
      selectedProductTableState,
      selectProductTableState,
      valueName,
      productTableRef,
      selectedTableRef,
      findProductDto,
      defaultFocus,
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