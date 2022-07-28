<template>
  <erp_dialog_form title="新增客户地区资料"
                   v-bind="$attrs"
                   @clickedConfirm="onConfirmDialog"
                   @clickedCancel="onCancelDialog">
    <erp_form>
      <erp_form_item label-for-name="客户地区编号" md-col="8" lg-col="8">
        <erp_input_rounded ref="defaultInputFocus" v-model="createClientArea.clientareacode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="客户地区名称" md-col="8" lg-col="8">
        <erp_input_rounded v-model="createClientArea.clientareaname"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="所属地区" md-col="8" lg-col="8">
        <erp-client-area-have-root-select v-model="createClientArea.parentid"></erp-client-area-have-root-select>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang='ts'>
import {onMounted, reactive, ref} from "vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import {ICreateClientAreaDto} from "@/module/clientArea/clientArea";
import ErpClientAreaHaveRootSelect from "@/components/select/ErpClientAreaHaveRootSelect.vue";
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";

const props = withDefaults(defineProps<{
  visible?: boolean
}>(), {visible: false})
const emits = defineEmits(['ok', 'close', 'update:visible'])

const defaultInputFocus = ref();
onMounted(async () => {
  defaultInputFocus.value.getNode().focus();
})

//新增客户地区Dto
const createClientArea = reactive<ICreateClientAreaDto>({
  clientareacode: "",
  clientareaname: "",
  parentid: 0,
});

//确定按钮
async function onConfirmDialog() {
  const clientAreaService = new ClientAreaService();
  await clientAreaService.create(createClientArea);
  emits('ok');
  emits('update:visible', false);
}

// 取消按钮
function onCancelDialog() {
  emits('update:visible', false);
}
</script>