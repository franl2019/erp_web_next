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
      <erp-select-client-btn
          :clientname="findDto.clientname"
          :un-select-sure="false"
          @select="selectClient"
          @unSelect="unselectClient"
      >
      </erp-select-client-btn>
      <erp-pop-over-button
          @close="clickedFilterCloseBtn"
          @ok="clickedFilterOkBtn"
          @reset="clickedFilterResetBtn"
      >
        <template #default>筛选</template>
        <template #form>
          <erp-form>
            <erp-form-item :name="valueName.product+'名称'">
              <erp-input-round v-model="findDto.productname" :placeholder="'输入'+valueName.product+'名称'"
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
        init
        ref="saleGrossMarginSumRef"
        :find-dto="findDto"
        :table-state="defaultSaleGrossMarginSumReportTableConfig"
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
import ErpSelectClientBtn from "@/components/button/ErpSelectClientBtn.vue";
import {valueName} from "@/config/valueName";
import {
  defaultSaleGrossMarginSumReportTableConfig
} from "@/view/report/saleGrossMargin/saleGrossMarginSum/config/defaultSaleGrossMarginSumReportTableConfig";
import {defineComponent, onMounted, ref} from "vue";
import {SaleGrossMarginSumFindDto} from "@/module/report/saleGrossMarginReport/dto/saleGrossMarginSumFind.dto";
import {useDateSelect} from "@/composables/useDateSelect";
import {ITableRef} from "@/components/table/type";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {useOperateAreaSelect} from "@/composables/useOperateAreaSelect";
import {IClient} from "@/module/client/client";

export default defineComponent({
  name: "saleGrossMarginSumReportView",
  components: {
    ErpForm,
    ErpTable,
    ErpButton,
    ErpPageBox,
    ErpNoTitle,
    ErpFormItem,
    ErpInputRound,
    ErpPopOverButton,
    ErpSelectClientBtn,
    ErpOperateAreaAuthSelect,
    ErpWarehouseAuthSelectHaveRoot,
  },
  setup() {
    const findDto = ref(new SaleGrossMarginSumFindDto());
    const {findDate} = useDateSelect(findDto);
    const {warehouseid} = useWarehouseSelect(findDto);
    const {operateAreaId} = useOperateAreaSelect(findDto);

    const saleGrossMarginSumRef = ref<ITableRef>();

    onMounted(async () => {
      await initPage()
    })

    async function initPage() {
      await saleGrossMarginSumRef.value?.initTableData();
    }

    function selectClient(client: IClient) {
      findDto.value.clientid = client.clientid;
      findDto.value.clientname = client.clientname;
      initPage();
    }

    function unselectClient() {
      findDto.value.clientid = 0;
      findDto.value.clientname = '';
      initPage();
    }

    async function onChangRefresh() {
      await initPage();
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
        (findDto.value as any)[valueKey] = (new SaleGrossMarginSumFindDto() as any)[valueKey]
      }
      await initPage()
    }

    return {
      valueName,
      findDto,
      findDate,
      warehouseid,
      operateAreaId,
      saleGrossMarginSumRef,
      defaultSaleGrossMarginSumReportTableConfig,
      initPage,
      selectClient,
      unselectClient,
      onChangRefresh,
      clickedFilterOkBtn,
      clickedFilterCloseBtn,
      clickedFilterResetBtn,
    };
  },
});
</script>

<style lang='scss' scoped>

</style>