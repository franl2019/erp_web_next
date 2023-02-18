<template>
  <erp-form-dialog
      title="新增仓库资料"
      @clickedConfirm="clickedConfirm"
      @clickedClose="clickedClose"
  >
    <erp-form>
      <erp-form-item name="仓库编号" lg-col="8" md-col="8">
        <erp-input-round ref="defaultInputFocusRef" v-model="createWarehouseDto.warehousecode"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="仓库名称" lg-col="8" md-col="8">
        <erp-input-round v-model="createWarehouseDto.warehousename"></erp-input-round>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {defineComponent, onMounted, ref} from "vue";
import {CreateWarehouseDto, ICreateWarehouseDto} from "@/module/warehouse/dto/createWarehouse.dto";
import {WarehouseService} from "@/module/warehouse/warehouse.service";

export default defineComponent({
  name: "AddWarehouseDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpFormDialog
  },
  emits:["ok","close"],
  setup(_props,{emit}) {
    const defaultInputFocusRef = ref();
    onMounted(async () => {
      defaultInputFocusRef.value.getNode().focus();
    })

    const createWarehouseDto = ref<ICreateWarehouseDto>(new CreateWarehouseDto());

    async function clickedConfirm() {
      const warehouseService = new WarehouseService();
      const createResult = await warehouseService.create(createWarehouseDto.value);
      emit('ok',createResult);
    }

    function clickedClose() {
      emit('close');
    }

    return {
      defaultInputFocusRef,
      createWarehouseDto,
      clickedConfirm,
      clickedClose,
    };
  },
});
</script>