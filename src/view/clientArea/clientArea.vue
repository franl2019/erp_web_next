<template>
  <div class="flex flex-col h-full pr-2">
    <erp-title title="地区">
      <div class="h-10 flex space-x-1">
        <erp-button size="small" @click="createClientAreaDialogVisible = true">新增</erp-button>
        <erp-button v-if="clientArea.clientareaid!==0" size="small" @click="updateClientAreaDialogVisible = true">修改
        </erp-button>
        <erp-button v-if="clientArea.clientareaid!==0" size="small" type="danger" @click="onDeleteClientAreaBtn">删除
        </erp-button>
      </div>
    </erp-title>

    <div class="flex-grow h-0 border-solid border border-gray-300 overflow-y-auto">
      <erp-client-area-tree
          ref="clientAreaTreeRef"
          :default-expand-all="true"
          :expand-on-click-node="false"
          @node-click="onClickClientArea">
      </erp-client-area-tree>
    </div>

    <new-client-area-dialog
        v-if="createClientAreaDialogVisible"
        v-model:visible="createClientAreaDialogVisible"
        @ok="onNewClientAreaConfirm">
    </new-client-area-dialog>

    <update-client-area-dialog
        v-if="updateClientAreaDialogVisible"
        v-model:visible="updateClientAreaDialogVisible"
        :client-area="clientArea"
        @ok="onUpdateClientAreaConfirm">
    </update-client-area-dialog>
  </div>

</template>

<script lang='ts'>
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpClientAreaTree from "@/components/tree/component/ErpClientAreaTree.vue";
import NewClientAreaDialog from "@/view/clientArea/component/CreateClientAreaDialog.vue";
import UpdateClientAreaDialog from "@/view/clientArea/component/UpdateClientAreaDialog.vue";
import ErpDialog from "@/components/dialog/dialog";
import {defineComponent, ref} from "vue";
import {ClientArea, IClientArea, IClientAreaTree} from "@/module/clientArea/clientArea";
import {ITreeRef} from "@/components/tree/component/ITreeRef";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";

export default defineComponent({
  name: "clientArea",
  components: {
    ErpTitle,
    ErpButton,
    ErpClientAreaTree,
    NewClientAreaDialog,
    UpdateClientAreaDialog
  },
  emits: ['clickedClientAreaTreeNode'],
  setup(_props, {emit: emits}) {
    //客户地区新增dialog
    let createClientAreaDialogVisible = ref(false);
    //客户地区更新dialog
    let updateClientAreaDialogVisible = ref(false);


    const clientArea = ref<IClientArea>(new ClientArea());

    //点击clientArea tree node
    function onClickClientArea(clientAreaItem: IClientAreaTree) {
      clientArea.value = JSON.parse(JSON.stringify(clientAreaItem));
      emits('clickedClientAreaTreeNode', clientAreaItem)
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

    return {
      clientArea,
      clientAreaTreeRef,
      createClientAreaDialogVisible,
      updateClientAreaDialogVisible,
      onClickClientArea,
      onNewClientAreaConfirm,
      onUpdateClientAreaConfirm,
      onDeleteClientAreaBtn,
    };
  },
});
</script>