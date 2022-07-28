<template>
  <erp_dialog_form v-bind="$attrs">
    <erp_form>
      <erp_form_item label-for-name="账户编号">
        <erp_input_rounded ref="defaultInputFocusRef" v-model="props.dto.accountCode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="账户名称">
        <erp_input_rounded v-model="props.dto.accountName"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="币种">
        <erp_select_currency v-model="props.dto.currencyid"></erp_select_currency>
      </erp_form_item>
      <erp_form_item label-for-name="是否公户">
       <erp_checkbox_border v-model="props.dto.companyFlag">公户</erp_checkbox_border>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang="ts">
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import {onMounted, ref} from "vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {IAccount} from "@/module/account/account";
import Erp_select_currency from "@/components/select/ErpCurrencySelect.vue";
import Erp_checkbox_border from "@/components/input/ErpCheckbox.vue";

const props = defineProps<{
  dto:IAccount
}>();
const defaultInputFocusRef = ref();

onMounted(async () => {
  defaultInputFocusRef.value.getNode().focus();
})
</script>