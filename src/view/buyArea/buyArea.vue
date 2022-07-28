<template>
  <div class="flex flex-col h-full pr-2">
    <erp_title title="地区">
      <erp_button size="small" @click="createBuyAreaDialogVisible = true">新增</erp_button>
      <erp_button size="small" v-if="buyAreaId!==0" @click="updateBuyAreaDialogVisible = true">修改</erp_button>
      <erp_button size="small" v-if="buyAreaId!==0" @click="onDeleteBuyAreaBtn" type="danger">删除</erp_button>
    </erp_title>
    <div class="flex-grow border-solid border border-gray-300 overflow-y-auto">
      <erp_buy-area-tree
          ref="buyAreaTreeRef"
          :expand-on-click-node="false"
          :default-expand-all="true"
          @node-click="onClickBuyAreaNode">
      </erp_buy-area-tree>
    </div>
  </div>

  <new-buy-area-dialog
      v-if="createBuyAreaDialogVisible"
      @ok="onNewBuyAreaConfirm"
      @close="createBuyAreaDialogVisible = false"
  ></new-buy-area-dialog>

  <update-buy-area-dialog
      v-if="updateBuyAreaDialogVisible"
      @ok="onUpdateBuyAreaConfirm"
      @close="updateBuyAreaDialogVisible = false"
      :buy-area="buyArea">
  </update-buy-area-dialog>

</template>

<script setup lang='ts'>
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import {ref} from "vue";
import NewBuyAreaDialog from "@/view/buyArea/NewBuyAreaDialog.vue";
import UpdateBuyAreaDialog from "@/view/buyArea/UpdateBuyAreaDialog.vue";
import ErpDialog from "@/components/dialog/dialog";
import {BuyArea, IBuyArea, IBuyAreaTree} from "@/module/buyArea/buyArea";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";
import Erp_buyAreaTree from "@/components/tree/ErpBuyAreaTree.vue";
import {ITreeRef} from "@/components/tree/ITreeRef";

const emits = defineEmits(['clickedBuyAreaNode'])

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
  emits('clickedBuyAreaNode',buyAreaItem)
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


</script>