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

    </erp-no-title>

    <erp-form>
      <erp-form-item v-if="outboundHead.outboundcode" lg-col="1" md-col="2" name="单号">
        <erp-input-round v-model="outboundHead.outboundcode" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="客户">
        <erp-select-client-btn :clientname="outboundHead.clientname" :disabled="!state.edit"
                               @select="selectedClientEvent" @unSelect="unSelectedClientEvent"></erp-select-client-btn>
      </erp-form-item>
      <!--      <erp-form-item name="仓库" lg-col="1" md-col="2">-->
      <!--        <erp-warehouse-auth-select v-model="outboundHead.warehouseid" :disabled="!state.edit"-->
      <!--                                   @change="unSelectWarehouse"></erp-warehouse-auth-select>-->
      <!--      </erp-form-item>-->
      <erp-form-item lg-col="1" md-col="2" name="操作区域">
        <erp-operate-area-auth-select v-model="outboundHead.operateareaid"
                                      :disabled="!state.edit"></erp-operate-area-auth-select>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="出仓日期">
        <el-date-picker v-model="outboundHead.outdate" :disabled="!state.edit" placeholder="选择出仓日期"
                        type="date" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="交货日期">
        <el-date-picker v-model="outboundHead.deliveryDate" :disabled="!state.edit" placeholder="选填"
                        type="date" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="相关号码">
        <erp-input-round v-model="outboundHead.relatednumber" :disabled="!state.edit"
                         placeholder="选填"></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="结算方式">
        <erp-input-round v-model="outboundHead.moneytype" :disabled="!state.edit" placeholder="选填"></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="备注">
        <erp-input-round v-model="outboundHead.remark1" :disabled="!state.edit" placeholder="选填"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <erp-table
        ref="outboundMxTableRef"
        :find-dto="{}"
        :getRowNodeId="getRowNodeId"
        :table-edit="state.edit"
        :table-state="createOutboundMxTable"
        show-top-box
        show-button-box
        @cellEditingStarted="cellEditingStartedEvent"
        @cellValueChanged="cellValueChangedEvent"
    >
      <template #topBox>
        <erp-button :disabled="!state.edit" :size="'small'" @click="clickedAddOutboundMxButton">选择库存</erp-button>
        <div class="w-2"></div>
        <erp-button :disabled="!state.edit" :size="'small'" type="danger" @click="clickedDeleteOutboundMxButton">
          删除明细
        </erp-button>
      </template>
      <template #buttonBox>
        <span>
          合计金额 : {{totalAmt}}
        </span>
      </template>
    </erp-table>

  </erp-page-box>
</template>

<script lang='ts'>
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import ErpSelectClientBtn from "@/components/button/ErpSelectClientBtn.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {defineComponent, onMounted, ref} from "vue";
import {createOutboundMxTable} from "@/view/saleOutbound/tableConfig/createOutboundMxTable";
import {ITableRef} from "@/components/table/type";
import {useRoute, useRouter} from "vue-router";
import {useButtonState} from "@/composables/useButtonState";
import {IClient} from "@/module/client/client";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {useErpSelectInventoryDialog} from "@/components/dialog/selectInfo/inventory/useErpSelectInventoryDialog";
import {IFindInventory} from "@/module/inventory/FindInventory";
import useErpDialog from "@/components/dialog/useErpDialog";
import {CellEditingStartedEvent} from "ag-grid-community";
import {SaleOutboundService} from "@/module/saleOutbound/service/saleOutbound.service";
import {SaleOutboundMxService} from "@/module/saleOutbound/service/saleOutboundMx.service";
import {SaleOutboundFindDataDto} from "@/module/saleOutbound/dto/outbound/saleOutboundFindData.dto";
import {SaleOutboundMxFindDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxFind.dto";
import {bignumber, chain, round} from "mathjs";
import {tabMenu} from "@/components/router_tab/useRouterTab";
import {useRouterPage} from "@/utils";
import {SaleOutboundAndMxCreateDto} from "@/module/saleOutbound/dto/saleOutboundAndMxCreate.dto";
import {SaleOutboundCreateDto} from "@/module/saleOutbound/dto/outbound/saleOutboundCreate.dto";
import {SaleOutboundUpdateDto} from "@/module/saleOutbound/dto/outbound/saleOutboundUpdate.dto";
import {SaleOutboundAndMxUpdateDto} from "@/module/saleOutbound/dto/saleOutboundAndMxUpdate.dto";
import {SaleOutboundMxCreateInTableDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxCreateInTable.dto";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";

export default defineComponent({
  name: "SaleOutboundEditView",
  components: {
    ErpOperateAreaAuthSelect,
    ErpPageBox,
    ErpButton,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpTable,
    ErpWarehouseAuthSelect,
    ErpSelectClientBtn,
    ErpNoTitle,
    ErpDelimiter,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    //单据明细表格Ref
    const outboundMxTableRef = ref<ITableRef>();
    //单头
    const outboundHead = ref(new SaleOutboundCreateDto());

    const state = ref({
      edit: true,
      outboundcode: String(route.query.outboundcode || ''),
      outboundid: Number(route.query.outboundid || 0),
      title: "销售单",
      exitMessage: "是否退出",
      warehouseid: Number(route.query.warehouseid || 0)
    })

    const {buttonShowState, updateButtonState} = useButtonState({l1ReviewDefault: true});

    onMounted(() => {
      //form默认的input.focus
      const defaultInputFocus = ref();
      defaultInputFocus.value?.focus();

      //初始化页面
      initPage();
    })

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
        const findSaleOutboundDto = new SaleOutboundFindDataDto();
        findSaleOutboundDto.outboundid = state.value.outboundid;
        findSaleOutboundDto.startDate = '';
        findSaleOutboundDto.endDate = '';
        const saleOutboundHeadList = await outboundService.find(findSaleOutboundDto);
        if (saleOutboundHeadList.length !== 1) {
          return Promise.reject(new VerifyParamError('单头数量异常,联系管理员!!'))
        }
        //读取单头
        outboundHead.value = new SaleOutboundUpdateDto(saleOutboundHeadList[0]);

        //读取明细
        const findMxDto = new SaleOutboundMxFindDto();
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

    // function unSelectWarehouse() {
    //   clearMx()
    // }

    //增加明细按钮
    function clickedAddOutboundMxButton() {
      if (outboundHead.value.clientid === 0) {
        return Promise.reject(new VerifyParamError('请先选择客户'))
      }

      // if (outboundHead.value.warehouseid === 0) {
      //   return Promise.reject(new VerifyParamError('请先选择仓库'))
      // }
      useErpSelectInventoryDialog({
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

    async function getSaleOutboundCreateDto() {
      outboundMxTableRef.value?.getGridApi().stopEditing();
      //获取明细
      const outboundMx = getOutboundMx()
      //组合单据对象
      return new SaleOutboundAndMxCreateDto()
          .setHead(outboundHead.value)
          .setOrderMx(outboundMx)
    }

    async function getSaleOutboundUpdateDto() {
      outboundMxTableRef.value?.getGridApi().stopEditing();
      //获取明细
      const outboundMx = getOutboundMx()
      //组合单据对象
      return new SaleOutboundAndMxUpdateDto()
          .setHead(outboundHead.value)
          .setOrderMx(outboundMx)
    }

    //保存按钮
    async function clickedSaveButton(): Promise<void> {

      //根据页面状态新增或修改
      if (state.value.outboundid === 0) {
        const saleOutboundAndMxCreateDto = await getSaleOutboundCreateDto();
        const result = await outboundService.create(saleOutboundAndMxCreateDto);
        state.value.outboundid = result.createResult!.id
      } else {
        const saleOutboundAndMxUpdateDto = await getSaleOutboundUpdateDto()
        await outboundService.update(saleOutboundAndMxUpdateDto);
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
        const outbound = await getSaleOutboundCreateDto();
        await useErpDialog({
          title: "提示",
          message: `是否保存并审核`
        })
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

      } else {
        const outbound = await getSaleOutboundCreateDto();
        const {outboundcode} = outbound;
        await useErpDialog({
          title: "提示",
          message: `是否审核,单号:${outboundcode}`,
        })
        await outboundService.updateAndL1Review(outbound);
        await clearMx();
        await initPage();
      }
    }

    //撤审出仓单按钮
    async function clickedUnL1Review() {
      const {outboundid, outboundcode} = outboundHead.value;
      await useErpDialog({
        title: "提示",
        message: `是否撤审,单号:${outboundcode}`,

      })
      await outboundService.unL1Review(outboundid);
      await clearMx();
      await initPage();
    }

    //审核出仓单按钮
    async function clickedL2Review() {
      const {outboundid, outboundcode} = outboundHead.value;
      await useErpDialog({
        title: "提示",
        message: `是否财审,单号:${outboundcode}`
      })
      await outboundService.l2Review(outboundid);
      await clearMx();
      await initPage();
    }

    //撤审出仓单按钮
    async function clickedUnL2Review() {
      const {outboundid, outboundcode} = outboundHead.value;
      await useErpDialog({
        title: "提示",
        message: `是否撤审财审,单号:${outboundcode}`
      })
      await outboundService.unL2Review(outboundid);
      await clearMx();
      await initPage();
    }

    async function clickedDeleteData() {
      const {outboundid, outboundcode} = outboundHead.value;
      await useErpDialog({
        title: "提示",
        message: `是否删除,单号:${outboundcode}`
      })

      await outboundService.delete_data(outboundid);
      //跳转
      tabMenu.closeTab(route.fullPath)
      const newRoute = router.resolve({
        name: "saleOutbound"
      });
      useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
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
    const outboundService = new SaleOutboundService();
    //销售单明细服务
    const outboundMxService = new SaleOutboundMxService();

    function clearMx() {
      outboundMxTableRef.value?.getGridApi().setRowData([])
    }

    function formatInventoryListToOutboundMx(inventories: IFindInventory[]): SaleOutboundMxCreateInTableDto[] {
      const addItems: SaleOutboundMxCreateInTableDto[] = [];
      inventories.forEach(inventory => {
        const saleOutboundMxCreateInTableDto = new SaleOutboundMxCreateInTableDto().selectInventory(inventory)
        addItems.push(saleOutboundMxCreateInTableDto);
      })
      return addItems;
    }

    //set mx table id
    function getRowNodeId(data: SaleOutboundMxCreateInTableDto) {
      return data.printid
    }

    //获取明细
    function getOutboundMx(): SaleOutboundMxCreateInTableDto[] {

      //printid 还没添加

      const outboundMxTableDataList: SaleOutboundMxCreateInTableDto[] = [];
      outboundMxTableRef.value?.getGridApi().forEachNode((rowNode) => {
        outboundMxTableDataList.push(rowNode.data);
      })
      return outboundMxTableDataList
    }

    let rowIdCount: number = 0;

    //增加明细
    function addOutboundMx(addItems: SaleOutboundMxCreateInTableDto[]) {
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

    let totalAmt = ref(0)
    function updateTableAmtTotal() {
      totalAmt.value = getOutboundMxSumAmt();
    }

    return {
      state,
      tabMenu,
      outboundMxTableRef,
      createOutboundMxTable,
      outboundHead,
      buttonShowState,
      totalAmt,
      cellValueChangedEvent,
      updateButtonState,
      selectedClientEvent,
      unSelectedClientEvent,
      // unSelectWarehouse,
      clickedAddOutboundMxButton,
      clickedDeleteOutboundMxButton,
      clickedSaveButton,
      clickedL1Review,
      clickedUnL1Review,
      clickedL2Review,
      clickedUnL2Review,
      clickedDeleteData,
      cellEditingStartedEvent,
      initPage,
      getRowNodeId,
    };
  },
});
</script>