<template>
  <erp-page-box>
    <erp_title title="仓库资料管理">
      <erp_button @click="onClickedAddDialog">新增</erp_button>
      <erp_button v-if="warehouseTableSelect.warehouseid" @click="onClickedEditDialog">修改</erp_button>
      <erp_button v-if="warehouseTableSelect.warehouseid" @click="onClickedDeleteDialog" type="danger">删除</erp_button>
    </erp_title>

    <erp_table
        ref="warehouseRef"
        :table-state="DefaultWarehouseTable"
        :getRowNodeId="getRowNodeId"
        :find-dto="{}"
        @selection-changed="onSelectRow"
    >
    </erp_table>
  </erp-page-box>

  <add-warehouse-dialog
      v-if="addDialogVisible"
      v-model:visible="addDialogVisible"
      ref="addDialogRef"
      @clickedConfirm="addDialogOk"
  >
  </add-warehouse-dialog>

  <update-warehouse-dialog
      v-if="updateDialogVisible"
      v-model:visible="updateDialogVisible"
      ref="updateDialogRef"
      :warehouse="warehouseTableSelect"
      @clickedConfirm="updateDialogOk">
  </update-warehouse-dialog>
</template>

<script setup lang='ts'>
import {DefaultWarehouseTable} from "@/view/warehouse/tableConfig/defaultWarehouseTable";
import Erp_table from "@/components/table/ErpTable.vue";
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import {IWarehouse, Warehouse} from "@/module/warehouse/warehouse";
import {SelectionChangedEvent} from "ag-grid-community";
import {onMounted, ref} from "vue";
import AddWarehouseDialog from "@/view/warehouse/component/addWarehouseDialog.vue";
import type {ICreateWarehouseRef} from "@/view/warehouse/component/addWarehouseDialog.vue";
import {ITableRef} from "@/components/table/type";
import UpdateWarehouseDialog, {IUpdateWarehouseRef} from "@/view/warehouse/component/updateWarehouseDialog.vue";
import ErpDialog from "@/components/dialog/dialog";
import {WarehouseService} from "@/module/warehouse/warehouse.service";
import ErpPageBox from "@/components/page/ErpPageBox.vue";

onMounted(async () => {
  await warehouseRef.value?.initTableData();
})

const warehouseRef = ref<ITableRef>()
const warehouseTableSelect = ref<IWarehouse>(new Warehouse());
const warehouseTableSelectRows = ref<IWarehouse[]>([]);
const addDialogRef = ref<ICreateWarehouseRef>();
const addDialogVisible = ref<boolean>(false);

const updateDialogRef = ref<IUpdateWarehouseRef>();
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

async function addDialogOk() {
  await addDialogRef.value?.createWarehouse();
  await warehouseRef.value?.initTableData();
}

async function onClickedEditDialog() {
  updateDialogVisible.value = true;
}

async function updateDialogOk() {
  await updateDialogRef.value?.updateWarehouse();
  await warehouseRef.value?.initTableData();
  selectRowById(warehouseTableSelect.value.warehouseid);
}

const warehouseService = new WarehouseService();

async function onClickedDeleteDialog() {
  if (warehouseTableSelectRows.value.length > 1) {
    ErpDialog({
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
    ErpDialog({
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
</script>