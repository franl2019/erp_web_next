<template>

  <div class="flex flex-col flex-grow w-full">
    <div
        v-if="$props.showTopBox || $props.tableName.length > 0"
        class="flex flex-row flex-none h-9 border-l justify-between
        border-r border-t border-solid
        items-center px-2 py-1.5 space-x-3"
        style="border-color:#bec4c7"
    >
      <span class="flex-none text-sm font-bold">{{ $props.tableName }}</span>
      <div class="">
        <slot name="topBox">
        </slot>
      </div>
    </div>
    <div class="flex flex-row flex-grow h-0">
      <AgGridVue
          :animateRows="true"
          :columnDefs="tableConfig.columnDefaults"
          :getRowStyle="setPinnedBottomRowStyle"
          :gridOptions="tableConfig.gridOptions"
          :localeText="LOCALE_CN"
          :navigateToNextCell="navigateToNextCell"
          :pinnedBottomRowData="tablePinnedBottomRowData"
          :rowData="tableData"
          :rowDragManaged="true"
          :suppressMoveWhenRowDragging="true"
          class="ag-theme-erp flex-grow"
          v-bind="$attrs"
          @cellContextMenu="onCellContextMenu"
          @rowDragEnd="onRowDragEnd"
          @grid-ready="onGridReady"
          @drag-stopped="onDragColumn"
          @displayed-columns-changed="onDisplayedColumnsChanged"
          @click.right="onCellContextMenu"
      >
      </AgGridVue>
      <!-- 配置栏 -->
      <table-option-bar
          ref="tableOptionBarRef"
          :grid-col="gridCol"
      />
      <div class="flex flex-col flex-none items-center
                  border-r border-y border-solid
                  w-6"
           style="border-color:#bec4c7">
        <div class="flex flex-col flex-none justify-center items-center
                    text-center text-sm font-bold leading-5
                    border-b border-solid border-gray-300
                    hover:bg-gray-100 active:bg-gray-200
                    w-full py-1.5 select-none"
             @click="showOption"
        >
          <div>设</div>
          <div>置</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, PropType, ref, unref, watch} from "vue";
import {
  CellContextMenuEvent,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  NavigateToNextCellParams,
  RowClassParams
} from "ag-grid-community";
import useErpDialog from "@/components/dialog/useErpDialog";
import {AgGridVue} from "ag-grid-vue3";
import {ITableConfig} from "@/components/table/type";
import {LOCALE_CN} from '@/components/table/local/zh_cn';
import {defaultConfig} from "@/components/table/default/defaultConfig";
import Draggable from "vuedraggable";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpInputReCheckbox from "@/components/input/ErpInputReCheckbox.vue";
import TableOptionBar from "@/components/table/components/optionBar/tableColOption.vue";
import {GridCol} from "@/components/table/GridCol";

export default defineComponent({
  emits: ['ready'],
  components: {
    TableOptionBar,
    AgGridVue,
    Draggable,
    ErpButton,
    ErpInputReCheckbox
  },
  props: {
    tableName: {
      type: String,
      default: ""
    },
    init: {
      type: Boolean,
      default: false
    },
    tableState: {
      type: Object as PropType<ITableConfig<any>>,
      default: defaultConfig.value
    },
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
  setup(props, {emit, expose}) {

    const {tableState, findDto} = unref(props);
    const tableConfig = {
      tableName: tableState!.tableName || "",
      columnDefaults: tableState!.columnDefaults || defaultConfig.value.columnDefaults,
      gridOptions: tableState?.gridOptions || {},
      tableService: tableState?.tableService || defaultConfig.value.tableService,
      findDto: findDto || {}
    }
    const gridCol = new GridCol(
        tableConfig.tableName,
        getGridApiTest,
        getColumnApiTest,
    );
    const {
      startEditTable,
      endEditTable,
      init: initGridColumn,
    } = gridCol;


    //表底部固定列
    const tablePinnedBottomRowData = ref([]);

    //设置底部栏样式
    function setPinnedBottomRowStyle(params: RowClassParams) {
      if (params.node.rowPinned) {
        return {"font-weight": "bold", "pointer-events": "none"};
      }
    }

    //表格Data
    const tableData = ref([]);
    const tableOptionBarRef = ref();
    //初始化表格API
    let gridApi: GridApi | null;
    //列API
    let columnApi: ColumnApi | null;

    //在表格准备好后
    async function onGridReady(event: GridReadyEvent) {
      gridApi = event.api;
      columnApi = event.columnApi;
      await initGridColumn();
      tableOptionBarRef.value.getTableColDefine();
      emit('ready', event);
      if (props.init) {
        await initTableData()
      }
    }

    //初始化表格数据
    async function initTableData() {
      if (gridApi) {
        const data = await tableConfig.tableService.find(tableConfig.findDto);
        gridApi.setRowData([]);
        gridApi.applyTransaction({add: data});
      }
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

    //表格配置栏可见
    const tableOptionBarVisible = ref(false);

    //控制可见方法
    function showOption() {
      tableOptionBarVisible.value = !tableOptionBarVisible.value;
    }


    watch(props, (value) => {
      if (value.tableEdit) {
        startEditTable()
      } else {
        endEditTable()
      }
    })


    //导出表格API
    function getGridApiTest() {
      return gridApi !== null ? Promise.resolve(gridApi) : Promise.reject(new Error("获取GridApi错误"))
    }

    function getColumnApiTest() {
      return columnApi !== null ? Promise.resolve(columnApi) : Promise.reject(new Error("获取ColumnApi错误"))
    }

    function getGridApi() {
      return gridApi ? gridApi : null
    }

    function getColumnApi() {
      return columnApi ? columnApi : null
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
          useErpDialog({
            title: headerName,
            message: field
          })
        }
      } else {
      }
    }

    //行拖动结束,重新计算行的序号
    function onRowDragEnd() {
      if (gridApi) {
        gridApi.refreshCells();
      }
    }

    function onDragColumn() {
      tableOptionBarRef.value.getTableColDefine();
    }

    function onDisplayedColumnsChanged() {
      // console.log(2)
    }

    expose({initTableData, initTableDataList, getGridApi, getColumnApi});

    return {
      gridCol,
      LOCALE_CN,
      tableData,
      tableConfig,
      tableOptionBarRef,
      tablePinnedBottomRowData,
      setPinnedBottomRowStyle,
      navigateToNextCell,
      onCellContextMenu,
      onRowDragEnd,
      onGridReady,
      getColumnApi,
      showOption,
      onDragColumn,
      onDisplayedColumnsChanged
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