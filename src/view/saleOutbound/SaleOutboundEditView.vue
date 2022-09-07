<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button :disabled="!state.edit" type="info" @click="clickedSaveButton">保存</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteData">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedL1Review">审核</erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnL1Review">撤审
      </erp-button>
      <erp-button :disabled="!buttonShowState.level2review" type="success" @click="clickedL2Review">财审</erp-button>
      <erp-button :disabled="!buttonShowState.un_level2review" type="danger" @click="clickedUnL2Review">财务撤审
      </erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!state.edit" @click="clickedAddOutboundMxButton">选择库存</erp-button>
      <erp-button :disabled="!state.edit" type="danger" @click="clickedDeleteOutboundMxButton">删除明细</erp-button>
    </erp-no-title>

    <erp-form>
      <erp-form-item v-if="outboundHead.outboundcode" label-for-name="单号" md-col="2" lg-col="1">
        <erp-input-round v-model="outboundHead.outboundcode" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="客户" md-col="2" lg-col="2">
        <erp-select-client-btn @select="selectedClientEvent" @unSelect="unSelectedClientEvent"
                               :clientname="outboundHead.clientname" :disabled="!state.edit"></erp-select-client-btn>
      </erp-form-item>
      <erp-form-item label-for-name="仓库" md-col="2" lg-col="1">
        <erp-warehouse-auth-select v-model="outboundHead.warehouseid" :disabled="!state.edit"
                                   @change="unSelectWarehouse"></erp-warehouse-auth-select>
      </erp-form-item>
      <erp-form-item label-for-name="出仓日期" md-col="2" lg-col="1">
        <el-date-picker v-model="outboundHead.outdate" type="date" value-format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择出仓日期" :disabled="!state.edit"></el-date-picker>
      </erp-form-item>
      <erp-form-item label-for-name="相关号码" md-col="2" lg-col="1">
        <erp-input-round v-model="outboundHead.relatednumber" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="结算方式" md-col="2" lg-col="1">
        <erp-input-round v-model="outboundHead.moneytype" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="备注" md-col="2" lg-col="1">
        <erp-input-round v-model="outboundHead.remark1" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <erp-table ref="outboundMxTableRef"
               :table-state="createOutboundMxTable"
               :table-edit="state.edit"
               :find-dto="{}"
               :getRowNodeId="getRowNodeId"
               @cellValueChanged="cellValueChangedEvent"
               @cellEditingStarted="cellEditingStartedEvent"
    ></erp-table>

  </erp-page-box>
</template>

<script setup lang='ts'>
import {onMounted, ref} from "vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import ErpSelectClientBtn from "@/components/button/ErpSelectClientBtn.vue";
import {createOutboundMxTable} from "@/view/saleOutbound/tableConfig/createOutboundMxTable";
import {ITableRef} from "@/components/table/type";
import {ISaleOutboundFindTable, SaleOutboundFindTable} from "@/module/saleOutbound/outboundSale";
import {useRoute, useRouter} from "vue-router";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {useButtonState} from "@/composables/useButtonState";
import {IClient} from "@/module/client/client";
import {VerifyParamError} from "@/error/verifyParamError";
import ErpSelectInventoryDialog from "@/components/dialog/selectInfo/selectInventory/SelectInventoryDialog";
import {IFindInventory} from "@/module/inventory/FindInventory";
import {OutboundSaleDto} from "@/module/saleOutbound/dto/outboundSale.dto";
import ErpDialog from "@/components/dialog/dialog";
import {CellEditingStartedEvent} from "ag-grid-community";
import {OutboundSaleService} from "@/module/saleOutbound/service/outboundSale.service";
import {OutboundMxSaleService} from "@/module/saleOutbound/service/outboundMxSale.service";
import {FindOutboundSaleDto} from "@/module/saleOutbound/dto/findOutboundSale.dto";
import {FindOutboundMxSaleDto} from "@/module/saleOutbound/dto/findOutboundMxSale.dto";
import {IOutboundMxTableData, OutboundMxSaleTableData} from "@/module/saleOutbound/outboundMxSaleTableData";
import {bignumber, chain, round} from "mathjs";
import {SaleOutboundMxTableTotal} from "@/module/saleOutbound/SaleOutboundMxTableTotal";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {tabMenu} from "@/components/router_tab/useRouterTab";
import {useRouterPage} from "@/utils";


const route = useRoute();
const router = useRouter();
//单据明细表格Ref
const outboundMxTableRef = ref<ITableRef>();
//单头
const outboundHead = ref<ISaleOutboundFindTable>(new SaleOutboundFindTable());

const state = ref({
  edit: true,
  outboundcode: String(route.query.outboundcode || ''),
  outboundid: Number(route.query.outboundid || 0),
  title: "销售单",
  exitMessage: "是否退出",
  warehouseid: Number(route.query.warehouseid || 0)
})

const {buttonShowState, updateButtonState} = useButtonState();

onMounted(async () => {
  //form默认的input.focus
  const defaultInputFocus = ref();
  defaultInputFocus.value?.focus();

  //初始化页面
  await initPage();
})

//Event 事件

//选择客户
function selectedClientEvent(client: IClient) {
  outboundHead.value.clientname = client.clientname;
  outboundHead.value.clientid = client.clientid;
}



//取消选择客户
function unSelectedClientEvent() {
  outboundHead.value.clientname = "";
  outboundHead.value.clientid = 0;
  clearMx()
}

function unSelectWarehouse() {
  clearMx()
}

//增加明细按钮
function clickedAddOutboundMxButton() {
  if (outboundHead.value.clientid === 0) {
    return Promise.reject(new VerifyParamError('请先选择客户'))
  }

  if (outboundHead.value.warehouseid === 0) {
    return Promise.reject(new VerifyParamError('请先选择仓库'))
  }
  ErpSelectInventoryDialog({
    clientid: outboundHead.value.clientid,
    warehouseid: outboundHead.value.warehouseid,
    //回调返回选中库存
    ok: (inventories: IFindInventory[]) => {
      //添加到明细
      addOutboundMx(formatInventoryListToOutboundMx(inventories));
    }
  })
}

//删除明细
async function clickedDeleteOutboundMxButton(): Promise<void> {
  const removeData = outboundMxTableRef.value?.getGridApi().getSelectedRows();
  outboundMxTableRef.value?.getGridApi().applyTransaction({remove: removeData});
  updateTableAmtTotal();
}

async function getCreateDto() {
  outboundMxTableRef.value?.getGridApi().stopEditing();

  if (!outboundHead.value.clientid || outboundHead.value.clientid === 0) {
    return Promise.reject(new VerifyParamError("请选择客户"));
  }

  if (!outboundHead.value.warehouseid || outboundHead.value.warehouseid === 0) {
    return Promise.reject(new VerifyParamError("请选择仓库"));
  }

  if (outboundHead.value.clientid === 0) {
    return Promise.reject(new VerifyParamError("请选择客户"))
  }


  if (outboundHead.value.warehouseid === 0) {
    return Promise.reject(new VerifyParamError("请选择仓库"))
  }

  //获取明细
  const outboundMx = setOutboundSetPrintId(getOutboundMx());

  //组合单据对象
  const outbound = new OutboundSaleDto();
  outbound.setHead(outboundHead.value);
  outbound.setOutboundMx(outboundMx);

  if (outbound.outboundMx.length <= 0) {
    return Promise.reject(new VerifyParamError("请填写明细"));
  }

  return outbound
}

//保存按钮
async function clickedSaveButton(): Promise<void> {

  const outbound = await getCreateDto();
  //根据页面状态新增或修改
  if (state.value.outboundid === 0) {
    const result = await outboundService.create(outbound);
    if (result && result.createResult) {
      state.value.outboundid = result.createResult.id
    } else {
      return Promise.reject(new Error("保存失败,返回缺少'createResult'"))
    }
  } else {
    await outboundService.update(outbound);
  }

  tabMenu.closeTab(route.fullPath)
  const newRoute = router.resolve({
    name: "editOutbound", query: {
      outboundid: state.value.outboundid
    }
  });
  useRouterPage(newRoute.fullPath, newRoute.meta.title as string);

}

//审核出仓单按钮
async function clickedL1Review() {

  //区分新增的审核还是编辑的审核
  if (state.value.outboundid === 0) {
    const outbound = await getCreateDto();
    ErpDialog({
      title: "提示",
      message: `是否保存并审核`,
      ok: async () => {
        const result = await outboundService.create_l1Review(outbound);
        if (result && result.createResult) {
          state.value.outboundid = result.createResult.id
        } else {
          return Promise.reject(new Error("保存失败,返回缺少'createResult'"))
        }

        tabMenu.closeTab(route.fullPath)
        const newRoute = router.resolve({
          name: "editOutbound", query: {
            outboundid: state.value.outboundid
          }
        });
        useRouterPage(newRoute.fullPath, newRoute.meta.title as string);

      }
    })
  } else {
    const outbound = await getCreateDto();
    const {outboundcode} = outbound;
    ErpDialog({
      title: "提示",
      message: `是否审核,单号:${outboundcode}`,
      ok: async () => {
        await outboundService.updateAndL1Review(outbound);
        await clearMx();
        await initPage();
      }
    })
  }
}

//撤审出仓单按钮
async function clickedUnL1Review() {
  const {outboundid, outboundcode} = outboundHead.value;
  ErpDialog({
    title: "提示",
    message: `是否撤审,单号:${outboundcode}`,
    ok: async () => {
      await outboundService.unL1Review({outboundid});
      await clearMx();
      await initPage();
    }
  })
}

//审核出仓单按钮
async function clickedL2Review() {
  const {outboundid, outboundcode} = outboundHead.value;
  ErpDialog({
    title: "提示",
    message: `是否财审,单号:${outboundcode}`,
    ok: async () => {
      await outboundService.l2Review({outboundid});
      await clearMx();
      await initPage();
    }
  })
}

//撤审出仓单按钮
async function clickedUnL2Review() {
  const {outboundid, outboundcode} = outboundHead.value;
  ErpDialog({
    title: "提示",
    message: `是否撤审财审,单号:${outboundcode}`,
    ok: async () => {
      await outboundService.unL2Review({outboundid});
      await clearMx();
      await initPage();
    }
  })
}

async function clickedDeleteData() {
  const {outboundid, outboundcode} = outboundHead.value;
  ErpDialog({
    title: "提示",
    message: `是否删除,单号:${outboundcode}`,
    ok: async () => {
      await outboundService.delete_data({outboundid});
      //跳转
      tabMenu.closeTab(route.fullPath)
      const newRoute = router.resolve({
        name: "saleOutbound"
      });
      useRouterPage(newRoute.fullPath, newRoute.meta.title as string);

    }
  })
}

//编辑完成值发生变化
function cellValueChangedEvent() {
  updateTableAmtTotal();
}

//底部栏禁止编辑
function cellEditingStartedEvent(event: CellEditingStartedEvent) {
  if (event.node.rowPinned) {
    event.api.stopEditing(true);
  }
}

//Hock
//销售单单头服务
const outboundService = new OutboundSaleService();
//销售单明细服务
const outboundMxService = new OutboundMxSaleService();


//初始页面，根据state.outboundid 0新增 !0编辑
async function initPage(): Promise<void> {

  if (state.value.outboundid === 0) {
    state.value.title = "新增销售单";
    state.value.exitMessage = "是否取消新增销售单"
    state.value.edit = true;
    if (outboundHead.value) {
      outboundHead.value.warehouseid = Number(state.value.warehouseid);
    }

  } else {
    //查询单头
    const findHeadDto = new FindOutboundSaleDto();
    findHeadDto.outboundid = state.value.outboundid;
    findHeadDto.startDate = '';
    findHeadDto.endDate = '';
    const saleOutboundHeadData = await outboundService.find(findHeadDto);
    if (saleOutboundHeadData.length > 1) {
      return Promise.reject(new VerifyParamError('单头数量异常,联系管理员!!'))
    }

    //读取单头
    outboundHead.value = saleOutboundHeadData[0];


    //读取明细
    const findMxDto = new FindOutboundMxSaleDto();
    findMxDto.outboundid = state.value.outboundid;
    const outboundMxList = await outboundMxService.find(findMxDto);

    addOutboundMx(outboundMxList);

    state.value.title = "编辑销售单";
    state.value.exitMessage = "是否取消编辑销售单";

    //判断是否可以编辑
    state.value.edit = outboundHead.value.level1review === 0 && outboundHead.value.level2review === 0;

    //更新按钮状态
    updateButtonState(outboundHead.value.level1review, outboundHead.value.level2review);

    updateTableAmtTotal()
  }
}

function clearMx() {
  outboundMxTableRef.value?.getGridApi().setRowData([])
}

function formatInventoryListToOutboundMx(inventories: IFindInventory[]): IOutboundMxTableData[] {
  const addItems: IOutboundMxTableData[] = [];
  inventories.forEach(inventory => {
    const outboundMxTableData: IOutboundMxTableData = new OutboundMxSaleTableData();
    outboundMxTableData.printid = 0;
    outboundMxTableData.productid = inventory.productid;
    outboundMxTableData.productcode = inventory.productcode;
    outboundMxTableData.productname = inventory.productname;
    outboundMxTableData.unit = inventory.unit;
    outboundMxTableData.spec = inventory.spec;
    outboundMxTableData.materials = inventory.materials;
    outboundMxTableData.materials_d = inventory.materials_d;
    outboundMxTableData.spec_d = inventory.spec_d;
    outboundMxTableData.remark = inventory.remark;
    outboundMxTableData.remarkmx = inventory.remarkmx;
    outboundMxTableData.packqty = inventory.packqty;
    outboundMxTableData.outqty = Number(inventory.qty);
    outboundMxTableData.priceqty = Number(inventory.qty);
    outboundMxTableData.bzqty = round(
        Number(
            chain(bignumber(inventory.qty))
                .divide(bignumber(inventory.packqty))
                .done()
        ), 4);
    //仓库
    outboundMxTableData.warehouseid = inventory.warehouseid;
    outboundMxTableData.warehousename = inventory.warehousename;
    //客户
    outboundMxTableData.clientid = inventory.clientid;
    outboundMxTableData.clientcode = inventory.clientcode;
    outboundMxTableData.clientname = inventory.clientname;
    addItems.push(outboundMxTableData);
  })
  return addItems;
}

//set mx table id
function getRowNodeId(data: IOutboundMxTableData) {
  return data.printid
}

//获取明细
function getOutboundMx(): IOutboundMxTableData[] {
  const outboundMxTableDataList: IOutboundMxTableData[] = [];
  outboundMxTableRef.value?.getGridApi().forEachNode((rowNode) => {
    outboundMxTableDataList.push(rowNode.data);
  })
  return outboundMxTableDataList
}

let rowIdCount: number = 0;

//增加明细
function addOutboundMx(addItems: IOutboundMxTableData[]) {
  for (let i = 0; i < addItems.length; i++) {
    rowIdCount = rowIdCount + 1
    addItems[i].printid = rowIdCount;
  }
  outboundMxTableRef.value?.getGridApi().applyTransaction({add: addItems});
}

function getOutboundMxSumAmt(): number {
  let sumAmt = 0;
  const outboundMxs = getOutboundMx();
  for (let i = 0; i < outboundMxs.length; i++) {
    if (!isNaN(outboundMxs[i].amt)) {
      sumAmt = Number(
          round(
              chain(bignumber(sumAmt))
                  .add(bignumber(outboundMxs[i].amt))
                  .done()
              , 2)
      );
    }
  }
  return sumAmt;
}

function updateTableAmtTotal() {
  const bottomRow = new SaleOutboundMxTableTotal();
  bottomRow.amt = getOutboundMxSumAmt();
  outboundMxTableRef.value?.getGridApi().setPinnedBottomRowData([
    bottomRow
  ]);
}

function setOutboundSetPrintId(outboundMxList: IOutboundMx[]) {
  for (let i = 0; i < outboundMxList.length; i++) {
    outboundMxList[i].printid = i + 1
  }
  return outboundMxList
}
</script>