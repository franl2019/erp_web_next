<template>
  <erp-page-box>
    <erp-title title="1.选择角色">
    </erp-title>
    <erp-form>
      <erp-form-item lg-col="2" md-col="2" name="角色名称">
        <erp-role-select
            v-model="rolePermissionsMxFindAllDto.roleId"
            @change="onSelectedRole"
        ></erp-role-select>
      </erp-form-item>
    </erp-form>

    <template v-if="rolePermissionsMxFindAllDto.roleId!==0">
      <erp-title title="2.设置权限"></erp-title>
      <div class="flex flex-grow">
        <div class="w-64 flex flex-col flex-none">
          <permissions-theme
              :show-title="false"
              readonly
              @selectedNode="onSelectedPermissionsTheme"
          ></permissions-theme>
        </div>
        <div class="flex flex-col flex-grow">
          <erp-table
              ref="rolePermissionsMxTable"
              :find-dto="rolePermissionsMxFindAllDto"
              :getRowNodeId="getRowNodeId"
              :show-top-box="true"
              :table-state="rolePermissionsMxTableConfig"
              init
          >
            <template #topBox>
              <erp-button
                  :size="'mini'"
                  :type="'success'"
                  @click="onClickedEnablePermissions"
              >启用选中
              </erp-button>
              <div class="px-1.5"></div>
              <erp-button
                  :size="'mini'"
                  :type="'danger'"
                  @click="onClickedDisablePermissions"
              >禁用选中
              </erp-button>
            </template>
          </erp-table>
        </div>
      </div>
    </template>
  </erp-page-box>
</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue';
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpSelectBuyBtn from "@/components/button/ErpSelectBuyBtn.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import Permissions from "@/view/permissions/permissions.vue";
import PermissionsTheme from "@/view/permissionsTheme/permissionsTheme.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpRoleSelect from "@/components/select/ErpRoleSelect.vue";
import {rolePermissionsMxTableConfig} from "@/view/rolePermissionsMx/tableConfig/rolePermissionsMxTableConfig";
import {RolePermissionsMxFindAllDto} from "@/module/rolePermissionsMx/dto/rolePermissionsMxFindAll.dto";
import {ITableRef} from "@/components/table/type";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";
import ErpButton from "@/components/button/ErpButton.vue";
import {IRolePermissionsMxJoinPermissions} from "@/module/rolePermissionsMx/rolePermissionsMx";
import {RolePermissionsMxService} from "@/module/rolePermissionsMx/rolePermissionsMx.service";
import {RolePermissionsMxUpdateDto} from "@/module/rolePermissionsMx/dto/rolePermissionsMxUpdate.dto";

export default defineComponent({
  name: "rolePermissions",
  components: {
    ErpButton,
    ErpRoleSelect,
    ErpTable,
    ErpForm,
    ErpFormItem,
    ErpSelectBuyBtn,
    ErpTitle,
    ErpPageBox,
    PermissionsTheme,
    Permissions
  },
  setup() {
    const rolePermissionsMxTable = ref<ITableRef>();
    const rolePermissionsMxFindAllDto = ref(new RolePermissionsMxFindAllDto());
    const rolePermissionsMxService = new RolePermissionsMxService();

    function getRowNodeId(rolePermissionsMxJoinPermissions: IRolePermissionsMxJoinPermissions) {
      return rolePermissionsMxJoinPermissions.permissionsCode
    }

    async function onSelectedPermissionsTheme(permissionsTheme: IPermissionsTheme) {
      rolePermissionsMxFindAllDto.value.permissionsThemeId = permissionsTheme.permissionsThemeId;
      await initTable();
    }

    function onSelectedRole() {
      initTable()
    }

    async function initTable() {
      await rolePermissionsMxTable.value?.initTableData()
    }

    async function getSelectedRows() {
      const rolePermissionsMxJoinPermissions = rolePermissionsMxTable.value?.getGridApi().getSelectedRows();
      if (rolePermissionsMxJoinPermissions && rolePermissionsMxJoinPermissions.length > 0) {
        return rolePermissionsMxJoinPermissions as IRolePermissionsMxJoinPermissions[]
      } else {
        return Promise.reject(new Error('请先选择权限'))
      }
    }

    function rolePermissionsMxListSetEnable(rolePermissionsMxJoinPermissions: IRolePermissionsMxJoinPermissions[]) {
      for (let i = 0; i < rolePermissionsMxJoinPermissions.length; i++) {
        const rolePermissionsMxJoinPermission = rolePermissionsMxJoinPermissions[i];
        rolePermissionsMxJoinPermission.can = 1;
      }
      return rolePermissionsMxJoinPermissions
    }

    function rolePermissionsMxListSetDisable(rolePermissionsMxJoinPermissions: IRolePermissionsMxJoinPermissions[]) {
      for (let i = 0; i < rolePermissionsMxJoinPermissions.length; i++) {
        const rolePermissionsMxJoinPermission = rolePermissionsMxJoinPermissions[i];
        rolePermissionsMxJoinPermission.can = 0;
      }
      return rolePermissionsMxJoinPermissions
    }

    async function onClickedEnablePermissions() {
      const rolePermissionsMxList = rolePermissionsMxListSetEnable(await getSelectedRows());
      const rolePermissionsMxUpdateDto = new RolePermissionsMxUpdateDto(
          rolePermissionsMxFindAllDto.value.roleId,
          rolePermissionsMxList
      );
      await rolePermissionsMxService.update(rolePermissionsMxUpdateDto);
      await initTable();
    }

    async function onClickedDisablePermissions() {
      const rolePermissionsMxList = rolePermissionsMxListSetDisable(await getSelectedRows());
      const rolePermissionsMxUpdateDto = new RolePermissionsMxUpdateDto(
          rolePermissionsMxFindAllDto.value.roleId,
          rolePermissionsMxList
      );
      await rolePermissionsMxService.update(rolePermissionsMxUpdateDto);
      await initTable();
    }

    return {
      rolePermissionsMxTable,
      rolePermissionsMxTableConfig,
      rolePermissionsMxFindAllDto,
      onSelectedRole,
      getRowNodeId,
      onSelectedPermissionsTheme,
      onClickedEnablePermissions,
      onClickedDisablePermissions
    }
  }
})
</script>

<style scoped>

</style>