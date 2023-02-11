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
        @refresh="onInitPage"
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
import ErpTable from "@/components/table/ErpTable.vue";
import ErpDelimiter from '@/components/delimiter/ErpDelimiter.vue'
import {SaleOrderFindDto} from '@/module/saleOrder/dto/saleOrderFind.dto'
import {SaleOrderFindMxDto} from "@/module/saleOrder/dto/saleOrderMxFind.dto";
import {defaultSaleOrderHeadTableConfig} from "@/view/saleOrder/tableConfig/defaultSaleOrderHeadTable";
import {defaultSaleOrderMxTable} from "@/view/saleOrder/tableConfig/defaultSaleOrderMxTable";
import {ITableRef} from "@/components/table/type";
import {useSaleOrderFind} from "@/view/saleOrder/useSaleOrderFind";

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
    const saleOrderFindDto = ref(new SaleOrderFindDto());
    const saleOrderFindMxDto = ref(new SaleOrderFindMxDto());

    async function activated() {
      await onInitPage();
    }

    expose({activated})

    const {
      buttonState,
      onClickedCreateBtn,
      onClickedEditBtn,
      onClickedDeleteBtn,
      onClickedL1Review,
      onClickedUnL1Review,
      onClickedL2Review,
      onClickedUnL2Review,
      onInitPage,
      onChangeSaleOrderCodeInput,
      onSelectedRows,
    } = useSaleOrderFind(saleOrderHeadTableRef, saleOrderMxTableRef)


    return {
      saleOrderHeadTableRef,
      saleOrderMxTableRef,
      buttonState,
      saleOrderFindDto,
      saleOrderFindMxDto,
      defaultSaleOrderHeadTableConfig,
      defaultSaleOrderMxTable,
      onClickedCreateBtn,
      onClickedEditBtn,
      onClickedDeleteBtn,
      onClickedL1Review,
      onClickedUnL1Review,
      onClickedL2Review,
      onClickedUnL2Review,
      onChangeSaleOrderCodeInput,
      onSelectedRows,
      onInitPage
    }
  }
})
</script>

<style scoped>

</style>