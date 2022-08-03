<template>
  <erp-page-box-row>
    <div class="flex flex-none flex-col items-start flex-grow pt-3 overflow-auto">
      <div class="font-bold text-xl">销售管理流程图</div>

      <div class="flex h-4/6 w-full items-center justify-center">
<!--        <module-card title="销售订单">-->
<!--          <module-card-item content="进行中" :count="16"></module-card-item>-->
<!--          <module-card-item content="未审核" :count="7"></module-card-item>-->
<!--          <module-card-item content="已审核" :count="10"></module-card-item>-->
<!--        </module-card>-->
<!--        <erp_button_big></erp_button_big>-->
        <module-card title="销售单" @click="openSaleOutboundView">
          <module-card-item content="进行中" :count="saleOutboundSheetState.completeL1Review"></module-card-item>
          <module-card-item content="未审核" :count="saleOutboundSheetState.undoneL1Review"></module-card-item>
          <module-card-item content="未财审" :count="saleOutboundSheetState.undoneL2Review"></module-card-item>
        </module-card>
        <erp_button_big></erp_button_big>
        <module-card title="销售收款" @click="openAccountInComeView">
          <module-card-item content="进行中" :count="accountInComeSheetState.completeL1Review"></module-card-item>
          <module-card-item content="未审核" :count="accountInComeSheetState.undoneL1Review"></module-card-item>
        </module-card>
      </div>
      <div class="w-full border-t border-solid border-gray-300 pt-2"></div>
      <div class="font-bold text-xl mb-1">相关设置</div>
      <div class="flex">
        <div class="mr-6">
          <erp-router-button router-name="client">客户资料设置</erp-router-button>
        </div>
        <div class="mr-6">
          <erp-router-button router-name="product">商品资料设置</erp-router-button>
        </div>
      </div>
    </div>
    <div class="w-64 flex-none border-l border-solid pl-2">
      <erp_title title="账簿报表"></erp_title>
<!--      <div class="mb-5">-->
<!--        <div class="font-bold">销售订单报表</div>-->
<!--        <erp-router-button>-->
<!--          销售订单明细表-->
<!--        </erp-router-button>-->
<!--        <erp-router-button>-->
<!--          销售订单汇总表-->
<!--        </erp-router-button>-->
<!--      </div>-->
      <div class="mb-5">
        <div class="font-bold">销售单报表</div>
        <erp-router-button router-name="saleOutboundMxReport">
          销售单明细表
        </erp-router-button>
        <erp-router-button router-name="saleOutboundProductSummaryReport">
          销售单产品汇总表
        </erp-router-button>
        <erp-router-button router-name="saleOutboundClientProductSummaryReport">
          销售单客户汇总表
        </erp-router-button>

        <erp-router-button router-name="saleGrossMarginMx">
          销售毛利明细表
        </erp-router-button>

        <erp-router-button router-name="saleGrossMarginSum">
          销售毛利汇总表
        </erp-router-button>
      </div>

      <div class="mb-5">
        <div class="font-bold">应收</div>
        <erp-router-button router-name="accountReceivableMxReport">
          应收账款明细表
        </erp-router-button>
        <erp-router-button router-name="accountReceivableSumReport">
          应收账款汇总表
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
import {useRouterPage} from "@/utils";
import ErpRouterButton from "@/components/button/ErpRouterButton.vue";
import {OutboundSaleService} from "@/module/saleOutbound/service/outboundSale.service";
import {onMounted, ref} from "vue";
import {AccountInComeService} from "@/module/accountInCome/accountInCome.service";
import ErpPageBoxRow from "@/components/page/ErpPageBoxRow.vue";

const router = useRouter();
const outboundSaleService = new OutboundSaleService();
const accountInComeService = new AccountInComeService();

export interface ISaleOutboundSheetState {
  completeL1Review: number;
  undoneL1Review: number;
  undoneL2Review: number;
}

export interface IAccountInComeSheetState {
  completeL1Review: number;
  undoneL1Review: number;
  undoneL2Review: number;
}

// const {ipcRenderer} = require('electron')
//
// ipcRenderer.on('renderer-focus', debounce(async () => {
//   await findSaleOutboundSheetState();
//   await findAccountInComeSheetState();
// }))

onMounted(() => {
  findSaleOutboundSheetState();
  findAccountInComeSheetState();
})

const saleOutboundSheetState = ref<ISaleOutboundSheetState>({
  completeL1Review: 0, undoneL1Review: 0, undoneL2Review: 0
})

const accountInComeSheetState = ref<IAccountInComeSheetState>({
  completeL1Review: 0, undoneL1Review: 0, undoneL2Review: 0
})

function openSaleOutboundView() {
  const route = router.resolve({
    name: 'saleOutbound'
  })
  useRouterPage(route.fullPath,route.meta.title as string);
}

function openAccountInComeView() {
  const route = router.resolve({
    name: 'accountInComeFind'
  })
  useRouterPage(route.fullPath,route.meta.title as string);
}

async function findSaleOutboundSheetState() {
  const sheetCompleteState = await outboundSaleService.findSheetState({
    ymrep: "",
    clientid: 0,
    endDate: "",
    operateareaids: [], clientname: "", moneytype: "", remark1: "", remark2: "", remark3: "", remark4: "", remark5: "",
    outboundcode: "",
    outboundid: 0,
    outboundtype: 0,
    page: 0,
    pagesize: 0,
    relatednumber: "",
    startDate: "",
    warehouseids: []
  })
  saleOutboundSheetState.value.completeL1Review = sheetCompleteState.completeL1Review;
  saleOutboundSheetState.value.undoneL1Review = sheetCompleteState.undoneL1Review;
  saleOutboundSheetState.value.undoneL2Review = sheetCompleteState.undoneL2Review;
}

async function findAccountInComeSheetState() {
  const sheetCompleteState = await accountInComeService.findSheetState({
    accountInComeCode: "",
    accountInComeId: 0,
    accountInComeType: 0,
    amount: 0,
    clientid: 0,
    endDate: "",
    page: 0,
    pagesize: 0,
    paymentAccount: "",
    startDate: ""
  })
  accountInComeSheetState.value.completeL1Review = sheetCompleteState.completeL1Review;
  accountInComeSheetState.value.undoneL1Review = sheetCompleteState.undoneL1Review;
  accountInComeSheetState.value.undoneL2Review = sheetCompleteState.undoneL2Review;
}
</script>