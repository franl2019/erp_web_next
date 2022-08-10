<template>
  <erp-popover
    :popover-visible="popoverVisible"
    width="30rem"
    :placement="'bottom-start'"
    :offset-x="-1"
    :offset-y="1"
  >
    <template #reference>
      <input
          ref="inputRef"
          class="w-full h-full p-0 rounded-none text-sm px-1"
          type="text"
          v-model="value"
          @keydown.stop="onKeyDownInput"
      >
    </template>
    <template #popper>
        <erp-table
            ref="tableRef"
            class="h-full w-full shadow-md"
            :table-state="tableEditorProductCodeConfig"
            :config-button-visible="false"
            :find-dto="findDto"
            :navigateToNextCell="navigateToNextCell"
            @keydown.stop="onKeydownPopover"
        ></erp-table>
    </template>
  </erp-popover>

</template>

<script lang='ts' setup>
import {nextTick, onMounted, ref, unref, watch} from "vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {tableEditorProductCodeConfig} from "@/components/table/components/editor/config/tableEditorProductCodeConfig";
import {ITableRef} from "@/components/table/type";
import {IFindProductDto} from "@/module/product/dto/findProduct.dto";
import {ICellEditorParams, NavigateToNextCellParams} from "ag-grid-community";
import ErpPopover from "@/components/popover/ErpPopover.vue";


const props = defineProps<{
  params: ICellEditorParams
}>()

onMounted(() => {
  value.value = props.params.value;

  nextTick(() => {
    inputRef.value.focus();
  })
})


const inputRef = ref();
const tableRef = ref<ITableRef>();

const value = ref()
let productReturn:any = null
const popoverVisible = ref(true);


const findDto = ref<IFindProductDto>({page: 0, pagesize: 0, productareaid: 0, search: "", useflag: 1, warehouseids: []})

function getValue() {
  return productReturn;
}

defineExpose({getValue});

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
    const product = tableRef.value?.getGridApi().getSelectedRows()[0]
    if(product){
      popoverVisible.value = false;
      productReturn = product
      nextTick(()=>{
        props.params.api.tabToNextCell();
      })
      // emitter.emit('tableSelectProduct',product);
    }

  }
}
</script>
