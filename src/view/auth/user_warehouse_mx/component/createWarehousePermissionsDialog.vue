<template>
  <erp_dialog_form v-bind="$attrs" title="用户添加仓库权限">
    <erp_form>
      <erp_form_item label-for-name="选择仓库">
        <erp_select_warehouse v-model="createDto.warehouseid"></erp_select_warehouse>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang='ts'>
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import {
  ICreateUserWarehousePermissionsDto
} from "@/module/user_warehouse_mx/dto/createUserWarehousePermissionsDto";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_select_warehouse from "@/components/select/ErpWarehouseSelect.vue";

const props = withDefaults(defineProps<{
  createDto:ICreateUserWarehousePermissionsDto
}>(),{})
</script>