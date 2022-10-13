<template>
  <el-select ref="ElSelectRef" placeholder="选择所属仓库" v-bind="$attrs">
    <el-option v-for="item in warehouseSelectList"
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

export default defineComponent({
  name: "ErpWarehouseSelect",
  props: {
    haveRootNode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props,{expose}) {
    onMounted(async () => {
      await getWarehouseList();
    })

    const ElSelectRef = ref();

    function focus() {
      ElSelectRef.value.focus();
    }
    expose({focus})

    //产品类别选择List
    const warehouseSelectList = ref<IWarehouse[]>();
    //服务
    const warehouseService = new WarehouseService();

    async function getWarehouseList() {
      warehouseSelectList.value = await warehouseService.find();
      if (props.haveRootNode) {
        const warehouse = new Warehouse();
        warehouse.warehousename = '全部仓库'
        warehouseSelectList.value?.push(warehouse);
      }
    }

    return {
      ElSelectRef,
      warehouseSelectList,
    };
  },
});
</script>