<template>
  <erp-page-box>

    <erp-no-title>
      <erp-button v-reqClick="save" :disabled="!state.edit" type="info">保存</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteData">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedLevel1review">审核
      </erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnLevel1review">撤审
      </erp-button>
      <erp-button :disabled="!buttonShowState.level2review" type="success" @click="clickedLevel2review">财审
      </erp-button>
      <erp-button :disabled="!buttonShowState.un_level2review" type="danger" @click="clickedUnLevel2review">财务撤审
      </erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!state.edit" type="success" @click="clickedAddInboundMx">选择产品</erp-button>
    </erp-no-title>

    <erp-form>
      <erp-form-item v-if="inboundHead.inboundcode" label-for-name="单据编号" lg-col="1" md-col="2">
        <erp-input-round v-model="inboundHead.inboundcode" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="供应商" lg-col="2" md-col="2">
        <erp-select-buy-btn :buyname="inboundHead.buyname" :disabled="!state.edit" @select="selectBuy"
                            @unSelect="unSelectBuy">
        </erp-select-buy-btn>
      </erp-form-item>
      <erp-form-item label-for-name="仓库" lg-col="1" md-col="2">
        <erp-warehouse-auth-select v-model="inboundHead.warehouseid" :disabled="!state.edit">
        </erp-warehouse-auth-select>
      </erp-form-item>
      <erp-form-item label-for-name="进仓日期" lg-col="1" md-col="2">
        <el-date-picker v-model="inboundHead.indate" :disabled="!state.edit" placeholder="选择进仓日期" type="date"
                        value-format="YYYY-MM-DD HH:mm:ss">
        </el-date-picker>
      </erp-form-item>
      <erp-form-item label-for-name="结算方式" lg-col="1" md-col="2">
        <erp-input-round v-model="inboundHead.moneytype" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="相关号码" lg-col="1" md-col="2">
        <erp-input-round v-model="inboundHead.relatednumber" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="备注" lg-col="1" md-col="2">
        <erp-input-round v-model="inboundHead.remark1" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <div class="mt-4"></div>

    <erp-table ref="inboundMxTableRef" :find-dto="{}" :getRowNodeId="getInboundMxTableRowNodeId"
               :showTopBox="true" :table-edit="state.edit" :table-state="BuyInboundCreateViewMxTableConfig"
               @cellEditingStarted="bottomRowStopEditing" @cellValueChanged="onCellValueChanged"
               @ready="onTableReady">
      <template #topBox>
        <erp-button :disabled="!state.edit" size="mini" type="info" @click="addNullLine">+ 增加行</erp-button>
        <erp-button :disabled="!state.edit" size="mini" type="danger" @click="deleteInboundMx">- 删除行</erp-button>
      </template>
    </erp-table>

    <erp-form>
      <erp-form-item v-if="inboundHead.inboundcode" label-for-name="开单" lg-col="1" md-col="2">
        <erp-input-round v-model="inboundHead.creater" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item v-if="inboundHead.inboundcode" label-for-name="最后修改" lg-col="1" md-col="2">
        <erp-input-round v-model="inboundHead.updater" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item v-if="inboundHead.inboundcode" label-for-name="审核" lg-col="1" md-col="2">
        <erp-input-round v-model="inboundHead.level1name" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item v-if="inboundHead.inboundcode" label-for-name="财审" lg-col="1" md-col="2">
        <erp-input-round v-model="inboundHead.level2name" disabled></erp-input-round>
      </erp-form-item>
    </erp-form>

  </erp-page-box>
</template>

<script lang='ts'>
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import ErpSelectBuyBtn from "@/components/button/ErpSelectBuyBtn.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import {useErpSelectProductDialog} from "@/components/dialog/selectInfo/product/useErpSelectProductDialog";
import useErpDialog from "@/components/dialog/useErpDialog";
import {useRoute, useRouter} from "vue-router";
import {defineComponent, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {IProduct} from "@/module/product/product";
import {CellEditingStartedEvent} from "ag-grid-community";
import {BuyInboundCreateViewMxTableConfig} from "@/view/buyInbound/tableConfig/BuyInboundCreateViewMxTableConfig";
import {BuyInboundService} from "@/module/buyInbound/service/BuyInbound.service";
import {BuyInboundMxService} from "@/module/buyInbound/service/BuyInboundMx.service";
import {BuyInboundMxTableTotal} from "@/module/buyInbound/BuyInboundMxTableTotal";
import {BuyInboundAndMxCreateDto} from "@/module/buyInbound/dto/buyInboundAndMxCreate.dto";
import {BuyInboundMxCreateInTableDto} from "@/module/buyInbound/dto/inboundMx/buyInboundMxCreateInTable.dto";
import {IBuy} from "@/module/buy/buy";
import {useButtonState} from "@/composables/useButtonState";
import * as mathjs from "mathjs";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {tabMenu} from "@/components/router_tab/useRouterTab";
import {useRouterPage} from "@/utils";
import {IBuyInboundMxInTable} from "@/module/buyInbound/dto/inboundMx/types/buyInboundMxInTable";
import {BuyInboundCreateInViewDto} from "@/module/buyInbound/dto/inbound/buyInboundCreateInView.dto";
import {BuyInboundUpdateInViewDto} from "@/module/buyInbound/dto/inbound/buyInboundUpdateInView.dto";
import {BuyInboundMxUpdateInTableDto} from "@/module/buyInbound/dto/inboundMx/buyInboundMxUpdateInTable.dto";

export default defineComponent({
  name: "BuyInboundEditView",
  components: {
    ErpSelectBuyBtn,
    ErpNoTitle,
    ErpButton,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpTable,
    ErpWarehouseAuthSelect,
    ErpDelimiter,
    ErpPageBox,
  },
  setup() {
    const {chain, round, bignumber} = mathjs;

    //设置表格id属性
    function getInboundMxTableRowNodeId(params: IBuyInboundMxInTable) {
      return params.printid;
    }

    async function onTableReady() {
      await initPage();
    }

    //路由api
    const router = useRouter();
    const route = useRoute();
    //单头service
    const inboundService = new BuyInboundService();
    //单头
    const inboundHead = ref(new BuyInboundCreateInViewDto());
    //明细service
    const inboundMxService = new BuyInboundMxService();
    //单据页面状态
    const state = ref({
      inboundcode: String(route.query.inboundcode || ''),
      title: "采购进仓单",
      exitMessage: "是否退出",
      edit: true
    })

    const {buttonShowState, updateButtonState} = useButtonState({l1ReviewDefault:true});

    //单据明细表格Ref
    const inboundMxTableRef = ref<ITableRef>();

    //底部栏禁止编辑
    function bottomRowStopEditing(event: CellEditingStartedEvent) {
      if (event.node.rowPinned) {
        event.api.stopEditing(true);
      }
    }

    //编辑完成值发生变化
    function onCellValueChanged() {
      updateTableAmtTotal()
    }

    function updateTableAmtTotal() {
      const bottomRow = new BuyInboundMxTableTotal();
      bottomRow.amt = getInboundMxSumAmt();
      inboundMxTableRef.value?.getGridApi().setPinnedBottomRowData([
        bottomRow
      ]);
    }

    function getInboundMxSumAmt(): number {
      let sumAmt = 0;
      const inboundMxs = getInboundMx();
      for (let i = 0; i < inboundMxs.length; i++) {
        if (Number(inboundMxs[i].amt)) {
          sumAmt = Number(
              round(
                  chain(bignumber(sumAmt))
                      .add(bignumber(inboundMxs[i].amt))
                      .done()
                  , 4)
          )
        }
      }
      return sumAmt;
    }

    function addNullLine() {
      const initInboundMx = new BuyInboundMxCreateInTableDto();
      addInboundMx([initInboundMx])
    }

    //初始页面
    async function initPage(): Promise<void> {

      if (state.value.inboundcode.length === 0) {
        state.value.title = "新增采购进仓单";
        state.value.exitMessage = "是否取消新增采购进仓单"
        state.value.edit = true;
        inboundHead.value.warehouseid = Number(route.query.warehouseid) || 0;
        addNullLine()
      } else {
        //读取单头
        const inboundList = await inboundService.find({
          clientid: 0,
          inboundcode: state.value.inboundcode,
          inboundid: 0,
          inboundtype: 0,
          operateareaids: [],
          page: 0,
          pagesize: 0,
          relatednumber: "",
          startDate: "",
          endDate: "",
          buyname: "",
          moneytype: "",
          remark1: "",
          remark2: "",
          remark3: "",
          remark4: "",
          remark5: "",
          search: "",
          warehouseids: []
        });

        if (inboundList.length === 0 || state.value.inboundcode.length === 0) {
          await useErpDialog({message: "查无此单", closeBtnVisible: false})
          window.close();
          return
        }

        inboundHead.value = new BuyInboundUpdateInViewDto().init(inboundList[0]);

        state.value.edit = inboundHead.value.level1review + inboundHead.value.level2review === 0;

        updateButtonState(inboundHead.value.level1review, inboundHead.value.level2review);


        inboundMxTableRef.value?.getGridApi().setRowData([]);
        //读取明细
        const inboundMx = await inboundMxService.find({inboundid: inboundHead.value.inboundid});
        addInboundMx(inboundMx);
        state.value.title = "编辑采购进仓单"
        state.value.exitMessage = "是否取消编辑采购进仓单"

        updateTableAmtTotal()
      }

    }

    async function routerEditBuyInbound(inboundcode: string) {
      state.value.inboundcode = inboundcode;
      tabMenu.closeTab(route.fullPath)
      const newRoute = router.resolve({
        name: "editBuyInbound", query: {
          inboundcode: state.value.inboundcode
        }
      });
      useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
    }

    async function getBuyInboundCreateDto() {
      inboundMxTableRef.value?.getGridApi().stopEditing();
      //获取明细
      const inboundMx = getInboundMx();
      if (inboundMx.length <= 0) {
        return Promise.reject(new VerifyParamError("请填写明细"));
      }
      //组合单据对象
      return new BuyInboundAndMxCreateDto()
          .setHead(inboundHead.value)
          .setInboundMx(inboundMx);
    }

    //保存按钮
    async function save(): Promise<void> {
      const inbound = await getBuyInboundCreateDto();
      //无id新增 有id修改
      if (inbound.inboundid === 0) {
        const result = await inboundService.create(inbound);
        if (result.createResult && result.createResult.code.length > 0) {
          await routerEditBuyInbound(result.createResult.code);
        }
      } else {
        await inboundService.update(inbound);
      }
    }

    async function save_l1review(): Promise<void> {
      const inbound = await getBuyInboundCreateDto();
      //无id新增 有id修改
      if (inbound.inboundid === 0) {
        const result = await inboundService.create_l1Review(inbound);
        if (result.createResult && result.createResult.code.length > 0) {
          await routerEditBuyInbound(result.createResult.code)
        }
      } else {
        await inboundService.update_l1Review(inbound);
      }
    }

    //增加明细按钮
    async function clickedAddInboundMx() {
      if (inboundHead.value.buyid === 0) {
        return await useErpDialog({message: "请先选择供应商", closeBtnVisible: false});
      }
      const productList = await useErpSelectProductDialog<IProduct[]>();
      addInboundMx(setProductToMx(productList));
    }

    //获取明细
    function getInboundMx(): IBuyInboundMxInTable[] {
      const inboundMx: IBuyInboundMxInTable[] = [];
      inboundMxTableRef.value?.getGridApi().forEachNode((rowNode, index) => {
        rowNode.data.printid = index + 1
        inboundMx.push(rowNode.data);
      })
      return inboundMx
    }

    function setProductToMx(productList: IProduct[]){
      const addItems: IBuyInboundMxInTable[] = [];
      productList.forEach(product => {
        addItems.push(new BuyInboundMxCreateInTableDto().setProductToMx(product));
      });
      return addItems;
    }

    //添加明细次数，用于表格明细临时id
    let rowIdCount = 0;

    //增加明细
    function addInboundMx(addItems: IBuyInboundMxInTable[]) {
      const buyInboundMxList = []
      for (let i = 0; i < addItems.length; i++) {
        rowIdCount = rowIdCount + 1;
        addItems[i].printid = rowIdCount;
        const buyInboundMxUpdateInTableDto = new BuyInboundMxUpdateInTableDto(addItems[i]);
        buyInboundMxList.push(buyInboundMxUpdateInTableDto);
      }
      inboundMxTableRef.value?.getGridApi().applyTransaction({add: buyInboundMxList});
    }

    //删除明细
    async function deleteInboundMx(): Promise<void> {
      const removeData = inboundMxTableRef.value?.getGridApi().getSelectedRows();
      inboundMxTableRef.value?.getGridApi().applyTransaction({remove: removeData});
      updateTableAmtTotal();
    }

    //选择供应商
    function selectBuy(buy: IBuy) {
      inboundHead.value.buyname = buy.buyname;
      inboundHead.value.buyid = buy.buyid;
    }

    //取消选择供应商
    function unSelectBuy() {
      inboundHead.value.buyname = "";
      inboundHead.value.buyid = 0;
      inboundMxTableRef.value?.getGridApi().applyTransaction({remove: getInboundMx()})
    }

    async function clickedLevel1review() {
      if (state.value.edit) {
        const dialogResult = await useErpDialog({message: `是否保存并审核`})
        if (!dialogResult) return
        await save_l1review();
        await useErpDialog({message: `保存审核成功`, closeBtnVisible: false});
        await initPage();
      } else {
        const dialogResult = await useErpDialog({message: `是否审核,单号:${inboundHead.value.inboundcode}`});
        if (!dialogResult) return
        await inboundService.level1review(inboundHead.value.inboundid);
        await useErpDialog({message: `审核成功`, closeBtnVisible: false});
        await initPage();
      }
    }

    async function clickedUnLevel1review() {
      const inboundId = inboundHead.value.inboundid;
      const inboundCode = inboundHead.value.inboundcode;
      const dialogResult = await useErpDialog({title: "提示", message: `是否撤审,单号:${inboundCode}`});
      if (!dialogResult) return
      await inboundService.unLevel1review(inboundId);
      await useErpDialog({message: `撤审成功`, closeBtnVisible: false});
      await initPage();
    }

    async function clickedLevel2review() {
      const inboundId = inboundHead.value.inboundid;
      const inboundCode = inboundHead.value.inboundcode;
      const dialogResult = await useErpDialog({
        message: `是否财务审核,单号:${inboundCode}`,
      })
      if (!dialogResult) return
      await inboundService.level2review(inboundId);
      await useErpDialog({message: `财务审核成功`, closeBtnVisible: false});
      await initPage();
    }

    async function clickedUnLevel2review() {
      const inboundId = inboundHead.value.inboundid;
      const inboundCode = inboundHead.value.inboundcode;
      const dialogResult = await useErpDialog({
        message: `是否撤销财务审核,单号:${inboundCode}`
      })
      if (!dialogResult) return
      await inboundService.unLevel2review(inboundId);
      await useErpDialog({
        message: `撤销财务审核成功`,
        closeBtnVisible: false
      })
      await initPage();
    }

    async function clickedDeleteData() {
      const inboundId = inboundHead.value.inboundid;
      const inboundCode = inboundHead.value.inboundcode;
      const dialogResult = await useErpDialog({
        message: `是否删除,单号:${inboundCode}`,
      })
      if (!dialogResult) return
      await inboundService.delete_data(inboundId);
      await useErpDialog({
        message: `删除成功`,
        closeBtnVisible: false
      })
      //跳转
      tabMenu.closeTab(route.fullPath)
      const newRoute = router.resolve({
        name: "buyInbound"
      });
      useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
    }

    return {
      BuyInboundCreateViewMxTableConfig,
      tabMenu,
      getInboundMxTableRowNodeId,
      onTableReady,
      inboundHead,
      state,
      buttonShowState,
      updateButtonState,
      inboundMxTableRef,
      save,
      initPage,
      selectBuy,
      addNullLine,
      onCellValueChanged,
      bottomRowStopEditing,
      clickedAddInboundMx,
      deleteInboundMx,
      unSelectBuy,
      clickedLevel1review,
      clickedUnLevel1review,
      clickedLevel2review,
      clickedUnLevel2review,
      clickedDeleteData,
    };
  },
});
</script>