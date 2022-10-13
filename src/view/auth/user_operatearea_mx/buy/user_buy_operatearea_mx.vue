<template>
  <div class="flex flex-col h-full">
    <erp_title title="供应商操作区域权限">
      <erp_button @click="createDialogVisible = true">新增</erp_button>
      <erp_button v-if="rowClickedValue.operateareaid" type="danger" @click="onClickedDeleteBtn">删除</erp_button>
    </erp_title>

    <erp_table ref="tableRef" :find-dto="findUserBuyOperateareaDto" :table-state="DefaultUserBuyOperateAreaMxTableState"
               @selection-changed="onSelectRow">
    </erp_table>

  </div>

  <create-user-buy-operatearea-permission-dialog
      v-if="createDialogVisible" v-model:visible="createDialogVisible"
      :create-buy-operatearea-dto="createBuyOperateareaDto"
      @clickedConfirm="onCreateDialogConfirm">
  </create-user-buy-operatearea-permission-dialog>
</template>

<script lang='ts'>
import {
  DefaultUserBuyOperateAreaMxTableState
} from "@/view/auth/user_operatearea_mx/buy/tableState/defaultUserBuyOperateAreaMxTableState";
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import {FindUserBuyOperateAreaDto} from "@/module/user_operatearea_mx/dto/findUserClientOperateArea.dto";
import {defineComponent, onMounted, ref} from "vue";
import {SelectionChangedEvent} from "ag-grid-community";
import {IUser_operatearea_mx, User_operatearea_mx} from "@/module/user_operatearea_mx/user_operatearea_mx";
import CreateUserBuyOperateareaPermissionDialog
  from "@/view/auth/user_operatearea_mx/buy/components/createUserBuyOperateareaPermissionDialog.vue";
import {User_operatearea_mxService} from "@/module/user_operatearea_mx/user_operatearea_mx.service";
import {
  CreateUserOperateAreaDto,
  ICreateUserOperateAreaDto
} from "@/module/user_operatearea_mx/dto/createUserOperateArea.dto";
import {ITableRef} from "@/components/table/type";
import useErpDialog from "@/components/dialog/useErpDialog";
import {DeleteUserOperateAreaDto} from "@/module/user_operatearea_mx/dto/deleteUserOperateArea.dto";

export default defineComponent({
  name:"user_buy_operatearea_mx",
  components:{
    Erp_title,
    Erp_button,
    Erp_table,
    CreateUserBuyOperateareaPermissionDialog,
  },
  props: {
    userid: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    onMounted(async () => {
      await tableRef.value?.initTableData();
    })

    //table
    const tableRef = ref<ITableRef>();

    const findUserBuyOperateareaDto = ref(new FindUserBuyOperateAreaDto());

    findUserBuyOperateareaDto.value.userid = Number(props.userid);

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
    const createBuyOperateareaDto = ref<ICreateUserOperateAreaDto>(new CreateUserOperateAreaDto());

    //create dialog confirm event
    async function onCreateDialogConfirm() {
      createBuyOperateareaDto.value.userid = Number(props.userid);
      await userOperateareaMxService.create(createBuyOperateareaDto.value);
      await tableRef.value?.initTableData();
      createBuyOperateareaDto.value = new CreateUserOperateAreaDto();
    }

    //delete btn onClick
    async function onClickedDeleteBtn() {
      useErpDialog({
        title: "是否删除",
        message: `用户供应商操作区域：${rowClickedValue.value?.operateareaname}`,
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
      props,
      tableRef,
      rowClickedValue,
      createDialogVisible,
      createBuyOperateareaDto,
      findUserBuyOperateareaDto,
      DefaultUserBuyOperateAreaMxTableState,
      onSelectRow,
      onCreateDialogConfirm,
      onClickedDeleteBtn,
    };
  },
});
</script>