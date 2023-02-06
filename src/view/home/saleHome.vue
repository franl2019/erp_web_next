<template>
  <erp-page-box-row>
    <div
        class="flex flex-none flex-col items-start flex-grow pt-3 overflow-auto"
    >
      <div class="font-bold text-xl">销售管理流程图</div>

      <div class="flex h-4/6 w-full items-center justify-center">
        <module-card title="销售订单" @click="openSaleOrderView">
          <module-card-item :count="16" content="进行中"></module-card-item>
          <module-card-item :count="7" content="未审核"></module-card-item>
          <module-card-item :count="10" content="已审核"></module-card-item>
        </module-card>
        <erp-big-right-button></erp-big-right-button>
        <module-card
            title="销售单"
            @click="openSaleOutboundView"
        >
          <module-card-item
              :count="saleOutboundSheetState.completeL1Review"
              content="进行中"
          ></module-card-item>
          <module-card-item
              :count="saleOutboundSheetState.undoneL1Review"
              content="未审核"
          ></module-card-item>
          <module-card-item
              :count="saleOutboundSheetState.undoneL2Review"
              content="未财审"
          ></module-card-item>
        </module-card>
        <erp-big-right-button></erp-big-right-button>
        <module-card
            title="销售收款"
            @click="openAccountInComeView"
        >
          <module-card-item
              :count="accountInComeSheetState.completeL1Review"
              content="进行中"
          ></module-card-item>
          <module-card-item
              :count="accountInComeSheetState.undoneL1Review"
              content="未审核"
          ></module-card-item>
        </module-card>
      </div>
      <div class="w-full border-t border-solid border-gray-300 pt-2"></div>
      <div class="font-bold text-xl mb-1">相关设置</div>
      <div class="flex">
        <div class="mr-6">
          <erp-router-button router-name="client"
          >客户资料设置
          </erp-router-button
          >
        </div>
        <div class="mr-6">
          <erp-router-button router-name="product"
          >商品资料设置
          </erp-router-button
          >
        </div>
      </div>
    </div>
    <div class="w-64 flex-none border-l border-solid pl-2">
      <erp-title title="账簿报表"></erp-title>
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

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ModuleCard from "@/components/card/moduleCard/ModuleCard.vue";
import ModuleCardItem from "@/components/card/moduleCard/ModuleCardItem.vue";
import ErpBigRightButton from "@/components/button/ErpBigRightButton.vue";
import ErpPageBoxRow from "@/components/page/ErpPageBoxRow.vue";
import ErpRouterButton from "@/components/button/ErpRouterButton.vue";
import {useRouter} from "vue-router";
import {useRouterPage} from "@/utils";
import {ISaleOutboundSheetState, SaleOutboundService,} from "@/module/saleOutbound/service/saleOutbound.service";
import {defineComponent, onMounted, ref} from "vue";
import {AccountInComeService, IAccountInComeSheetState,} from "@/module/accountInCome/accountInCome.service";
import {AccountInComeFindDto} from "@/module/accountInCome/dto/accountInComeFind.dto";

export default defineComponent({
  name: "saleHome",
  components: {
    ErpTitle,
    ErpPageBoxRow,
    ErpRouterButton,
    ErpBigRightButton,
    ModuleCard,
    ModuleCardItem
  },
  setup(prop, {expose}) {
    const router = useRouter();
    const outboundSaleService = new SaleOutboundService();
    const accountInComeService = new AccountInComeService();

    async function activated() {
      await findSaleOutboundSheetState();
      await findAccountInComeSheetState();
    }

    expose({activated});

    onMounted(() => {
      findSaleOutboundSheetState();
      findAccountInComeSheetState();
    });

    const saleOutboundSheetState = ref<ISaleOutboundSheetState>({
      completeL1Review: 0,
      undoneL1Review: 0,
      undoneL2Review: 0,
    });

    const accountInComeSheetState = ref<IAccountInComeSheetState>({
      completeL1Review: 0,
      undoneL1Review: 0,
      undoneL2Review: 0,
    });

    function openSaleOrderView() {
      const route = router.resolve({
        name: "saleOrder",
      });
      useRouterPage(route.fullPath, route.meta.title as string);
    }

    function openSaleOutboundView() {
      const route = router.resolve({
        name: "saleOutbound",
      });
      useRouterPage(route.fullPath, route.meta.title as string);
    }

    function openAccountInComeView() {
      const route = router.resolve({
        name: "accountInComeFind",
      });
      useRouterPage(route.fullPath, route.meta.title as string);
    }

    async function findSaleOutboundSheetState() {
      const sheetCompleteState = await outboundSaleService.findSheetState({
        ymrep: "",
        clientid: 0,
        endDate: "",
        operateareaids: [],
        clientname: "",
        moneytype: "",
        remark1: "",
        remark2: "",
        remark3: "",
        remark4: "",
        remark5: "",
        outboundcode: "",
        outboundid: 0,
        outboundtype: 0,
        page: 0,
        pagesize: 0,
        relatednumber: "",
        startDate: "",
        warehouseids: [],
      });
      saleOutboundSheetState.value.completeL1Review =
          sheetCompleteState.completeL1Review;
      saleOutboundSheetState.value.undoneL1Review =
          sheetCompleteState.undoneL1Review;
      saleOutboundSheetState.value.undoneL2Review =
          sheetCompleteState.undoneL2Review;
    }

    async function findAccountInComeSheetState() {
      const accountInComeFindDto = new AccountInComeFindDto();
      accountInComeFindDto.startDate = "";
      accountInComeFindDto.endDate = "";
      const sheetCompleteState = await accountInComeService.findSheetState(accountInComeFindDto);
      accountInComeSheetState.value.completeL1Review = sheetCompleteState.completeL1Review;
      accountInComeSheetState.value.undoneL1Review = sheetCompleteState.undoneL1Review;
      accountInComeSheetState.value.undoneL2Review = sheetCompleteState.undoneL2Review;
    }

    return {
      saleOutboundSheetState,
      accountInComeSheetState,
      openSaleOrderView,
      openSaleOutboundView,
      openAccountInComeView,
    };
  },
});
</script>
