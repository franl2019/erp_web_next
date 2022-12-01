<template>
  <erp-popover
      :offset-x="-1"
      :offset-y="1"
      :placement="'bottom-start'"
      :popover-visible="popoverVisible"
  >
    <template #reference>
      <input
          ref="inputRef"
          v-model="value"
          class="w-full h-full rounded-none text-sm px-1"
          type="text"
          @keydown.stop="onKeyDownInput"
      >
    </template>
    <template #popper>
      <erp-table
          ref="tableRef"
          init
          :find-dto="findDto"
          :navigateToNextCell="navigateToNextCell"
          :table-state="tableEditorProductCodeConfig"
          class="h-52 shadow-md"
          style="width:30rem"
          @cellDoubleClicked="onTableCellDoubleClicked"
          @keydown.stop="onKeydownPopover"
      ></erp-table>
    </template>
  </erp-popover>

</template>

<script lang='ts'>
import ErpTable from "@/components/table/ErpTable.vue";
import ErpPopover from "@/components/popover/ErpPopover.vue";
import {defineComponent, nextTick, onMounted, ref, watch} from "vue";
import {
  tableEditorProductCodeConfig
} from "@/components/table/components/editor/ProductCode/config/tableEditorProductCodeConfig";
import {ITableRef} from "@/components/table/type";
import {IFindProductDto} from "@/module/product/dto/findProduct.dto";
import {CellDoubleClickedEvent, NavigateToNextCellParams} from "ag-grid-community";

export default defineComponent({
  name:"TableEditorProductCode",
  components:{
    ErpTable,
    ErpPopover,
  },
  props: ["params"],
  setup(props,{expose}) {

    onMounted(() => {
      value.value = props.params.value;

      nextTick(() => {
        inputRef.value.focus();
      })
    })


    const inputRef = ref();
    const tableRef = ref<ITableRef>();

    const value = ref()
    let productReturn: any = null
    const popoverVisible = ref(true);


    const findDto = ref<IFindProductDto>({
      page: 0,
      pagesize: 0,
      productareaid: 0,
      search: "",
      useflag: 1,
      warehouseids: []
    })

    function getValue() {
      return productReturn;
    }

    expose({getValue});

    watch(value, () => {
      findDto.value.search = value.value;
      tableRef.value?.initTableData();
    })

    async function onKeyDownInput(event: KeyboardEvent) {

      const key = event.key;
      const shiftKey = event.shiftKey;

      //回车 显示弹框 焦点到弹框
      if (key === 'Enter' && !shiftKey) {
        event.preventDefault();
        props.params.stopEditing();
      }

      //Tab 跳到下一个输入框
      if (key === 'Tab' && !shiftKey) {
        event.preventDefault();
        props.params.api.tabToNextCell();
      }

      //[ Tab ] + [ Shift ] 跳到上一个输入框
      if (key === 'Tab' && shiftKey) {
        event.preventDefault();
        props.params.api.tabToPreviousCell();
      }

      //方向键 [ ↑ ] 取消默认事件
      if (key === 'ArrowUp' && !shiftKey) {
        event.preventDefault();
        selectTableFirstRow();
      }

      //方向键 [ ↓ ] 取消默认事件 跳到表格第一条
      if (key === 'ArrowDown' && !shiftKey) {
        event.preventDefault();
        selectTableFirstRow();
      }
    }

//选择表格第一行
    function selectTableFirstRow() {
      tableRef.value?.getGridApi().ensureIndexVisible(0);
      const firstCol = tableRef.value?.getColumnApi().getAllDisplayedColumns()[0];
      if (!firstCol) return

      tableRef.value?.getGridApi().ensureColumnVisible(firstCol);
      tableRef.value?.getGridApi().setFocusedCell(0, firstCol);
      tableRef.value?.getGridApi().forEachNode((node: any) => {
        if (node.rowIndex === 0) {
          node.setSelected(true);
        }
      });
    }

//键盘控制上下行选择
    function navigateToNextCell(params: NavigateToNextCellParams) {

      const suggestedNextCell = params.nextCellPosition;

      params.api.forEachNode((node: any) => {

        if (suggestedNextCell && node.rowIndex === suggestedNextCell.rowIndex) {
          node.setSelected(true);
        }
      });

      if (suggestedNextCell?.rowIndex !== -1) {
        return suggestedNextCell;
      }

    }

    function onKeydownPopover(event: KeyboardEvent) {
      const key = event.key;

      if (
          key !== 'ArrowUp'
          && key !== 'ArrowDown'
          && key !== 'Enter'
      ) {
        // && key !== 'ArrowLeft'
        // && key !== 'ArrowRight'
        inputRef.value.focus();
      }

      if (key === 'Enter') {
        returnProduct();
      }
    }

    function returnProduct() {
      const product = tableRef.value?.getGridApi().getSelectedRows()[0]
      if (product) {
        popoverVisible.value = false;
        productReturn = product
        nextTick(() => {
          props.params.api.tabToNextCell();
        })
        // emitter.emit('tableSelectProduct',product);
      }
    }

    function onTableCellDoubleClicked(event: CellDoubleClickedEvent) {
      if (
          event.data.productid !== null
          && event.data.productid !== 0
      ) {
        returnProduct();
      }
    }

    return {
      tableEditorProductCodeConfig,
      inputRef,
      tableRef,
      value,
      productReturn,
      popoverVisible,
      findDto,
      getValue,
      onKeyDownInput,
      navigateToNextCell,
      onKeydownPopover,
      onTableCellDoubleClicked,
    };
  },
});
</script>
