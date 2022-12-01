<template>
  <erp-dialog-form v-bind="$attrs">
    <erp-form>
      <erp-form-item name="选择出纳账号">
        <erp-select-account v-model="dto.accountId"></erp-select-account>
      </erp-form-item>
    </erp-form>
  </erp-dialog-form>
</template>

<script lang="ts">
import ErpDialogForm from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpSelectAccount from "@/components/select/ErpAccountSelect.vue";
import {IUserAccountMx} from "@/module/user_account_mx/userAccountMx";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name:"AccountAuthCreateDialog",
  components:{
    ErpDialogForm,
    ErpForm,
    ErpFormItem,
    ErpSelectAccount
  },
  props:{
    dto:{
      type:Object as PropType<IUserAccountMx>
    }
  }
})

</script>