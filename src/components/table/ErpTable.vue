<template>
  <div class="h-1/3 md:flex-grow md:flex-auto flex">
    <AgGridVue
        :animateRows="true"
        :columnDefs="tableConfig.columnDefaults"
        :getRowStyle="setPinnedBottomRowStyle"
        :gridOptions="tableConfig.gridOptions"
        :localeText="LOCALE_CN"
        :pinnedBottomRowData="tablePinnedBottomRowData"
        :rowData="tableData"
        :rowDragManaged="true"
        :suppressMoveWhenRowDragging="true"
        :navigateToNextCell="navigateToNextCell"
        class="ag-theme-erp w-full"
        v-bind="$attrs"
        @rowDragEnd="onRowDragEnd"
        @grid-ready="initTableApi"
        @drag-stopped="onDragStopped"
        @displayed-columns-changed="onDragStopped"
    >
    </AgGridVue>
    <div v-show="tableOptionBarVisible"
         class="w-72 h-full bg-gray-50 border-solid border-t border-r border-b border-gray-300 select-none flex flex-col"
    >
      <div class="flex flex-none font-bold items-center bg-gray-100 py-1 px-2">
        <span class="flex-none">调整列顺序:</span>
      </div>
      <div class="flex flex-col px-2 py-1 overflow-x-auto">
        <draggable
            :list="tableSidebarColumnStateList"
            ghost-class="ghost"
            drag-class="drag-class"
            handle=".handle"
            item-key="name"
            @end="onTableOptionEndDrag"
        >
          <template #item="{ element }">
            <div class="flex items-center text-base">
              <img alt="drag" class="handle w-5 h-5 cursor-move" src="@/assets/apps_black_18dp.svg">
              <erp_input_re-checkbox v-model="element.hide" @change="clickedOptionItem"></erp_input_re-checkbox>
              <div>{{ element.name }}</div>
            </div>
          </template>
        </draggable>
      </div>
      <div class="flex flex-none w-full items-center justify-center p-2 bg-gray-100">
        <erp_button class="w-1/2 mr-2" size="small" type="danger" @click="onRemoveColumnState">重置</erp_button>
        <erp_button class="w-1/2" size="small" type="success" @click="onSaveColumnState">保存配置</erp_button>
      </div>
    </div>
    <div v-show="configButtonVisible" class="w-6 flex-none border-solid border-t border-r border-b border-gray-300 ">
      <div
          class="my-0 mx-auto h-12 text-sm font-semibold leading-4 flex items-center text-center bg-gray-50 border-solid border-b border-gray-300 active:bg-gray-200 select-none cursor-pointer"
          @click="showOption">设置
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {onBeforeMount, onMounted, Ref, ref, UnwrapRef, watch} from "vue";
import {LOCALE_CN} from '@/components/table/local/zh_cn';
import Draggable from "vuedraggable";
import Erp_button from "@/components/button/ErpButton.vue";
import {AgGridVue} from "ag-grid-vue3";
import {
  ColumnApi,
  ColumnState,
  GridApi,
  GridReadyEvent,
  NavigateToNextCellParams,
  RowClassParams
} from "ag-grid-community";
import Erp_input_reCheckbox from "@/components/input/erp_input_reCheckbox.vue";
import {ITableState} from "@/components/table/type";
import {TableColumnStateService} from "@/module/tableColumnState";
import {defaultConfig} from "@/components/table/default/defaultConfig";

const props = withDefaults(defineProps<{
  tableState?: UnwrapRef<Ref<UnwrapRef<ITableState<any>>>>,
  findDto?: {},
  configButtonVisible?: boolean
  tableEdit?: boolean
}>(), {
  configButtonVisible: true,
  tableEdit: true
})

const tableConfig = {
  tableName: props.tableState?.tableName || "",
  columnDefaults: props.tableState?.columnDefaults || [],
  gridOptions: JSON.parse(JSON.stringify(props.tableState?.gridOptions)) || {},
  tableService: props.tableState?.tableService || defaultConfig.value.tableService,
  findDto: props.findDto || ref({}).value
}

//表底部固定列
const tablePinnedBottomRowData = ref<any[]>([]);

//设置底部栏样式
function setPinnedBottomRowStyle(params: RowClassParams) {
  if (params.node.rowPinned) {
    return {"font-weight": "bold", "pointer-events": "none"};
  }
}

//表格Data
let tableData = ref([]);
//表格列状态服务
const tableColumnStateService = new TableColumnStateService(tableConfig.tableName);
//初始化表格API
let gridApi: GridApi;
//列API
let columnApi: ColumnApi;

async function initTableApi(event: GridReadyEvent) {
  gridApi = event.api;
  columnApi = event.columnApi;

}

onBeforeMount(async () => {
  await initTableColumnState();
})

onMounted(()=>{
  if (props.tableEdit) {
    startEditTable()
  } else {
    endEditTable()
  }
})

//初始化表格数据
async function initTableData() {
  const data = await tableConfig.tableService.find(tableConfig.findDto);
  if (gridApi) {
    await gridApi.setRowData([])

  }
  await gridApi.applyTransaction({add: data})
}

async function initTableDataList() {
  if (gridApi) {
    gridApi.setRowData([])
  }
}

//在表格拖动结束后
function onDragStopped() {
  //不能删
  if (columnApi) {
    const columnState = columnApi.getColumnState();
    tableSidebarColumnStateList.value = formatOptionColumnState(columnState);
  }
}

//行拖动结束,重新计算行的序号
function onRowDragEnd() {
  gridApi.refreshCells();
}

//键盘控制上下行选择
function navigateToNextCell(params: NavigateToNextCellParams) {
  const suggestedNextCell = params.nextCellPosition;

  // this is some code
  const KEY_UP = 38;
  const KEY_DOWN = 40;

  const noUpOrDownKeyPressed = params.key !== KEY_DOWN && params.key !== KEY_UP;
  if (noUpOrDownKeyPressed) {
    return suggestedNextCell;
  }

  params.api.forEachNode((node: any) => {
    if (suggestedNextCell && node.rowIndex === suggestedNextCell.rowIndex) {
      node.setSelected(true);
    }
  });

  return suggestedNextCell;
}


// ---------配置栏---------

//表格配置栏列状态数组
const tableSidebarColumnStateList = ref([]);

//表格配置栏可见
const tableOptionBarVisible = ref(false);

//控制可见方法
function showOption() {
  tableOptionBarVisible.value = !tableOptionBarVisible.value;
}

//保存表格列配置
async function onSaveColumnState() {
  tableOptionBarVisible.value = false;
  await tableColumnStateService.saveColumnState(tableSidebarColumnStateList.value);
}

//重置表格列配置
async function onRemoveColumnState() {
  tableOptionBarVisible.value = false;
  await tableColumnStateService.removeColumnState();
}

//获取表格列配置
async function getColumnState() {
  return await tableColumnStateService.getColumnState();
}

//初始化从后端加载表格列配置
async function initTableColumnState() {
  if (canEditCol.length === 0) getCanEditColList();

  if (tableConfig.tableName !== 'defaultConfig') {

    const columnState = await getColumnState();
    columnApi.applyColumnState({
      state: columnState,
      applyOrder: true
    });
    tableSidebarColumnStateList.value = formatOptionColumnState(columnApi.getColumnState());
  }
}

watch(props, (value) => {
  if (value.tableEdit) {
    startEditTable()
  } else {
    endEditTable()
  }
})

//格式化列状态数组，用于配置栏
function formatOptionColumnState(columnState: ColumnState[]) {
  const OptionColumnState = JSON.parse(JSON.stringify(columnState))
  for (let i = 0; i < OptionColumnState.length; i++) {
    for (let j = 0; j < tableConfig.columnDefaults.length; j++) {
      if (tableConfig.columnDefaults[j].field === OptionColumnState[i].colId) {
        OptionColumnState[i].name = tableConfig.columnDefaults[j].headerName;
        break;
      }
      else if(tableConfig.columnDefaults[j].children&&tableConfig.columnDefaults[j].children!.length>0){
        for (let k = 0; k < tableConfig.columnDefaults[j].children!.length; k++) {
          if(tableConfig.columnDefaults[j].children![k].field === OptionColumnState[i].colId){
            OptionColumnState[i].name = tableConfig.columnDefaults[j].headerName + '-' + tableConfig.columnDefaults[j].children![k].headerName;
            break;
          }
        }
      }
    }
  }
  return OptionColumnState
}

//表格配置栏开始拖动事件
function onTableOptionEndDrag() {
  columnApi.applyColumnState({
    state: tableSidebarColumnStateList.value,
    applyOrder: true
  });
}

//点击表格配置项
function clickedOptionItem() {
  columnApi.applyColumnState({
    state: tableSidebarColumnStateList.value,
    applyOrder: true
  });
}

const canEditCol: string[] = [];

function getCanEditColList() {
  for (let i = 0; i < tableConfig.columnDefaults.length; i++) {
    const columnDefault = tableConfig.columnDefaults[i];
    if (columnDefault.field && columnDefault.editable) {
      canEditCol.push(columnDefault.field);
    }
  }
}

function startEditTable() {
  for (let j = 0; j < canEditCol.length; j++) {
    const columnDef = gridApi.getColumnDef(canEditCol[j])
    if (columnDef) columnDef.editable = true;
  }

}

function endEditTable() {
  for (let j = 0; j < canEditCol.length; j++) {
    const columnDef = gridApi.getColumnDef(canEditCol[j])
    if (columnDef) columnDef.editable = false;
  }
}

// ---------END 配置栏---------

//导出表格API
function getGridApi() {
  return gridApi;
}

defineExpose({initTableData, initTableDataList, getGridApi});


</script>
<style lang="scss" src="./ag-theme-erp.scss"></style>
<style lang="scss" scoped>
.ghost {
  @apply border-2 border-solid border-indigo-400 rounded
}

.drag-class{
  @apply opacity-0
}
</style>