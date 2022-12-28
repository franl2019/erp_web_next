<template>
  <erp-page-box-row>
    <div class="flex flex-none flex-col items-start flex-grow pt-3 overflow-auto">
      <div class="font-bold text-xl">采购管理流程图</div>
      <div class="flex h-4/6 w-full items-center justify-center">
        <module-card title="采购单" @click="openBuyInboundView">
          <module-card-item :count="buyInboundSheetState.completeL1Review" content="进行中"></module-card-item>
          <module-card-item :count="buyInboundSheetState.undoneL1Review" content="未审核"></module-card-item>
          <module-card-item :count="buyInboundSheetState.undoneL2Review" content="未财审"></module-card-item>
        </module-card>
        <erp-big-right-button></erp-big-right-button>
        <module-card title="采购付款" @click="openAccountExpenditureView">
          <module-card-item :count="accountExpenditureSheetState.completeL1Review" content="进行中"></module-card-item>
          <module-card-item :count="accountExpenditureSheetState.undoneL1Review" content="未审核"></module-card-item>
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
      <erp-title title="账簿报表"></erp-title>
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

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpBigRightButton from "@/components/button/ErpBigRightButton.vue";
import ErpPageBoxRow from "@/components/page/ErpPageBoxRow.vue";
import ErpRouterButton from "@/components/button/ErpRouterButton.vue";
import ModuleCard from "@/components/card/moduleCard/ModuleCard.vue";
import ModuleCardItem from "@/components/card/moduleCard/ModuleCardItem.vue";
import {useRouter} from "vue-router";
import {useRouterPage} from "@/utils";
import {BuyInboundService} from "@/module/buyInbound/service/BuyInbound.service";
import {defineComponent, onMounted, ref} from "vue";
import {AccountExpenditureService} from "@/module/accountExpenditure/accountExpenditure.service";
import {AccountExpenditureFindDto} from "@/module/accountExpenditure/dto/accountExpenditureFind.dto";
import {BuyInboundFindDto} from "@/module/buyInbound/dto/inbound/buyInboundFind.dto";

interface IBuyInboundSheetState {
  completeL1Review: number;
  undoneL1Review: number;
  undoneL2Review: number;
}

interface IAccountExpenditureSheetState {
  completeL1Review: number;
  undoneL1Review: number;
  undoneL2Review: number;
}

export default defineComponent({
  name: "buyHome",
  components: {
    ErpTitle,
    ErpPageBoxRow,
    ErpRouterButton,
    ErpBigRightButton,
    ModuleCard,
    ModuleCardItem
  },
  setup(_prop, {expose}) {
    const router = useRouter();
    const buyInboundService = new BuyInboundService();
    const accountExpenditureService = new AccountExpenditureService();

    async function activated() {
      await findBuyInboundSheetState();
      await findAccountExpenditureState();
    }

    expose({activated});

    onMounted(async () => {
      await findBuyInboundSheetState();
      await findAccountExpenditureState();
    })

    const buyInboundSheetState = ref<IBuyInboundSheetState>({completeL1Review: 0, undoneL1Review: 0, undoneL2Review: 0})
    const accountExpenditureSheetState = ref<IAccountExpenditureSheetState>({
      completeL1Review: 0, undoneL1Review: 0, undoneL2Review: 0
    })

    function openBuyInboundView() {
      const route = router.resolve({
        name: 'buyInbound'
      })

      useRouterPage(route.fullPath, route.meta.title as string);
    }

    function openAccountExpenditureView() {
      const route = router.resolve({
        name: 'accountExpenditureFind'
      })

      useRouterPage(route.fullPath, route.meta.title as string);
    }

    async function findBuyInboundSheetState() {
      const buyInboundFindDto = new BuyInboundFindDto();
      buyInboundFindDto.startDate = "";
      buyInboundFindDto.endDate = "";
      const sheetCompleteState = await buyInboundService.findSheetCompleteState(buyInboundFindDto);
      buyInboundSheetState.value.completeL1Review = sheetCompleteState.completeL1Review;
      buyInboundSheetState.value.undoneL1Review = sheetCompleteState.undoneL1Review;
      buyInboundSheetState.value.undoneL2Review = sheetCompleteState.undoneL2Review;
    }

    async function findAccountExpenditureState() {
      const accountExpenditureFindDto = new AccountExpenditureFindDto();
      accountExpenditureFindDto.startDate = "";
      accountExpenditureFindDto.endDate = "";
      const sheetCompleteState = await accountExpenditureService.findAccountExpenditureState(accountExpenditureFindDto);
      accountExpenditureSheetState.value.completeL1Review = sheetCompleteState.completeL1Review;
      accountExpenditureSheetState.value.undoneL1Review = sheetCompleteState.undoneL1Review;
      accountExpenditureSheetState.value.undoneL2Review = sheetCompleteState.undoneL2Review;
    }

    return {
      buyInboundSheetState,
      accountExpenditureSheetState,
      openBuyInboundView,
      openAccountExpenditureView,
      findAccountExpenditureState,
    };
  },
});
</script>