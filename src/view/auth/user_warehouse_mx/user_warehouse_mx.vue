<template>
  <div class="flex flex-col h-full">
    <erp_title title="仓库权限">
      <erp_button @click="createDialogVisible = true">新增权限</erp_button>
      <erp_button @click="onClickedDeleteBtn" type="danger">删除权限</erp_button>
    </erp_title>

    <erp_table
        ref="userWarehousePermissionTableRef"
        :table-state="defaultUserWarehouseMxTableState"
        :find-dto="{userid: Number(props.userid)}"
        @selection-changed="onSelectRow"
    >
    </erp_table>
  </div>

  <create-warehouse-permissions-dialog
      v-if="createDialogVisible"
      v-model:visible="createDialogVisible"
      :userid="Number(props.userid)"
      @clickedConfirm="onClickedCreateDialogOk"
      :create-dto="createDto">
  </create-warehouse-permissions-dialog>
</template>

<!--<script lang='ts'>-->
<!--import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";-->
<!--import ErpDialog from "@/components/dialog/dialog";-->
<!--export default {-->
<!--  //没有选择userid不能访问-->
<!--  beforeRouteEnter: function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {-->
<!--    if (to.params.userid) {-->
<!--      next();-->
<!--    } else {-->
<!--      ErpDialog({-->
<!--        title: "温馨提示",-->
<!--        message: "请选择用户",-->
<!--        ok: () => {-->
<!--          next({name: "auth"});-->
<!--        },-->
<!--        closeBtnVisible:false-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<script setup lang='ts'>
import {defaultUserWarehouseMxTableState} from "@/view/auth/user_warehouse_mx/tableState/defaultUserWarehouseMxTableState";
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import CreateWarehousePermissionsDialog
  from "@/view/auth/user_warehouse_mx/component/createWarehousePermissionsDialog.vue";
import {onMounted, ref} from "vue";
import {IUser_warehouse_mx} from "@/module/user_warehouse_mx/user_warehouse_mx";
import {User_warehouse_mxService} from "@/module/user_warehouse_mx/user_warehouse_mx.service";
import {DeleteUserWarehousePermissionsDto} from "@/module/user_warehouse_mx/dto/deleteUserWarehousePermissionsDto";
import {SelectionChangedEvent} from "ag-grid-community";
import {ITableRef} from "@/components/table/type";
import {
  CreateUserWarehousePermissionsDto,
  ICreateUserWarehousePermissionsDto
} from "@/module/user_warehouse_mx/dto/createUserWarehousePermissionsDto";
import ErpDialog from "@/components/dialog/dialog";
import {useRoute} from "vue-router";

const props = defineProps<{
  userid:number
}>()

onMounted(async ()=>{
  await userWarehousePermissionTableRef.value?.initTableData();
})

const route = useRoute();

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
    ErpDialog({
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
</script>