<template>
  <erp-left-right-page-box>
    <template #left>
      <div class="h-full">
        <permissions-theme
            @selectedNode="selectedTreeNode"
        ></permissions-theme>
      </div>
    </template>
    <template #right>
      <erp-title title="权限资料">
        <template #default>
          <erp-button @click="onClickedCreateButton">新增</erp-button>
          <erp-button :type="'success'" @click="onClickedUpdateButton">修改</erp-button>
          <!--        <erp-button :type="'danger'">删除</erp-button>-->
        </template>
      </erp-title>

      <erp-table
          ref="permissionsTableRef"
          :find-dto="findDto"
          :table-state="defaultPermissionsTableState"
          init
      >
      </erp-table>
    </template>
  </erp-left-right-page-box>

</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue';
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import {defaultPermissionsTableState} from "@/view/permissions/tableConfig/defaultPermissionsTableState";
import {PermissionsCreateDto} from '@/module/permissions/dto/permissionsCreate.dto';
import {usePermissionsCreateDialog} from "@/view/permissions/usePermissionsCreateDialog";
import {ITableRef} from "@/components/table/type";
import {usePermissionsUpdateDialog} from "@/view/permissions/usePermissionsUpdateDialog";
import {IPermissions} from "@/module/permissions/permissions";
import ErpLeftRightPageBox from "@/components/page/ErpLeftRightPageBox.vue";
import PermissionsTheme from "@/view/permissionsTheme/permissionsTheme.vue";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";

export default defineComponent({
  name: "permissions",
  components: {
    PermissionsTheme,
    ErpLeftRightPageBox,
    ErpButton,
    ErpTable,
    ErpTitle,
    ErpPageBox
  },
  setup() {
    const permissionsTableRef = ref<ITableRef>();
    const permissionsThemeId = ref(0)
    const findDto = new PermissionsCreateDto();

    function getPermissionsFromTableSelected(): Promise<IPermissions> {
      const permissions = permissionsTableRef.value?.getGridApi().getSelectedRows()[0]
      if (permissions) {
        return permissions
      } else {
        return Promise.reject(new Error('请选择权限'))
      }
    }

    async function onClickedCreateButton() {
      await usePermissionsCreateDialog();
      await permissionsTableRef.value?.initTableData();
    }

    async function onClickedUpdateButton() {
      const permission = await getPermissionsFromTableSelected();
      await usePermissionsUpdateDialog(permission);
      await permissionsTableRef.value?.initTableData();
    }

    function selectedTreeNode(permissionsTheme: IPermissionsTheme) {
      findDto.permissionsThemeId = permissionsTheme.permissionsThemeId;
      permissionsTableRef.value?.initTableData();
    }

    return {
      findDto,
      permissionsThemeId,
      permissionsTableRef,
      defaultPermissionsTableState,
      onClickedCreateButton,
      onClickedUpdateButton,
      selectedTreeNode
    }
  }
})
</script>

<style scoped>

</style>