<template>
  <div class="flex flex-col flex-grow w-full">
    <erp-table-filter-tips-box
        v-if="$props.showFilterTipsBox"
    >
      <div class="overflow-x-auto flex flex-nowrap items-center whitespace-nowrap text-sm">
        <div class="flex flex-none items-center cursor-pointer" @click="resetFindDto">
          <img alt="刷新" class="h-4 w-4" src="@/assets/refresh_black_24dp.svg"/>
          <a>刷新</a>
        </div>
        <div class="w-2"></div>
        <a>筛选条件：</a>
        <a class="hover:underline underline-offset-4 cursor-pointer" @click="onClickedFilterButton">
          {{ filterTipsString }}
        </a>
      </div>
    </erp-table-filter-tips-box>
    <erp-table-top-box
        v-if="$props.showTopBox || $props.tableName.length > 0"
    >
      <span
          v-if="$props.tableName.length>0"
          class="text-sm font-bold mx-2"
      >{{ $props.tableName }}</span>
      <div
          v-if="$slots.topBox"
          class="flex-grow flex mx-2">
        <slot name="topBox">
        </slot>
      </div>
    </erp-table-top-box>
    <div class="flex flex-row flex-grow h-0">
      <AgGridVue
          :animateRows="true"
          :columnDefs="tableConfig.columnDefaults"
          :getRowStyle="setPinnedBottomRowStyle"
          :gridOptions="tableConfig.gridOptions"
          :localeText="LOCALE_CN"
          :navigateToNextCell="onNavigateToNextCell"
          :rowDragManaged="true"
          :suppressMoveWhenRowDragging="true"
          class="ag-theme-erp flex-grow"
          v-bind="$attrs"
          @cellContextMenu="onCellContextMenu"
          @rowDragEnd="onRowDragEnd"
          @grid-ready="onGridReady"
      >
      </AgGridVue>
      <erp-table-option-tab>
        <erp-table-option-tab-bar
            v-if="$props.showFilterTipsBox"
            @click="onClickedFilterButton"
        >筛选
        </erp-table-option-tab-bar>
        <erp-table-option-tab-bar @click="onClickSaveTableOptionBar">保存设置</erp-table-option-tab-bar>
        <erp-table-option-tab-bar @click="onClickShowTableOptionBar">更多设置</erp-table-option-tab-bar>
      </erp-table-option-tab>
    </div>
    <erp-table-bottom-box
        v-if="$props.showButtonBox"
    >
      <div
          v-if="$slots.buttonBox"
          class="flex-grow flex mx-2">
        <slot name="buttonBox">
        </slot>
      </div>
    </erp-table-bottom-box>
  </div>
</template>

<script lang='ts'>
import {defineComponent, PropType, ref, unref, UnwrapRef, watch} from "vue";
import {
  CellContextMenuEvent,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  NavigateToNextCellParams,
  RowClassParams
} from "ag-grid-community";
import {AgGridVue} from "ag-grid-vue3";
import {ITableConfig} from "@/components/table/type";
import {LOCALE_CN} from '@/components/table/local/zh_cn';
import {defaultConfig} from "@/components/table/default/defaultConfig";
import Draggable from "vuedraggable";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpInputReCheckbox from "@/components/input/ErpInputReCheckbox.vue";
import {TableCol} from "@/components/table/TableCol";
import ErpTableEditOptionDialog from "@/components/table/components/OptionDialog/ErpTableEditOptionDialog.vue";
import ErpTableOptionTabBar from "@/components/table/components/ErpTableOptionTabBar.vue";
import ErpTableOptionTab from "@/components/table/components/ErpTableOptionTab.vue";
import ErpTableTopBox from "@/components/table/components/ErpTableTopBox.vue";
import ErpTableBottomBox from "@/components/table/components/ErpTableBottomBox.vue";
import {useTableOptionDialog} from "@/components/table/components/OptionDialog/useTableOptionDialog";
import ErpTableFilterTipsBox from "@/components/table/components/ErpTableFilterTipsBox.vue";
import {useFindDtoFormatToFilterTips} from "@/components/table/filter/useFindDtoFormatToFilterTips";
import {TableFilterDialogOption, useTableFilterDialog} from "@/components/table/filter/useTableFilterDialog";

export default defineComponent({
  name: "ErpTable",
  emits: ['ready', 'refresh'],
  components: {
    ErpTableFilterTipsBox,
    ErpTableTopBox,
    ErpTableBottomBox,
    ErpTableOptionTab,
    ErpTableOptionTabBar,
    ErpTableEditOptionDialog,
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
      type: Object as PropType<UnwrapRef<ITableConfig<any>>>,
      default: defaultConfig
    },
    findDto: {
      type: Object as PropType<any>,
      default: {}
    },
    tableEdit: {
      type: Boolean,
      default: true,
    },
    showTopBox: {
      type: Boolean,
      default: false,
    },
    showButtonBox: {
      type: Boolean,
      default: false,
    },
    showFilterTipsBox: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit, expose}) {
    const {tableState} = unref(props);
    const defaultFindDto = JSON.parse(JSON.stringify(props.findDto));
    const tableConfig = {
      tableName: tableState.tableName,
      columnDefaults: tableState.columnDefaults,
      gridOptions: tableState.gridOptions,
      tableService: tableState.tableService,
    }

    const gridCol = new TableCol(
        tableConfig.tableName,
        getGridApi,
        getColumnApi,
    );

    const {
      startEditTable,
      endEditTable,
      init: initGridColumn,
    } = gridCol;

    let gridApi: GridApi | null;
    let columnApi: ColumnApi | null;

    //在表格准备好后
    async function onGridReady(event: GridReadyEvent) {
      gridApi = event.api;
      columnApi = event.columnApi;
      gridApi.setRowData([]);
      await initGridColumn();
      emit('ready', event);
      if (props.init) {
        await initTableData();
      }
    }


    //导航到下一个单元格
    function onNavigateToNextCell(params: NavigateToNextCellParams) {
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

    //设置底部栏样式
    function setPinnedBottomRowStyle(params: RowClassParams) {
      if (params.node.rowPinned) {
        return {
          "font-weight": "bold",
          "pointer-events": "none"
        };
      }
    }

    //行拖动结束,重新计算行的序号
    function onRowDragEnd() {
      if (gridApi) gridApi.refreshCells();
    }


    const filterTipsString = ref<string>("");

    function findDtoFormatToFilterTipsString(findDto: any) {
      return useFindDtoFormatToFilterTips(findDto);
    }

    //初始化表格数据
    async function initTableData() {
      if (gridApi) {
        const data = await tableConfig.tableService.find(props.findDto);
        gridApi.setRowData([]);
        gridApi.applyTransaction({add: data});
        filterTipsString.value = findDtoFormatToFilterTipsString(props.findDto);
      }
    }


    //清空表格data
    async function initTableDataList() {
      if (gridApi) gridApi.setRowData([])
    }


    watch(props, (value) => {
      if (value.tableEdit) {
        startEditTable()
      } else {
        endEditTable()
      }
    })

    function getGridApi() {
      return gridApi ? gridApi : null
    }

    function getColumnApi() {
      return columnApi ? columnApi : null
    }

    async function onClickShowTableOptionBar() {
      await useTableOptionDialog({gridCol: gridCol});
    }

    function onClickSaveTableOptionBar() {
      gridCol.saveColumnDefine(gridCol.getGridTableColumnState())
    }

    async function onClickedFilterButton() {
      await filterData(props.findDto, defaultFindDto);
    }

    async function filterData(findDto: any, defaultFindDto: any, option?: TableFilterDialogOption) {
      const filterResult = await useTableFilterDialog(findDto, defaultFindDto, option);

      for (const filterResultKey in filterResult) {
        if (props.findDto.hasOwnProperty(filterResultKey)) {
          props.findDto[filterResultKey] = filterResult[filterResultKey];
        }
      }

      await initTableData();
    }

    function initFindDto() {
      for (const defaultFindDtoKey in defaultFindDto) {
        if (props.findDto.hasOwnProperty(defaultFindDtoKey)) {
          props.findDto[defaultFindDtoKey] = defaultFindDto[defaultFindDtoKey];
        }
      }
    }

    function resetFindDto() {
      emit('refresh')
    }

    //当表格单元格右键筛选
    async function onCellContextMenu(event: CellContextMenuEvent) {
      const colId = event.column.getColId();
      const colValue = event.value;
      await filterData(props.findDto, defaultFindDto, {
        colId,
        colValue
      });
    }


    expose({initTableData, initTableDataList, initFindDto, getGridApi, getColumnApi});

    return {
      gridCol,
      LOCALE_CN,
      tableConfig,
      filterTipsString,
      setPinnedBottomRowStyle,
      onClickedFilterButton,
      onNavigateToNextCell,
      onCellContextMenu,
      onRowDragEnd,
      onGridReady,
      getColumnApi,
      onClickShowTableOptionBar,
      onClickSaveTableOptionBar,
      resetFindDto,
      initFindDto
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