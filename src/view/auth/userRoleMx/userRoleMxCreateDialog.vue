<template>
  <erp-form-dialog
      title="新增角色用户明细"
      @clickedConfirm="onClickedConfirm"
      @clickedCancel="onClickedCancel"
      @clickedClose="onClickedCancel"
  >
    <erp-form>
      <erp-form-item name="用户名称:">
        <erp-user-select v-model="userRoleMxCreateDto.userid"></erp-user-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import {defineComponent, PropType, ref} from 'vue';
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpUserSelect from "@/components/select/ErpUserSelect.vue";
import {UserRoleMxService} from "@/module/userRoleMx/userRoleMx.service";
import {UserRoleMxCreateDto} from "@/module/userRoleMx/dto/userRoleMxCreate.dto";

export default defineComponent({
  name: "userRoleMxCreateDialog",
  components: {
    ErpUserSelect,
    ErpFormItem,
    ErpForm,
    ErpFormDialog
  },
  props:{
    resolve_dialog: {
      type: Function as PropType<(value: unknown) => void>,
      required: true
    },
    reject_dialog: {
      type: Function as PropType<(reason?: any) => void>,
      required: true
    },
    unmount: {
      type: Function,
      default: () => {
      },
    },
    roleId:{
      type:Number,
      default:0
    }
  },
  setup(props){

    const userRoleMxService = new UserRoleMxService();
    const userRoleMxCreateDto = ref(new UserRoleMxCreateDto())

    async function onClickedConfirm() {
      userRoleMxCreateDto.value.roleId = props.roleId
      await userRoleMxService.create(userRoleMxCreateDto.value);
      props.resolve_dialog(true);
      props.unmount();
    }

    async function onClickedCancel() {
      props.reject_dialog(false);
      props.unmount();
    }


    return{
      userRoleMxCreateDto,
      onClickedConfirm,
      onClickedCancel
    }
  }
})
</script>

<style scoped>

</style>