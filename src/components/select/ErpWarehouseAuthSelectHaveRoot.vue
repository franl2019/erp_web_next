<template>
  <el-select ref="ElSelectRef" placeholder="选择所属仓库" v-bind="$attrs">
    <el-option
        v-for="item in warehouseSelectList"
        :key="item.warehouseid"
        :label="item.warehousename"
        :value="item.warehouseid">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IWarehouse, Warehouse} from "@/module/warehouse/warehouse";
import {WarehouseService} from "@/module/warehouse/warehouse.service";
import {ElOption, ElSelect} from "element-plus";

export default defineComponent({
  name: "ErpWarehouseAuthSelectHaveRoot",
  components: {
    ElSelect, ElOption
  },
  setup(_props, {expose}) {
    onMounted(() => {
      getWarehouseList();
    })

    const ElSelectRef = ref();

    function focus() {
      ElSelectRef.value.focus();
    }

    expose({focus})

    //产品类别选择List
    const warehouseSelectList = ref<IWarehouse[]>([]);

    //服务
    const warehouseService = new WarehouseService();

    async function getWarehouseList() {
      const warehouseList = await warehouseService.find_auth();
      const rootWarehouse: IWarehouse = new Warehouse();
      rootWarehouse.warehousename = '全部仓库';
      warehouseList.unshift(rootWarehouse);
      warehouseSelectList.value = warehouseList
    }

    return {
      ElSelectRef,
      warehouseSelectList,
    };
  },
});
</script>

<style scoped>

</style>