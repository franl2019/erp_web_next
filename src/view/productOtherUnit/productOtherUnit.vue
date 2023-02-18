<template>
  <erp-page-box>
    <erp-title title="辅助单位管理">
      <erp-button :disabled="!buttonShowState.create" type="info" @click="onShowCreateProductOtherUnitDialog">
        新增
      </erp-button>
      <erp-button :disabled="!buttonShowState.edit" type="success" @click="onShowUpdateProductOtherUnitDialog">
        修改
      </erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="onClickDeleteButton">删除</erp-button>
    </erp-title>

    <erp-table
        ref="productOtherUnitTableRef"
        :find-dto="productOtherUnitFindDto"
        :table-state="productOtherMxTableConfig"
        init
        @selection-changed="selectionChanged">
    </erp-table>
  </erp-page-box>

  <erp-form-dialog v-if="createDialogVisible" title="新增产品辅助属性"
                   @clicked-confirm="onClickCreateDialogDefineButton"
                   @clicked-cancel="onClickCreateDialogCancelButton">
    <erp-form>
      <erp-form-item name="辅助单位">
        <erp-input-round v-model="createDto.productOtherUnitName"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="默认转换率">
        <erp-input-round v-model="createDto.defaultConversionRate"></erp-input-round>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>

  <erp-form-dialog
      v-if="updateDialogVisible" title="修改产品辅助属性"
      @clicked-confirm="onClickUpdateDialogDefineButton"
      @clicked-cancel="onClickUpdateDialogCancelButton">
    <erp-form>
      <erp-form-item name="辅助单位">
        <erp-input-round v-model="updateDto.productOtherUnitName"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="默认转换率">
        <erp-input-round v-model="updateDto.defaultConversionRate"></erp-input-round>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {useButtonState} from "@/composables/useButtonState";
import {SelectionChangedEvent} from "ag-grid-community";
import {defineComponent, onMounted, ref} from "vue";
import {ProductOtherUnitFindDto} from "@/module/productOtherUnit/dto/productOtherUnitFind.dto";
import {productOtherMxTableConfig} from "@/view/productOtherUnit/tableConfig/productOtherMxTableConfig";
import {ProductOtherUnitCreateDto} from "@/module/productOtherUnit/dto/productOtherUnitCreate.dto";
import {ProductOtherUnitService} from "@/module/productOtherUnit/productOtherUnit.service";
import {ITableRef} from "@/components/table/type";
import {IProductOtherUnit} from "@/module/productOtherUnit/productOtherUnit";
import {ProductOtherUnitUpdateDto} from "@/module/productOtherUnit/dto/productOtherUnitUpdate.dto";
import {ProductOtherUnitDeleteDto} from "@/module/productOtherUnit/dto/productOtherUnitDelete.dto";
import useErpDialog from "@/components/dialog/useErpDialog";

export default defineComponent({
  components: {
    ErpTitle,
    ErpButton,
    ErpPageBox,
    ErpTable,
    ErpFormDialog,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
  },
  setup() {
    const {buttonShowState, updateButtonState} = useButtonState();
    const productOtherUnitSelect = ref<IProductOtherUnit>();
    const productOtherUnitTableRef = ref<ITableRef>();
    const productOtherUnitFindDto = ref(new ProductOtherUnitFindDto());
    const productOtherUnitService = new ProductOtherUnitService();

    onMounted(async () => {
      await productOtherUnitTableRef.value?.initTableData();
    });

    const createDto = ref(new ProductOtherUnitCreateDto());

    function initCreateDto() {
      createDto.value = new ProductOtherUnitCreateDto();
    }

    function selectionChanged(event: SelectionChangedEvent) {
      const selectNode = event.api.getSelectedRows()[0];
      productOtherUnitSelect.value = selectNode;
      updateDto.value = selectNode;
      updateButtonState(
          productOtherUnitSelect.value?.level1Review,
          productOtherUnitSelect.value?.level2Review
      );
    }

    const createDialogVisible = ref(false);

    function onShowCreateProductOtherUnitDialog() {
      createDialogVisible.value = true;
      initCreateDto();
    }

    async function onClickCreateDialogDefineButton() {
      await productOtherUnitService.create(createDto.value);
      await productOtherUnitTableRef.value?.initTableData();
      createDialogVisible.value = false;
      updateButtonState();
    }

    async function onClickCreateDialogCancelButton() {
      createDialogVisible.value = false;
    }

    const updateDialogVisible = ref(false);
    const updateDto = ref(new ProductOtherUnitUpdateDto());

    function onShowUpdateProductOtherUnitDialog() {
      updateDialogVisible.value = true;
    }

    async function onClickUpdateDialogDefineButton() {
      await productOtherUnitService.update(updateDto.value);
      await productOtherUnitTableRef.value?.initTableData();
      updateDialogVisible.value = false;
      updateButtonState();
    }

    async function onClickUpdateDialogCancelButton() {
      updateDialogVisible.value = false;
    }

    async function onClickDeleteButton() {
      if (!productOtherUnitSelect.value?.productOtherUnitId) {
        return Promise.reject(new Error("请先选中辅助单位"));
      }

      await useErpDialog({
        title: "提示",
        message: "是否删除辅助单位",
        ok: async () => {
          if (!productOtherUnitSelect.value?.productOtherUnitId) {
            return Promise.reject(new Error("请先选中辅助单位"));
          }
          const deleteDto = new ProductOtherUnitDeleteDto();
          deleteDto.productOtherUnitId =
              productOtherUnitSelect.value?.productOtherUnitId;
          await productOtherUnitService.delete_data(deleteDto);
          await productOtherUnitTableRef.value?.initTableData();
          updateButtonState();
        },
      });
    }

    return {
      createDto,
      updateDto,
      buttonShowState,
      productOtherUnitSelect,
      productOtherUnitFindDto,
      productOtherUnitService,
      productOtherUnitTableRef,
      productOtherMxTableConfig,
      createDialogVisible,
      updateDialogVisible,
      selectionChanged,
      onClickCreateDialogDefineButton,
      onClickCreateDialogCancelButton,
      onClickUpdateDialogDefineButton,
      onClickUpdateDialogCancelButton,
      onClickDeleteButton,
      onShowCreateProductOtherUnitDialog,
      onShowUpdateProductOtherUnitDialog,
    };
  },
});
</script>
