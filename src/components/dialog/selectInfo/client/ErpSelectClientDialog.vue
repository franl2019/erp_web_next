<template>
  <erp-full-screen-dialog
      title="选择客户"
      @clicked-confirm="clickedOkSelectedDialog"
      @clicked-cancel="clickedCloseSelectedDialog">
    <template v-slot:left>
      <div class="flex flex-col h-full pr-4">
        <erp-title title="地区"/>
        <div class="flex-grow overflow-y-auto">
          <erp-client-area-tree @node-click="categoryTreeClicked"></erp-client-area-tree>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <erp-title>
        <template v-slot:input>
          <erp-input-round v-model="findClientDto.search" class="md:w-52" placeholder="输入关键词"
                             @change="onSearchChange"></erp-input-round>
        </template>
      </erp-title>
      <erp-table ref="clientTableRef" :find-dto="findClientDto" :getRowNodeId="getRowNodeId"
                 :table-state="selectClientTableState" @rowDoubleClicked="onClientTableDoubleClick"></erp-table>
    </template>
  </erp-full-screen-dialog>
</template>

<script lang='ts'>
import {defineComponent, onMounted, PropType, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {RowDoubleClickedEvent} from "ag-grid-community";
import {IClient} from "@/module/client/client";
import {FindClientDto, IFindClientDto} from "@/module/client/dto/findClient.dto";
import {IClientArea} from "@/module/clientArea/clientArea";
import {selectClientTableState} from "@/view/client/tableConfig/selectClientTableState";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpClientAreaTree from "@/components/tree/component/ErpClientAreaTree.vue";
import ErpFullScreenDialog from "@/components/dialog/ErpFullScreenDialog.vue";
import {IFindInventory} from "@/module/inventory/FindInventory";

export default defineComponent({
  name:"ErpSelectClientDialog",
  components: {
    ErpFullScreenDialog,
    ErpButton,
    ErpTitle,
    ErpTable,
    ErpInputRound,
    ErpClientAreaTree,
  },
  props: {
    resolve_dialog: {
      type: Function as PropType<(value: any) => IFindInventory[] | undefined>,
      required: true,
    },
    reject_dialog: {
      type: Function as PropType<(reason?: any) => void>,
      required: true,
    },
    unmount: {
      type: Function,
      default: () => {
      },
    },
  },
  setup(props) {
    const clientTableRef = ref<ITableRef>()
    const findClientDto = ref<IFindClientDto>(new FindClientDto());

    //表格行id设置
    function getRowNodeId(data: IClient) {
      return data.clientid
    }

    onMounted(async () => {
      await clientTableRef.value?.initTableData();
    })

    //类别树点击事件
    async function categoryTreeClicked(clientArea: IClientArea) {
      findClientDto.value.clientareaid = clientArea.clientareaid;
      await clientTableRef.value?.initTableData();
    }

    //搜索栏
    async function onSearchChange() {
      await clientTableRef.value?.initTableData();
    }

    //产品资料表行双击
    async function onClientTableDoubleClick(event: RowDoubleClickedEvent) {
      if (event.data) {
        props.resolve_dialog(event.data)
        props.unmount();
      }
    }

    async function clickedOkSelectedDialog() {
      await props.resolve_dialog(getSelectedClientInfo());
      props.unmount();
    }

    async function clickedCloseSelectedDialog() {
      await props.reject_dialog();
      props.unmount();
    }

    function getSelectedClientInfo(): IClient {
      return clientTableRef.value?.getGridApi().getSelectedRows()[0];
    }

    return {
      selectClientTableState,
      clientTableRef,
      findClientDto,
      props,
      getRowNodeId,
      categoryTreeClicked,
      onSearchChange,
      onClientTableDoubleClick,
      clickedOkSelectedDialog,
      clickedCloseSelectedDialog
    };
  },
});
</script>