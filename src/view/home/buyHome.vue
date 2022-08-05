<template>
  <erp-page-box-row>
    <div class="flex flex-none flex-col items-start flex-grow pt-3 overflow-auto">
      <div class="font-bold text-xl">采购管理流程图</div>

      <div class="flex h-4/6 w-full items-center justify-center">
        <!--        <module-card title="采购订单">-->
        <!--          <module-card-item content="进行中" :count="16"></module-card-item>-->
        <!--          <module-card-item content="未审核" :count="7"></module-card-item>-->
        <!--          <module-card-item content="已审核" :count="10"></module-card-item>-->
        <!--        </module-card>-->
        <!--        <erp_button_big></erp_button_big>-->
        <module-card title="采购单" @click="openBuyInboundView">
          <module-card-item content="进行中" :count="buyInboundSheetState.completeL1Review"></module-card-item>
          <module-card-item content="未审核" :count="buyInboundSheetState.undoneL1Review"></module-card-item>
          <module-card-item content="未财审" :count="buyInboundSheetState.undoneL2Review"></module-card-item>
        </module-card>
        <erp_button_big></erp_button_big>
        <module-card title="采购付款" @click="openAccountExpenditureView">
          <module-card-item content="进行中" :count="accountExpenditureSheetState.completeL1Review"></module-card-item>
          <module-card-item content="未审核" :count="accountExpenditureSheetState.undoneL1Review"></module-card-item>
        </module-card>
      </div>
      <div class="w-full border-t border-solid border-gray-300 pt-2"></div>
      <div class="font-bold text-xl mb-1">相关设置</div>
      <div class="flex">
        <div class="mr-6">
          <erp-router-button router-name="buy">供应商资料设置</erp-router-button>
        </div>

        <div class="mr-6">
          <erp-router-button router-name="product">商品资料设置</erp-router-button>
        </div>
      </div>
    </div>
    <div class="w-64 flex-none border-l border-solid pl-2">
      <erp_title title="账簿报表"></erp_title>
      <!--      <div class="mb-5">-->
      <!--        <div class="font-bold">采购订单报表</div>-->
      <!--        <erp-router-button>-->
      <!--          采购订单明细表-->
      <!--        </erp-router-button>-->
      <!--        <erp-router-button>-->
      <!--          采购订单汇总表-->
      <!--        </erp-router-button>-->
      <!--      </div>-->
      <div class="mb-5">
        <div class="font-bold">采购单报表</div>
        <erp-router-button router-name="buyInboundMxReport">
          采购单明细表
        </erp-router-button>
        <erp-router-button router-name="buyInboundProductSumReport">
          采购单产品汇总表
        </erp-router-button>
      </div>
      <div class="mb-5">
        <div class="font-bold">应付</div>
        <erp-router-button router-name="accountPayableMxReport">
          应付账款明细表
        </erp-router-button>
        <erp-router-button router-name="accountPayableSumReport">
          应付账款汇总表
        </erp-router-button>
      </div>

    </div>
  </erp-page-box-row>
</template>

<script lang="ts" setup>
import Erp_title from "@/components/title/ErpTitle.vue";
import ModuleCard from "@/components/card/moduleCard/moduleCard.vue";
import ModuleCardItem from "@/components/card/moduleCard/moduleCardItem.vue";
import Erp_button_big from "@/components/button/ErpBigRightButton.vue";
import {useRouter} from "vue-router";
import ErpRouterButton from "@/components/button/ErpRouterButton.vue";
import {useRouterPage} from "@/utils";
import {BuyInboundService} from "@/module/buyInbound/service/BuyInbound.service";
import {onMounted, ref} from "vue";
import {AccountExpenditureService} from "@/module/accountExpenditure/accountExpenditure.service";
import ErpPageBoxRow from "@/components/page/ErpPageBoxRow.vue";
const router = useRouter();
const buyInboundService = new BuyInboundService();
const accountExpenditureService = new AccountExpenditureService();

async function activated(){
  await findBuyInboundSheetState();
  await findAccountExpenditureState();
}
defineExpose([activated])

onMounted(async ()=>{
  await findBuyInboundSheetState();
  await findAccountExpenditureState();
})

export interface IBuyInboundSheetState {
  completeL1Review:number;
  undoneL1Review:number;
  undoneL2Review:number;
}

export interface IAccountExpenditureSheetState {
  completeL1Review:number;
  undoneL1Review:number;
  undoneL2Review:number;
}
const buyInboundSheetState = ref<IBuyInboundSheetState>({completeL1Review: 0, undoneL1Review: 0, undoneL2Review: 0})
const accountExpenditureSheetState = ref<IAccountExpenditureSheetState>({
  completeL1Review: 0, undoneL1Review: 0, undoneL2Review: 0
})
function openBuyInboundView() {
 const route = router.resolve({
   name:'buyInbound'
 })

  useRouterPage(route.fullPath,route.meta.title as string);
}

function openAccountExpenditureView() {
  const route = router.resolve({
    name:'accountExpenditureFind'
  })

  useRouterPage(route.fullPath,route.meta.title as string);
}

async function findBuyInboundSheetState() {
 const sheetCompleteState = await buyInboundService.findSheetCompleteState({
   buyname: "", moneytype: "", remark1: "", remark2: "", remark3: "", remark4: "", remark5: "",
   clientid: 0,
    endDate: "",
    inboundcode: "",
    inboundid: 0,
    inboundtype: 0,
    operateareaids: [],
    page: 0,
    pagesize: 0,
    relatednumber: "",
    startDate: "",
    warehouseids: []
  });
  buyInboundSheetState.value.completeL1Review = sheetCompleteState.completeL1Review;
  buyInboundSheetState.value.undoneL1Review = sheetCompleteState.undoneL1Review;
  buyInboundSheetState.value.undoneL2Review = sheetCompleteState.undoneL2Review;
}

async function findAccountExpenditureState(){
  const sheetCompleteState = await accountExpenditureService.findAccountExpenditureState({
    accountExpenditureCode: "",
    accountExpenditureId: 0,
    accountExpenditureType: 0,
    buyid: 0,
    endDate: "",
    page: 0,
    pagesize: 0,
    startDate: ""
  });
  accountExpenditureSheetState.value.completeL1Review = sheetCompleteState.completeL1Review;
  accountExpenditureSheetState.value.undoneL1Review = sheetCompleteState.undoneL1Review;
  accountExpenditureSheetState.value.undoneL2Review = sheetCompleteState.undoneL2Review;
}
</script>