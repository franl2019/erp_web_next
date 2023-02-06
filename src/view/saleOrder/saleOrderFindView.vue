<template>
  <erp-page-box>
    <erp-no-title>
      <template #input>
        <erp-input-round
            v-model="saleOrderFindDto.saleOrderCode"
            class="md:w-60"
            placeholder="输入单号搜索"
            @change="onChangeSaleOrderCodeInput">
        </erp-input-round>
      </template>
      <erp-button :disabled="!buttonShowState.create" @click="clickedCreateBtn">新增</erp-button>
      <erp-button :disabled="!buttonShowState.edit" type="success" @click="clickedEditBtn">修改</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteBtn">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedL1Review">审核</erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnL1Review">撤审
      </erp-button>
      <erp-button :disabled="!buttonShowState.level2review" type="success" @click="clickedL2Review">财审</erp-button>
      <erp-button :disabled="!buttonShowState.un_level2review" type="danger" @click="clickedUnL2Review">财务撤审
      </erp-button>
    </erp-no-title>

    <erp-table
        ref="saleOrderHeadTableRef"
        :find-dto="saleOrderFindDto"
        :init="true"
        :show-filter-tips-box="true"
        :table-state="defaultSaleOrderHeadTableConfig"
        @refresh="initPage"
        @selectionChanged="onSelectedRows"
    ></erp-table>

    <erp-table
        ref="saleOrderMxTableRef"
        :table-state="defaultSaleOrderMxTable"
        table-name="单据明细"
    ></erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import ErpPageBox from '@/components/page/ErpPageBox.vue'
import ErpNoTitle from '@/components/title/ErpNoTitle.vue'
import ErpButton from '@/components/button/ErpButton.vue'
import ErpInputRound from '@/components/input/ErpInputRound.vue'
import ErpDelimiter from '@/components/delimiter/ErpDelimiter.vue'
import {SaleOrderFindDto} from '@/module/saleOrder/dto/saleOrderFind.dto'
import ErpTable from "@/components/table/ErpTable.vue";
import {SaleOrderFindMxDto} from "@/module/saleOrder/dto/saleOrderMxFind.dto";
import {defaultSaleOrderHeadTableConfig} from "@/view/saleOrder/tableConfig/defaultSaleOrderHeadTable";
import {defaultSaleOrderMxTable} from "@/view/saleOrder/tableConfig/defaultSaleOrderMxTable";
import {ITableRef} from "@/components/table/type";
import {ISaleOrder} from "@/module/saleOrder/saleOrder";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";
import {useButtonState} from "@/composables/useButtonState";

export default defineComponent({
  name: 'saleOrderFindView',
  components: {ErpTable, ErpDelimiter, ErpInputRound, ErpButton, ErpNoTitle, ErpPageBox},
  setup(_prop,{expose}) {
    const saleOrderService = new SaleOrderService();
    const saleOrderHeadTableRef = ref<ITableRef>();
    const saleOrderMxTableRef = ref<ITableRef>();
    const saleOrderFindDto = ref(new SaleOrderFindDto());
    const saleOrderFindMxDto = ref(new SaleOrderFindMxDto());
    const {buttonShowState,updateButtonState} =useButtonState()


    async function activated() {
      await initPage()
    }

    expose({activated})

    function onChangeSaleOrderCodeInput() {
      refresh()
    }

    async function onSelectedRows() {
      const saleOrder = await getSaleOrderHeadTableSelectedOrder()
      updateButtonState(saleOrder.level1Review,saleOrder.level2Review)
    }

    function initPage() {
      saleOrderHeadTableRef.value?.initTableData();
      updateButtonState();
    }

    function refresh() {
      saleOrderHeadTableRef.value?.initTableData();
      saleOrderMxTableRef.value?.initTableData();
    }

    async function getSaleOrderHeadTableSelectedOrder(): Promise<ISaleOrder> {
      const saleOrderSelectedList = saleOrderHeadTableRef.value?.getGridApi().getSelectedRows() as ISaleOrder[];
      if (saleOrderSelectedList && saleOrderSelectedList.length > 0) {
        return saleOrderSelectedList[0]
      } else {
        return Promise.reject(new Error('未选择销售订单'))
      }

    }

    async function clickedCreateBtn() {

    }

    async function clickedEditBtn() {

    }

    async function clickedDeleteBtn() {
      const saleOrder = await getSaleOrderHeadTableSelectedOrder();
      await saleOrderService.delete_data(saleOrder.saleOrderId);
    }

    async function clickedL1Review() {
      const saleOrder = await getSaleOrderHeadTableSelectedOrder();
      await saleOrderService.l1ReviewDto(saleOrder.saleOrderId);
    }

    async function clickedUnL1Review() {
      const saleOrder = await getSaleOrderHeadTableSelectedOrder();
      await saleOrderService.unl1ReviewDto(saleOrder.saleOrderId);
    }

    async function clickedL2Review() {
      const saleOrder = await getSaleOrderHeadTableSelectedOrder();
      await saleOrderService.l2ReviewDto(saleOrder.saleOrderId);
    }

    async function clickedUnL2Review() {
      const saleOrder = await getSaleOrderHeadTableSelectedOrder();
      await saleOrderService.unl2ReviewDto(saleOrder.saleOrderId);
    }

    return {
      saleOrderHeadTableRef,
      saleOrderMxTableRef,
      buttonShowState,
      saleOrderFindDto,
      saleOrderFindMxDto,
      defaultSaleOrderHeadTableConfig,
      defaultSaleOrderMxTable,
      clickedCreateBtn,
      clickedEditBtn,
      clickedDeleteBtn,
      clickedL1Review,
      clickedUnL1Review,
      clickedL2Review,
      clickedUnL2Review,
      onChangeSaleOrderCodeInput,
      onSelectedRows,
      initPage
    }
  }
})
</script>

<style scoped>

</style>