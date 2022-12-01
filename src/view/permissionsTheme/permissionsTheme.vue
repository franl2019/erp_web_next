<template>
  <div class="flex flex-col h-full">
    <erp-title
        v-if="$props.showTitle"
        class="flex-none"
        title="类别">
      <template v-if="!$props.readonly" #default>
        <div class="flex h-10 space-x-1">
          <erp-button :disabled="!buttonShowState.create"
                      :size="'small'"
                      :type="'info'"
                      @click="clickedCreateButton"
          >新增
          </erp-button>
          <erp-button :disabled="!buttonShowState.edit"
                      :size="'small'"
                      :type="'success'"
                      @click="clickedUpdateButton"
          >修改
          </erp-button>
          <erp-button :disabled="!buttonShowState.delete_data"
                      :size="'small'"
                      :type="'danger'"
                      @click="clickedDeleteButton"
          >删除
          </erp-button>
        </div>
      </template>
    </erp-title>


    <erp-permissions-theme-tree
        ref="permissionsThemeTreeRef"
        @node-click="selectionChanged"
        class="border-solid border border-gray-300 h-0 flex-grow overflow-y-auto"
    >
    </erp-permissions-theme-tree>
  </div>

</template>

<script lang="ts">
import {permissionsThemeDefaultTableConfig} from "@/view/permissionsTheme/config/permissionsThemeDefaultTableConfig";
import {defineComponent, onMounted, ref} from "vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {usePermissionsThemeCreateDialog} from "@/view/permissionsTheme/components/usePermissionsThemeCreateDialog";
import {usePermissionsThemeUpdateDialog} from "@/view/permissionsTheme/components/usePermissionsThemeUpdateDialog";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";
import {PermissionsThemeService} from "@/module/permissionsTheme/permissionsTheme.service";
import {PermissionsThemeCreateDto} from "@/module/permissionsTheme/dto/permissionsThemeCreate.dto";
import {useButtonState} from "@/composables/useButtonState";
import ErpPermissionsThemeTree from "@/components/tree/component/ErpPermissionsThemeTree.vue";

export default defineComponent({
  name: "PermissionsTheme",
  components: {
    ErpPermissionsThemeTree,
    ErpTable,
    ErpButton,
    ErpTitle,
    ErpPageBox
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectedNode'],
  setup(_props, {emit}) {
    const permissionsThemeTreeRef = ref();
    const permissionsThemeSelected = ref<IPermissionsTheme>(new PermissionsThemeCreateDto());
    const {buttonShowState, updateButtonState} = useButtonState();
    onMounted(() => {
      init();
    })

    function getRowNodeId(data: IPermissionsTheme) {
      return data.permissionsThemeId
    }

    async function init() {
      await permissionsThemeTreeRef.value?.initData();
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
      const permissionsTheme = permissionsThemeTreeRef.value?.getSelectedNode() as IPermissionsTheme;
      if (permissionsTheme.permissionsThemeId === 0) {
        updateButtonState()
        emit('selectedNode', permissionsTheme);
      } else if (permissionsTheme.permissionsThemeId) {
        permissionsThemeSelected.value = permissionsTheme;
        updateButtonState(0, 0);
        emit('selectedNode', permissionsTheme);
      }
    }

    function setSelect(permissionsThemeId: number) {
      permissionsThemeTreeRef.value?.setSelectedNode(permissionsThemeId);
      updateButtonState(0, 0);
    }

    return {
      permissionsThemeTreeRef,
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