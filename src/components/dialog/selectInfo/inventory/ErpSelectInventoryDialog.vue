<template>
  <erp-full-screen-dialog
      title="选择库存"
      @clicked-confirm="onClickedOk"
      @clicked-cancel="onClickedClose"
  >
    <template v-slot:left>
      <div class="flex flex-col h-full pr-4">
        <erp-title title="类别"></erp-title>
        <div class="flex-grow overflow-y-auto">
          <erp-product-area-tree
              :have-root-node="true"
              @node-click="onClickedProductAreaTreeNode">
          </erp-product-area-tree>
        </div>
      </div>
    </template>
    <template #default>
      <erp-title>
        <template v-slot:input>
          <erp-operate-area-auth-select
              v-model="operateareaid"
              :have-root-node="true"
              class="md:w-36"
              @change="onSearchChange">
          </erp-operate-area-auth-select>
          <erp-input-round
              v-model="findInventoryDto.productname"
              :placeholder='"输入"+valueName.product+"名称"'
              class="md:w-52"
              @change="onSearchChange">
          </erp-input-round>
          <erp-check-box
              v-model="multipleClickSelectReturn"
              class="md:w-20 md:h-10"
          >多选</erp-check-box>
        </template>
        <erp-button
            ref="refreshButtonRef"
            @click="onSearchChange"
        >刷新
        </erp-button>
      </erp-title>
      <erp-table
          ref="inventoryTableRef"
          :find-dto="findInventoryDto"
          :getRowId="getRowNodeId"
          :table-state="selectInventoryTableState"
          @rowDoubleClicked="onSelectTableDoubleClick"
          @selection-changed="()=>{}"
      >
      </erp-table>
      <div class="h-2"></div>
      <erp-table
          v-show="multipleClickSelectReturn"
          ref="multipleSelectedTableRef"
          :find-dto="{}"
          :getRowId="getMxRowNodeId"
          :table-state="selectedInventoryTableState"
          show-top-box
          table-name="已选库存"
          @selection-changed="()=>{}">
        <template #topBox>
          <div class="flex space-x-1.5">
            <erp-button :size="'mini'" type="danger" @click="clickedDeleteSelected">删除选中</erp-button>
            <erp-button :size="'mini'" @click="clickedClearSelected">清空全部</erp-button>
          </div>
        </template>
      </erp-table>
    </template>
  </erp-full-screen-dialog>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, ref} from "vue";
import {IInventoryFindDto, InventoryFindDto} from "@/module/inventory/dto/inventoryFind.dto";
import {IInventory, IInventoryForSelect} from "@/module/inventory/inventory";
import {ITableRef} from "@/components/table/type";
import {valueName} from "@/config/valueName";
import {IProductArea} from "@/module/productArea/productArea";
import {selectInventoryTableState} from "@/view/inventory/tableConfig/selectInventoryTableState";
import {selectedInventoryTableState} from "@/view/inventory/tableConfig/selectedInventoryTableState";
import { GetRowIdParams, RowDoubleClickedEvent } from "ag-grid-community";
import {IFindInventory} from "@/module/inventory/FindInventory";
import ErpFullScreenDialog from "@/components/dialog/ErpFullScreenDialog.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpProductAreaTree from "@/components/tree/component/ErpProductAreaTree.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpCheckBox from "@/components/input/ErpCheckbox.vue";

export default defineComponent({
  name: "ErpSelectInventoryDialog",
  components: {
    ErpCheckBox,
    ErpFullScreenDialog,
    ErpOperateAreaAuthSelect,
    ErpProductAreaTree,
    ErpTitle,
    ErpInputRound,
    ErpButton,
    ErpTable,
  },
  props: {
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
    resolve_dialog: {
      type: Function as PropType<(value: any) => IFindInventory[] | undefined>,
      required: true,
    },
    reject_dialog: {
      type: Function as PropType<(reason?: any) => void>,
      required: true,
    },
    unmount: {
      type: Function,
      default: () => {
      },
    },
  },
  setup(props) {
    const inventoryTableRef = ref<ITableRef>();

    const multipleSelectedTableRef = ref<ITableRef>();

    //表格行id设置
    function getRowNodeId(params: GetRowIdParams<IInventoryForSelect>) : string{
      return String(params.data.inventoryid)
    }

    //表格行id设置
    function getMxRowNodeId(params: GetRowIdParams<IInventoryForSelect>) : string{
      return String(params.data.rowNodeId)
    }

    const refreshButtonRef = ref();
    onMounted( () => {
      inventoryTableRef.value?.initTableData();
    })

    //搜索条件
    const findInventoryDto = ref<IInventoryFindDto>(new InventoryFindDto());
    findInventoryDto.value.warehouseids = props.warehouseid ? [props.warehouseid] : [];
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
    function getInventorySelectedList(): IFindInventory[] {
      return  inventoryTableRef.value?.getGridApi().getSelectedRows() as IFindInventory[]
    }

    //获取已选
    function getMultipleSelectedList(): IFindInventory[] {
      const selectedList: IFindInventory[] = [];
      multipleSelectedTableRef.value?.getGridApi().forEachNode(rowNode => {
        selectedList.push(rowNode.data);
      })
      return selectedList
    }

    //增加已选
    function addSelected(inventoryList: IInventory[]) {
      multipleSelectedTableRef.value?.getGridApi().applyTransaction({add: inventoryList});
    }

    //删除已选
    function deleteSelected(inventoryList: IInventoryForSelect[]) {
      multipleSelectedTableRef.value?.getGridApi().applyTransaction({
        remove: inventoryList.map((inventory) => {
          return {
            rowNodeId: inventory.rowNodeId
          }
        })
      });
    }

    //删除已选按钮事件
    function clickedDeleteSelected() {
      const inventoryList = multipleSelectedTableRef.value?.getGridApi().getSelectedRows();
      if (inventoryList) {
        deleteSelected(inventoryList);
      }
    }

    //清空已选按钮事件
    function clickedClearSelected() {
      multipleSelectedTableRef.value?.getGridApi().setRowData([]);
    }

    let rowNodeId = 0;
    const multipleClickSelectReturn = ref(0);

    //双击库存资料
    function onSelectTableDoubleClick(event: RowDoubleClickedEvent) {
      const inventory = JSON.parse(JSON.stringify(event.data))

      //默认单选
      if (multipleClickSelectReturn.value === 0) {
        props.resolve_dialog([inventory]);
        props.unmount();
      }
      //多选模式
      else {
        inventory.rowNodeId = rowNodeId;
        rowNodeId = rowNodeId + 1;
        addSelected([inventory]);
      }
    }


    //确定选择按钮
    async function onClickedOk() {
      if(multipleClickSelectReturn.value === 0){
        props.resolve_dialog(getInventorySelectedList());
        props.unmount();
      }else{
        props.resolve_dialog(getMultipleSelectedList());
        props.unmount();
      }
    }

    function onClickedClose() {
      props.reject_dialog();
      props.unmount();
    }

    return {
      refreshButtonRef,
      multipleClickSelectReturn,
      multipleSelectedTableRef,
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
      onClickedOk,
      onSearchChange,
      onClickedClose
    }
  }


})
</script>
