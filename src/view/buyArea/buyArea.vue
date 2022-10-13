<template>
  <div class="flex flex-col h-full pr-2">
    <erp-title title="地区">
      <div class="h-10 flex space-x-1">
        <erp-button size="small" @click="createBuyAreaDialogVisible = true">新增</erp-button>
        <erp-button v-if="buyAreaId!==0" size="small" @click="updateBuyAreaDialogVisible = true">修改</erp-button>
        <erp-button v-if="buyAreaId!==0" size="small" type="danger" @click="onDeleteBuyAreaBtn">删除</erp-button>
      </div>
    </erp-title>
    <div class="flex-grow h-0 border-solid border border-gray-300 overflow-y-auto">
      <erp-buy-area-tree
          ref="buyAreaTreeRef"
          :default-expand-all="true"
          :expand-on-click-node="false"
          @node-click="onClickBuyAreaNode">
      </erp-buy-area-tree>
    </div>
  </div>

  <new-buy-area-dialog v-if="createBuyAreaDialogVisible" @close="createBuyAreaDialogVisible = false"
                       @ok="onNewBuyAreaConfirm"></new-buy-area-dialog>

  <update-buy-area-dialog v-if="updateBuyAreaDialogVisible" :buy-area="buyArea"
                          @close="updateBuyAreaDialogVisible = false" @ok="onUpdateBuyAreaConfirm">
  </update-buy-area-dialog>

</template>

<script lang='ts'>
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpBuyAreaTree from "@/components/tree/component/ErpBuyAreaTree.vue";
import NewBuyAreaDialog from "@/view/buyArea/component/NewBuyAreaDialog.vue";
import UpdateBuyAreaDialog from "@/view/buyArea/component/UpdateBuyAreaDialog.vue";
import {defineComponent, ref} from "vue";
import ErpDialog from "@/components/dialog/dialog";
import {BuyArea, IBuyArea, IBuyAreaTree} from "@/module/buyArea/buyArea";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";
import {ITreeRef} from "@/components/tree/component/ITreeRef";

export default defineComponent({
  name: "buyArea",
  components: {
    ErpTitle,
    ErpButton,
    ErpBuyAreaTree,
    NewBuyAreaDialog,
    UpdateBuyAreaDialog
  },
  emits: ['clickedBuyAreaNode'],
  setup(_props, {emit: emits}) {
    //供应商地区新增dialog
    let createBuyAreaDialogVisible = ref(false);
    //供应商地区更新dialog
    let updateBuyAreaDialogVisible = ref(false);


    const buyAreaId = ref<number>(0);
    const buyArea = ref<IBuyArea>(new BuyArea());

    //点击buyArea tree node
    function onClickBuyAreaNode(buyAreaItem: IBuyAreaTree) {
      buyAreaId.value = buyAreaItem.buyareaid;
      buyArea.value = JSON.parse(JSON.stringify(buyAreaItem));
      emits('clickedBuyAreaNode', buyAreaItem)
    }

    //供应商地区树ref
    const buyAreaTreeRef = ref<ITreeRef>();

    //新增供应商dialog确定事件
    async function onNewBuyAreaConfirm() {
      createBuyAreaDialogVisible.value = false
      await buyAreaTreeRef.value?.initData();
    }

    //更新供应商地区dialog确定事件
    async function onUpdateBuyAreaConfirm() {
      updateBuyAreaDialogVisible.value = false
      await buyAreaTreeRef.value?.initData(buyAreaId.value);
    }

    //供应商地区服务
    const buyAreaService = new BuyAreaService();

    //删除供应商地区显示dialog按钮
    function onDeleteBuyAreaBtn() {
      if (buyArea.value.buyareaid) {
        ErpDialog({
          title: "是否删除供应商地区",
          message: `供应商地区编号:${buyArea.value.buyareacode},供应商地区名:${buyArea.value.buyareaname}`,
          ok: async () => {
            await buyAreaService.delete_data(buyArea.value.buyareaid);
            await buyAreaTreeRef.value?.initData(buyAreaId.value);
            buyAreaId.value = 0
          }
        })
      }
    }

    return {
      buyArea,
      buyAreaId,
      buyAreaTreeRef,
      createBuyAreaDialogVisible,
      updateBuyAreaDialogVisible,
      onClickBuyAreaNode,
      onNewBuyAreaConfirm,
      onUpdateBuyAreaConfirm,
      onDeleteBuyAreaBtn,
    };
  },
});
</script>