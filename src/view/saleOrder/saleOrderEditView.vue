<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button>保存</erp-button>
    </erp-no-title>
    <erp-form>
      <erp-form-item :name="'客户'" :md-col="'2'" :lg-col="'1'">
        <erp-select-client-input
          v-model:client-id="saleOrderCreateDto.clientid"
          v-model:client-name="saleOrderCreateDto.clientName"
          @change="onClientChange"
        />
      </erp-form-item>
      <erp-form-item :name="'订货日期'" :md-col="'2'" :lg-col="'1'">
        <el-date-picker
            v-model="saleOrderCreateDto.orderDate"
            placeholder="选择订货日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </erp-form-item>
      <erp-form-item :name="'出货日期'" :md-col="'2'" :lg-col="'1'">
        <el-date-picker
            v-model="saleOrderCreateDto.deliveryDate"
            placeholder="选择出货日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </erp-form-item>
      <erp-form-item :name="'结算方式'" :md-col="'2'" :lg-col="'1'">
        <erp-input-round v-model="saleOrderCreateDto.moneytype"></erp-input-round>
      </erp-form-item>
      <erp-form-item :name="'相关号码'" :md-col="'2'" :lg-col="'1'">
        <erp-input-round v-model="saleOrderCreateDto.relatednumber"></erp-input-round>
      </erp-form-item>
      <erp-form-item :name="'备注'" :md-col="'2'" :lg-col="'1'">
      </erp-form-item>



    </erp-form>

    <erp-table
        ref=""
    ></erp-table>
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
import {useSaleOrderEditView} from "@/view/saleOrder/useSaleOrderEdit";
import {ITableRef} from "@/components/table/type";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";

export default defineComponent({
  name: 'saleOrderEditView',
  components: {ErpTable, ErpInputRound, ErpSelectClientInput, ErpFormItem, ErpForm, ErpButton, ErpNoTitle, ErpPageBox},
  props: {},
  emits: [],
  setup() {
    const saleOrderMxTableRef = ref<ITableRef>();
    const {
      saleOrderCreateDto,
      onClickSaveButton,
      onClientChange
    } = useSaleOrderEditView(saleOrderMxTableRef);

    return {
      saleOrderCreateDto,
      onClickSaveButton,
      onClientChange
    }
  }
})
</script>

<style scoped>

</style>