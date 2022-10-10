<template>
  <erp-page-box>
    <erp-title title="用户角色管理" >
      <erp-button :disabled="!buttonShowState.create" @click="onClickedCreateRoleButton">新增</erp-button>
      <erp-button :disabled="!buttonShowState.edit" type="success">修改</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger">删除</erp-button>
    </erp-title>

    <div class=""></div>

    <erp-table
        ref="roleTableRef"
        :find-dto="{}"
        :table-state="roleTableConfig"
    >
    </erp-table>
  </erp-page-box>

  

  <role-create-dialog
      v-if="createDialogVisual"
      @clickedCancel="clickedCancelCreateDialog"
      @clickedConfirm="clickedConfirmCreateDialog"
  >
  </role-create-dialog>
</template>

<script lang="ts">
import {onMounted, ref} from "vue";
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

export default {
  name: "role",
  components: {
    ErpTable,
    ErpPageBox,
    ErpTitle,
    ErpButton,
    RoleCreateDialog
  },
  setup() {
    const roleTableRef = ref<ITableRef>();
    const createDialogVisual = ref(false);
    const {buttonShowState} = useButtonState();
    const roleService = new RoleService();

    onMounted(async () => {
      await init();
    })

    async function init() {
      await roleTableRef.value?.initTableData();
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

    return {
      buttonShowState,
      roleTableConfig,
      createDialogVisual,
      onClickedCreateRoleButton,
      clickedCancelCreateDialog,
      clickedConfirmCreateDialog,
    }
  }
}
</script>