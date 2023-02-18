<template>
  <erp-form-dialog title="修改客户地区资料" v-bind="$attrs" @clickedCancel="onCancelDialog"
                   @clickedConfirm="onConfirmDialog">
    <erp-form>
      <erp-form-item name="客户地区编号" lg-col="8" md-col="8">
        <erp-input-round ref="defaultInputFocus" v-model="updateClientArea.clientareacode"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="客户地区名称" lg-col="8" md-col="8">
        <erp-input-round v-model="updateClientArea.clientareaname"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="所属地区" lg-col="8" md-col="8">
        <erp-client-area-have-root-select v-model="updateClientArea.parentid"></erp-client-area-have-root-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpClientAreaHaveRootSelect from "@/components/select/ErpClientAreaHaveRootSelect.vue";
import {defineComponent, onMounted, PropType, reactive, ref} from "vue";
import {IClientArea, IUpdateClientAreaDto} from "@/module/clientArea/clientArea";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";

export default defineComponent({
  name: "UpdateClientAreaDialog",
  components: {
    ErpFormDialog,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpClientAreaHaveRootSelect
  },
  props: {
    clientArea: {
      type: Object as PropType<IUpdateClientAreaDto>,
      required: true,
    },
    visible: Boolean,
  },
  emits: ['ok', 'close', 'update:visible'],
  setup(prop, {emit}) {
    const defaultInputFocusRef = ref();
    onMounted(async () => {
      await getRootClientAreaList();
      setUpdateClientAreaDto();
      defaultInputFocusRef.value.getNode().focus();
    })

    //选择所属客户地区数组
    let clientAreaSelectList = ref<IClientArea[]>([]);
    const clientAreaService = new ClientAreaService();

    //获取（选择所属客户地区数组）
    async function getRootClientAreaList() {
      clientAreaSelectList.value = await clientAreaService.getClientAreaListHaveRoot();
    }


    function setUpdateClientAreaDto() {
      const {clientArea} = prop;
      updateClientArea.clientareaid = clientArea.clientareaid;
      updateClientArea.clientareaname = clientArea.clientareaname;
      updateClientArea.clientareacode = clientArea.clientareacode;
      updateClientArea.parentid = clientArea.parentid;
    }

    //编辑客户地区Dto
    let updateClientArea = reactive<IUpdateClientAreaDto>({
      clientareaid: 0,
      clientareacode: "",
      clientareaname: "",
      parentid: 0,
    });

    //确定按钮
    async function onConfirmDialog() {
      await clientAreaService.update(updateClientArea);
      emit('ok');
      emit('update:visible', false);
    }

    // 取消按钮
    function onCancelDialog() {
      emit('close');
      emit('update:visible', false);
    }

    return {
      defaultInputFocusRef,
      clientAreaSelectList,
      updateClientArea,
      onConfirmDialog,
      onCancelDialog,
    };
  },
});
</script>