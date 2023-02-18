<template>
  <erp-form-dialog
      title="设置表格列" @clickedClose="close" @clickedConfirm="save" v-bind="$attrs"
  >
    <div class="h-96 flex flex-col">
      <!--option list-->
      <draggable
          :list="tableColumnStateList"
          class="py-2 pr-4 overflow-y-scroll flex flex-col flex-grow h-0 space-y-1.5"
          drag-class="drag-class"
          ghost-class="ghost"
          handle=".handle"
          item-key="colId"
          @end="()=>{}">
        <!--option item-->
        <template #item="{ element }">
            <div :key="element.colId" class="flex h-14 border-2 border-solid rounded py-2 px-3 items-center space-x-2">
              <img alt="drag" class="handle w-4 h-4 cursor-move" src="@/assets/app_black.svg">
              <span class="flex-none">显示:</span>
              <erp-input-re-checkbox v-if="!element.isGroup" v-model="element.hide" class="h-4 w-4"/>
              <span class="flex-none">列名:</span>
              <erp-input-round v-model.trim="element.headerName" class="py-0 h-7 rounded-none" type="text" />
              <span class="flex-none">固定位置:</span>
              <erp-input-round v-model.trim="element.pinned" class="py-0 h-7 rounded-none" type="text" />
              <span class="flex-none">宽度:</span>
              <erp-input-round v-model.number="element.width" class="py-0 h-7 rounded-none" type="text" />
            </div>
        </template>
      </draggable>

    </div>
    <template #button>
      <erp-button class="w-full sm:w-auto" @click="remove" :type="'danger'">重置</erp-button>
    </template>
  </erp-form-dialog>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref} from "vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import {ITableColumnState} from "@/module/tableColumnState/tableColumnState.service";
import ErpInputReCheckbox from "@/components/input/ErpInputReCheckbox.vue";
import Draggable from "vuedraggable";
import ErpButton from "@/components/button/ErpButton.vue";
import {TableCol} from "@/components/table/TableCol";
import useErpDialog from "@/components/dialog/useErpDialog";
import ErpInputRound from "@/components/input/ErpInputRound.vue";

export default defineComponent({
  name: "ErpTableEditOptionDialog",
  props: {
    gridCol: {
      type: Object as PropType<TableCol>,
      required: true
    }
  },
  emits:['clickedConfirm','clickedClose'],
  components: {
    ErpInputRound,
    ErpButton,
    ErpInputReCheckbox,
    ErpFormItem,
    ErpForm,
    ErpFormDialog,
    Draggable
  },
  setup(props,{emit}) {
    const tableColumnStateList = ref<ITableColumnState[]>([]);

    onMounted(() => {
      init();
    })

    function init() {
      tableColumnStateList.value = props.gridCol.getGridTableColumnState()
    }

    async function save() {
      props.gridCol.setSnToTableColumnState(tableColumnStateList.value)
      await props.gridCol.saveColumnDefine(tableColumnStateList.value);
      init();
      emit('clickedConfirm');

    }

    function close() {
      emit('clickedClose');
    }

    async function remove() {
      await useErpDialog({
        message: "是否重置配置"
      })
      await props.gridCol.removeColumnDefine();
      init();
      emit('clickedClose');
    }

    return {
      tableColumnStateList,
      save,
      remove,
      close
    }
  }

});
</script>

<style lang="scss" scoped>
.ghost{
  @apply border-2 border-solid border-blue-500 shadow-xl
}

.drag-class{
  @apply opacity-0
}
</style>