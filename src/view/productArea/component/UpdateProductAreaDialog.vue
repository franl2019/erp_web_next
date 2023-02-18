<template>
  <erp-form-dialog title="修改类别" v-bind="$attrs" @clickedCancel="onCancelDialog" @clickedConfirm="onConfirmDialog">
    <erp-form>
      <erp-form-item name="编号" lg-col="8" md-col="8">
        <erp-input-round ref="defaultInputFocusRef" v-model="updateProductArea.productareacode"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="名称" lg-col="8" md-col="8">
        <erp-input-round v-model="updateProductArea.productareaname"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="所属类别" lg-col="8" md-col="8">
        <erp-productarea-root-select v-model="updateProductArea.parentid"></erp-productarea-root-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpProductareaRootSelect from "@/components/select/ErpProductareaRootSelect.vue";
import {defineComponent, onMounted, PropType, ref, unref} from "vue";
import {IUpdateProductAreaDto, UpdateProductAreaDto} from "@/module/productArea/dto/updateProductArea.dto";

export default defineComponent({
  name: "UpdateProductAreaDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpFormDialog,
    ErpInputRound,
    ErpProductareaRootSelect
  },
  props: {
    productArea: {
      type: Object as PropType<IUpdateProductAreaDto>,
      required: true,
    },
  },
  emits: ['ok', 'close'],
  setup(prop, {emit}) {
    const {productArea} = unref(prop)
    const defaultInputFocusRef = ref();
    onMounted(async () => {
      setUpdateClientAreaDto();
      defaultInputFocusRef.value.getNode().focus();
    })

    function setUpdateClientAreaDto() {
      updateProductArea.value = JSON.parse(JSON.stringify(productArea))
    }

    //编辑产品类别Dto
    let updateProductArea = ref<IUpdateProductAreaDto>(new UpdateProductAreaDto());

    //确定按钮
    async function onConfirmDialog() {
      emit('ok', updateProductArea.value);
    }

    // 取消按钮
    function onCancelDialog() {
      emit('close');
    }

    return {
      defaultInputFocusRef,
      updateProductArea,
      onConfirmDialog,
      onCancelDialog,
    };
  },
});
</script>