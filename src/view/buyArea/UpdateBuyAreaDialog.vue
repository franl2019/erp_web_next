<template>
  <erp_dialog_form title="修改地区"
                   v-bind="$attrs"
                   @clickedConfirm="onConfirmDialog"
                   @clickedCancel="onCancelDialog">
    <erp_form>
      <erp_form_item label-for-name="编号" md-col="8" lg-col="8">
        <erp_input_rounded ref="defaultInputFocus" v-model="updateBuyArea.buyareacode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="名称" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateBuyArea.buyareaname"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="所属地区" md-col="8" lg-col="8">
        <erp_select_buyarea_root v-model="updateBuyArea.parentid"></erp_select_buyarea_root>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang='ts'>
import {onMounted, ref} from "vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import {IUpdateBuyAreaDto, UpdateBuyAreaDto} from "@/module/buyArea/dto/updateBuyArea.dto";
import {IBuyArea} from "@/module/buyArea/buyArea";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_select_buyarea_root from "@/components/select/ErpBuyAreaHaveRootSelect.vue";

const props = withDefaults(defineProps<{
  buyArea: IUpdateBuyAreaDto;
}>(), {})

const emits = defineEmits(['ok', 'close'])
const defaultInputFocus = ref();
onMounted(async () => {
  setUpdateBuyAreaDto();
  await getRootBuyAreaList();
  defaultInputFocus.value.getNode().focus();
})

//选择所属供应商地区数组
let buyAreaSelectList = ref<IBuyArea[]>();
const buyAreaService = new BuyAreaService();

//获取（选择所属供应商地区数组）
async function getRootBuyAreaList() {
  buyAreaSelectList.value = await buyAreaService.getBuyAreasIncludeRoot();
}


function setUpdateBuyAreaDto() {
  updateBuyArea.value = JSON.parse(JSON.stringify(props.buyArea))
}

//编辑供应商地区Dto
let updateBuyArea = ref<IUpdateBuyAreaDto>(new UpdateBuyAreaDto());

//确定按钮
async function onConfirmDialog() {
  await buyAreaService.update(updateBuyArea.value);
  emits('ok');
}

// 取消按钮
function onCancelDialog() {
  emits('close');
}
</script>