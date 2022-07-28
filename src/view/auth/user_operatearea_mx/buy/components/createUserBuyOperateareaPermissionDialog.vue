<template>
  <erp_dialog_form v-bind="$attrs" title="新增用户供应商操作区域权限">
    <erp_form>
      <erp_form_item labelForName="选择供应商操作区域">
        <erp_select_operatearea v-model="props.createBuyOperateareaDto.operateareaid" :operateareatype="1"></erp_select_operatearea>
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
import Erp_select_operatearea from "@/components/select/ErpOperateareaSelect.vue";

const props = defineProps<{ createBuyOperateareaDto: ICreateUserOperateAreaDto }>();
</script>