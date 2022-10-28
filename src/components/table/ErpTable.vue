<template>
  <div class="flex flex-col flex-grow w-full">
    <erp-table-top-box
        v-if="$props.showTopBox || $props.tableName.length > 0"
    >
      <span class="text-sm font-bold">{{ $props.tableName }}</span>
      <div class="flex-grow flex">
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
          @click.right="onCellContextMenu"
      >
      </AgGridVue>
      <erp-table-option-tab>
        <erp-table-option-tab-bar @click="onClickSaveTableOptionBar">保存</erp-table-option-tab-bar>
        <erp-table-option-tab-bar @click="onClickShowTableOptionBar">更多</erp-table-option-tab-bar>
      </erp-table-option-tab>
    </div>
  </div>

  <erp-table-edit-option-dialog
      v-if="optionBarVisible"
      :grid-col="gridCol"
      @clickedClose="onClickedOptionClose"
      @clickedConfirm="onClickedOptionConfirm"
  />
</template>

<script lang='ts'>
import {defineComponent, PropType, ref, unref, UnwrapRef, watch} from "vue";
import {ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {AgGridVue} from "ag-grid-vue3";
import {ITableConfig} from "@/components/table/type";
import {LOCALE_CN} from '@/components/table/local/zh_cn';
import {defaultConfig} from "@/components/table/default/defaultConfig";
import Draggable from "vuedraggable";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpInputReCheckbox from "@/components/input/ErpInputReCheckbox.vue";
import {TableCol} from "@/components/table/TableCol";
import {Table} from "@/components/table/Table";
import ErpTableEditOptionDialog from "@/components/table/components/ErpTableEditOptionDialog.vue";
import ErpTableOptionTabBar from "@/components/table/components/ErpTableOptionTabBar.vue";
import ErpTableOptionTab from "@/components/table/components/ErpTableOptionTab.vue";
import ErpTableTopBox from "@/components/table/components/ErpTableTopBox.vue";

export default defineComponent({
  name:"ErpTable",
  emits: ['ready'],
  components: {
    ErpTableTopBox,
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
      type: Object as PropType<{}>,
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
  },
  setup(props, {emit, expose}) {
    const {tableState, findDto} = unref(props);
    const tableConfig = {
      tableName: tableState.tableName,
      columnDefaults: tableState.columnDefaults,
      gridOptions: tableState.gridOptions,
      tableService: tableState.tableService,
      findDto: findDto
    }

    const tableCol = new TableCol(
        tableConfig.tableName,
        getGridApi,
        getColumnApi,
    );

    const {
      startEditTable,
      endEditTable,
      init: initGridColumn,
    } = tableCol;

    const {
      setPinnedBottomRowStyle,
      onNavigateToNextCell,
      onCellContextMenu,
      onRowDragEnd,
    } = new Table(tableState, tableConfig.findDto);


    let gridApi: GridApi | null;
    let columnApi: ColumnApi | null;

    //在表格准备好后
    async function onGridReady(event: GridReadyEvent) {
      gridApi = event.api;
      columnApi = event.columnApi;
      await initGridColumn();
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


    const optionBarVisible = ref(false);

    function onClickShowTableOptionBar() {
      optionBarVisible.value = !optionBarVisible.value;
    }

    function onClickSaveTableOptionBar() {
      tableCol.saveColumnDefine(tableCol.getGridTableColumnState())
    }


    function onClickedOptionConfirm() {
      optionBarVisible.value = !optionBarVisible.value
    }

    function onClickedOptionClose() {
      optionBarVisible.value = !optionBarVisible.value
    }

    expose({initTableData, initTableDataList, getGridApi, getColumnApi});

    return {
      gridCol: tableCol,
      LOCALE_CN,
      tableConfig,
      optionBarVisible,
      setPinnedBottomRowStyle,
      onNavigateToNextCell,
      onCellContextMenu,
      onRowDragEnd,
      onGridReady,
      getColumnApi,
      onClickShowTableOptionBar,
      onClickSaveTableOptionBar,
      onClickedOptionClose,
      onClickedOptionConfirm
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