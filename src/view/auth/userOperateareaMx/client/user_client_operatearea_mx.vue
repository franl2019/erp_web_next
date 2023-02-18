<template>
  <div class="flex flex-col h-full">
    <erp-table
        ref="tableRef"
        init
        :find-dto="findUserClientOperateareaDto"
        :show-top-box="true"
        :table-state="DefaultUserClientOperateAreaMxTableState"
        @selection-changed="onSelectRow"
    >
      <template #topBox>
        <erp-button
            :size="'mini'"
            @click="createDialogVisible = true">新增</erp-button>
        <erp-button
            v-if="rowClickedValue.operateareaid"
            :size="'mini'"
            type="danger"
            @click="onClickedDeleteBtn"
        >删除</erp-button>
      </template>
    </erp-table>
  </div>

  <create-user-client-operatearea-permission-dialog v-if="createDialogVisible" v-model:visible="createDialogVisible"
                                                    :create-client-operatearea-dto="createClientOperateareaDto"
                                                    @clickedConfirm="onCreateDialogConfirm">
  </create-user-client-operatearea-permission-dialog>
</template>

<script lang='ts'>
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {FindUserClientOperateAreaDto} from "@/module/user_operatearea_mx/dto/findUserClientOperateArea.dto";
import {defineComponent, onMounted, ref} from "vue";
import {SelectionChangedEvent} from "ag-grid-community";
import {IUser_operatearea_mx, User_operatearea_mx} from "@/module/user_operatearea_mx/user_operatearea_mx";
import {
  DefaultUserClientOperateAreaMxTableState
} from "@/view/auth/userOperateareaMx/client/tableState/defaultUserClientOperateAreaMxTableState";
import CreateUserClientOperateareaPermissionDialog
  from "@/view/auth/userOperateareaMx/client/components/createUserClientOperateareaPermissionDialog.vue";
import {
  CreateUserOperateAreaDto,
  ICreateUserOperateAreaDto
} from "@/module/user_operatearea_mx/dto/createUserOperateArea.dto";
import {User_operatearea_mxService} from "@/module/user_operatearea_mx/user_operatearea_mx.service";
import {ITableRef} from "@/components/table/type";
import {DeleteUserOperateAreaDto} from "@/module/user_operatearea_mx/dto/deleteUserOperateArea.dto";
import useErpDialog from "@/components/dialog/useErpDialog";

export default defineComponent({
  name: "user_client_operatearea_mx",
  components: {
    ErpTitle,
    ErpButton,
    ErpTable,
    CreateUserClientOperateareaPermissionDialog,
  },
  props: ['userid'],
  setup(props) {
    onMounted(async () => {
      await tableRef.value?.initTableData();
    })

    //table
    const tableRef = ref<ITableRef>();

    const findUserClientOperateareaDto = ref(new FindUserClientOperateAreaDto());
    findUserClientOperateareaDto.value.userid = Number(props.userid);

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
      createClientOperateareaDto.value.userid = Number(props.userid);
      await userOperateareaMxService.create(createClientOperateareaDto.value);
      await tableRef.value?.initTableData();
      createClientOperateareaDto.value = new CreateUserOperateAreaDto();
    }

    //delete btn onClick
    async function onClickedDeleteBtn() {
      useErpDialog({
        title: "是否删除",
        message: `用户客户操作区域：${rowClickedValue.value?.operateareaname}`,
        ok: async () => {
          if (rowClickedValue.value) {
            const deleteDto = new DeleteUserOperateAreaDto();
            deleteDto.userid = Number(props.userid);
            deleteDto.operateareaid = rowClickedValue.value.operateareaid;
            await userOperateareaMxService.delete_data(deleteDto);
            await tableRef.value?.initTableData();
            rowClickedValue.value = new User_operatearea_mx();
          }
        }
      })
    }

    return {
      DefaultUserClientOperateAreaMxTableState,
      tableRef,
      findUserClientOperateareaDto,
      rowClickedValue,
      createDialogVisible,
      createClientOperateareaDto,
      onSelectRow,
      onCreateDialogConfirm,
      onClickedDeleteBtn,
    };
  },
});
</script>