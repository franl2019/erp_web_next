<template>
  <erp-left-right-structure-dialog>
    <template v-slot:left>
      <div class="flex flex-col h-full pr-4">
        <erp_title title="地区"/>
        <div class="flex-grow overflow-y-auto">
          <erp-client-area-tree @node-click="categoryTreeClicked"></erp-client-area-tree>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <erp_title title="请选择客户">
        <template v-slot:input>
          <erp_input_rounded class="md:w-52" v-model="findClientDto.search" @change="onSearchChange"
                             placeholder="输入关键词"></erp_input_rounded>
        </template>
        <!--<erp_button @click="clickedOkSelectedDialog" type="success">确定选择</erp_button>-->
        <erp_button @click="clickedCloseSelectedDialog">关闭</erp_button>
      </erp_title>
      <erp_table ref="clientTableRef"
                 :table-state="selectClientTableState"
                 :find-dto="findClientDto"
                 @rowDoubleClicked="onClientTableDoubleClick"
                 :getRowNodeId="getRowNodeId"
      ></erp_table>
    </template>
  </erp-left-right-structure-dialog>
</template>

<script setup lang='ts'>
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import Erp_table from "@/components/table/ErpTable.vue";
import {RowDoubleClickedEvent} from "ag-grid-community";
import {IClient} from "@/module/client/client";
import {FindClientDto, IFindClientDto} from "@/module/client/dto/findClient.dto";
import {IClientArea} from "@/module/clientArea/clientArea";
import {selectClientTableState} from "@/view/client/tableConfig/selectClientTableState";
import ErpClientAreaTree from "@/components/tree/aboutComponent/ErpClientAreaTree.vue";
import ErpLeftRightStructureDialog from "@/components/dialog/ErpLeftRightStructureDialog.vue";

const clientTableRef = ref<ITableRef>()
const findClientDto = ref<IFindClientDto>(new FindClientDto());

const props = withDefaults(defineProps<{
  unmount?: Function
  ok?: Function
  close?: Function
}>(), {
  unmount: () => {
  },
  ok: () => {
  },
  close: () => {
  },
})

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


</script>