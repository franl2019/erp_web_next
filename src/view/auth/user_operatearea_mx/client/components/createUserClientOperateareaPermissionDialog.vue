<template>
  <erp_dialog_form v-bind="$attrs" title="新增用户客户操作区域权限">
    <erp_form>
      <erp_form_item labelForName="选择客户操作区域">
        <erp_select_operatearea_auth v-model="props.createClientOperateareaDto.operateareaid"></erp_select_operatearea_auth>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang='ts'>
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import {
  ICreateUserOperateAreaDto
} from "@/module/user_operatearea_mx/dto/createUserOperateArea.dto";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_select_operatearea_auth from "@/components/select/ErpOperateAreaAuthSelect.vue";

const props = defineProps<{ createClientOperateareaDto: ICreateUserOperateAreaDto }>();
</script>