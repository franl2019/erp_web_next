<template>
  <erp-form-dialog
      title="更新权限资料"
      @clickedCancel="clickedCancel"
      @clickedClose="clickedClose"
      @clickedConfirm="clickedConfirm"
  >
    <erp-form>
      <erp-form-item name="唯一代码">
        <erp-input-round
            v-model.number="permissionsUpdateDto.permissionsCode">
        </erp-input-round>
      </erp-form-item>
      <erp-form-item name="名称">
        <erp-input-round
            v-model="permissionsUpdateDto.permissionsName">
        </erp-input-round>
      </erp-form-item>
      <erp-form-item name="类别">
        <erp-permissions-theme-select
            v-model="permissionsUpdateDto.permissionsThemeId">
        </erp-permissions-theme-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import {defineComponent, PropType, ref} from 'vue';
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {PermissionsService} from "@/module/permissions/permissions.service";
import {PermissionsUpdateDto} from "@/module/permissions/dto/permissionsUpdate.dto";
import {IPermissions} from "@/module/permissions/permissions";
import ErpPermissionsThemeSelect from "@/components/select/ErpPermissionThemeSelect.vue";

export default defineComponent({
  name: "permissionsUpdateDialog",
  components: {ErpPermissionsThemeSelect, ErpInputRound, ErpFormItem, ErpForm, ErpFormDialog},
  props: {
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
    permission: {
      type: Object as PropType<IPermissions>,
      required: true
    }
  },
  setup(props) {
    const permissionsUpdateDto = ref(new PermissionsUpdateDto(props.permission));
    const permissionsService = new PermissionsService();

    async function clickedConfirm() {
      await permissionsService.update(permissionsUpdateDto.value);
      props.resolve_dialog(true);
      props.unmount();
    }

    function clickedClose() {
      props.reject_dialog();
      props.unmount();
    }

    function clickedCancel() {
      props.reject_dialog();
      props.unmount();
    }

    return {
      permissionsUpdateDto,
      clickedConfirm,
      clickedClose,
      clickedCancel
    }
  }
})
</script>

<style scoped>

</style>