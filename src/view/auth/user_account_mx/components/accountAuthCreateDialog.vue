<template>
  <erp_dialog_form v-bind="$attrs">
    <erp_form>
      <erp_form_item label-for-name="选择出纳账号">
        <erp_select_account v-model="props.dto.accountId"></erp_select_account>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang="ts">
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import Erp_select_account from "@/components/select/ErpAcountSelect.vue";
import {IUserAccountMx} from "@/module/user_account_mx/userAccountMx";

const props = defineProps<{
  dto: IUserAccountMx
}>()
</script>