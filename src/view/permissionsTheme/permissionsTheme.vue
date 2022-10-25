<template>
  <erp-page-box>
    <erp-title title="权限主题管理">
      <template #default>
        <erp-button :disabled="!buttonShowState.create"
                    :type="'info'"
                    @click="clickedCreateButton"
        >新增
        </erp-button>
        <erp-button :disabled="!buttonShowState.edit"
                    :type="'success'"
                    @click="clickedUpdateButton"
        >修改
        </erp-button>
        <erp-button :disabled="!buttonShowState.delete_data"
                    :type="'danger'"
                    @click="clickedDeleteButton"
        >删除
        </erp-button>
      </template>
    </erp-title>

    <erp-table
        ref="permissionsThemeRef"
        :find-dto="{}"
        :getRowNodeId="getRowNodeId"
        :table-state="permissionsThemeDefaultTableConfig"
        @selection-changed="selectionChanged"
    >
    </erp-table>
  </erp-page-box>

</template>

<script lang="ts">
import {permissionsThemeDefaultTableConfig} from "@/view/permissionsTheme/config/permissionsThemeDefaultTableConfig";
import {defineComponent, onMounted, ref} from "vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {usePermissionsThemeCreateDialog} from "@/view/permissionsTheme/components/usePermissionsThemeCreateDialog";
import {ITableRef} from "@/components/table/type";
import {usePermissionsThemeUpdateDialog} from "@/view/permissionsTheme/components/usePermissionsThemeUpdateDialog";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";
import {PermissionsThemeService} from "@/module/permissionsTheme/permissionsTheme.service";
import {PermissionsThemeCreateDto} from "@/module/permissionsTheme/dto/permissionsThemeCreate.dto";
import {useButtonState} from "@/composables/useButtonState";

export default defineComponent({
  name: "PermissionsTheme",
  components: {
    ErpTable,
    ErpButton,
    ErpTitle,
    ErpPageBox
  },
  setup() {
    const permissionsThemeRef = ref<ITableRef>();
    const permissionsThemeSelected = ref<IPermissionsTheme>(new PermissionsThemeCreateDto());
    const {buttonShowState, updateButtonState} = useButtonState();
    onMounted(() => {
      init();
    })

    function getRowNodeId(data: IPermissionsTheme) {
      return data.permissionsThemeId
    }

    async function init() {
      await permissionsThemeRef.value?.initTableData();
    }

    async function clickedCreateButton() {
      await usePermissionsThemeCreateDialog();
      await init();
    }

    async function clickedUpdateButton() {
      if (permissionsThemeSelected.value.permissionsThemeId === 0) return
      const permissionsTheme = await usePermissionsThemeUpdateDialog(permissionsThemeSelected.value);
      await init();
      setSelect(permissionsTheme.permissionsThemeId);
    }

    const permissionsThemeService = new PermissionsThemeService();

    async function clickedDeleteButton() {
      if (permissionsThemeSelected.value.permissionsThemeId === 0) return
      await permissionsThemeService.delete_data(permissionsThemeSelected.value?.permissionsThemeId);
      updateButtonState();
      await init();
    }

    function selectionChanged() {
      const permissionsTheme = permissionsThemeRef.value?.getGridApi().getSelectedRows()[0] as IPermissionsTheme;
      if (permissionsTheme.permissionsThemeId) {
        permissionsThemeSelected.value = permissionsTheme;
        updateButtonState(0, 0);
      }
    }

    function setSelect(permissionsThemeId: number) {
      permissionsThemeRef.value?.getGridApi().getRowNode(permissionsThemeId+'')?.setSelected(true);
      updateButtonState(0, 0);
    }

    return {
      permissionsThemeRef,
      permissionsThemeDefaultTableConfig,
      buttonShowState,
      getRowNodeId,
      selectionChanged,
      clickedCreateButton,
      clickedUpdateButton,
      clickedDeleteButton,
    }
  }
})
</script>