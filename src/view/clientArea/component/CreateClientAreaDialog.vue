<template>
  <erp-form-dialog
      title="新增客户地区资料"
      v-bind="$attrs"
      @clickedCancel="onCancelDialog"
      @clickedConfirm="onConfirmDialog">
    <erp-form>
      <erp-form-item name="客户地区编号" lg-col="8" md-col="8">
        <erp-input-round ref="defaultInputFocusRef" v-model="createClientArea.clientareacode"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="客户地区名称" lg-col="8" md-col="8">
        <erp-input-round v-model="createClientArea.clientareaname"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="所属地区" lg-col="8" md-col="8">
        <erp-client-area-have-root-select v-model="createClientArea.parentid"></erp-client-area-have-root-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpClientAreaHaveRootSelect from "@/components/select/ErpClientAreaHaveRootSelect.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import {defineComponent, onMounted, reactive, ref} from "vue";
import {ICreateClientAreaDto} from "@/module/clientArea/clientArea";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";

export default defineComponent({
  name: "CreateClientAreaDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpFormDialog,
    ErpInputRound,
    ErpClientAreaHaveRootSelect,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['ok', 'close', 'update:visible'],
  setup(_props, {emit}) {

    const defaultInputFocusRef = ref();
    onMounted(async () => {
      defaultInputFocusRef.value.getNode().focus();
    })

    //新增客户地区Dto
    const createClientArea = reactive<ICreateClientAreaDto>({
      clientareacode: "",
      clientareaname: "",
      parentid: 0,
    });

    //确定按钮
    async function onConfirmDialog() {
      const clientAreaService = new ClientAreaService();
      await clientAreaService.create(createClientArea);
      emit('ok');
      emit('update:visible', false);
    }

    // 取消按钮
    function onCancelDialog() {
      emit('update:visible', false);
    }

    return {
      defaultInputFocusRef,
      createClientArea,
      onConfirmDialog,
      onCancelDialog,
    };
  },
});
</script>