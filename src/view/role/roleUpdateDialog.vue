<template>
  <erp-form-dialog title="修改用户角色" @clickedCancel="clickedCancel" @clickedConfirm="clickedConfirm">
    <erp-form>
      <erp-form-item label-for-name="角色名称" type="danger">
        <erp-input-round v-model="roleUpdateDto.roleName"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="顺序号" lg-col="4" md-col="4">
        <erp-input-round v-model="roleUpdateDto.printid"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="资料是否使用" lg-col="4" md-col="4">
        <erp-checkbox v-model="roleUpdateDto.useflag">使用</erp-checkbox>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang="ts">
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {defineComponent, PropType, ref} from "vue";
import ErpCheckbox from "@/components/input/ErpCheckbox.vue";
import {RoleUpdateDto} from "@/module/role/dto/roleUpdate.dto";
import {IRole} from "@/module/role/role";

export default defineComponent({
  name:"RoleUpdateDialog",
  props: {
    role: {
      type: Object as PropType<IRole>,
      required: true,
    },
  },
  emits: ["clickedCancel", "clickedConfirm"],
  components:{
    ErpFormDialog,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpCheckbox,
  },
  setup(props, {emit: emits}) {
    const roleUpdateDto = ref(new RoleUpdateDto(JSON.parse(JSON.stringify(props.role))));

    function clickedCancel() {
      emits('clickedCancel')
    }

    function clickedConfirm() {
      emits("clickedConfirm", JSON.parse(JSON.stringify(roleUpdateDto.value)))
    }

    return {
      roleUpdateDto,
      clickedCancel,
      clickedConfirm,
    };
  },
});
</script>