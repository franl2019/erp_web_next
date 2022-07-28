<template>
  <erp_dialog_form v-bind="$attrs" title="新增仓库资料">
    <erp_form>
      <erp_form_item label-for-name="仓库编号" md-col="8" lg-col="8">
        <erp_input_rounded ref="defaultInputFocusRef" v-model="createWarehouseDto.warehousecode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="仓库名称" md-col="8" lg-col="8">
        <erp_input_rounded v-model="createWarehouseDto.warehousename"></erp_input_rounded>
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
import {CreateWarehouseDto, ICreateWarehouseDto} from "@/module/warehouse/dto/createWarehouse.dto";
import {WarehouseService} from "@/module/warehouse/warehouse.service";

const defaultInputFocusRef = ref();
onMounted(async () => {
  defaultInputFocusRef.value.getNode().focus();
})

const createWarehouseDto = ref<ICreateWarehouseDto>(new CreateWarehouseDto());
async function createWarehouse() {
  const warehouseService = new WarehouseService();
  await warehouseService.create(createWarehouseDto.value);
}

defineExpose({createWarehouse});

export interface ICreateWarehouseRef {
  createWarehouse: () => void
}

</script>