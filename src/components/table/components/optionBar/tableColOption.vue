<template>
  <div
      class="w-48 flex flex-col flex-none bg-gray-50 border-solid border-t border-r border-b border-gray-300 select-none">
    <div class="flex flex-none font-bold items-center bg-gray-100 py-1 px-2">
      <span class="">调整列顺序:</span>
    </div>

    <draggable
        :list="colDefineList"
        class="px-2 py-1 overflow-y-scroll flex flex-col flex-grow h-0 space-y-0.5"
        drag-class="drag-class"
        ghost-class="ghost"
        handle=".handle"
        item-key="name"
        @end="onDraggableEnd">
      <template #item="{ element }">
        <div class="flex h-5 items-center space-x-2">
          <img alt="drag" class="handle w-4 h-4 cursor-move" src="@/assets/app_black.svg">
          <erp-input-re-checkbox
              v-if="!element.isGroup"
              v-model="element.hide"
              class="h-4 w-4"
              @click="onClickedHideButton(element)"
          />
          <input v-model="element.headerName" class="p-0 m-0 h-full w-full" type="text">
        </div>
      </template>
    </draggable>

    <div class="flex flex-none w-full items-center justify-center p-2 bg-gray-100">
      <erp-button
          class="w-1/2 mr-2"
          size="small"
          type="danger"
          @click="onClickedRemoveButton">
        重置
      </erp-button>
      <erp-button
          class="w-1/2"
          size="small"
          type="success"
          @click="onClickedSaveButton">
        保存配置
      </erp-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import {AgGridVue} from "ag-grid-vue3";
import ErpButton from "@/components/button/ErpButton.vue";
import Draggable from "vuedraggable";
import ErpInputReCheckbox from "@/components/input/ErpInputReCheckbox.vue";
import {GridCol} from "@/components/table/GridCol";
import {ITableColumnState} from "@/module/tableColumnState/tableColumnState.service";

export default defineComponent({
  name: "TableColOption",
  props: {
    gridCol: {
      type: Object as PropType<GridCol>,
      required: true
    }
  },
  components: {
    AgGridVue,
    Draggable,
    ErpButton,
    ErpInputReCheckbox
  }, setup(props, {expose}) {

    const colDefineList = ref<ITableColumnState[]>([]);

    async function getTableColDefine() {
      colDefineList.value = (await props.gridCol.getTableColumnState()) || [];
    }

    expose({getTableColDefine});

    async function onClickedHideButton(tableColumnState: ITableColumnState) {
      const columnApi = await props.gridCol.getColumnApi();
      columnApi.applyColumnState({
        state: [{
          colId: tableColumnState.colId,
          hide: !tableColumnState.hide
        }]
      })
    }

    async function onClickedSaveButton() {
      await props.gridCol.saveColumnDefine(props.gridCol.setSnToTableColumnState(colDefineList.value));
      await props.gridCol.init();
      await getTableColDefine();
    }

    async function onClickedRemoveButton() {
      await props.gridCol.removeColumnDefine();
      await props.gridCol.init();
      await getTableColDefine();
    }

    async function onDraggableEnd() {
      const columnApi = await props.gridCol.getColumnApi();
      columnApi.applyColumnState({
        state: props.gridCol.tableColumnStateListFormatColumnStateList(colDefineList.value),
        applyOrder: true
      })
    }

    return {
      colDefineList,
      onClickedHideButton,
      onClickedSaveButton,
      onClickedRemoveButton,
      onDraggableEnd,
    }
  }
})
</script>

<style scoped>

</style>