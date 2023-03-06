<template>
  <erp-form-dialog
      title="新增用户角色"
      @clickedCancel="clickedCancel"
      @clickedConfirm="clickedConfirm"
  >
    <erp-form>
      <erp-form-item name="角色名称" type="danger">
        <erp-input-round v-model="roleCreateDto.roleName"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="顺序号" lg-col="4" md-col="4">
        <erp-input-round v-model.number="roleCreateDto.printid" :type="'number'"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="资料是否使用" lg-col="4" md-col="4">
        <erp-checkbox v-model="roleCreateDto.useflag">使用</erp-checkbox>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang="ts">
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {defineComponent, ref} from "vue";
import ErpCheckbox from "@/components/input/ErpCheckbox.vue";
import {RoleCreateDto} from "@/module/role/dto/roleCreate.dto";

export default defineComponent({
  name: "RoleCreateDialog",
  emits: ["clickedCancel", "clickedConfirm"],
  components: {
    ErpFormDialog,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpCheckbox,
  },
  setup(_props, {emit}) {
    const roleCreateDto = ref(new RoleCreateDto())

    function clickedCancel() {
      emit('clickedCancel')
    }

    function clickedConfirm() {
      emit("clickedConfirm", roleCreateDto.value)
    }

    return {
      roleCreateDto,
      clickedCancel,
      clickedConfirm,
    };
  },
});
</script>