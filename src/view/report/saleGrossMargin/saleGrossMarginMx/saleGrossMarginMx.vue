<template>
  <erp-page-box>
    <erp-no-title>
      <el-date-picker
          v-model="findDate"
          end-placeholder="结束日期"
          range-separator="-"
          start-placeholder="开始日期"
          type="daterange"
          unlink-panels
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="initPage"
      ></el-date-picker>
      <erp-select-client-input
          v-model:client-id="findDto.clientid"
          v-model:client-name="findDto.clientname"
          :un-select-sure="false"
          @unSelect="unselectClient"
      >
      </erp-select-client-input>
      <erp-pop-over-button
          @close="clickedFilterCloseBtn"
          @ok="clickedFilterOkBtn"
          @reset="clickedFilterResetBtn"
      >
        <template #default>筛选</template>
        <template #form>
          <erp-form>
            <erp-form-item name="单据编号">
              <erp-input-round v-model="findDto.outboundcode"></erp-input-round>
            </erp-form-item>
            <erp-form-item :name="valueName.product+'名称'">
              <erp-input-round
                  v-model="findDto.productname"
                  :placeholder="'输入'+valueName.product+'名称'"
                  @change="onChangRefresh"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="操作区域">
              <erp-operate-area-auth-select
                  v-model="operateAreaId"
                  :have-root-node="true"
                  @change="onChangRefresh"
              ></erp-operate-area-auth-select>
            </erp-form-item>
            <erp-form-item name="仓库">
              <erp-warehouse-auth-select-have-root
                  v-model="warehouseid"
                  @change="onChangRefresh"></erp-warehouse-auth-select-have-root>
            </erp-form-item>
            <erp-form-item :name="valueName.product+'编号'">
              <erp-input-round v-model="findDto.productcode"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="单位">
              <erp-input-round v-model="findDto.unit"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="规格">
              <erp-input-round v-model="findDto.spec"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="用料">
              <erp-input-round v-model="findDto.materials"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="订做规格">
              <erp-input-round v-model="findDto.spec_d"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="现用料">
              <erp-input-round v-model="findDto.materials_d"></erp-input-round>
            </erp-form-item>
          </erp-form>
        </template>
      </erp-pop-over-button>
      <erp-button @click="initPage">刷新</erp-button>
    </erp-no-title>

    <erp-table
        ref="saleGrossMarginMxRef"
        :find-dto="findDto"
        :table-state="defaultSaleGrossMarginMxReportTableConfig"
        init
        @cellDoubleClicked="cellDoubleClicked"
    >
    </erp-table>
  </erp-page-box>
</template>

<script lang='ts'>
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpPopOverButton from "@/components/button/ErpPopOverButton.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {valueName} from "@/config/valueName";
import {SaleGrossMarginMxFindDto} from "@/module/report/saleGrossMarginReport/dto/saleGrossMarginMxFind.dto";
import {defineComponent, onMounted, ref} from "vue";
import {
  defaultSaleGrossMarginMxReportTableConfig
} from "@/view/report/saleGrossMargin/saleGrossMarginMx/config/defaultSaleGrossMarginMxReportTableConfig";
import {ITableRef} from "@/components/table/type";
import {useDateSelect} from "@/composables/useDateSelect";
import {useRouter} from "vue-router";
import {CellDoubleClickedEvent} from "ag-grid-community";
import {useRouterReportToSheet} from "@/utils";
import {CodeType} from "@/types/CodeType";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {useOperateAreaSelect} from "@/composables/useOperateAreaSelect";
import ErpSelectClientInput from "@/components/input/component/ErpSelectClientInput.vue";

export default defineComponent({
  name: "SaleGrossMarginMxReportView",
  components: {
    ErpSelectClientInput,
    ErpPageBox,
    ErpNoTitle,
    ErpTable,
    ErpForm,
    ErpButton,
    ErpFormItem,
    ErpInputRound,
    ErpPopOverButton,
    ErpOperateAreaAuthSelect,
    ErpWarehouseAuthSelectHaveRoot,
  },
  setup() {
    const findDto = ref(new SaleGrossMarginMxFindDto());
    const {findDate} = useDateSelect(findDto);
    const {warehouseid} = useWarehouseSelect(findDto);
    const {operateAreaId} = useOperateAreaSelect(findDto)
    const saleGrossMarginMxRef = ref<ITableRef>();


    onMounted(async () => {
      await initPage()
    })

    async function initPage() {
      await saleGrossMarginMxRef.value?.initTableData()
    }

    function unselectClient() {
      initPage();
    }

    async function onChangRefresh() {
      await saleGrossMarginMxRef.value?.initTableData()
    }

    async function clickedFilterOkBtn() {
      await initPage()
    }

    async function clickedFilterCloseBtn() {
      await initPage()
    }

    async function clickedFilterResetBtn() {
//重置查询参数
      for (let valueKey in findDto.value) {
        (findDto.value as any)[valueKey] = (new SaleGrossMarginMxFindDto() as any)[valueKey]
      }
      await initPage()
    }

    const router = useRouter();

    function cellDoubleClicked(event: CellDoubleClickedEvent) {
      useRouterReportToSheet(router, {
        correlationCode: event.data.outboundcode, correlationId: event.data.outboundid, correlationType: CodeType.XS
      })
    }

    return {
      valueName,
      defaultSaleGrossMarginMxReportTableConfig,
      findDto,
      findDate,
      warehouseid,
      operateAreaId,
      saleGrossMarginMxRef,
      initPage,
      unselectClient,
      onChangRefresh,
      clickedFilterOkBtn,
      clickedFilterCloseBtn,
      clickedFilterResetBtn,
      cellDoubleClicked,
    };
  },
});
</script>

<style lang='scss' scoped>

</style>