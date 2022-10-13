<template>
  <erp-left-right-structure-dialog>
    <template v-slot:left>
      <div class="flex flex-col h-full pr-4">
        <erp-title title="类别"></erp-title>
        <div class="flex-grow overflow-y-auto">
          <erp-product-area-tree
              :have-root-node="true"
              @node-click="onClickedProductAreaTreeNode"></erp-product-area-tree>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <erp-title title="选择库存">
        <template v-slot:input>
          <erp-operate-area-auth-select
              v-model="operateareaid"
              :have-root-node="true"
              class="md:w-36"
              @change="onSearchChange"
          ></erp-operate-area-auth-select>
          <erp-input-round v-model="findInventoryDto.productname" :placeholder='"输入"+valueName.product+"名称"' class="md:w-52"
                           @change="onSearchChange"></erp-input-round>
        </template>
        <erp-button @click="onSearchChange">刷新</erp-button>
        <erp-button type="success" @click="onClickedOk">确定选择</erp-button>
        <erp-button @click="onClickedClose">取消选择</erp-button>
      </erp-title>
      <erp-table ref="inventoryTableRef"
                 :find-dto="findInventoryDto"
                 :getRowNodeId="getRowNodeId"
                 :table-state="selectInventoryTableState"
                 @rowDoubleClicked="onSelectTableDoubleClick"
                 @selection-changed="()=>{}"
      >
      </erp-table>
      <erp-title class="mt-1" title="已选库存">
        <erp-button type="danger" @click="clickedDeleteSelected">删除已选</erp-button>
        <erp-button @click="clickedClearSelected">清空已选</erp-button>
      </erp-title>
      <erp-table ref="inventorySelectedTableRef"
                 :find-dto="{}"
                 :getRowNodeId="getMxRowNodeId"
                 :table-state="selectedInventoryTableState"
                 @selection-changed="()=>{}">
      </erp-table>
    </template>
  </erp-left-right-structure-dialog>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, ref} from "vue";
import {FindInventoryDto, IFindInventoryDto} from "@/module/inventory/dto/FindInventory.dto";
import {IInventory, IInventoryForSelect} from "@/module/inventory/inventory";
import {ITableRef} from "@/components/table/type";
import {valueName} from "@/config/valueName";
import {IProductArea} from "@/module/productArea/productArea";
import {selectInventoryTableState} from "@/view/inventory/tableConfig/selectInventoryTableState";
import {selectedInventoryTableState} from "@/view/inventory/tableConfig/selectedInventoryTableState";
import {RowDoubleClickedEvent} from "ag-grid-community";
import {IFindInventory} from "@/module/inventory/FindInventory";
import ErpLeftRightStructureDialog from "@/components/dialog/ErpLeftRightLayoutDialog.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpProductAreaTree from "@/components/tree/component/ErpProductAreaTree.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";

export default defineComponent({
  name: "ErpSelectInventoryDialog",
  components: {
    ErpLeftRightStructureDialog,
    ErpOperateAreaAuthSelect,
    ErpProductAreaTree,
    ErpTitle,
    ErpInputRound,
    ErpButton,
    ErpTable,
  },
  props: {
    unmount: {
      type: Function,
      required: true,
      default: () => {
      }
    },
    ok: {
      type: Function as PropType<(inventoryList: IInventory[]) => Promise<IInventory[]> | IInventory[]>,
      required: false,
      default: () => {
      }
    },
    close: {
      type: Function as PropType<() => void>,
      required: false,
      default: () => {
      }
    },
    warehouseid: {
      type: Number,
      required: true,
      default: 0
    },
    clientid: {
      type: Number,
      required: true,
      default: 0
    },
  },
  setup(props) {
    const inventoryTableRef = ref<ITableRef>();
    const inventorySelectedTableRef = ref<ITableRef>();

    function getRowNodeId(data: IInventoryForSelect) {
      return data.inventoryid;
    }

    function getMxRowNodeId(data: IInventoryForSelect) {
      return data.rowNodeId;
    }


    onMounted(() => {
      inventoryTableRef.value?.initTableData();
    })

    //搜索条件
    const findInventoryDto = ref<IFindInventoryDto>(new FindInventoryDto());
    findInventoryDto.value.warehouseids = [props.warehouseid];
    findInventoryDto.value.clientid = props.clientid;

    //搜索
    async function onSearchChange() {
      await inventoryTableRef.value?.initTableData();
    }

    //仓库id 计算属性
    const warehouseid = computed({
      get: () => {
        if (findInventoryDto.value.warehouseids.length === 0) {
          return 0
        } else {
          return findInventoryDto.value.warehouseids[0];
        }
      }, set: val => {
        if (val === 0) {
          findInventoryDto.value.warehouseids = [];
        } else {
          findInventoryDto.value.warehouseids = [val];
        }
      }
    })

    //操作区域id 计算属性
    const operateareaid = computed({
      get: () => {
        if (findInventoryDto.value.operateareaids.length === 0) {
          return 0
        } else {
          return findInventoryDto.value.operateareaids[0];
        }
      }, set: val => {
        if (val === 0) {
          findInventoryDto.value.operateareaids = [];
        } else {
          findInventoryDto.value.operateareaids = [val];
        }
      }
    })

    //点击产品类别
    async function onClickedProductAreaTreeNode(productAreaItem: IProductArea) {
      findInventoryDto.value.productareaid = productAreaItem.productareaid;
      //按产品类别筛选
      await onSearchChange();
    }

    //获取已选
    function getSelectedList(): IFindInventory[] {
      const selectedList: IFindInventory[] = [];
      inventorySelectedTableRef.value?.getGridApi().forEachNode(rowNode => {
        selectedList.push(rowNode.data);
      })
      return selectedList
    }

    //增加已选
    function addSelected(inventoryList: IInventory[]) {
      inventorySelectedTableRef.value?.getGridApi().applyTransaction({add: inventoryList});
    }

    //删除已选
    function deleteSelected(inventoryList: IInventoryForSelect[]) {
      inventorySelectedTableRef.value?.getGridApi().applyTransaction({
        remove: inventoryList.map((inventory) => {
          return {
            rowNodeId: inventory.rowNodeId
          }
        })
      });
    }

    //删除已选按钮事件
    function clickedDeleteSelected() {
      const inventoryList = inventorySelectedTableRef.value?.getGridApi().getSelectedRows();
      if (inventoryList) {
        deleteSelected(inventoryList);
      }
    }

    //清空已选按钮事件
    function clickedClearSelected() {
      inventorySelectedTableRef.value?.getGridApi().setRowData([]);
    }

    let rowNodeId = 0;

    //双击库存资料
    function onSelectTableDoubleClick(event: RowDoubleClickedEvent) {
      const inventory = JSON.parse(JSON.stringify(event.data))
      inventory.rowNodeId = rowNodeId;
      rowNodeId = rowNodeId + 1;
      addSelected([inventory]);
    }

//取消选择按钮
    async function onClickedClose() {
      await props.close();
      await props.unmount();
    }

//确定选择按钮
    async function onClickedOk() {
      await props.ok(getSelectedList());
      await props.unmount();
    }

    return {
      inventorySelectedTableRef,
      inventoryTableRef,
      valueName,
      warehouseid,
      operateareaid,
      selectInventoryTableState,
      selectedInventoryTableState,
      findInventoryDto,
      getRowNodeId,
      getMxRowNodeId,
      onClickedProductAreaTreeNode,
      clickedDeleteSelected,
      clickedClearSelected,
      onSelectTableDoubleClick,
      onClickedClose,
      onClickedOk,
      onSearchChange
    }
  }


})
</script>
