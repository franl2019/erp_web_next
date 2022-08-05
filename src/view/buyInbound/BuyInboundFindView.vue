<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button :disabled="!buttonShowState.create" @click="clickedCreateBtn">新增</erp-button>
      <erp-button :disabled="!buttonShowState.edit" type="success" @click="clickedEditBtn">修改</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteData">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedLevel1review">审核</erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnLevel1review">撤审
      </erp-button>
      <erp-button :disabled="!buttonShowState.level2review" type="success" @click="clickedLevel2review">财审</erp-button>
      <erp-button :disabled="!buttonShowState.un_level2review" type="danger" @click="clickedUnLevel2review">财务撤审
      </erp-button>
      <erp-delimiter/>
      <erp-button v-reqClick="initPage">刷新</erp-button>
      <template v-slot:input>
        <el-date-picker
            v-model="findDate"
            end-placeholder="结束日期"
            range-separator="-"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="refreshData"
        >
        </el-date-picker>
        <erp-warehouse-auth-select-have-root v-model="warehouseid" class="md:w-40"
                                             @change="refreshData"></erp-warehouse-auth-select-have-root>
        <erp-input-round v-model="inboundHeadFindDto.inboundcode" class="md:w-60" placeholder="输入单号搜索"
                         @change="refreshData"></erp-input-round>

        <!-- filter button 筛选按钮-->
        <erp-pop-over-button
            @ok="clickedFilterOkBtn"
            @close="clickedFilterCloseBtn"
            @reset="clickedFilterResetBtn"
        >
          <template #default>筛选</template>
          <template #form>
            <erp-form>
              <erp-form-item label-for-name="仓库">
                <erp-warehouse-auth-select-have-root
                    v-model="warehouseid"
                    @change="refreshData"></erp-warehouse-auth-select-have-root>
              </erp-form-item>
              <erp-form-item label-for-name="供应商">
                <erp-input-round v-model="inboundHeadFindDto.buyname"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="结算方式">
                <erp-input-round v-model="inboundHeadFindDto.moneytype"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="相关单号">
                <erp-input-round v-model="inboundHeadFindDto.relatednumber"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注1">
                <erp-input-round v-model="inboundHeadFindDto.remark1"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注2">
                <erp-input-round v-model="inboundHeadFindDto.remark2"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注3">
                <erp-input-round v-model="inboundHeadFindDto.remark3"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注4">
                <erp-input-round v-model="inboundHeadFindDto.remark4"></erp-input-round>
              </erp-form-item>
              <erp-form-item label-for-name="备注5">
                <erp-input-round v-model="inboundHeadFindDto.remark5"></erp-input-round>
              </erp-form-item>
            </erp-form>
          </template>
        </erp-pop-over-button>
      </template>
    </erp-no-title>

    <erp-table ref="inboundHeadRef"
               :find-dto="inboundHeadFindDto"
               :getRowNodeId="getHeadTableRowNodeId"
               :table-state="BuyInboundFindViewHeadTableConfig"
               @selectionChanged="onHeadTableSelectRow"
    ></erp-table>

    <erp-title title="单据明细"></erp-title>

    <erp-table ref="inboundMxRef"
               :getRowNodeId="getMxTableRowNodeId"
               :find-dto="inboundMxFindDto"
               :table-state="BuyInboundFindViewMxTableConfig"
    ></erp-table>
  </erp-page-box>

</template>

<script lang='ts' setup>
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {useRouter} from "vue-router";
import ErpDialog from "@/components/dialog/dialog";
import {BuyInboundFindViewHeadTableConfig} from "@/view/buyInbound/tableConfig/BuyInboundFindViewHeadTableConfig";
import {BuyInboundFindViewMxTableConfig} from "@/view/buyInbound/tableConfig/BuyInboundFindViewMxTableConfig";
import {IBuyInboundFindDto, IBuyInboundMxFindDto} from "@/module/buyInbound/types/IBuyInboundService";
import {BuyInboundFindDto} from "@/module/buyInbound/dto/BuyInboundFindDto";
import {BuyInboundMxFindDto} from "@/module/buyInbound/dto/BuyInboundMxFindDto";
import {BuyInboundService} from "@/module/buyInbound/service/BuyInbound.service";

import {useInboundTable} from "@/composables/inbound/useInboundTable";
import {useButtonState} from "@/composables/useButtonState";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {useDateSelect} from "@/composables/useDateSelect";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import {useRouterPage} from "@/utils";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import ErpPopOverButton from "@/components/button/ErpPopOverButton.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";

async function activated(){
  await initPage()
}
defineExpose([activated])

const inboundHeadFindDto = ref<IBuyInboundFindDto>(new BuyInboundFindDto());
const inboundMxFindDto = ref<IBuyInboundMxFindDto>(new BuyInboundMxFindDto());

const {getMxTableRowNodeId, getHeadTableRowNodeId} = useInboundTable();

const {buttonShowState, updateButtonState} = useButtonState();
const {warehouseid,setDefaultAllWarehouse} = useWarehouseSelect(inboundHeadFindDto);
const {findDate} = useDateSelect(inboundHeadFindDto);

const router = useRouter();
const inboundHeadRef = ref<ITableRef>();
const inboundMxRef = ref<ITableRef>();

const inboundService = new BuyInboundService();

onMounted(async () => {
  await setDefaultAllWarehouse();
  await initPage();
})

async function initPage() {
  await initInboundMx();
  await inboundHeadRef.value?.initTableData();
  updateButtonState()
}

async function initInboundMx(inboundid?: number) {
  if (inboundid && inboundid !== 0) {
    inboundMxFindDto.value.inboundid = inboundid;
    await inboundMxRef.value?.initTableData();
  } else {
    await inboundMxRef.value?.initTableDataList();
  }
}

async function refreshData() {
  await initInboundMx();
  await inboundHeadRef.value?.initTableData();
  updateButtonState();
}

//筛选确定事件
async function clickedFilterOkBtn() {
  await refreshData()
}

//筛选按钮关闭
async function clickedFilterCloseBtn() {
  await refreshData()
}

async function clickedFilterResetBtn() {
  //重置查询参数
  for (let valueKey in inboundHeadFindDto.value) {
    (inboundHeadFindDto.value as any)[valueKey] = (new BuyInboundFindDto() as any)[valueKey]
  }
  await initPage();
}

//进仓单单头表格点击事件
async function onHeadTableSelectRow() {
  const selectRow = getSelectRow();
  if (selectRow) {
    updateButtonState(selectRow.level1review, selectRow.level2review);
    await initInboundMx(selectRow.inboundid);
  } else {
    updateButtonState();
  }
}

function getSelectRow() {
  const rows = inboundHeadRef.value?.getGridApi().getSelectedRows();
  if (rows && rows.length > 0) {
    return JSON.parse(JSON.stringify(rows[0]));
  } else {
    return null
  }
}

//btn event
function clickedCreateBtn() {
  const route = router.resolve({
    name: "createBuyInbound",
    query: {
      warehouseid: warehouseid.value
    }
  })
  useRouterPage(route.fullPath,route.meta.title as string)
}

function clickedEditBtn() {
  const {inboundcode} = getSelectRow();
  if (inboundcode !== '') {
    const route = router.resolve({
      name: 'editBuyInbound',
      query: {
        inboundcode
      }
    })
    useRouterPage(route.fullPath,route.meta.title as string);
  }
}

function clickedLevel1review() {
  const {inboundid, inboundcode} = getSelectRow();
  ErpDialog({
    title: "提示",
    message: `是否审核,单号:${inboundcode}`,
    ok: async () => {
      await inboundService.level1review(inboundid);
      await inboundHeadRef.value?.initTableData();
      await inboundHeadRef.value?.getGridApi().getRowNode(String(inboundid))?.setSelected(true);
    }
  })
}

function clickedUnLevel1review() {
  const {inboundid, inboundcode} = getSelectRow();
  ErpDialog({
    title: "提示",
    message: `是否撤审,单号:${inboundcode}`,
    ok: async () => {
      await inboundService.unLevel1review(inboundid)
      await inboundHeadRef.value?.initTableData();
      await inboundHeadRef.value?.getGridApi().getRowNode(String(inboundid))?.setSelected(true);
    }
  })
}

function clickedLevel2review() {
  const {inboundid, inboundcode} = getSelectRow();
  ErpDialog({
    title: "提示",
    message: `是否财务审核,单号:${inboundcode}`,
    ok: async () => {
      await inboundService.level2review(inboundid);
      await inboundHeadRef.value?.initTableData();
      await inboundHeadRef.value?.getGridApi().getRowNode(String(inboundid))?.setSelected(true);
    }
  })
}

function clickedUnLevel2review() {
  const {inboundid, inboundcode} = getSelectRow();
  ErpDialog({
    title: "提示",
    message: `是否撤销财务审核,单号:${inboundcode}`,
    ok: async () => {
      await inboundService.unLevel2review(inboundid);
      await inboundHeadRef.value?.initTableData();
      await inboundHeadRef.value?.getGridApi().getRowNode(String(inboundid))?.setSelected(true);
    }
  })
}

function clickedDeleteData() {
  const {inboundid, inboundcode} = getSelectRow();
  ErpDialog({
    title: "提示",
    message: `是否删除,单号:${inboundcode}`,
    ok: async () => {
      await inboundService.delete_data(inboundid);
      await inboundHeadRef.value?.initTableData();
      await initInboundMx();
      updateButtonState();
    }
  })
}


</script>