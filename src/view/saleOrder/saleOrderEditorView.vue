<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button :disabled="!buttonState.save" @click="onClickSaveButton">保存</erp-button>
      <erp-button :disabled="!buttonState.delete_data" :type="'danger'" @click="onClickDeleteButton">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonState.level1review" :type="'success'" @click="onClickL1ReviewButton">审核
      </erp-button>
      <erp-button :disabled="!buttonState.un_level1review" :type="'danger'" @click="onClickUnL1ReviewButton">撤审
      </erp-button>
      <erp-button :disabled="!buttonState.level2review" :type="'success'" @click="onClickL2ReviewButton">财审
      </erp-button>
      <erp-button :disabled="!buttonState.un_level2review" :type="'danger'" @click="onClickUnL2ReviewButton">财务撤审
      </erp-button>
      <erp-button :disabled="!buttonState.stopReview" :type="'success'" @click="onClickStopReviewButton">关闭订单
      </erp-button>
      <erp-button :disabled="!buttonState.unStopReview" :type="'danger'" @click="onClickUnStopReviewButton">取消关闭
      </erp-button>
    </erp-no-title>
    <erp-form>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'客户'">
        <erp-select-client-input
            v-model:client-id="saleOrderDto.clientid"
            v-model:client-name="saleOrderDto.clientname"
            :disabled="!buttonState.save"
            @change="onClientChange"
        />
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'订货日期'">
        <el-date-picker
            v-model="saleOrderDto.orderDate"
            :disabled="!buttonState.save"
            placeholder="选择订货日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'出货日期'">
        <el-date-picker
            v-model="saleOrderDto.deliveryDate"
            :disabled="!buttonState.save"
            placeholder="选择出货日期"
            type="date"
            value-format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'结算方式'">
        <erp-input-round v-model="saleOrderDto.moneytype" :disabled="!buttonState.save"></erp-input-round>
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'相关号码'">
        <erp-input-round v-model="saleOrderDto.relatednumber" :disabled="!buttonState.save"></erp-input-round>
      </erp-form-item>
      <erp-form-item :lg-col="'1'" :md-col="'2'" :name="'备注'">
        <erp-input-round v-model="saleOrderDto.remark1" :disabled="!buttonState.save"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <erp-table
        ref="saleOrderMxTableRef"
        :getRowStyle="getRowStyle"
        :table-edit="buttonState.save"
        :table-state="editSaleOrderMxTable"
        @cellValueChanged="onAddSaleOrderMxChanged"
    >

      <template #topBox>
        <erp-button
            :disabled="!buttonState.save"
            :size="'small'"
            type="info"
            @click="onClickAddSaleOrderMxButton">增加明细
        </erp-button>
        <div class="w-2"></div>
        <erp-button
            :disabled="!buttonState.save"
            :size="'small'"
            type="danger"
            @click="onClickDeleteMx"
        >删除明细
        </erp-button>
        <div class="w-2"></div>
        <erp-button
            :disabled="!buttonState.un_level2review"
            :size="'small'"
            type="danger"
            @click="onClickStopMx"
        >终止明细
        </erp-button>
        <div class="w-2"></div>
        <erp-button
            :disabled="!isEditPage"
            :size="'small'"
            type="danger"
            @click="onClickLineClose"
        >整行关闭
        </erp-button>
      </template>
      <template #bottomBox>
        <span>
          合计金额 : {{ saleOrderDto.amt }}
        </span>
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
import {defineComponent, onMounted, ref} from 'vue'
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpSelectClientInput from "@/components/input/component/ErpSelectClientInput.vue";
import {ITableRef} from "@/components/table/type";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {editSaleOrderMxTable,getRowStyle} from "@/view/saleOrder/tableConfig/editSaleOrderMxTable";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {useRoute} from "vue-router";
import {useSaleOrderEditor} from "@/view/saleOrder/hock/saleOrderEditor/useSaleOrderEditor";

export default defineComponent({
  name: 'saleOrderEditorView',
  components: {
    ErpForm,
    ErpTable,
    ErpButton,
    ErpNoTitle,
    ErpPageBox,
    ErpFormItem,
    ErpDelimiter,
    ErpInputRound,
    ErpSelectClientInput
  },
  setup() {
    const saleOrderMxTableRef = ref<ITableRef>();
    const route = useRoute();
    const isEditPage = ref(Boolean(route.name === "editSaleOrder"));
    const saleOrderId = Number(route.query.saleOrderId) || 0;

    const {
      saleOrderDto,
      buttonState,
      loadSaleOrder,
      onClickSaveButton,
      onClickL1ReviewButton,
      onClickUnL1ReviewButton,
      onClickL2ReviewButton,
      onClickUnL2ReviewButton,
      onClickDeleteButton,
      onClientChange,
      onAddSaleOrderMxChanged,

      //useTableMx
      onClickAddSaleOrderMxButton,
      onClickDeleteMx,
      onClickLineClose,
      onClickStopMx,
      onClickStopReviewButton,
      onClickUnStopReviewButton
    } = useSaleOrderEditor(isEditPage.value)(saleOrderMxTableRef)

    onMounted(async () => {
      await loadSaleOrder(saleOrderId);
    })

    return {
      isEditPage,
      saleOrderDto,
      buttonState,
      editSaleOrderMxTable,
      saleOrderMxTableRef,
      onClickSaveButton,
      onClickL1ReviewButton,
      onClickUnL1ReviewButton,
      onClickL2ReviewButton,
      onClickUnL2ReviewButton,
      onClickDeleteButton,
      onClientChange,
      onAddSaleOrderMxChanged,
      onClickAddSaleOrderMxButton,
      onClickDeleteMx,
      onClickLineClose,
      onClickStopMx,
      onClickStopReviewButton,
      onClickUnStopReviewButton,
      getRowStyle
    }
  }
})
</script>

<style scoped>

</style>