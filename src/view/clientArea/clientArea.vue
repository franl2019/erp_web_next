<template>
  <div class="flex flex-col h-full pr-2">
    <erp_title title="地区">
      <erp_button size="small" @click="createClientAreaDialogVisible = true">新增</erp_button>
      <erp_button size="small" v-if="clientArea.clientareaid!==0" @click="updateClientAreaDialogVisible = true">修改</erp_button>
      <erp_button size="small" v-if="clientArea.clientareaid!==0" @click="onDeleteClientAreaBtn" type="danger">删除</erp_button>
    </erp_title>

    <div class="flex-grow border-solid border border-gray-300 overflow-y-auto">
      <erp_client-area-tree
          ref="clientAreaTreeRef"
          :expand-on-click-node="false"
          :default-expand-all="true"
          @node-click="onClickClientArea"
      ></erp_client-area-tree>
    </div>

    <new-client-area-dialog
        v-if="createClientAreaDialogVisible"
        v-model:visible="createClientAreaDialogVisible"
        @ok="onNewClientAreaConfirm"
    ></new-client-area-dialog>

    <update-client-area-dialog
        v-if="updateClientAreaDialogVisible"
        v-model:visible="updateClientAreaDialogVisible"
        @ok="onUpdateClientAreaConfirm"
        :client-area="clientArea">
    </update-client-area-dialog>
  </div>

</template>

<script setup lang='ts'>
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import {ref} from "vue";
import {ClientArea, IClientArea, IClientAreaTree} from "@/module/clientArea/clientArea";
import NewClientAreaDialog from "@/view/clientArea/NewClientAreaDialog.vue";
import UpdateClientAreaDialog from "@/view/clientArea/UpdateClientAreaDialog.vue";
import ErpDialog from "@/components/dialog/dialog";
import Erp_clientAreaTree from "@/components/tree/ErpClientAreaTree.vue";
import {ITreeRef} from "@/components/tree/ITreeRef";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";

const emits = defineEmits(['clickedClientAreaTreeNode'])

//客户地区新增dialog
let createClientAreaDialogVisible = ref(false);
//客户地区更新dialog
let updateClientAreaDialogVisible = ref(false);


const clientArea = ref<IClientArea>(new ClientArea());

//点击clientArea tree node
function onClickClientArea(clientAreaItem: IClientAreaTree) {
  clientArea.value = JSON.parse(JSON.stringify(clientAreaItem));
  emits('clickedClientAreaTreeNode',clientAreaItem)
}

const clientAreaTreeRef = ref<ITreeRef>();

//新增客户dialog确定事件
async function onNewClientAreaConfirm() {
  await clientAreaTreeRef.value?.initData();
}

//更新客户地区dialog确定事件
async function onUpdateClientAreaConfirm() {
  await clientAreaTreeRef.value?.initData(clientArea.value.clientareaid);
}

//删除客户地区显示dialog按钮
function onDeleteClientAreaBtn() {
  if (clientArea.value.clientareaid) {
    ErpDialog({
      title: "是否删除客户地区",
      message: `客户地区编号:${clientArea.value.clientareacode},客户地区名:${clientArea.value.clientareaname}`,
      ok: async () => {
        const clientAreaService = new ClientAreaService();
        await clientAreaService.deleteData(clientArea.value.clientareaid);
        await clientAreaTreeRef.value?.initData();
        clientArea.value = new ClientArea();
      }
    })
  }
}


</script>