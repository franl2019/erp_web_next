<template>
 <erp_dialog_form title="新增地区"
                  v-bind="$attrs"
                  @clickedConfirm="onConfirmDialog"
                  @clickedCancel="onCancelDialog">
   <erp_form>
     <erp_form_item label-for-name="编号" md-col="8" lg-col="8">
       <erp_input_rounded ref="defaultInputFocus" v-model="createBuyArea.buyareacode"></erp_input_rounded>
     </erp_form_item>
     <erp_form_item label-for-name="名称" md-col="8" lg-col="8">
       <erp_input_rounded v-model="createBuyArea.buyareaname"></erp_input_rounded>
     </erp_form_item>
     <erp_form_item label-for-name="所属地区" md-col="8" lg-col="8">
       <erp_select_buyarea_root v-model="createBuyArea.parentid"></erp_select_buyarea_root>

     </erp_form_item>
   </erp_form>
 </erp_dialog_form>
</template>

<script setup lang='ts'>
import {onMounted, ref} from "vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";
import {CreateBuyAreaDto, ICreateBuyAreaDto} from "@/module/buyArea/dto/createBuyArea.dto";
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_select_buyarea_root from "@/components/select/ErpBuyAreaHaveRootSelect.vue";


const emits = defineEmits(['ok', 'close']);

const defaultInputFocus = ref();
onMounted(async () => {
  defaultInputFocus.value.getNode().focus();
})

//新增供应商地区Dto
const createBuyArea = ref<ICreateBuyAreaDto>(new CreateBuyAreaDto());

//确定按钮
async function onConfirmDialog() {
  const buyAreaService = new BuyAreaService();
  await buyAreaService.create(createBuyArea.value);
  emits('ok');
}

// 取消按钮
function onCancelDialog() {
  emits('close');
}
</script>