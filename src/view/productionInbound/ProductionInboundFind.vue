<template>
  <erp-page-box>
    <erp_title title="生产进仓单">
      <erp_button v-if="buttonShowState.create" @click="clickedCreateBtn">新增</erp_button>
      <erp_button v-if="buttonShowState.edit" @click="clickedEditBtn">修改</erp_button>
      <erp_button v-if="buttonShowState.level1review" type="success" @click="clickedLevel1review">审核</erp_button>
      <erp_button v-if="buttonShowState.un_level1review" type="danger" @click="clickedUnLevel1review">撤审</erp_button>
      <erp_button v-if="buttonShowState.level2review" type="success">财审</erp_button>
      <erp_button v-if="buttonShowState.un_level2review" type="danger">财务撤审</erp_button>
      <erp_button v-if="buttonShowState.delete_data" type="danger" @click="clickedDeleteData">删除</erp_button>
      <template v-slot:input>
        <el-date-picker
            v-model="findDate"
            end-placeholder="结束日期"
            range-separator="-"
            start-placeholder="开始日期"
            type="daterange"
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="refreshData"
        ></el-date-picker>
        <erp-warehouse-auth-select-have-root v-model="warehouseid" class="md:w-40"
                                             @change="refreshData"></erp-warehouse-auth-select-have-root>
        <erp_input_rounded v-model="inboundHeadFindDto.inboundcode" class="md:w-60" placeholder="输入单号搜索"
                           @change="refreshData"></erp_input_rounded>
      </template>
    </erp_title>

    <erp_table ref="inboundHeadRef"
               :find-dto="inboundHeadFindDto"
               :getRowNodeId="getHeadTableRowNodeId"
               :table-state="defaultInboundProductionHeadTable"
               @selection-changed="onHeadTableSelectRow"
    ></erp_table>

    <erp_title title="单据明细"></erp_title>

    <erp_table ref="inboundMxRef"
               :find-dto="inboundMxFindDto"
               :getRowNodeId="getMxTableRowNodeId"
               :table-state="defaultInboundProductionMxTable"
    ></erp_table>
  </erp-page-box>
</template>

<script lang='ts' setup>
import {
  defaultInboundProductionHeadTable
} from "@/view/productionInbound/tableConfig/defaultInboundProductionHeadTable";
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import {onMounted, ref} from "vue";
import {ProductionInboundFindDto} from "@/module/productionInbound/dto/ProductionInboundFindDto";
import {SelectionChangedEvent} from "ag-grid-community";
import {ITableRef} from "@/components/table/type";
import {ProductionInboundMxFindDto} from "@/module/productionInbound/dto/ProductionInboundMxFindDto";
import {defaultInboundProductionMxTable} from "@/view/productionInbound/tableConfig/defaultInboundProductionMxTable";
import {useRouter} from "vue-router";
import ErpDialog from "@/components/dialog/dialog";
import {ProductionInboundService} from "@/module/productionInbound/service/ProductionInbound.service";
import {
  IProductionInboundFindDto,
  IProductionInboundMxFindDto,
} from "@/module/productionInbound/types/IProductionInboundService";
import {useInboundTable} from "@/composables/inbound/useInboundTable";
import {useButtonState} from "@/composables/useButtonState";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {useDateSelect} from "@/composables/useDateSelect";
import ErpPageBox from "@/components/page/ErpPageBox.vue";


const inboundHeadFindDto = ref<IProductionInboundFindDto>(new ProductionInboundFindDto());
const inboundMxFindDto = ref<IProductionInboundMxFindDto>(new ProductionInboundMxFindDto());

const router = useRouter();
const inboundHeadRef = ref<ITableRef>();
const inboundMxRef = ref<ITableRef>();
const {getMxTableRowNodeId, getHeadTableRowNodeId} = useInboundTable();
const {buttonShowState, updateButtonState} = useButtonState();
const {warehouseid, setDefaultWarehouse} = useWarehouseSelect(inboundHeadFindDto);
const findDate = useDateSelect(inboundHeadFindDto);

const inboundService = new ProductionInboundService();
onMounted(async () => {
  await setDefaultWarehouse();
  await inboundHeadRef.value?.initTableData();
})

//初始化明细
async function initInboundMx(inboundid?: number) {
  if (inboundid && inboundid !== 0) {
    inboundMxFindDto.value.inboundid = inboundid;
    await inboundMxRef.value?.initTableData();
  } else {
    await inboundMxRef.value?.getGridApi().setRowData([]);
  }
}

async function refreshData() {
  await inboundHeadRef.value?.initTableData();
  await initInboundMx();
  updateButtonState();
}

//进仓单单头表格点击事件
async function onHeadTableSelectRow(event: SelectionChangedEvent) {
  const selectRow = JSON.parse(JSON.stringify(event.api.getSelectedRows()))[0];
  updateButtonState(selectRow.level1review, selectRow.level2review);
  await initInboundMx(selectRow.inboundid);
}

function getSelectRow() {
  const rows = inboundHeadRef.value?.getGridApi().getSelectedRows();
  if (rows) {
    return rows[0]
  } else {
    return null
  }
}

//btn event
function clickedCreateBtn() {
  router.push({
    name: "editInboundProduction", params: {
      warehouseid: warehouseid.value
    }
  });
}

function clickedEditBtn() {
  const inboundHeadTableSelect = getSelectRow();
  if (inboundHeadTableSelect && inboundHeadTableSelect.inboundid !== 0) {
    router.push({
      name: "editInboundProduction", params: {
        inboundid: inboundHeadTableSelect.inboundid
      }
    });
  }
}

function clickedLevel1review() {
  const inboundHeadTableSelect = getSelectRow();
  const inboundId = inboundHeadTableSelect.inboundid;
  const inboundCode = inboundHeadTableSelect.inboundcode;
  ErpDialog({
    title: "提示",
    message: `是否审核,单号:${inboundCode}`,
    ok: async () => {
      await inboundService.level1review(inboundId);
      await inboundHeadRef.value?.initTableData();
      selectRowForInboundId(inboundId);
      await initInboundMx(inboundId);
    }
  })
}

function clickedUnLevel1review() {
  const inboundHeadTableSelect = getSelectRow();
  const inboundId = inboundHeadTableSelect.inboundid;
  ErpDialog({
    title: "提示",
    message: `是否撤审,单号:${inboundHeadTableSelect.inboundcode}`,
    ok: async () => {
      await inboundService.unLevel1review(inboundId);
      await inboundHeadRef.value?.initTableData();
      selectRowForInboundId(inboundId);
      await initInboundMx(inboundId);
    }
  })
}

function clickedDeleteData() {
  const inboundHeadTableSelect = getSelectRow();
  const inboundId = inboundHeadTableSelect.inboundid;
  const inboundCode = inboundHeadTableSelect.inboundcode;
  ErpDialog({
    title: "提示",
    message: `是否删除,单号:${inboundCode}`,
    ok: async () => {
      await inboundService.delete_data(inboundId);
      await inboundHeadRef.value?.initTableData();
      await initInboundMx();
      updateButtonState();
    }
  })
}

function selectRowForInboundId(id: number) {
  inboundHeadRef.value?.getGridApi().getRowNode("" + id)?.setSelected(true);
}

</script>