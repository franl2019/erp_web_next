<template>
  <erp-form-dialog title="新增用户供应商操作区域权限" v-bind="$attrs">
    <erp-form>
      <erp-form-item name="选择供应商操作区域">
        <erp-operatearea-select v-model="createBuyOperateareaDto.operateareaid" :operateareatype="1">
        </erp-operatearea-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpOperateareaSelect from "@/components/select/ErpOperateareaSelect.vue";
import {ICreateUserOperateAreaDto} from "@/module/user_operatearea_mx/dto/createUserOperateArea.dto";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "createUserBuyOperateareaPermissionDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpFormDialog,
    ErpOperateareaSelect,
  },
  props: {
    createBuyOperateareaDto: {
      type: Object as PropType<ICreateUserOperateAreaDto>,
      required: true,
    },
  },
  setup() {
    return {}
  },
});
</script>