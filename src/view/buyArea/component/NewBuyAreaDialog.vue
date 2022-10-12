<template>
  <erp-form-dialog title="新增地区" v-bind="$attrs" @clickedCancel="onCancelDialog" @clickedConfirm="onConfirmDialog">
    <erp-form>
      <erp-form-item label-for-name="编号" lg-col="8" md-col="8">
        <erp-input-round ref="defaultInputFocusRef" v-model="createBuyArea.buyareacode"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="名称" lg-col="8" md-col="8">
        <erp-input-round v-model="createBuyArea.buyareaname"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="所属地区" lg-col="8" md-col="8">
        <erp-buy-area-have-root-select v-model="createBuyArea.parentid"></erp-buy-area-have-root-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpBuyAreaHaveRootSelect from "@/components/select/ErpBuyAreaHaveRootSelect.vue";
import {defineComponent, onMounted, ref} from "vue";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";
import {CreateBuyAreaDto, ICreateBuyAreaDto} from "@/module/buyArea/dto/createBuyArea.dto";

export default defineComponent({
  name: "NewBuyAreaDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpFormDialog,
    ErpInputRound,
    ErpBuyAreaHaveRootSelect
  },
  emits: ['ok', 'close'],
  setup(_props, {emit: emits}) {
    const defaultInputFocusRef = ref();
    onMounted(async () => {
      defaultInputFocusRef.value.getNode().focus();
    })

    //新增供应商地区Dto
    const createBuyArea = ref<ICreateBuyAreaDto>(new CreateBuyAreaDto());

    //确定按钮
    async function onConfirmDialog() {
      const buyAreaService = new BuyAreaService();
      await buyAreaService.create(createBuyArea.value);
      emits('ok');
    }

    //取消按钮
    function onCancelDialog() {
      emits('close');
    }

    return {
      defaultInputFocusRef,
      createBuyArea,
      onConfirmDialog,
      onCancelDialog,
    };
  },
});
</script>