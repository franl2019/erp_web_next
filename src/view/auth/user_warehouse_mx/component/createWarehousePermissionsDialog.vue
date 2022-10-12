<template>
  <erp-form-dialog title="用户添加仓库权限" v-bind="$attrs">
    <erp-form>
      <erp-form-item label-for-name="选择仓库">
        <erp-warehouse-select v-model="createDto.warehouseid"></erp-warehouse-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpWarehouseSelect from "@/components/select/ErpWarehouseSelect.vue";
import {ICreateUserWarehousePermissionsDto} from "@/module/user_warehouse_mx/dto/createUserWarehousePermissionsDto";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "createWarehousePermissionsDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpFormDialog,
    ErpWarehouseSelect,
  },
  props: {
    createDto: {
      type: Object as PropType<ICreateUserWarehousePermissionsDto>,
      required: true,
    },
  },
  setup() {
    return {}
  },
});
</script>