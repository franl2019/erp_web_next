<template>
  <erp-left-right-page-box>
    <template #left>
      <erp-role-tree
          ref="roleTreeRef"
          class="border border-solid border-gray-300"
          readonly
          @node-click="onClickedRoleTree"
      ></erp-role-tree>
    </template>
    <template #right>
      <erp-title title="角色用户明细">
        <erp-button :type="'success'" @click="onClickedAddRoleUser">添加用户</erp-button>
        <erp-button :type="'danger'" @click="onClickedDeleteRoleUser">删除用户</erp-button>
      </erp-title>
      <erp-table
          ref="userRoleMxTableRef"
          :find-dto="findDto"
          :table-state="defaultUserRoleMxTableConfig"
      ></erp-table>
    </template>
  </erp-left-right-page-box>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import ErpLeftRightPageBox from "@/components/page/ErpLeftRightPageBox.vue";
import ErpPermissionsThemeTree from "@/components/tree/component/ErpPermissionsThemeTree.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpRoleTree from "@/components/tree/component/ErpRoleTree.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {defaultUserRoleMxTableConfig} from "@/view/auth/userRoleMx/config/defaultUserRoleMxTableConfig";
import {UserRoleMxFindDto} from "@/module/userRoleMx/dto/userRoleMxFind.dto";
import {ITableRef} from "@/components/table/type";
import {IRole} from "@/module/role/role";
import {useUserRoleMxCreateDialog} from "@/view/auth/userRoleMx/useUserRoleMxCreateDialog";
import useErpDialog from "@/components/dialog/useErpDialog";
import {UserRoleMxService} from "@/module/userRoleMx/userRoleMx.service";
import {UserRoleMxDeleteDto} from "@/module/userRoleMx/dto/userRoleMxDelete.dto";
import {IUserRoleMx} from "@/module/userRoleMx/userRoleMx";

export default defineComponent({
  name: "UserRoleMx",
  components: {
    ErpTable,
    ErpRoleTree,
    ErpButton,
    ErpNoTitle,
    ErpPageBox,
    ErpTitle,
    ErpPermissionsThemeTree,
    ErpLeftRightPageBox
  },
  setup() {

    const findDto = ref(new UserRoleMxFindDto());
    const userRoleMxTableRef = ref<ITableRef>();
    const userRoleMxService = new UserRoleMxService();
    const roleTreeRef = ref();

    async function initTableData() {
      await userRoleMxTableRef.value?.initTableData();
    }

    function onClickedRoleTree(role: IRole) {
      if (role.roleId !== 0) {
        findDto.value.roleId = role.roleId;
        initTableData();
      }
    }

    function getSelectedRoleInTree() {
      const role = roleTreeRef.value.getSelectedNode() as IRole | undefined;
      if (role && role.roleId !== 0) {
        return role
      } else {
        return Promise.reject(new Error('请先选择用户'));
      }
    }

    function getSelectedUserRoleMx() {
      const userRoleMxList = userRoleMxTableRef.value?.getGridApi().getSelectedRows() as IUserRoleMx[];
      if (
          userRoleMxList &&
          userRoleMxList.length > 0 &&
          userRoleMxList[0].userid !== 0 &&
          userRoleMxList[0].roleId !== 0
      ) {
        return userRoleMxList[0]
      } else {
        return Promise.reject(new Error('请先选择表格明细'));
      }
    }

    async function onClickedAddRoleUser() {
      const role = await getSelectedRoleInTree();
      await useUserRoleMxCreateDialog(role.roleId);
      await initTableData();
    }

    async function onClickedDeleteRoleUser() {
      const userRoleMx = await getSelectedUserRoleMx()
      const userRoleDeleteDto = new UserRoleMxDeleteDto();
      userRoleDeleteDto.userid = userRoleMx.userid;
      userRoleDeleteDto.roleId = userRoleMx.roleId;
      await useErpDialog({
        title: "提示",
        message: "是否删除角色的用户",
        ok: async () => {
          await userRoleMxService.delete_data(userRoleDeleteDto);
        }
      });
      await initTableData();
    }

    return {
      findDto,
      roleTreeRef,
      userRoleMxTableRef,
      defaultUserRoleMxTableConfig,
      onClickedRoleTree,
      onClickedAddRoleUser,
      onClickedDeleteRoleUser
    }
  }
})
</script>