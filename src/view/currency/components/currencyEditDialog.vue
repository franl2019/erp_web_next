<template>
  <erp_dialog_form v-bind="$attrs">
    <erp_form>
      <erp_form_item label-for-name="币种名称">
        <erp_input_rounded ref="defaultInputFocusRef" v-model="props.dto.currencyname"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="是否本位币">
        <erp_checkbox_border v-model="props.dto.standardmoneyflag">是</erp_checkbox_border>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang="ts">
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import Erp_checkbox_border from "@/components/input/ErpCheckbox.vue";
import {onMounted, ref} from "vue";
import {ICurrency} from "@/module/currency/currency";

const props = defineProps<{
  dto: ICurrency
}>();

const defaultInputFocusRef = ref();

onMounted(async () => {
  defaultInputFocusRef.value.getNode().focus();
})
</script>