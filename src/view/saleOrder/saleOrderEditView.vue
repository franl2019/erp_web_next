<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button @click="onClickSaveButton">保存</erp-button>
      <erp-button :type="'danger'">删除</erp-button>
      <erp-delimiter/>
      <erp-button :type="'success'">审核</erp-button>
      <erp-button :type="'danger'">撤审</erp-button>
      <erp-button :type="'success'">财审</erp-button>
      <erp-button :type="'danger'">财务撤审</erp-button>
    </erp-no-title>
    <erp-form>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'客户'">
        <erp-select-client-input
            v-model:client-id="saleOrderDto.clientid"
            v-model:client-name="saleOrderDto.clientName"
            @change="onClientChange"
        />
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'订货日期'">
        <el-date-picker
            v-model="saleOrderDto.orderDate"
            placeholder="选择订货日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'出货日期'">
        <el-date-picker
            v-model="saleOrderDto.deliveryDate"
            placeholder="选择出货日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'结算方式'">
        <erp-input-round v-model="saleOrderDto.moneytype"></erp-input-round>
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'相关号码'">
        <erp-input-round v-model="saleOrderDto.relatednumber"></erp-input-round>
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'备注'">
        <erp-input-round v-model="saleOrderDto.remark1"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <erp-table
        ref="saleOrderMxTableRef"
        :find-dto="{}"
        :show-top-box="true"
        :table-state="editSaleOrderMxTable"
    >
      <template #topBox>
        <erp-button :size="'small'" type="info">增加明细</erp-button>
        <div class="w-2"></div>
        <erp-button :size="'small'" type="danger">删除明细</erp-button>
      </template>
    </erp-table>

    <erp-form>
      <erp-form-item lg-col="1" md-col="2" name="开单人">
        <erp-input-round v-model="saleOrderDto.creater" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="修改人">
        <erp-input-round v-model="saleOrderDto.updater" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="核单人">
        <erp-input-round v-model="saleOrderDto.level1Name" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="财审人">
        <erp-input-round v-model="saleOrderDto.level2Name" disabled></erp-input-round>
      </erp-form-item>
    </erp-form>
  </erp-page-box>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpSelectClientInput from "@/components/input/component/ErpSelectClientInput.vue";
import {ITableRef} from "@/components/table/type";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {editSaleOrderMxTable} from "@/view/saleOrder/tableConfig/editSaleOrderMxTable";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {useSaleOrderCreate} from "@/view/saleOrder/useSaleOrderCreate";

export default defineComponent({
  name: 'saleOrderEditView',
  components: {
    ErpDelimiter,
    ErpTable,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpSelectClientInput,
    ErpButton,
    ErpNoTitle,
    ErpPageBox
  },
  props: {},
  emits: [],
  setup() {
    const saleOrderMxTableRef = ref<ITableRef>();
    const {
      saleOrderCreateDto:saleOrderDto,
      onClickSaveButton,
      onClientChange
    } = useSaleOrderCreate(saleOrderMxTableRef);


    return {
      saleOrderDto,
      editSaleOrderMxTable,
      onClickSaveButton,
      onClientChange
    }
  }
})
</script>

<style scoped>

</style>