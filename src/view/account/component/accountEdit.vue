<template>
  <erp-dialog-form v-bind="$attrs">
    <erp-form>
      <erp-form-item label-for-name="账户编号">
        <erp-input-rounded ref="defaultInputFocusRef" v-model="dto.accountCode"></erp-input-rounded>
      </erp-form-item>
      <erp-form-item label-for-name="账户名称">
        <erp-input-rounded v-model="dto.accountName"></erp-input-rounded>
      </erp-form-item>
      <erp-form-item label-for-name="币种">
        <erp-select-currency v-model="dto.currencyid"></erp-select-currency>
      </erp-form-item>
      <erp-form-item label-for-name="是否公户">
        <erp-checkbox-border v-model="dto.companyFlag">公户</erp-checkbox-border>
      </erp-form-item>
    </erp-form>
  </erp-dialog-form>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IAccount} from "@/module/account/account";
import {onMounted, ref} from "vue";
import ErpDialogForm from "@/components/dialog/ErpFormDialog.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpInputRounded from "@/components/input/ErpInputRound.vue";
import ErpSelectCurrency from "@/components/select/ErpCurrencySelect.vue";
import ErpCheckboxBorder from "@/components/input/ErpCheckbox.vue";

export default defineComponent({
  name: "AccountEdit",
  components: {
    ErpDialogForm,
    ErpFormItem,
    ErpForm,
    ErpInputRounded,
    ErpSelectCurrency,
    ErpCheckboxBorder
  },
  props: {
    dto: {
      type: Object as PropType<IAccount>
    }
  },
  setup() {
    const defaultInputFocusRef = ref();

    onMounted(async () => {
      defaultInputFocusRef.value.getNode().focus();
    })

    return {
      defaultInputFocusRef,
    }
  }
})
</script>