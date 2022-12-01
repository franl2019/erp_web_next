<template>
  <erp-form-dialog title="新增用户客户操作区域权限" v-bind="$attrs">
    <erp-form>
      <erp-form-item name="选择客户操作区域">
        <erp-operate-area-auth-select v-model="createClientOperateareaDto.operateareaid">
        </erp-operate-area-auth-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import {ICreateUserOperateAreaDto} from "@/module/user_operatearea_mx/dto/createUserOperateArea.dto";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "createUserClientOperateareaPermissionDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpFormDialog,
    ErpOperateAreaAuthSelect,
  },
  props: {
    createClientOperateareaDto: {
      type: Object as PropType<ICreateUserOperateAreaDto>,
      required: true,
    },
  },
  setup() {
    return {}
  },
});
</script>