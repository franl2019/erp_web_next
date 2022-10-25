<template>
  <erp-form-dialog
      title="修改权限主题"
      @clickedCancel="clickedCancel"
      @clickedClose="clickedClose"
      @clickedConfirm="clickedConfirm"
  >
    <erp-form>
      <erp-form-item label-for-name="名称" lg-col="8" md-col="8">
        <erp-input-round v-model="permissionsThemeUpdateDto.permissionsThemeName"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="顺序号" lg-col="8" md-col="8">
        <erp-input-round
            v-model.number="permissionsThemeUpdateDto.printid"
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
import {PermissionsThemeService} from "@/module/permissionsTheme/permissionsTheme.service";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";
import {PermissionsThemeUpdateDto} from '@/module/permissionsTheme/dto/permissionsThemeUpdate.dto';

export default defineComponent({
  name: "PermissionsThemeUpdateDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpFormDialog,
    ErpInputRound,
  },
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
    permissionsTheme: {
      type: Object as PropType<IPermissionsTheme>,
      required: true
    }
  },
  setup(props) {
    const permissionsThemeUpdateDto = ref(new PermissionsThemeUpdateDto(props.permissionsTheme));
    const permissionsThemeService = new PermissionsThemeService();

    async function clickedConfirm() {
      await permissionsThemeService.update(permissionsThemeUpdateDto.value);
      props.resolve_dialog(JSON.parse(JSON.stringify(permissionsThemeUpdateDto.value)));
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
      permissionsThemeUpdateDto,
      clickedConfirm,
      clickedCancel,
      clickedClose,
    }
  }
})
</script>