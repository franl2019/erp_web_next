<template>
  <erp-form-dialog title="编辑仓库资料" @clickedConfirm="clickedConfirm">
    <erp-form>
      <erp-form-item label-for-name="仓库编号" lg-col="8" md-col="8">
        <erp-input-round ref="defaultInputFocusRef" v-model="updateWarehouseDto.warehousecode"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="仓库名称" lg-col="8" md-col="8">
        <erp-input-round v-model="updateWarehouseDto.warehousename"></erp-input-round>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {defineComponent, onMounted, PropType, ref} from "vue";
import {WarehouseService} from "@/module/warehouse/warehouse.service";
import {IWarehouse, Warehouse} from "@/module/warehouse/warehouse";

export default defineComponent({
  name: "UpdateWarehouseDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpFormDialog
  },
  emits: ["ok"],
  props: {
    warehouse: {
      type: Object as PropType<IWarehouse>,
      required: true,
    },
  },
  setup(props, {emit}) {
    const updateWarehouseDto = ref<IWarehouse>(new Warehouse())

    const defaultInputFocusRef = ref();

    onMounted(async () => {
      updateWarehouseDto.value = JSON.parse(JSON.stringify(props.warehouse))
      defaultInputFocusRef.value.getNode().focus();
    })


    async function clickedConfirm() {
      const warehouseService = new WarehouseService();
      await warehouseService.update(updateWarehouseDto.value);
      emit('ok');
    }

    return {
      updateWarehouseDto,
      defaultInputFocusRef,
      clickedConfirm
    };
  },
});
</script>