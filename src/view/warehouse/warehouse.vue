<template>
  <erp-page-box>
    <erp-title title="仓库资料管理">
      <erp-button @click="onClickedAddDialog">新增</erp-button>
      <erp-button v-if="warehouseTableSelect.warehouseid" @click="onClickedEditDialog">修改</erp-button>
      <erp-button v-if="warehouseTableSelect.warehouseid" type="danger" @click="onClickedDeleteDialog">删除</erp-button>
    </erp-title>

    <erp-table
        ref="warehouseRef"
        :find-dto="{}"
        :getRowNodeId="getRowNodeId"
        :table-state="defaultWarehouseTableConfig"
        @selection-changed="onSelectRow"
    >
    </erp-table>
  </erp-page-box>

  <add-warehouse-dialog
      v-if="addDialogVisible"
      @ok="addDialogOk"
  >
  </add-warehouse-dialog>

  <update-warehouse-dialog
      v-if="updateDialogVisible"
      :warehouse="warehouseTableSelect"
      @ok="updateDialogOk">
  </update-warehouse-dialog>
</template>

<script lang='ts'>
import ErpTable from "@/components/table/ErpTable.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import AddWarehouseDialog from "@/view/warehouse/component/addWarehouseDialog.vue";
import UpdateWarehouseDialog from "@/view/warehouse/component/updateWarehouseDialog.vue";
import {DefaultWarehouseTable as defaultWarehouseTableConfig} from "@/view/warehouse/tableConfig/defaultWarehouseTable";
import {IWarehouse, Warehouse} from "@/module/warehouse/warehouse";
import {SelectionChangedEvent} from "ag-grid-community";
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import useErpDialog from "@/components/dialog/useErpDialog";
import {WarehouseService} from "@/module/warehouse/warehouse.service";

export default defineComponent({
  name: "WarehouseView",
  components: {
    ErpTable,
    ErpTitle,
    ErpButton,
    ErpPageBox,
    AddWarehouseDialog,
    UpdateWarehouseDialog
  },
  setup() {
    onMounted(async () => {
      await warehouseRef.value?.initTableData();
    })

    const warehouseRef = ref<ITableRef>()
    const warehouseTableSelect = ref<IWarehouse>(new Warehouse());
    const warehouseTableSelectRows = ref<IWarehouse[]>([]);
    const addDialogVisible = ref<boolean>(false);
    const updateDialogVisible = ref<boolean>(false);

    function getRowNodeId(data: IWarehouse) {
      return data.warehouseid
    }

//根据供应商ID选中列表行
    function selectRowById(id: number) {
      warehouseRef.value?.getGridApi().getRowNode("" + id)?.setSelected(true);
    }

    function onSelectRow(event: SelectionChangedEvent) {
      const selectRows = JSON.parse(JSON.stringify(event.api.getSelectedRows()));
      warehouseTableSelect.value = selectRows[0];
      warehouseTableSelectRows.value = selectRows;
    }

    function onClickedAddDialog() {
      addDialogVisible.value = true;
    }

    async function addDialogOk(warehouseid:number) {
      await warehouseRef.value?.initTableData();
      selectRowById(warehouseid);
      addDialogVisible.value = false;
    }

    async function onClickedEditDialog() {
      updateDialogVisible.value = true;
    }

    async function updateDialogOk() {
      await warehouseRef.value?.initTableData();
      updateDialogVisible.value = false;
    }

    const warehouseService = new WarehouseService();

    async function onClickedDeleteDialog() {
      if (warehouseTableSelectRows.value.length > 1) {
        useErpDialog({
          title: "是否删除",
          message: `批量删除 ${warehouseTableSelect.value.warehousename} ···，等${warehouseTableSelectRows.value.length}个仓管资料？`,
          ok: async () => {
            await Promise.all(warehouseTableSelectRows.value.map(row => {
              return warehouseService.delete_data(row.warehouseid);
            }));
            await warehouseRef.value?.initTableData();
            warehouseTableSelect.value = new Warehouse();
          }
        });
      } else {
        useErpDialog({
          title: "是否删除",
          message: `仓库名称: ${warehouseTableSelect.value.warehousename}`,
          ok: async () => {
            await warehouseService.delete_data(warehouseTableSelect.value.warehouseid);
            await warehouseRef.value?.initTableData();
            warehouseTableSelect.value = new Warehouse();
          }
        });
      }

    }

    return {
      defaultWarehouseTableConfig,
      warehouseRef,
      warehouseTableSelect,
      warehouseTableSelectRows,
      addDialogVisible,
      updateDialogVisible,
      getRowNodeId,
      onSelectRow,
      onClickedAddDialog,
      addDialogOk,
      onClickedEditDialog,
      updateDialogOk,
      onClickedDeleteDialog,
    };
  },
});
</script>