<template>
  <erp-page-box>
    <erp-no-title>
      <template #input>
        <erp-input-round
            v-model="saleOutboundFindDto.outboundcode"
            class="md:w-60"
            placeholder="输入单号搜索"
            @change="onRefresh">
        </erp-input-round>
      </template>
      <erp-button :disabled="!buttonState.create" @click="onClickCreate">新增</erp-button>
      <erp-button  type="success" @click="onClickEdit">修改</erp-button>
      <erp-button :disabled="!buttonState.delete_data" type="danger" @click="onClickDelete">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonState.level1review" type="success" @click="onClickL1Review">审核</erp-button>
      <erp-button :disabled="!buttonState.un_level1review" type="danger" @click="onClickUnL1Review">撤审
      </erp-button>
      <erp-button :disabled="!buttonState.level2review" type="success" @click="onClickL2Review">财审</erp-button>
      <erp-button :disabled="!buttonState.un_level2review" type="danger" @click="onClickUnL2Review">财务撤审
      </erp-button>
    </erp-no-title>

    <erp-table
        ref="saleOutboundRef"
        :find-dto="saleOutboundFindDto"
        :getRowNodeId="getRowNodeId"
        :show-filter-tips-box="true"
        :table-state="defaultOutboundHeadTable"
        @ready="onRefresh"
        @refresh="onRefresh"
        @selectionChanged="onClickSaleOutboundRow">
    </erp-table>

    <erp-table
        ref="saleOutboundMxRef"
        :table-name="'单据明细'"
        :table-state="defaultOutboundMxTable">
    </erp-table>
  </erp-page-box>
</template>

<script lang='ts'>
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import ErpPopOverButton from "@/components/button/ErpPopOverButton.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {defaultOutboundMxTable} from "@/view/saleOutbound/tableConfig/defaultOutboundMxTable";
import {defaultOutboundHeadTable} from "@/view/saleOutbound/tableConfig/defaultOutboundHeadTable";
import {defineComponent, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {useSaleOutboundFindPage} from "@/view/saleOutbound/hock/saleOutboundFind/useSaleOutboundFindPage";
import {IOutbound} from "@/module/outbound/types/IOutbound";

export default defineComponent({
  name: "SaleOutboundFindView",
  components: {
    ErpNoTitle,
    ErpTitle,
    ErpButton,
    ErpTable,
    ErpInputRound,
    ErpFormItem,
    ErpForm,
    ErpWarehouseAuthSelectHaveRoot,
    ErpPopOverButton,
    ErpOperateAreaAuthSelect,
    ErpPageBox,
    ErpDelimiter,
  },
  setup(_props, {expose}) {

    const saleOutboundRef = ref<ITableRef>();
    const saleOutboundMxRef = ref<ITableRef>();

    function getRowNodeId(data:IOutbound) {
      return data.outboundid
    }

    const {
      buttonState,
      saleOutboundFindDto,
      onClickCreate,
      onClickEdit,
      onClickL1Review,
      onClickUnL1Review,
      onClickL2Review,
      onClickUnL2Review,
      onClickDelete,
      onClickSaleOutboundRow,
      onRefresh
    } = useSaleOutboundFindPage(
        saleOutboundRef,
        saleOutboundMxRef,
    )

    function activated() {
      onRefresh();
    }

    expose({activated})

    return {
      saleOutboundRef,
      saleOutboundMxRef,
      getRowNodeId,
      defaultOutboundHeadTable,
      defaultOutboundMxTable,
      buttonState,
      saleOutboundFindDto,
      onClickCreate,
      onClickEdit,
      onClickL1Review,
      onClickUnL1Review,
      onClickL2Review,
      onClickUnL2Review,
      onClickDelete,
      onClickSaleOutboundRow,
      onRefresh
    };
  },
});
</script>