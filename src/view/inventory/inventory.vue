<template>

  <erp-left-right-page-box>
    <template #left>
      <div class="flex flex-col h-full pr-2">
        <erp_title :title="valueName.product+'类别'"></erp_title>
        <div class="h-full overflow-y-auto">
          <erp_product-area-tree
              :have-root-node="true"
              @node-click="onClickedProductAreaTreeNode"></erp_product-area-tree>
        </div>
      </div>
    </template>
    <template #right>
      <div class="flex flex-col h-full">
        <erp_title title="库存查询">
          <template v-slot:input>
            <erp_select_operatearea_auth
                v-model="operateareaid"
                :have-root-node="true"
                class="md:w-40"
                @change="onSearchChange"
            ></erp_select_operatearea_auth>
            <erp-warehouse-auth-select-have-root
                v-model="warehouseid"
                class="md:w-32"
                @change="onSearchChange"
            ></erp-warehouse-auth-select-have-root>
            <erp_input_rounded v-model="findInventoryDto.productname" class="md:w-52" :placeholder="'输入'+valueName.product+'名称'"
                               @change="onSearchChange"></erp_input_rounded>
          </template>
          <erp_button @click="onSearchChange">刷新</erp_button>
        </erp_title>
        <erp_table ref="inventoryTableRef"
                   :find-dto="findInventoryDto"
                   :getRowNodeId="getRowNodeId"
                   :table-state="defaultInventoryTableState"
                   @selection-changed="()=>{}">
        </erp_table>
      </div>
    </template>
  </erp-left-right-page-box>
</template>

<script lang="ts" setup>
import {defaultInventoryTableState} from "@/view/inventory/tableConfig/defaultInventoryTableState";
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {FindInventoryDto, IFindInventoryDto} from "@/module/inventory/dto/FindInventory.dto";
import {computed, onMounted, ref} from "vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import {IInventory} from "@/module/inventory/inventory";
import {ITableRef} from "@/components/table/type";
import Erp_select_operatearea_auth from "@/components/select/ErpOperateAreaAuthSelect.vue";
import Erp_productAreaTree from "@/components/tree/ErpProductAreaTree.vue";
import {IProductArea} from "@/module/productArea/productArea";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {valueName} from "@/config/valueName";
import ErpLeftRightPageBox from "@/components/page/ErpLeftRightPageBox.vue";

const inventoryTableRef = ref<ITableRef>();

function getRowNodeId(data: IInventory) {
  return data.inventoryid;
}


onMounted(async () => {
  await inventoryTableRef.value?.initTableData();
  await setDefaultWarehouse();
})

async function onSearchChange() {
  await inventoryTableRef.value?.initTableData();
}

const findInventoryDto = ref<IFindInventoryDto>(new FindInventoryDto());
//仓库id 计算属性
const {warehouseid, setDefaultWarehouse} = useWarehouseSelect(findInventoryDto);


//操作区域id 计算属性
const operateareaid = computed({
  get: () => {
    if (findInventoryDto.value.operateareaids.length === 0) {
      return 0
    } else {
      return findInventoryDto.value.operateareaids[0];
    }
  }, set: val => {
    if (val === 0) {
      findInventoryDto.value.operateareaids = [];
    } else {
      findInventoryDto.value.operateareaids = [val];
    }
  }
})

async function onClickedProductAreaTreeNode(productAreaItem: IProductArea) {
  findInventoryDto.value.productareaid = productAreaItem.productareaid;
  await onSearchChange();
}
</script>

<style scoped>

</style>