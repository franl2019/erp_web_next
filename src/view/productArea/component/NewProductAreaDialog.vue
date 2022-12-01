<template>
  <erp-form-dialog title="新增类别" v-bind="$attrs" @clickedCancel="onCancelDialog" @clickedConfirm="onConfirmDialog">
    <erp-form>
      <erp-form-item name="编号" lg-col="8" md-col="8">
        <erp-input-round ref="defaultInputFocus" v-model="createProductArea.productareacode"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="名称" lg-col="8" md-col="8">
        <erp-input-round v-model="createProductArea.productareaname"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="所属类别" lg-col="8" md-col="8">
        <erp-productarea-root-select v-model="createProductArea.parentid"></erp-productarea-root-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpProductareaRootSelect from "@/components/select/ErpProductareaRootSelect.vue";
import {defineComponent, onMounted, ref} from "vue";
import {CreateProductAreaDto, ICreateProductAreaDto} from "@/module/productArea/dto/createProductArea.dto";

export default defineComponent({
  name: "NewProductAreaDialog",
  components: {
    ErpInputRound,
    ErpForm,
    ErpFormItem,
    ErpFormDialog,
    ErpProductareaRootSelect
  },
  emits: ['ok', 'close'],
  setup(_props, {emit}) {
    const defaultInputFocusRef = ref();

    onMounted(async () => {
      defaultInputFocusRef.value.getNode().focus();
    })

    //新增产品类别Dto
    const createProductArea = ref<ICreateProductAreaDto>(new CreateProductAreaDto());

    //确定按钮
    async function onConfirmDialog() {
      emit('ok', createProductArea.value);
    }

    // 取消按钮
    function onCancelDialog() {
      emit('close');
    }

    return {
      defaultInputFocusRef,
      createProductArea,
      onConfirmDialog,
      onCancelDialog,
    };
  },
});
</script>