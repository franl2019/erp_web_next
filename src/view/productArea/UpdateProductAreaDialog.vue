<template>
  <erp_dialog_form title="修改类别"
                   v-bind="$attrs"
                   @clickedConfirm="onConfirmDialog"
                   @clickedCancel="onCancelDialog"
  >
    <erp_form>
      <erp_form_item label-for-name="编号" md-col="8" lg-col="8">
        <erp_input_rounded ref="defaultInputFocus" v-model="updateProductArea.productareacode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="名称" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductArea.productareaname"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="所属类别" md-col="8" lg-col="8">
        <erp_select_productarea_root v-model="updateProductArea.parentid"></erp_select_productarea_root>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang='ts'>
import {onMounted, ref} from "vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import {IUpdateProductAreaDto, UpdateProductAreaDto} from "@/module/productArea/dto/updateProductArea.dto";
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_select_productarea_root from "@/components/select/ErpProductareaRootSelect.vue";

const props = withDefaults(defineProps<{
  productArea: IUpdateProductAreaDto;
}>(), {})

const emits = defineEmits(['ok', 'close'])
const defaultInputFocus = ref();
onMounted(async () => {
  setUpdateClientAreaDto();
  defaultInputFocus.value.getNode().focus();
})

function setUpdateClientAreaDto() {
  updateProductArea.value = JSON.parse(JSON.stringify(props.productArea))
}

//编辑产品类别Dto
let updateProductArea = ref<IUpdateProductAreaDto>(new UpdateProductAreaDto());

//确定按钮
async function onConfirmDialog() {
  emits('ok',updateProductArea.value);
}

// 取消按钮
function onCancelDialog() {
  emits('close');
}
</script>