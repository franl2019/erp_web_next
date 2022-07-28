<template>
  <div class="flex flex-col h-full">
    <erp_title title="客户操作区域权限">
      <erp_button @click="createDialogVisible = true">新增</erp_button>
      <erp_button @click="onClickedDeleteBtn" v-if="rowClickedValue.operateareaid" type="danger">删除</erp_button>
    </erp_title>

    <erp_table
        ref="tableRef"
        :table-state="DefaultUserClientOperateAreaMxTableState"
        :find-dto="findUserClientOperateareaDto"
        @selection-changed="onSelectRow"
    >
    </erp_table>
  </div>

  <create-user-client-operatearea-permission-dialog
      v-if="createDialogVisible"
      v-model:visible="createDialogVisible"
      @clickedConfirm="onCreateDialogConfirm"
      :create-client-operatearea-dto="createClientOperateareaDto">
  </create-user-client-operatearea-permission-dialog>
</template>

<script setup lang='ts'>
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import {
  FindUserClientOperateAreaDto
} from "@/module/user_operatearea_mx/dto/findUserClientOperateArea.dto";
import {onMounted, ref} from "vue";
import {SelectionChangedEvent} from "ag-grid-community";
import {IUser_operatearea_mx, User_operatearea_mx} from "@/module/user_operatearea_mx/user_operatearea_mx";
import {
  DefaultUserClientOperateAreaMxTableState
} from "@/view/auth/user_operatearea_mx/client/tableState/defaultUserClientOperateAreaMxTableState";
import CreateUserClientOperateareaPermissionDialog
  from "@/view/auth/user_operatearea_mx/client/components/createUserClientOperateareaPermissionDialog.vue";
import {
  CreateUserOperateAreaDto,
  ICreateUserOperateAreaDto
} from "@/module/user_operatearea_mx/dto/createUserOperateArea.dto";
import {User_operatearea_mxService} from "@/module/user_operatearea_mx/user_operatearea_mx.service";
import {ITableRef} from "@/components/table/type";
import {DeleteUserOperateAreaDto} from "@/module/user_operatearea_mx/dto/deleteUserOperateArea.dto";
import ErpDialog from "@/components/dialog/dialog";
import {useRoute} from "vue-router";

onMounted(async () => {
  await tableRef.value?.initTableData();
})

const route = useRoute();

//table
const tableRef = ref<ITableRef>();

const findUserClientOperateareaDto = ref(new FindUserClientOperateAreaDto());
findUserClientOperateareaDto.value.userid = Number(route.query.userid);

const rowClickedValue = ref<IUser_operatearea_mx>(new User_operatearea_mx());

function onSelectRow(event: SelectionChangedEvent) {
  const selectRows = JSON.parse(JSON.stringify(event.api.getSelectedRows()));
  rowClickedValue.value = selectRows[0];
}

//user operatearea permission service
const userOperateareaMxService = new User_operatearea_mxService();

//create dialog visible
const createDialogVisible = ref<boolean>(false);

//create client operatearea dto
const createClientOperateareaDto = ref<ICreateUserOperateAreaDto>(new CreateUserOperateAreaDto());


//create dialog confirm event
async function onCreateDialogConfirm() {
  createClientOperateareaDto.value.userid = Number(route.query.userid);
  await userOperateareaMxService.create(createClientOperateareaDto.value);
  await tableRef.value?.initTableData();
  createClientOperateareaDto.value = new CreateUserOperateAreaDto();
}

//delete btn onClick
async function onClickedDeleteBtn() {
  ErpDialog({
    title: "是否删除",
    message: `用户客户操作区域：${rowClickedValue.value?.operateareaname}`,
    ok: async () => {
      if (rowClickedValue.value) {
        const deleteDto = new DeleteUserOperateAreaDto();
        deleteDto.userid = Number(route.query.userid);
        deleteDto.operateareaid = rowClickedValue.value.operateareaid;
        await userOperateareaMxService.delete_data(deleteDto);
        await tableRef.value?.initTableData();
        rowClickedValue.value = new User_operatearea_mx();
      }
    }
  })
}

</script>