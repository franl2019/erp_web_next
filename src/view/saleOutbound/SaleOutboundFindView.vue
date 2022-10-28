<template>
  <erp-page-box>
    <erp-no-title title="">
      <template #input>
        <el-date-picker v-model="findDate" end-placeholder="结束日期" range-separator="-" start-placeholder="开始日期"
                        type="daterange" unlink-panels value-format="YYYY-MM-DD HH:mm:ss" @change="onChange">
        </el-date-picker>
        <erp-warehouse-auth-select-have-root v-model="warehouseid" style="width: 10rem" @change="onChange">
        </erp-warehouse-auth-select-have-root>
        <erp-input-round v-model="saleOutboundHeadFindDto.outboundcode" class="md:w-60" placeholder="输入单号搜索"
                         @change="onChange"></erp-input-round>

        <!-- filter button 筛选按钮-->
        <erp-pop-over-button @close="clickedFilterCloseBtn" @ok="clickedFilterOkBtn" @reset="clickedFilterResetBtn">
          <template #default>筛选</template>
          <template #form>
            <erp-form>
              <erp-form-item label-for-name="操作区域">
                <erp-operate-area-auth-select v-model="operateAreaId" :have-root-node="true" @change="onChange">
                </erp-operate-area-auth-select>
              </erp-form-item>
              <erp-form-item label-for-name="仓库">
                <erp-warehouse-auth-select-have-root v-model="warehouseid" @change="onChange">
                </erp-warehouse-auth-select-have-root>
              </erp-form-item>
              <erp-form-item label-for-name="客户名称">
                <erp-input-round v-model="saleOutboundHeadFindDto.clientname"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="业务员">
                <erp-input-round v-model="saleOutboundHeadFindDto.ymrep"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="相关单号">
                <erp-input-round v-model="saleOutboundHeadFindDto.relatednumber"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="结算方式">
                <erp-input-round v-model="saleOutboundHeadFindDto.moneytype"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注1">
                <erp-input-round v-model="saleOutboundHeadFindDto.remark1"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注2">
                <erp-input-round v-model="saleOutboundHeadFindDto.remark2"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注3">
                <erp-input-round v-model="saleOutboundHeadFindDto.remark3"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注4">
                <erp-input-round v-model="saleOutboundHeadFindDto.remark4"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注5">
                <erp-input-round v-model="saleOutboundHeadFindDto.remark5"></erp-input-round>
              </erp-form-item>
            </erp-form>
          </template>
        </erp-pop-over-button>

      </template>
      <erp-button :disabled="!buttonVisibleState.create" @click="clickedCreateBtn">新增</erp-button>
      <erp-button :disabled="!buttonVisibleState.edit" type="success" @click="clickedEditBtn">修改</erp-button>
      <erp-button :disabled="!buttonVisibleState.delete_data" type="danger" @click="clickedDeleteData">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonVisibleState.level1review" type="success" @click="clickedL1Review">审核</erp-button>
      <erp-button :disabled="!buttonVisibleState.un_level1review" type="danger" @click="clickedUnL1Review">撤审
      </erp-button>
      <erp-button :disabled="!buttonVisibleState.level2review" type="success" @click="clickedL2Review">财审</erp-button>
      <erp-button :disabled="!buttonVisibleState.un_level2review" type="danger" @click="clickedUnL2Review">财务撤审
      </erp-button>
      <erp-delimiter/>
      <erp-button @click="initPage">刷新</erp-button>
    </erp-no-title>

    <erp-table ref="outboundHeadRef"
               :find-dto="saleOutboundHeadFindDto"
               :getRowNodeId="getHeadTableRowNodeId"
               @ready="activated"
               :table-state="defaultOutboundHeadTable"
               @selectionChanged="onSelectedRows"></erp-table>


    <erp-table ref="outboundMxRef" :find-dto="saleOutboundMxFindDto"
               :getRowNodeId="getMxTableRowNodeId"
               :table-name="'单据明细'"
               :table-state="defaultOutboundMxTable"></erp-table>
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
import {useDateSelect} from "@/composables/useDateSelect";
import {useSaleOutboundFindViewHock} from "@/module/saleOutbound/hock/findView/useSaleOutboundFindViewHock";
import {ITableRef} from "@/components/table/type";
import {useSaleOutboundFindViewEvent} from "@/module/saleOutbound/hock/findView/useSaleOutboundFindViewEvent";
import {useOperateAreaSelect} from "@/composables/useOperateAreaSelect";
import {
  ISaleOutboundFindDataDto,
  SaleOutboundFindDataDto
} from "@/module/saleOutbound/dto/outbound/saleOutboundFindData.dto";
import {ISaleOutboundMxFindDto, SaleOutboundMxFindDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxFind.dto";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {IButtonState} from "@/composables/useSheetButtonState";

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
    //销售单查询页单头查询请求参数
    const saleOutboundHeadFindDto = ref<ISaleOutboundFindDataDto>(new SaleOutboundFindDataDto());

    //销售单查询页明细查询请求参数
    const saleOutboundMxFindDto = ref<ISaleOutboundMxFindDto>(new SaleOutboundMxFindDto());

    //仓库
    const {warehouseid} = useWarehouseSelect(saleOutboundHeadFindDto);

    //按钮可视状态
    const buttonVisibleState = ref<IButtonState>({
      create: true,
      edit: false,
      level1review: false,
      un_level1review: false,
      level2review: false,
      un_level2review: false,
      delete_data: false
    });

    const outboundHeadRef = ref<ITableRef>();
    const outboundMxRef = ref<ITableRef>();

    const {findDate} = useDateSelect(saleOutboundHeadFindDto);
    const {operateAreaId} = useOperateAreaSelect(saleOutboundHeadFindDto)

    const option = {
      buttonVisibleState: buttonVisibleState,
      outboundHeadRef: outboundHeadRef,
      outboundMxRef: outboundMxRef,
      saleOutboundHeadFindDto: saleOutboundHeadFindDto,
      saleOutboundMxFindDto: saleOutboundMxFindDto
    }

    const {
      initPage,
      getHeadTableRowNodeId,
      getMxTableRowNodeId
    } = useSaleOutboundFindViewHock(option);

    //event
    const {
      onChange,
      onSelectedRows,
      clickedCreateBtn,
      clickedEditBtn,
      clickedL1Review,
      clickedUnL1Review,
      clickedL2Review,
      clickedUnL2Review,
      clickedDeleteData,
      clickedFilterOkBtn,
      clickedFilterResetBtn,
      clickedFilterCloseBtn
    } = useSaleOutboundFindViewEvent(option)

    async function activated() {
      await initPage()
    }

    expose({activated})

    return {
      defaultOutboundMxTable,
      defaultOutboundHeadTable,
      saleOutboundHeadFindDto,
      saleOutboundMxFindDto,
      warehouseid,
      buttonVisibleState,
      outboundHeadRef,
      outboundMxRef,
      findDate,
      operateAreaId,
      option,
      initPage,
      getHeadTableRowNodeId,
      getMxTableRowNodeId,
      onChange,
      onSelectedRows,
      clickedCreateBtn,
      clickedEditBtn,
      clickedL1Review,
      clickedUnL1Review,
      clickedL2Review,
      clickedUnL2Review,
      clickedDeleteData,
      clickedFilterOkBtn,
      clickedFilterResetBtn,
      clickedFilterCloseBtn,
      activated,
    };
  },
});
</script>