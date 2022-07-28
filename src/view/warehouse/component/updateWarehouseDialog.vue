<template>
  <erp_dialog_form v-bind="$attrs" title="编辑仓库资料">
    <erp_form>
      <erp_form_item label-for-name="仓库编号" md-col="8" lg-col="8">
        <erp_input_rounded ref="defaultInputFocusRef" v-model="updateWarehouseDto.warehousecode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="仓库名称" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateWarehouseDto.warehousename"></erp_input_rounded>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang='ts'>
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {onMounted, ref} from "vue";
import {WarehouseService} from "@/module/warehouse/warehouse.service";
import {IWarehouse, Warehouse} from "@/module/warehouse/warehouse";

const props = defineProps<{
  warehouse: IWarehouse
}>()
const updateWarehouseDto = ref<IWarehouse>(new Warehouse())

const defaultInputFocusRef = ref();

onMounted(async () => {
  updateWarehouseDto.value = JSON.parse(JSON.stringify(props.warehouse))
  defaultInputFocusRef.value.getNode().focus();
})


async function updateWarehouse() {
  const warehouseService = new WarehouseService();
  await warehouseService.update(updateWarehouseDto.value);
}

defineExpose({updateWarehouse});

export interface IUpdateWarehouseRef {
  updateWarehouse: () => void
}

</script>