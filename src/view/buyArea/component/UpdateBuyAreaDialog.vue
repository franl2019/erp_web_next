<template>
  <erp-form-dialog title="修改地区" v-bind="$attrs" @clickedCancel="onCancelDialog" @clickedConfirm="onConfirmDialog">
    <erp-form>
      <erp-form-item name="编号" lg-col="8" md-col="8">
        <erp-input-round ref="defaultInputFocusRef" v-model="updateBuyArea.buyareacode"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="名称" lg-col="8" md-col="8">
        <erp-input-round v-model="updateBuyArea.buyareaname"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="所属地区" lg-col="8" md-col="8">
        <erp-buy-area-have-root-select v-model="updateBuyArea.parentid"></erp-buy-area-have-root-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpBuyAreaHaveRootSelect from "@/components/select/ErpBuyAreaHaveRootSelect.vue";
import {defineComponent, onMounted, PropType, ref, unref} from "vue";
import {IUpdateBuyAreaDto, UpdateBuyAreaDto} from "@/module/buyArea/dto/updateBuyArea.dto";
import {IBuyArea} from "@/module/buyArea/buyArea";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";

export default defineComponent({
  name: "UpdateBuyAreaDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpFormDialog,
    ErpInputRound,
    ErpBuyAreaHaveRootSelect,
  },
  props: {
    buyArea: {
      type: Object as PropType<IUpdateBuyAreaDto>,
      required: true,
    },
  },
  emits: ['ok', 'close'],
  setup(props, {emit: emits}) {
    const {buyArea} = unref(props);
    const defaultInputFocusRef = ref();
    onMounted(async () => {
      setUpdateBuyAreaDto();
      await getRootBuyAreaList();
      defaultInputFocusRef.value.getNode().focus();
    })

    //选择所属供应商地区数组
    let buyAreaSelectList = ref<IBuyArea[]>();
    const buyAreaService = new BuyAreaService();

    //获取（选择所属供应商地区数组）
    async function getRootBuyAreaList() {
      buyAreaSelectList.value = await buyAreaService.getBuyAreasIncludeRoot();
    }


    function setUpdateBuyAreaDto() {
      updateBuyArea.value = JSON.parse(JSON.stringify(buyArea))
    }

    //编辑供应商地区Dto
    let updateBuyArea = ref<IUpdateBuyAreaDto>(new UpdateBuyAreaDto());

    //确定按钮
    async function onConfirmDialog() {
      await buyAreaService.update(updateBuyArea.value);
      emits('ok');
    }

    // 取消按钮
    function onCancelDialog() {
      emits('close');
    }

    return {
      defaultInputFocusRef,
      buyAreaSelectList,
      updateBuyArea,
      onConfirmDialog,
      onCancelDialog,
    };
  },
});
</script>