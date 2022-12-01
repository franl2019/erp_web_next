<template>
  <erp-form-dialog
      title="新增权限类别"
      @clickedCancel="clickedCancel"
      @clickedClose="clickedClose"
      @clickedConfirm="clickedConfirm"
  >
    <erp-form>
      <erp-form-item name="名称" lg-col="8" md-col="8">
        <erp-input-round v-model="permissionsThemeCreateDto.permissionsThemeName"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="顺序号" lg-col="8" md-col="8">
        <erp-input-round
            v-model.number="permissionsThemeCreateDto.printid"
            :type="'number'">
        </erp-input-round>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>
<script lang="ts">
import ErpFormDialog from '@/components/dialog/ErpFormDialog.vue';
import {defineComponent, PropType, ref} from "vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {PermissionsThemeCreateDto} from "@/module/permissionsTheme/dto/permissionsThemeCreate.dto";
import {PermissionsThemeService} from "@/module/permissionsTheme/permissionsTheme.service";

export default defineComponent({
  name: "PermissionsThemeCreateDialog",
  components: {ErpInputRound, ErpFormItem, ErpForm, ErpFormDialog},
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
  },
  setup(props) {
    const permissionsThemeCreateDto = ref(new PermissionsThemeCreateDto());
    const permissionsThemeService = new PermissionsThemeService();

    async function clickedConfirm() {
      await permissionsThemeService.create(permissionsThemeCreateDto.value);
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
      permissionsThemeCreateDto,
      clickedConfirm,
      clickedCancel,
      clickedClose,
    }
  }
})
</script>