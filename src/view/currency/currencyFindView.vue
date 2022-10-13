<template>
  <erp-page-box>
    <erp-title title="币种查询">
      <erp-button @click="clickedCreateBtn">新增</erp-button>
      <erp-button type="success" @click="clickedEditBtn">修改</erp-button>
      <erp-button type="danger" @click="clickedDeleteBtn">删除</erp-button>
    </erp-title>
    <erp-table
        ref="currencyTableRef"
        :find-dto="{}"
        :table-state="defaultCurrencyTableConfig">
    </erp-table>
  </erp-page-box>

  <CurrencyCreateDialog
      v-if="currencyCreateDialogVisible"
      :dto="currencyCreateDto" title="新增币种"
      @clickedCancel="clickedCreateDialogCancelBtn"
      @clickedConfirm="clickedCreateDialogConfirmBtn">
  </CurrencyCreateDialog>

  <CurrencyEditDialog
      v-if="currencyEditDialogVisible"
      :dto="currencyEditDto"
      title="编辑币种"
      @clickedCancel="clickedEditDialogCancelBtn"
      @clickedConfirm="clickedEditDialogConfirmBtn">
  </CurrencyEditDialog>

</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import CurrencyCreateDialog from "@/view/currency/components/currencyEditDialog.vue";
import CurrencyEditDialog from "@/view/currency/components/currencyEditDialog.vue";
import {defaultCurrencyTableConfig} from "@/view/currency/config/defaultCurrencyTableConfig";
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {CurrencyEditDto} from "@/module/currency/dto/currencyEdit.dto";
import {CurrencyCreateDto} from "@/module/currency/dto/currencyCreate.dto";
import {ICurrency} from "@/module/currency/currency";
import useErpDialog from "@/components/dialog/useErpDialog";
import {CurrencyService} from "@/module/currency/currency.service";
import {VerifyParamError} from "@/types/error/verifyParamError";

export default defineComponent({
  name: "CurrencyFindView",
  components: {
    ErpTitle,
    ErpButton,
    ErpTable,
    ErpPageBox,
    CurrencyCreateDialog,
    CurrencyEditDialog
  },
  setup() {
    const currencyTableRef = ref<ITableRef>();
    const currencyCreateDialogVisible = ref<boolean>(false);
    const currencyEditDialogVisible = ref<boolean>(false);

    const currencyCreateDto = ref<ICurrency>(new CurrencyCreateDto());
    const currencyEditDto = ref<ICurrency>(new CurrencyEditDto({
      createdAt: null,
      creater: "",
      currencyid: 0,
      currencyname: "",
      del_uuid: 0,
      deletedAt: null,
      deleter: "",
      standardmoneyflag: 0,
      updatedAt: null,
      updater: ""
    }));

    const currencyService = new CurrencyService();
    onMounted(async () => {
      await initTableData();
    })

    function clickedCreateBtn() {
      currencyCreateDto.value = new CurrencyCreateDto();
      currencyCreateDialogVisible.value = true;
    }

    async function clickedEditBtn() {
      const currency = await getTableSelected();
      currencyEditDto.value = new CurrencyEditDto(currency);
      currencyEditDialogVisible.value = true;
    }

    async function clickedDeleteBtn() {
      const currency = await getTableSelected();
      useErpDialog({
        title: "提示",
        message: `是否删除${currency.currencyname}`,
        ok: async () => {
          await currencyService.delete_data(currency.currencyid);
          await initTableData();
        }
      })
    }

    async function clickedCreateDialogConfirmBtn() {
      await currencyService.create(currencyCreateDto.value);
      currencyCreateDialogVisible.value = false;
      await initTableData();
    }

    //关闭
    function clickedCreateDialogCancelBtn() {
      currencyCreateDialogVisible.value = false;
    }

    async function clickedEditDialogConfirmBtn() {
      await currencyService.update(currencyEditDto.value);
      currencyEditDialogVisible.value = false;
      await initTableData();
    }

    //关闭
    function clickedEditDialogCancelBtn() {
      currencyEditDialogVisible.value = false;
    }


    async function initTableData() {
      await currencyTableRef.value?.initTableData();
    }

    async function getTableSelected(): Promise<ICurrency> {
      const currency = await currencyTableRef.value?.getGridApi().getSelectedRows()[0];
      if (currency && currency.currencyid) {
        return currency as ICurrency
      } else {
        return Promise.reject(new VerifyParamError('请选择币种再操作'));
      }
    }

    return {
      currencyCreateDto,
      currencyEditDto,
      defaultCurrencyTableConfig,
      currencyTableRef,
      currencyCreateDialogVisible,
      currencyEditDialogVisible,
      clickedCreateBtn,
      clickedEditBtn,
      clickedDeleteBtn,
      clickedCreateDialogConfirmBtn,
      clickedCreateDialogCancelBtn,
      clickedEditDialogConfirmBtn,
      clickedEditDialogCancelBtn,
      initTableData,
    };
  },
});
</script>
