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
      <erp-button :disabled="!buttonState.create" @click="onClickedCreateBtn">新增</erp-button>
      <erp-button :disabled="!buttonState.edit" type="success" @click="onClickedEditBtn">修改</erp-button>
      <erp-button :disabled="!buttonState.delete_data" type="danger" @click="onClickedDeleteBtn">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonState.level1review" type="success" @click="onClickedL1Review">审核</erp-button>
      <erp-button :disabled="!buttonState.un_level1review" type="danger" @click="onClickedUnL1Review">撤审
      </erp-button>
      <erp-button :disabled="!buttonState.level2review" type="success" @click="onClickedL2Review">财审</erp-button>
      <erp-button :disabled="!buttonState.un_level2review" type="danger" @click="onClickedUnL2Review">财务撤审
      </erp-button>
    </erp-no-title>

    <erp-table
        ref="saleOrderHeadTableRef"
        :find-dto="saleOrderFindDto"
        :init="true"
        :show-filter-tips-box="true"
        :table-state="defaultSaleOrderHeadTableConfig"
        :getRowId="getRowNodeId"
        @refresh="onRefresh"
        @selectionChanged="onSelectedRows"
    ></erp-table>

    <erp-table
        ref="saleOrderMxTableRef"
        :find-dto="saleOrderFindMxDto"
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
import ErpTable from "@/components/table/ErpTable.vue";
import ErpDelimiter from '@/components/delimiter/ErpDelimiter.vue'
import {defaultSaleOrderHeadTableConfig} from "@/view/saleOrder/tableConfig/defaultSaleOrderHeadTable";
import {defaultSaleOrderMxTable} from "@/view/saleOrder/tableConfig/defaultSaleOrderMxTable";
import {ITableRef} from "@/components/table/type";
import {useSaleOrderFind} from "@/view/saleOrder/hock/saleOrderFind/useSaleOrderFind";

export default defineComponent({
  name: 'saleOrderFindView',
  components: {
    ErpTable,
    ErpDelimiter,
    ErpInputRound,
    ErpButton,
    ErpNoTitle,
    ErpPageBox,
  },
  setup(_props, {expose}) {

    const saleOrderHeadTableRef = ref<ITableRef>();
    const saleOrderMxTableRef = ref<ITableRef>();

    async function activated() {
      await onRefresh();
    }

    expose({activated})

    const {
      buttonState,
      saleOrderFindDto,
      saleOrderFindMxDto,
      getRowNodeId,
      onClickedCreateBtn,
      onClickedEditBtn,
      onClickedDeleteBtn,
      onClickedL1Review,
      onClickedUnL1Review,
      onClickedL2Review,
      onClickedUnL2Review,
      onChangeSaleOrderCodeInput,
      onSelectedRows,
      onRefresh,
    } = useSaleOrderFind(saleOrderHeadTableRef, saleOrderMxTableRef)


    return {
      saleOrderHeadTableRef,
      saleOrderMxTableRef,
      buttonState,
      saleOrderFindDto,
      saleOrderFindMxDto,
      defaultSaleOrderHeadTableConfig,
      defaultSaleOrderMxTable,
      getRowNodeId,
      onClickedCreateBtn,
      onClickedEditBtn,
      onClickedDeleteBtn,
      onClickedL1Review,
      onClickedUnL1Review,
      onClickedL2Review,
      onClickedUnL2Review,
      onChangeSaleOrderCodeInput,
      onSelectedRows,
      onRefresh
    }
  }
})
</script>

<style scoped>

</style>