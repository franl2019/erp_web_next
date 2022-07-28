<template>
  <erp_dialog_form
      title="修改客户地区资料"
      v-bind="$attrs"
      @clickedConfirm="onConfirmDialog"
      @clickedCancel="onCancelDialog"
  >
    <erp_form>
      <erp_form_item label-for-name="客户地区编号" md-col="8" lg-col="8">
        <erp_input_rounded ref="defaultInputFocus" v-model="updateClientArea.clientareacode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="客户地区名称" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateClientArea.clientareaname"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="所属地区" md-col="8" lg-col="8">
        <erp-client-area-have-root-select v-model="updateClientArea.parentid"></erp-client-area-have-root-select>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang='ts'>
import {onMounted, reactive, ref} from "vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import {IClientArea, IUpdateClientAreaDto} from "@/module/clientArea/clientArea";
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";
import ErpClientAreaHaveRootSelect from "@/components/select/ErpClientAreaHaveRootSelect.vue";

const props = withDefaults(defineProps<{
  clientArea: IUpdateClientAreaDto;
  visible?: boolean
}>(), {})

const emits = defineEmits(['ok', 'close', 'update:visible'])
const defaultInputFocus = ref();
onMounted(async () => {
  await getRootClientAreaList();
  setUpdateClientAreaDto();
  defaultInputFocus.value.getNode().focus();
})

//选择所属客户地区数组
let clientAreaSelectList = ref<IClientArea[]>([]);
const clientAreaService = new ClientAreaService();

//获取（选择所属客户地区数组）
async function getRootClientAreaList() {
  clientAreaSelectList.value = await clientAreaService.getClientAreaListHaveRoot();
}


function setUpdateClientAreaDto() {
  updateClientArea.clientareaid = props.clientArea.clientareaid;
  updateClientArea.clientareaname = props.clientArea.clientareaname;
  updateClientArea.clientareacode = props.clientArea.clientareacode;
  updateClientArea.parentid = props.clientArea.parentid;
}

//编辑客户地区Dto
let updateClientArea = reactive<IUpdateClientAreaDto>({
  clientareaid: 0,
  clientareacode: "",
  clientareaname: "",
  parentid: 0,
});

//确定按钮
async function onConfirmDialog() {
  await clientAreaService.update(updateClientArea);
  emits('ok');
  emits('update:visible', false);
}

// 取消按钮
function onCancelDialog() {
  emits('close');
  emits('update:visible', false);
}
</script>