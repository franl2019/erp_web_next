<template>
  <erp-page-box>
    <erp_title :title="state.title">
      <erp_button @click="clickedCancelBtn">取消保存</erp_button>
      <erp_button @click="clickedSaveBtn" type="success">保存</erp_button>
    </erp_title>
    <erp_form>
      <erp_form_item v-if="inboundHead.inboundcode" label-for-name="单据编号" md-col="2" lg-col="1">
        <erp_input_rounded v-model="inboundHead.inboundcode" disabled></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="仓库名称" md-col="2" lg-col="1">
        <erp_select_warehouse_auth v-model="inboundHead.warehouseid"></erp_select_warehouse_auth>
      </erp_form_item>
      <erp_form_item label-for-name="进仓日期" md-col="2" lg-col="1">
        <el-date-picker v-model="inboundHead.indate" type="date" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择进仓日期"></el-date-picker>
      </erp_form_item>
      <erp_form_item label-for-name="结算方式" md-col="2" lg-col="1">
        <erp_input_rounded v-model="inboundHead.moneytype"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="相关号码" md-col="2" lg-col="1">
        <erp_input_rounded v-model="inboundHead.relatednumber"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注" md-col="2" lg-col="2">
        <erp_input_rounded v-model="inboundHead.remark1"></erp_input_rounded>
      </erp_form_item>
    </erp_form>

    <erp_title title="单据明细">
      <erp_button @click="clickedAddInboundMx">增加明细</erp_button>
      <erp_button @click="deleteInboundMx" type="danger">删除明细</erp_button>
    </erp_title>

    <erp_table ref="inboundMxTableRef"
               :table-state="createInboundProductionMxTable"
               :getRowNodeId="getInboundMxTableRowNodeId"
               :find-dto="{}"
               @cellEditingStarted="bottomRowStopEditing"
               @cellValueChanged="onCellValueChanged"
    ></erp_table>
  </erp-page-box>

</template>

<script setup lang='ts'>
import Erp_table from "@/components/table/ErpTable.vue";
import Erp_select_warehouse_auth from "@/components/select/ErpWarehouseAuthSelect.vue";
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {createInboundProductionMxTable} from "@/view/productionInbound/tableConfig/createInboundProductionMxTable";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import ErpSelectProductDialog from "@/components/dialog/selectInfo/selectProduct/SelectProductDialog";
import {IProduct} from "@/module/product/product";
import {ProductionInboundService} from "@/module/productionInbound/service/ProductionInbound.service";
import ErpDialog from "@/components/dialog/dialog";
import {ProductionInboundFindDto} from "@/module/productionInbound/dto/ProductionInboundFindDto";
import {ProductionInboundMxService} from "@/module/productionInbound/service/ProductionInboundMx.service";
import {ProductionInboundMxFindDto} from "@/module/productionInbound/dto/ProductionInboundMxFindDto";
import {ProductionInboundCreateDto} from "@/module/productionInbound/dto/ProductionInboundCreateDto";
import {ProductionInboundMxTableData} from "@/module/productionInbound/ProductionInboundMxTableData";
import {ProductionInboundMxTableTotal} from "@/module/productionInbound/ProductionInboundMxTableTotal";
import {CellEditingStartedEvent, CellValueChangedEvent} from "ag-grid-community";
import {IInbound} from "@/module/inbound/IInbound";
import {IProductionInboundMxTableData} from "@/module/productionInbound/types/IProductionInboundMxTableData";
import {ProductionInbound} from "@/module/productionInbound/ProductionInbound";
import {VerifyParamError} from "@/types/error/verifyParamError";


//设置表格id属性
function getInboundMxTableRowNodeId(data: IProductionInboundMxTableData) {
  return data.rowId;
}

onMounted(async () => {
  //form默认的input.focus
  const defaultInputFocus = ref();
  defaultInputFocus.value?.focus();
  //初始化页面
  await initPage();
})

const props = withDefaults(defineProps<{
  inboundid?: string;
  warehouseid?: string;
}>(), {
  inboundid: "0",
  warehouseid: "0"
})

//路由api
const router = useRouter();
//单头service
const inboundService = new ProductionInboundService();
//单头
const inboundHead = ref<IInbound>(new ProductionInbound());
//明细service
const inboundMxService = new ProductionInboundMxService();
//单据页面状态
const state = ref({
  inboundid: Number(props.inboundid),
  title: "生产进仓单",
  exitMessage: "是否退出"
})

//单据明细表格Ref
const inboundMxTableRef = ref<ITableRef>();

//底部栏禁止编辑
function bottomRowStopEditing(event: CellEditingStartedEvent) {
  if (event.node.rowPinned) {
    event.api.stopEditing(true);
  }
}

//编辑完成值发生变化
function onCellValueChanged(event: CellValueChangedEvent) {
  const bottomRow = new ProductionInboundMxTableTotal();
  bottomRow.amt = getInboundMxSumAmt();
  event.api.setPinnedBottomRowData([
    bottomRow
  ]);
}

function getInboundMxSumAmt(): number {
  let sumAmt = 0;
  const inboundMxs = getInboundMx();
  for (let i = 0; i < inboundMxs.length; i++) {
    if (!isNaN(inboundMxs[i].amt)) {
      sumAmt = sumAmt + inboundMxs[i].amt;
    }
  }
  return sumAmt;
}

//初始页面，根据state.inboundid 0新增 !0编辑
async function initPage(): Promise<void> {
  if (state.value.inboundid === 0) {
    state.value.title = "新增生产进仓单";
    state.value.exitMessage = "是否取消新增生产进仓单"
    inboundHead.value.clientid = 1;
    inboundHead.value.buyid = 0;
    inboundHead.value.warehouseid = Number(props.warehouseid);
  } else {
    //读取单头
    const findHeadDto = new ProductionInboundFindDto();
    findHeadDto.inboundid = state.value.inboundid;
    inboundHead.value = (await inboundService.find(findHeadDto))[0];

    //读取明细
    const findMxDto = new ProductionInboundMxFindDto();
    findMxDto.inboundid = state.value.inboundid;
    const inboundMx = await inboundMxService.find(findMxDto);
    addInboundMx(inboundMx);
    state.value.title = "编辑生产进仓单"
    state.value.exitMessage = "是否取消编辑生产进仓单"
  }
}

//保存按钮
async function clickedSaveBtn(): Promise<void> {

  inboundMxTableRef.value?.getGridApi().stopEditing();

  if (!inboundHead.value.clientid || inboundHead.value.clientid === 0) {
    return Promise.reject(new VerifyParamError("请选择客户"));
  }

  if (!inboundHead.value.warehouseid || inboundHead.value.warehouseid === 0) {
    return Promise.reject(new VerifyParamError("请选择仓库"));
  }

  //获取明细
  const inboundMx = getInboundMx();

  if (inboundMx.length <= 0) {
    return Promise.reject(new VerifyParamError("请填写明细"));
  }

  //组合单据对象
  const inbound = new ProductionInboundCreateDto();
  inbound.setHead(inboundHead.value);
  inbound.setInboundMx(inboundMx);

  //根据页面状态新增或修改
  if (state.value.inboundid === 0) {
    await inboundService.create(inbound);
  } else {
    await inboundService.update(inbound);
  }

  await router.push({name: "ProductionInbound"});
}

//取消保存按钮
function clickedCancelBtn() {
  ErpDialog({
    title: "提示",
    message: state.value.exitMessage,
    ok: () => {
      router.push({name: "ProductionInbound"});
    }
  })
}

//增加明细按钮
function clickedAddInboundMx() {
  ErpSelectProductDialog({
    //回调返回选中资料
    ok: (productList: IProduct[]) => {
      //添加到明细
      addInboundMx(formatProductListToInboundMx(productList));
    }
  })
}

//获取明细
function getInboundMx(): IProductionInboundMxTableData[] {
  const inboundMx: IProductionInboundMxTableData[] = [];
  inboundMxTableRef.value?.getGridApi().forEachNode((rowNode, index) => {
    rowNode.data.printid = index;
    inboundMx.push(rowNode.data);
  })
  return inboundMx
}

function formatProductListToInboundMx(productList: IProduct[]): IProductionInboundMxTableData[] {
  const addItems: IProductionInboundMxTableData[] = [];
  productList.forEach(product => {
    const inboundMx: IProductionInboundMxTableData = new ProductionInboundMxTableData()
    inboundMx.rowId = 0;
    inboundMx.printid = 0;
    inboundMx.productid = product.productid;
    inboundMx.productcode = product.productcode;
    inboundMx.productname = product.productname;
    inboundMx.spec = product.spec;
    inboundMx.materials = product.materials;
    inboundMx.unit = product.unit;
    inboundMx.packqty = product.packqty;
    addItems.push(inboundMx);
  });
  return addItems;
}

//添加明细次数，用于表格明细临时id
let rowCount = 0;

//增加明细
function addInboundMx(addItems: IProductionInboundMxTableData[]) {
  for (let i = 0; i < addItems.length; i++) {
    rowCount = rowCount + 1;
    addItems[i].rowId = rowCount
  }
  inboundMxTableRef.value?.getGridApi().applyTransaction({add: addItems});
}

//删除明细
async function deleteInboundMx(): Promise<void> {
  const removeData = inboundMxTableRef.value?.getGridApi().getSelectedRows();
  inboundMxTableRef.value?.getGridApi().applyTransaction({remove: removeData});
}
</script>