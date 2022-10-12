<template>
  <erp-page-box>
    <erp-title title="用户角色管理">
      <erp-button :disabled="!buttonShowState.create" @click="onClickedCreateRoleButton">新增</erp-button>
      <erp-button :disabled="!buttonShowState.edit" type="success" @click="onClickedUpdateRoleButton">修改</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="onClickedDeleteRoleButton">删除
      </erp-button>
    </erp-title>

    <erp-table ref="roleTableRef" :find-dto="{}" :table-state="roleTableConfig"
      @selection-changed="tableSelectionChanged">
    </erp-table>
  </erp-page-box>

  <role-create-dialog v-if="createDialogVisual" @clickedCancel="clickedCancelCreateDialog"
    @clickedConfirm="clickedConfirmCreateDialog">
  </role-create-dialog>

  <role-update-dialog v-if="updateDialogVisual" :role="tableSelectedRole" @clickedCancel="clickedCancelUpdateDialog"
    @clickedConfirm="clickedConfirmUpdateDialog">
  </role-update-dialog>
</template>


<script lang="ts">
import {defineComponent, onMounted, Ref, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {RoleService} from "@/module/role/role.service";
import {IRole} from "@/module/role/role";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import {useButtonState} from "@/composables/useButtonState";
import {roleTableConfig} from "@/view/role/tableConfig/roleTableConfig";
import RoleCreateDialog from "@/view/role/roleCreateDialog.vue";
import RoleUpdateDialog from "@/view/role/roleUpdateDialog.vue";
import {SelectionChangedEvent} from "ag-grid-community";
import ErpDialog from "@/components/dialog/dialog";
import {RoleUpdateDto} from "@/module/role/dto/roleUpdate.dto";

export default defineComponent({
  name:"RoleView",
  components:{
    ErpTable,
    ErpPageBox,
    ErpTitle,
    ErpButton,
    RoleCreateDialog,
    RoleUpdateDialog
  },
  setup() {
    const roleTableRef = ref<ITableRef>();
    const createDialogVisual = ref(false);
    const updateDialogVisual = ref(false);
    const { buttonShowState, updateButtonState } = useButtonState();
    const roleService = new RoleService();
    const tableSelectedRole: Ref<IRole> = ref(new RoleUpdateDto({} as IRole));
      
    onMounted(async () => {
      await init();
    });

    async function init() {
      await roleTableRef.value?.initTableData();
      updateButtonState();
    }

    function onClickedCreateRoleButton() {
      createDialogVisual.value = true;
    }

    function clickedCancelCreateDialog() {
      createDialogVisual.value = false;
    }

    async function clickedConfirmCreateDialog(role: IRole) {
      await roleService.create(role);
      await init();
      createDialogVisual.value = false;
    }

    function tableSelectionChanged(event: SelectionChangedEvent) {
      tableSelectedRole.value = event.api.getSelectedRows()[0];
      updateButtonState(tableSelectedRole.value.level1Review, tableSelectedRole.value.level2Review);
    }

    function clickedCancelUpdateDialog() {
      updateDialogVisual.value = false;
    }

    async function clickedConfirmUpdateDialog(role: IRole) {
      await roleService.update(role);
      await init();
      updateDialogVisual.value = false;
    }

    function onClickedUpdateRoleButton() {
      updateDialogVisual.value = true;
    }

    function onClickedDeleteRoleButton() {
      ErpDialog({
        title: '提示',
        message: "是否删除该角色",
        ok: async () => {
          await roleService.delete_data(tableSelectedRole.value);
          await init();
        }
      })
    }
    return {
      roleTableConfig,
      roleTableRef,
      createDialogVisual,
      updateDialogVisual,
      buttonShowState,
      tableSelectedRole,
      updateButtonState,
      onClickedCreateRoleButton,
      clickedCancelCreateDialog,
      clickedConfirmCreateDialog,
      tableSelectionChanged,
      clickedCancelUpdateDialog,
      clickedConfirmUpdateDialog,
      onClickedUpdateRoleButton,
      onClickedDeleteRoleButton,
    };
  },
});
</script>
