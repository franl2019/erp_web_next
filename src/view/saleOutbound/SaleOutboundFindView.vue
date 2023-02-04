<template>
  <erp-page-box>
    <erp-no-title>
      <template #input>
        <erp-input-round
            v-model="saleOutboundHeadFindDto.outboundcode"
            class="md:w-60"
            placeholder="输入单号搜索"
            @change="onChange">
        </erp-input-round>
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
    </erp-no-title>

    <erp-table
        ref="outboundHeadRef"
        :find-dto="saleOutboundHeadFindDto"
        :getRowNodeId="getHeadTableRowNodeId"
        :show-filter-tips-box="true"
        :table-state="defaultOutboundHeadTable"
        @ready="activated"
        @refresh="onRefreshOutboundHeadData"
        @selectionChanged="onSelectedRows">
    </erp-table>

    <erp-table
        ref="outboundMxRef"
        :find-dto="saleOutboundMxFindDto"
        :getRowNodeId="getMxTableRowNodeId"
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
import {useDateSelect} from "@/composables/useDateSelect";
import {ITableRef} from "@/components/table/type";
import {useOperateAreaSelect} from "@/composables/useOperateAreaSelect";
import {
  ISaleOutboundFindDataDto,
  SaleOutboundFindDataDto
} from "@/module/saleOutbound/dto/outbound/saleOutboundFindData.dto";
import {ISaleOutboundMxFindDto, SaleOutboundMxFindDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxFind.dto";
import {getButtonState, IButtonState} from "@/composables/useSheetButtonState";
import {useRouter} from "vue-router";
import {SaleOutboundService} from "@/module/saleOutbound/service/saleOutbound.service";
import {useRouterPage} from "@/utils";
import useErpDialog from "@/components/dialog/useErpDialog";
import {IOutbound} from "@/module/outbound/types/IOutbound";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";

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

    async function initPage() {
      buttonVisibleState.value = getButtonState();
      await outboundHeadRef.value?.initTableData();
      await outboundMxRef.value?.getGridApi().setRowData([]);
    }

    async function initOutboundHeadTable() {
      await outboundHeadRef.value?.initTableData();
    }

    async function selectRow(outboundid: number) {
      await outboundHeadRef.value?.getGridApi().getRowNode(String(outboundid))?.setSelected(true);
    }

    async function initOutboundMx(outboundid?: number) {
      if (outboundid && outboundid !== 0) {
        saleOutboundMxFindDto.value.outboundid = outboundid;
        await outboundMxRef.value?.initTableData();
      } else {
        await outboundMxRef.value?.getGridApi().setRowData([]);
      }
    }

    function getSelectRow() {
      const rows = outboundHeadRef.value?.getGridApi().getSelectedRows();
      if (rows) {
        return rows[0] as IOutbound
      } else {
        return Promise.reject(new VerifyParamError("没有选中销售单"))
      }
    }

    function getHeadTableRowNodeId(data: IOutbound) {
      return data.outboundid
    }

    function getMxTableRowNodeId(data: IOutboundMx) {
      return data.printid
    }

    //service
    const router = useRouter();
    const outboundService = new SaleOutboundService();


    //在搜索条件改变
    async function onRefreshOutboundHeadData() {
      outboundHeadRef.value?.initFindDto();
      await initPage();
    }

    async function onChange() {
      await initOutboundHeadTable();
      await initOutboundMx();
      buttonVisibleState.value = getButtonState()
    }

    //出仓单单头表格点击事件
    async function onSelectedRows() {
      //获取出仓单
      const outbound = await getSelectRow();
      if (outbound) {
        //设置按钮状态
        buttonVisibleState.value = getButtonState(outbound.level1review, outbound.level2review);
        //按出仓单显示出仓单的明细
        await initOutboundMx(outbound.outboundid);
      } else {
        await initOutboundMx();
      }
    }

    async function clickedFilterResetBtn() {
      //重置查询参数
      for (let valueKey in saleOutboundHeadFindDto.value) {
        (saleOutboundHeadFindDto.value as any)[valueKey] = (new SaleOutboundFindDataDto() as any)[valueKey]
      }
      await initPage()
    }

    //btn event
    function clickedCreateBtn() {
      const route = router.resolve({
        name: "newOutbound"
      })
      useRouterPage(route.fullPath, route.meta.title as string)
    }

    async function clickedEditBtn() {
      const outbound = await getSelectRow();
      if (outbound && outbound.outboundcode.length !== 0) {
        const route = router.resolve({
          name: "editOutbound", query: {
            outboundcode: outbound.outboundcode
          }
        });
        useRouterPage(route.fullPath, route.meta.title as string);
      }
    }

    //审核出仓单按钮
    async function clickedL1Review() {
      const {outboundid, outboundcode} = await getSelectRow();
      await useErpDialog({
        title: "提示",
        message: `是否审核,单号:${outboundcode}`
      })
      await outboundService.l1Review(outboundid);
      await initOutboundHeadTable();
      await selectRow(outboundid);
    }

    //撤审出仓单按钮
    async function clickedUnL1Review() {
      const {outboundid, outboundcode} = await getSelectRow();
      await useErpDialog({
        title: "提示",
        message: `是否撤审,单号:${outboundcode}`,
      })
      await outboundService.unL1Review(outboundid);
      await initOutboundHeadTable();
      await selectRow(outboundid);
    }

    //审核出仓单按钮
    async function clickedL2Review() {
      const {outboundid, outboundcode} = await getSelectRow();
      await useErpDialog({
        title: "提示",
        message: `是否财审,单号:${outboundcode}`
      })
      await outboundService.l2Review(outboundid);
      await initOutboundHeadTable();
      await selectRow(outboundid);
    }

    //撤审出仓单按钮
    async function clickedUnL2Review() {
      const {outboundid, outboundcode} = await getSelectRow();
      await useErpDialog({
        title: "提示",
        message: `是否撤审财审,单号:${outboundcode}`,
      })
      await outboundService.unL2Review(outboundid);
      await initOutboundHeadTable();
      await selectRow(outboundid);
    }

    async function clickedDeleteData() {
      const {outboundid, outboundcode} = await getSelectRow();
      await useErpDialog({
        title: "提示",
        message: `是否删除,单号:${outboundcode}`
      })
      await outboundService.delete_data(outboundid);
      await initOutboundMx();
      await initOutboundHeadTable();
      buttonVisibleState.value = getButtonState()
    }

    async function activated() {
      await initPage()
    }

    expose({activated})

    return {
      defaultOutboundMxTable,
      defaultOutboundHeadTable,
      saleOutboundHeadFindDto,
      saleOutboundMxFindDto,
      buttonVisibleState,
      outboundHeadRef,
      outboundMxRef,
      findDate,
      operateAreaId,
      initPage,
      getHeadTableRowNodeId,
      getMxTableRowNodeId,
      onChange,
      onRefreshOutboundHeadData,
      onSelectedRows,
      clickedCreateBtn,
      clickedEditBtn,
      clickedL1Review,
      clickedUnL1Review,
      clickedL2Review,
      clickedUnL2Review,
      clickedDeleteData,
      clickedFilterResetBtn,
      activated,
    };
  },
});
</script>