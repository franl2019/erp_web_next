<template>
  <el-select v-bind="$attrs" ref="ElSelectRef" placeholder="选择所属仓库" >
    <el-option
        v-for="item in warehouseSelectList"
        :key="item.warehouseid"
        :label="item.warehousename"
        :value="item.warehouseid"
    >
    </el-option>
  </el-select>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {IWarehouse} from "@/module/warehouse/warehouse";
import {WarehouseService} from "@/module/warehouse/warehouse.service";

onMounted(async () => {
  warehouseSelectList.value = await getWarehouseList();
})

const ElSelectRef = ref();

function focus() {
  ElSelectRef.value.focus();
}

defineExpose({focus});

//产品类别选择List
const warehouseSelectList = ref<IWarehouse[]>([]);
//服务
const warehouseService = new WarehouseService();

async function getWarehouseList() {
  return await warehouseService.find_auth();
}
</script>

<style scoped>

</style>