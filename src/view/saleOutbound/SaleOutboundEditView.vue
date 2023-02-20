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
      <erp-form-item lg-col="1" md-col="2" name="客户*">
        <erp-select-client-input
            v-model:client-id="outboundHead.clientid"
            v-model:client-name="outboundHead.clientname"
            v-model:operateareaid="outboundHead.operateareaid"
            :disabled="!state.edit"
            @change="unSelectedClientEvent"
        />
      </erp-form-item>
      <!--      <erp-form-item name="仓库" lg-col="1" md-col="2">-->
      <!--        <erp-warehouse-auth-select v-model="outboundHead.warehouseid" :disabled="!state.edit"-->
      <!--                                   @change="unSelectWarehouse"></erp-warehouse-auth-select>-->
      <!--      </erp-form-item>-->
      <erp-form-item lg-col="1" md-col="2" name="操作区域*">
        <erp-operate-area-auth-select v-model="outboundHead.operateareaid"
                                      :disabled="!state.edit"></erp-operate-area-auth-select>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="出仓日期*">
        <el-date-picker
            v-model="outboundHead.outdate"
            :disabled="!state.edit"
            placeholder="选择出仓日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="交货日期">
        <el-date-picker
            v-model="outboundHead.deliveryDate"
            :disabled="!state.edit"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="相关号码">
        <erp-input-round
            v-model="outboundHead.relatednumber"
            :disabled="!state.edit">
        </erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="结算方式">
        <erp-input-round v-model="outboundHead.moneytype" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="备注">
        <erp-input-round v-model="outboundHead.remark1" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <erp-table
        ref="outboundMxTableRef"
        :find-dto="{}"
        :getRowNodeId="getRowNodeId"
        :table-edit="state.edit"
        :table-state="createOutboundMxTable"
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
      <template #bottomBox>
        <span>
          合计金额 : {{ totalAmt }}
        </span>
      </template>
    </erp-table>

    <erp-form>
      <erp-form-item lg-col="1" md-col="2" name="开单人">
        <erp-input-round v-model="outboundHead.creater" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="修改人">
        <erp-input-round v-model="outboundHead.updater" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="审核人">
        <erp-input-round v-model="outboundHead.level1name" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="财务审核人">
        <erp-input-round v-model="outboundHead.level2name" disabled></erp-input-round>
      </erp-form-item>
    </erp-form>

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
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {defineComponent, onMounted, ref} from "vue";
import {createOutboundMxTable} from "@/view/saleOutbound/tableConfig/createOutboundMxTable";
import {ITableRef} from "@/components/table/type";
import {useRoute, useRouter} from "vue-router";
import {useButtonState} from "@/composables/useButtonState";
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
import ErpSelectClientInput from "@/components/input/component/ErpSelectClientInput.vue";

export default defineComponent({
  name: "SaleOutboundEditView",
  components: {
    ErpSelectClientInput,
    ErpOperateAreaAuthSelect,
    ErpPageBox,
    ErpButton,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpTable,
    ErpWarehouseAuthSelect,
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
      outboundcode: String(route.query.outboundcode || '')
    })

    const {buttonShowState, updateButtonState} = useButtonState({l1ReviewDefault: true});

    onMounted(() => {
      const defaultInputFocus = ref();
      defaultInputFocus.value?.focus();
      //初始化页面
      initPage();
    })

    function isNewCreatePage() {
      return route.name === 'newOutbound'
    }

    function isEditPage() {
      return route.name === 'editOutbound'
    }

    //初始页面，根据state.outboundid 0新增 !0编辑
    async function initPage(): Promise<void> {
      if (isNewCreatePage()) {
        state.value.edit = true;
      }

      if (isEditPage()) {
        if (state.value.outboundcode.length === 0) {
          await useErpDialog({
            message: "查询单号失败",
            closeBtnVisible: false
          })
          routeToSaleOutboundSelectPage();
        }
        //查询单头
        const findSaleOutboundDto = new SaleOutboundFindDataDto().clearQueryDateRange();
        findSaleOutboundDto.outboundcode = state.value.outboundcode;
        const saleOutboundHead = await outboundService.findOne(findSaleOutboundDto);
        //读取单头
        outboundHead.value = new SaleOutboundUpdateDto(saleOutboundHead);

        //读取明细
        const findMxDto = new SaleOutboundMxFindDto();
        findMxDto.outboundid = outboundHead.value.outboundid;
        const outboundMxList = await outboundMxService.find(findMxDto);
        addOutboundMx(outboundMxList);

        //判断是否可以编辑
        state.value.edit = outboundHead.value.level1review === 0 && outboundHead.value.level2review === 0;

        //更新按钮状态
        updateButtonState(outboundHead.value.level1review, outboundHead.value.level2review);

        //更新金额合计数
        updateTableAmtTotal()
      }
    }

    //Event 事件


    //取消选择客户
    function unSelectedClientEvent() {
      clearMx()
    }

    //增加明细按钮
    async function clickedAddOutboundMxButton() {
      if (outboundHead.value.clientid === 0) {
        return Promise.reject(new VerifyParamError('请先选择客户'))
      }

      const inventories = await useErpSelectInventoryDialog({
        clientid: outboundHead.value.clientid,
        warehouseid: outboundHead.value.warehouseid
      })

      const outboundMx = formatInventoryListToOutboundMx(inventories);
      addOutboundMx(outboundMx);
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

    function routeToEditPage() {
      tabMenu.closeTab(route.fullPath)
      const newRoute = router.resolve({
        name: "editOutbound", query: {
          outboundcode: state.value.outboundcode
        }
      });
      useRouterPage(newRoute.fullPath, state.value.outboundcode);
    }

    function routeToSaleOutboundSelectPage() {
      tabMenu.closeTab(route.fullPath)
      const newRoute = router.resolve({
        name: "saleOutbound"
      });
      useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
    }

    //保存按钮
    async function clickedSaveButton(): Promise<void> {
      if (isNewCreatePage()) {
        const saleOutboundAndMxCreateDto = await getSaleOutboundCreateDto();
        const result = await outboundService.create(saleOutboundAndMxCreateDto);
        state.value.outboundcode = result.createResult!.code;
      } else {
        const saleOutboundAndMxUpdateDto = await getSaleOutboundUpdateDto()
        await outboundService.update(saleOutboundAndMxUpdateDto);
      }

      routeToEditPage();

    }

    //审核出仓单按钮
    async function clickedL1Review() {

      //区分新增的审核还是编辑的审核
      if (isNewCreatePage()) {
        const outbound = await getSaleOutboundCreateDto();
        await useErpDialog({
          title: "提示",
          message: `是否保存并审核`
        })
        const result = await outboundService.create_l1Review(outbound);
        state.value.outboundcode = result.createResult!.code

        routeToEditPage();

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
      routeToSaleOutboundSelectPage();
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

      const theLastOne = addItems[addItems.length - 1];
      outboundMxTableRef.value?.getGridApi().getRowNode(theLastOne.printid + "")?.setSelected(true);
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
      unSelectedClientEvent,
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