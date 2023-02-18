<template>
  <erp-form-dialog v-bind="$attrs">
    <erp-form>
      <erp-form-item name="币种名称">
        <erp-input-round ref="defaultInputFocusRef" v-model="dto.currencyname"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="是否本位币">
        <erp-checkbox v-model="dto.standardmoneyflag">是</erp-checkbox>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang="ts">
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpCheckbox from "@/components/input/ErpCheckbox.vue";
import {defineComponent, onMounted, PropType, ref} from "vue";
import {ICurrency} from "@/module/currency/currency";

export default defineComponent({
  name: "CurrencyEditDialog",
  components: {
    ErpFormDialog,
    ErpForm,
    ErpFormItem,
    ErpCheckbox,
    ErpInputRound
  },
  props: {
    dto: {
      type: Object as PropType<ICurrency>,
      required: true,
    },
  },
  setup() {
    const defaultInputFocusRef = ref();

    onMounted(async () => {
      defaultInputFocusRef.value.getNode().focus();
    })

    return {
      defaultInputFocusRef,
    };
  },
});
</script>