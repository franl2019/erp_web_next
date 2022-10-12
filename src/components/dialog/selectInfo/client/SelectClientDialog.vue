<template>
  <erp-left-right-layout-dialog>
    <template v-slot:left>
      <div class="flex flex-col h-full pr-4">
        <erp-title title="地区"/>
        <div class="flex-grow overflow-y-auto">
          <erp-client-area-tree @node-click="categoryTreeClicked"></erp-client-area-tree>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <erp-title title="请选择客户">
        <template v-slot:input>
          <erp-input-round v-model="findClientDto.search" class="md:w-52" placeholder="输入关键词"
                             @change="onSearchChange"></erp-input-round>
        </template>
        <erp-button @click="clickedCloseSelectedDialog">关闭</erp-button>
      </erp-title>
      <erp-table ref="clientTableRef" :find-dto="findClientDto" :getRowNodeId="getRowNodeId"
                 :table-state="selectClientTableState" @rowDoubleClicked="onClientTableDoubleClick"></erp-table>
    </template>
  </erp-left-right-layout-dialog>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref} from "vue";
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
import ErpClientAreaTree from "@/components/tree/aboutComponent/ErpClientAreaTree.vue";
import ErpLeftRightLayoutDialog from "@/components/dialog/ErpLeftRightLayoutDialog.vue";

export default defineComponent({
  name:"SelectClientDialog",
  components: {
    ErpLeftRightLayoutDialog,
    ErpButton,
    ErpTitle,
    ErpTable,
    ErpInputRound,
    ErpClientAreaTree,
  },
  props: {
    unmount: {
      type: Function,
      default: () => {
      },
    },
    ok: {
      type: Function,
      default: () => {
      },
    },
    close: {
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
        await props.ok(event.data);
        props.unmount();
      }
    }

    async function clickedOkSelectedDialog() {
      await props.ok(getSelectedClientInfo());
      props.unmount();
    }

    async function clickedCloseSelectedDialog() {
      await props.close();
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