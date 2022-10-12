<template>
  <erp-page-box-row>
    <div class="flex flex-none flex-col items-start flex-grow pt-3 overflow-auto">
      <div class="font-bold text-xl">资金管理流程图</div>

      <div class="flex h-4/6 w-full items-center justify-center">
        <module-card title="采购付款单" @click="clickedRouteAccountExpenditureButton">
          <module-card-item content="进行中" :count="accountExpenditureSheetState.completeL1Review"></module-card-item>
          <module-card-item content="未审核" :count="accountExpenditureSheetState.undoneL1Review"></module-card-item>
          <module-card-item content="已审核" :count="accountExpenditureSheetState.undoneL2Review"></module-card-item>
        </module-card>
        <erp-big-right-button></erp-big-right-button>
        <module-card title="核销单" @click="clickedRouteAccountVerifySheet">
          <module-card-item content="进行中" :count="accountsVerifySheetSheetState.completeL1Review"></module-card-item>
          <module-card-item content="未审核" :count="accountsVerifySheetSheetState.undoneL1Review"></module-card-item>
          <module-card-item content="已审核" :count="accountsVerifySheetSheetState.undoneL2Review"></module-card-item>
        </module-card>
        <erp-big-left-button></erp-big-left-button>
        <module-card title="销售收款单" @click="clickedRouteAccountInCome">
          <module-card-item content="进行中" :count="accountInComeSheetState.completeL1Review"></module-card-item>
          <module-card-item content="未审核" :count="accountInComeSheetState.undoneL1Review"></module-card-item>
          <module-card-item content="已审核" :count="accountInComeSheetState.undoneL2Review"></module-card-item>
        </module-card>
      </div>
      <div class="w-full border-t border-solid border-gray-300 pt-2"></div>
      <div class="font-bold text-xl mb-1">相关设置</div>
      <div class="flex">
        <div class="mr-6">
          <erp-router-button router-name="account">出纳账户设置</erp-router-button>
        </div>

        <div class="mr-6">
          <erp-router-button router-name="currency">币种设置</erp-router-button>
        </div>
      </div>
    </div>
    <div class="w-64 flex-none border-l border-solid pl-2">
      <erp-title title="账簿报表"></erp-title>
      <div class="mb-5">
        <erp-router-button router-name="cashBankDepositJournal">
          现金银行日记账
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
import ErpBigLeftButton from "@/components/button/ErpBigLeftButton.vue";
import ErpRouterButton from "@/components/button/ErpRouterButton.vue";
import ErpPageBoxRow from "@/components/page/ErpPageBoxRow.vue";
import ModuleCard from "@/components/card/moduleCard/ModuleCard.vue";
import ModuleCardItem from "@/components/card/moduleCard/ModuleCardItem.vue";
import { useRouter } from "vue-router";
import { useRouterPage } from "@/utils";
import { AccountExpenditureService } from "@/module/accountExpenditure/accountExpenditure.service";
import { AccountInComeService } from "@/module/accountInCome/accountInCome.service";
import { defineComponent, onMounted, ref } from "vue";
import { AccountsVerifySheetService } from "@/module/accountsVerifySheet/accountsVerifySheet.service";

interface IAccountExpenditureSheetState {
  completeL1Review: number;
  undoneL1Review: number;
  undoneL2Review: number;
}

interface IAccountInComeSheetState {
  completeL1Review: number;
  undoneL1Review: number;
  undoneL2Review: number;
}

interface IAccountsVerifySheetSheetState {
  completeL1Review: number;
  undoneL1Review: number;
  undoneL2Review: number;
}

export default defineComponent({
  name:"moneyHone",
  components:{
    ErpTitle,
    ErpBigRightButton,
    ErpBigLeftButton,
    ErpRouterButton,
    ErpPageBoxRow,
    ModuleCard,
    ModuleCardItem
  },
  setup() {

    onMounted(() => {
      findAccountExpenditureState();
      findAccountInComeSheetState();
      findAccountsVerifySheetSheetState();
    })

    const router = useRouter();
    const accountExpenditureService = new AccountExpenditureService();
    const accountInComeService = new AccountInComeService();
    const accountsVerifySheetService = new AccountsVerifySheetService();

    const accountExpenditureSheetState = ref<IAccountExpenditureSheetState>({
      completeL1Review: 0, undoneL1Review: 0, undoneL2Review: 0
    })

    const accountInComeSheetState = ref<IAccountInComeSheetState>({
      completeL1Review: 0, undoneL1Review: 0, undoneL2Review: 0
    })

    const accountsVerifySheetSheetState = ref<IAccountsVerifySheetSheetState>({
      completeL1Review: 0, undoneL1Review: 0, undoneL2Review: 0
    })

    function clickedRouteAccountExpenditureButton() {
      const route = router.resolve({
        name: 'accountExpenditureFind'
      });

      useRouterPage(route.fullPath, route.meta.title as string)
    }

    function clickedRouteAccountVerifySheet() {
      const route = router.resolve({
        name: 'accountsVerifySheetFind'
      })

      useRouterPage(route.fullPath, route.meta.title as string);
    }

    function clickedRouteAccountInCome() {
      const route = router.resolve({
        name: 'accountInComeFind'
      })

      useRouterPage(route.fullPath, route.meta.title as string);
    }

    async function findAccountExpenditureState() {
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

    async function findAccountsVerifySheetSheetState() {
      const sheetCompleteState = await accountsVerifySheetService.findAccountVerifySheetState({
        accountsVerifySheetCode: "",
        accountsVerifySheetId: 0,
        buyid: 0,
        buyid_b: 0,
        clientid: 0,
        clientid_b: 0,
        endDate: "",
        level1Review: 0,
        level2Review: 0,
        page: 0,
        pagesize: 0,
        sheetType: 0,
        startDate: ""

      })
      accountsVerifySheetSheetState.value.completeL1Review = sheetCompleteState.completeL1Review;
      accountsVerifySheetSheetState.value.undoneL1Review = sheetCompleteState.undoneL1Review;
      accountsVerifySheetSheetState.value.undoneL2Review = sheetCompleteState.undoneL2Review;
    }
    return {
      accountExpenditureSheetState,
      accountInComeSheetState,
      accountsVerifySheetSheetState,
      clickedRouteAccountExpenditureButton,
      clickedRouteAccountVerifySheet,
      clickedRouteAccountInCome,
      findAccountExpenditureState,
    };
  },
});
</script>