<template>
  <erp-left-right-page-box>
    <template #left>
      <div class="flex flex-col flex-grow pr-2">
        <erp-title :title="valueName.product + '类别'"></erp-title>
        <div class="flex-grow h-0 overflow-y-auto">
          <erp-product-area-tree
              :have-root-node="true"
              @node-click="onClickedProductAreaTreeNode"
          ></erp-product-area-tree>
        </div>
      </div>
    </template>
    <template #right>
      <div class="flex flex-col h-full">
        <erp-title title="库存查询">
          <template v-slot:input>
            <erp-operate-area-auth-select
                v-model="operateareaid"
                :have-root-node="true"
                class="md:w-40"
                @change="onSearchChange"
            ></erp-operate-area-auth-select>
            <erp-warehouse-auth-select-have-root
                v-model="warehouseid"
                class="md:w-32"
                @change="onSearchChange"
            ></erp-warehouse-auth-select-have-root>
            <erp-input-round
                v-model="findInventoryDto.productname"
                :placeholder="'输入' + valueName.product + '名称'"
                class="md:w-52"
                @change="onSearchChange"
            ></erp-input-round>
          </template>
          <erp-button @click="onSearchChange">刷新</erp-button>
        </erp-title>
        <erp-table
            ref="inventoryTableRef"
            :find-dto="findInventoryDto"
            :getRowNodeId="getRowNodeId"
            :table-state="defaultInventoryTableState"
            @selection-changed="() => {}"
        >
        </erp-table>
      </div>
    </template>
  </erp-left-right-page-box>
</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpLeftRightPageBox from "@/components/page/ErpLeftRightPageBox.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpProductAreaTree from "@/components/tree/aboutComponent/ErpProductAreaTree.vue";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import {defaultInventoryTableState} from "@/view/inventory/tableConfig/defaultInventoryTableState";
import {FindInventoryDto, IFindInventoryDto,} from "@/module/inventory/dto/FindInventory.dto";
import {computed, defineComponent, onMounted, ref} from "vue";
import {IInventory} from "@/module/inventory/inventory";
import {ITableRef} from "@/components/table/type";
import {IProductArea} from "@/module/productArea/productArea";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {valueName} from "@/config/valueName";

export default defineComponent({
  name: "inventory",
  components: {
    ErpTitle,
    ErpInputRound,
    ErpTable,
    ErpButton,
    ErpLeftRightPageBox,
    ErpOperateAreaAuthSelect,
    ErpProductAreaTree,
    ErpWarehouseAuthSelectHaveRoot
  },
  setup() {
    const inventoryTableRef = ref<ITableRef>();

    function getRowNodeId(data: IInventory) {
      return data.inventoryid;
    }

    onMounted(async () => {
      await inventoryTableRef.value?.initTableData();
      await setDefaultWarehouse();
    });

    async function onSearchChange() {
      await inventoryTableRef.value?.initTableData();
    }

    const findInventoryDto = ref<IFindInventoryDto>(new FindInventoryDto());
    //仓库id 计算属性
    const {warehouseid, setDefaultWarehouse} =
        useWarehouseSelect(findInventoryDto);

    //操作区域id 计算属性
    const operateareaid = computed({
      get: () => {
        if (findInventoryDto.value.operateareaids.length === 0) {
          return 0;
        } else {
          return findInventoryDto.value.operateareaids[0];
        }
      },
      set: (val) => {
        if (val === 0) {
          findInventoryDto.value.operateareaids = [];
        } else {
          findInventoryDto.value.operateareaids = [val];
        }
      },
    });

    async function onClickedProductAreaTreeNode(productAreaItem: IProductArea) {
      findInventoryDto.value.productareaid = productAreaItem.productareaid;
      await onSearchChange();
    }

    return {
      valueName,
      warehouseid,
      findInventoryDto,
      inventoryTableRef,
      defaultInventoryTableState,
      operateareaid,
      getRowNodeId,
      onSearchChange,
      setDefaultWarehouse,
      onClickedProductAreaTreeNode,
    };
  },
});
</script>

<style scoped></style>
