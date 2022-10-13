<template>
  <div class="flex flex-col h-full">
    <erp-title title="仓库权限">
      <erp-button @click="createDialogVisible = true">新增权限</erp-button>
      <erp-button type="danger" @click="onClickedDeleteBtn">删除权限</erp-button>
    </erp-title>

    <erp-table ref="userWarehousePermissionTableRef" :find-dto="{userid: Number(userid)}"
               :table-state="defaultUserWarehouseMxTableState" @selection-changed="onSelectRow">
    </erp-table>
  </div>

  <create-warehouse-permissions-dialog v-if="createDialogVisible" v-model:visible="createDialogVisible"
                                       :create-dto="createDto" :userid="Number(userid)"
                                       @clickedConfirm="onClickedCreateDialogOk">
  </create-warehouse-permissions-dialog>
</template>

<script lang='ts'>
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import createWarehousePermissionsDialog
  from "@/view/auth/user_warehouse_mx/component/createWarehousePermissionsDialog.vue";
import {
  defaultUserWarehouseMxTableState
} from "@/view/auth/user_warehouse_mx/tableState/defaultUserWarehouseMxTableState";
import {defineComponent, onMounted, ref} from "vue";
import {IUser_warehouse_mx} from "@/module/user_warehouse_mx/user_warehouse_mx";
import {User_warehouse_mxService} from "@/module/user_warehouse_mx/user_warehouse_mx.service";
import {DeleteUserWarehousePermissionsDto} from "@/module/user_warehouse_mx/dto/deleteUserWarehousePermissionsDto";
import {SelectionChangedEvent} from "ag-grid-community";
import {ITableRef} from "@/components/table/type";
import {
  CreateUserWarehousePermissionsDto,
  ICreateUserWarehousePermissionsDto
} from "@/module/user_warehouse_mx/dto/createUserWarehousePermissionsDto";
import useErpDialog from "@/components/dialog/useErpDialog";

export default defineComponent({
  name:"user_warehouse_mx",
  components: {
    ErpTitle,
    ErpButton,
    ErpTable,
    createWarehousePermissionsDialog
  },
  props: {
    userid: {
      type: Number,
      required: true,
      default: 0
    },
  },
  setup(props) {
    onMounted(async () => {
      await userWarehousePermissionTableRef.value?.initTableData();
    })

    //用户仓库权限表格Ref
    const userWarehousePermissionTableRef = ref<ITableRef>();
    //用户仓库权限新增请求Dto
    const createDto = ref<ICreateUserWarehousePermissionsDto>(new CreateUserWarehousePermissionsDto());
    //新增Dialog显示
    const createDialogVisible = ref<boolean>(false);
    //用户仓库权限表格行单选
    const rowClickedValue = ref<IUser_warehouse_mx>()
    //用户仓库权限服务
    const userWarehouseMxService = new User_warehouse_mxService();


    function onSelectRow(event: SelectionChangedEvent) {
      const selectRows = JSON.parse(JSON.stringify(event.api.getSelectedRows()));
      rowClickedValue.value = selectRows[0];
    }

    async function onClickedCreateDialogOk() {
      createDto.value.userid = Number(props.userid);
      await userWarehouseMxService.create(createDto.value);
      await userWarehousePermissionTableRef.value?.initTableData();
    }

    function onClickedDeleteBtn() {
      if (Number(props.userid) !== 0) {
        useErpDialog({
          title: "是否删除",
          message: `${rowClickedValue.value?.warehousename},仓库权限？`,
          ok: async () => {
            if (rowClickedValue.value) {
              const deleteDto = new DeleteUserWarehousePermissionsDto();
              deleteDto.userid = Number(props.userid);
              deleteDto.warehouseid = rowClickedValue.value.warehouseid;
              await userWarehouseMxService.delete_data(deleteDto);
              await userWarehousePermissionTableRef.value?.initTableData();
            }
          }
        })
      }
    }

    return {
      createDto,
      rowClickedValue,
      createDialogVisible,
      userWarehousePermissionTableRef,
      defaultUserWarehouseMxTableState,
      onSelectRow,
      onClickedCreateDialogOk,
      onClickedDeleteBtn,
    };
  },
});
</script>