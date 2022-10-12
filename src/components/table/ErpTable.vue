<template>

  <div class="flex flex-col flex-grow w-full">
    <div v-if="props.showTopBox"
         class="flex flex-row flex-none h-9 border-l border-r border-t border-gray-300 border-solid border-black items-center px-2 py-1.5 space-x-3">
      <slot name="topBox">
      </slot>
    </div>
    <div class="flex flex-row flex-grow h-0">
      <AgGridVue :animateRows="true" :columnDefs="tableConfig.columnDefaults" :getRowStyle="setPinnedBottomRowStyle"
                 :gridOptions="tableConfig.gridOptions" :localeText="LOCALE_CN" :navigateToNextCell="navigateToNextCell"
                 :pinnedBottomRowData="tablePinnedBottomRowData" :rowData="tableData" :rowDragManaged="true"
                 :suppressMoveWhenRowDragging="true" class="ag-theme-erp flex-grow" v-bind="$attrs"
                 @cellContextMenu="onCellContextMenu" @rowDragEnd="onRowDragEnd" @grid-ready="onGridReady"
                 @drag-stopped="onDragStopped" @displayed-columns-changed="onDragStopped"
                 @click.right="onCellContextMenu">
      </AgGridVue>
      <!--列顺序调节-->
      <div v-show="tableOptionBarVisible"
           class="w-48 flex flex-col flex-none bg-gray-50 border-solid border-t border-r border-b border-gray-300 select-none">
        <div class="flex flex-none font-bold items-center bg-gray-100 py-1 px-2">
          <span class="">调整列顺序:</span>
        </div>

        <draggable v-if="tableOptionBarVisible" :list="tableSidebarColumnStateList"
                   class="px-2 py-1 overflow-y-scroll flex flex-col flex-grow h-0 space-y-0.5" drag-class="drag-class"
                   ghost-class="ghost" handle=".handle" item-key="name" @end="onTableOptionEndDrag">
          <template #item="{ element }">
            <div class="flex h-5 items-center space-x-2">
              <img alt="drag" class="handle w-4 h-4 cursor-move" src="@/assets/app_black.svg">
              <erp-input-re-checkbox v-model="element.hide" class="h-4 w-4" @change="clickedOptionItem">
              </erp-input-re-checkbox>
              <div class="">{{ element.name }}</div>
            </div>
          </template>
        </draggable>

        <div class="flex flex-none w-full items-center justify-center p-2 bg-gray-100">
          <erp-button class="w-1/2 mr-2" size="small" type="danger" @click="onRemoveColumnState">重置</erp-button>
          <erp-button class="w-1/2" size="small" type="success" @click="onSaveColumnState">保存配置</erp-button>
        </div>
      </div>
      <!--配置栏按钮-->
      <div v-show="configButtonVisible" class="w-6 border-solid border-t border-r border-b border-gray-300 flex-none">
        <div
            class="flex flex-col h-12 items-center justify-center space-y-1 text-sm font-semibold bg-gray-50 border-solid border-b border-gray-300 active:bg-gray-200 select-none cursor-pointer"
            @click="showOption">
          <div class="leading-3">
            设
          </div>
          <div class="leading-3">
            置
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, PropType, Ref, ref, UnwrapRef, watch} from "vue";
import {
  CellContextMenuEvent,
  ColumnApi,
  ColumnState,
  GridApi,
  GridReadyEvent,
  NavigateToNextCellParams,
  RowClassParams
} from "ag-grid-community";
import ErpDialog from "@/components/dialog/dialog";
import {AgGridVue} from "ag-grid-vue3";
import {ITableState} from "@/components/table/type";
import {TableColumnStateService} from "@/module/tableColumnState/tableColumnState.service";
import {LOCALE_CN} from '@/components/table/local/zh_cn';
import {defaultConfig} from "@/components/table/default/defaultConfig";
import Draggable from "vuedraggable";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpInputReCheckbox from "@/components/input/ErpInputReCheckbox.vue";

export default defineComponent({
  expose:["initTableData", "initTableDataList", "getGridApi", "getColumnApi"],
  components: {
    AgGridVue,
    Draggable,
    ErpButton,
    ErpInputReCheckbox
  },
  props: {
    tableState: Object as PropType<UnwrapRef<Ref<UnwrapRef<ITableState<any>>>>>,
    findDto: Object as PropType<{}>,
    configButtonVisible: {
      type: Boolean,
      default: true,
    },
    rightClickFilter: {
      type: Boolean,
      default: false,
    },
    tableEdit: {
      type: Boolean,
      default: true,
    },
    showTopBox: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['ready'],
  setup(props, {emit: emits}) {
    const tableConfig = {
      tableName: props.tableState?.tableName || "",
      columnDefaults: props.tableState?.columnDefaults || defaultConfig.value.columnDefaults,
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
    const tableData = ref([]);
    //表格列状态服务
    const tableColumnStateService = new TableColumnStateService(tableConfig.tableName);
    //初始化表格API
    let gridApi: GridApi;
    //列API
    let columnApi: ColumnApi;


    //初始化表格数据
    async function initTableData() {
      const data = await tableConfig.tableService.find(tableConfig.findDto);
      if (gridApi) gridApi.setRowData([]);
      gridApi.applyTransaction({add: data});
    }

    async function initTableDataList() {
      if (gridApi) gridApi.setRowData([])
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
        if (
            suggestedNextCell
            && node.rowIndex === suggestedNextCell.rowIndex
        ) {
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
          } else if (tableConfig.columnDefaults[j].children && tableConfig.columnDefaults[j].children!.length > 0) {
            for (let k = 0; k < tableConfig.columnDefaults[j].children!.length; k++) {
              if (tableConfig.columnDefaults[j].children![k].field === OptionColumnState[i].colId) {
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
        const col = tableConfig.columnDefaults[i];
        if (col.field && col.editable) {
          canEditCol.push(col.field);
        }
      }
    }

    function startEditTable() {
      //拖动显示
      gridApi.setSuppressRowDrag(false);
      //可以编辑
      for (let j = 0; j < canEditCol.length; j++) {
        const col = gridApi.getColumnDef(canEditCol[j])
        if (col) col.editable = true;
      }
    }

    function endEditTable() {
      //拖动隐藏
      gridApi.setSuppressRowDrag(true);
      //禁止编辑
      for (let j = 0; j < canEditCol.length; j++) {
        const col = gridApi.getColumnDef(canEditCol[j])
        if (col) col.editable = false;
      }
    }

    // ---------END 配置栏---------

    //导出表格API
    function getGridApi() {
      return gridApi;
    }

    function getColumnApi() {
      return columnApi;
    }

    //事件 Event

    //当表格单元格右键
    function onCellContextMenu(event: CellContextMenuEvent) {
      if (props.rightClickFilter
          && event.colDef
      ) {
        const headerName = event.colDef.headerName || '';
        const field = event.colDef.field || ''
        if (field) {
          ErpDialog({
            title: headerName,
            message: field
          })
        }
      } else {
      }
    }

    //行拖动结束,重新计算行的序号
    function onRowDragEnd() {
      gridApi.refreshCells();
    }

    //在表格准备好后
    function onGridReady(event: GridReadyEvent) {
      gridApi = event.api;
      columnApi = event.columnApi;
      initTableColumnState();
      emits('ready', event);
    }

    //在表格拖动结束后
    function onDragStopped() {
      //不能删
      if (columnApi) {
        const columnState = columnApi.getColumnState();
        tableSidebarColumnStateList.value = formatOptionColumnState(columnState);
      }
    }

    return {
      LOCALE_CN,
      defaultConfig,
      props,
      emits,
      tableConfig,
      tablePinnedBottomRowData,
      setPinnedBottomRowStyle,
      tableData,
      tableColumnStateService,
      initTableData,
      initTableDataList,
      navigateToNextCell,
      tableSidebarColumnStateList,
      tableOptionBarVisible,
      showOption,
      onSaveColumnState,
      onRemoveColumnState,
      getColumnState,
      onTableOptionEndDrag,
      clickedOptionItem,
      canEditCol,
      getGridApi,
      getColumnApi,
      onCellContextMenu,
      onRowDragEnd,
      onGridReady,
      onDragStopped,
    };
  },
});
</script>

<style lang="scss" src="./ag-theme-erp.scss">

</style>
<style lang="scss" scoped>
.ghost {
  @apply border-2 border-solid border-indigo-400 rounded
}

.drag-class {
  @apply opacity-0
}
</style>