<template>
  <erp-full-screen-dialog
      title="选择供应商"
      @clicked-confirm="clickedOkSelectedDialog"
      @clicked-cancel="clickedCloseSelectedDialog"
  >
    <template v-slot:left>
      <div class="flex flex-col h-full pr-4">
        <erp-title title="地区">
        </erp-title>
        <div class="overflow-y-auto">
          <erp-buy-area-tree @node-click="categoryTreeClicked"></erp-buy-area-tree>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <erp-title>
        <template #input>
          <erp-input-round v-model="findBuyDto.search"
                           class="md:w-52"
                           placeholder="输入关键词"
                           @change="onSearchChange"></erp-input-round>
        </template>
      </erp-title>
      <erp-table ref="buyTableRef"
                 :find-dto="findBuyDto"
                 :getRowId="getRowNodeId"
                 :table-state="selectBuyTableState"
                 @rowDoubleClicked="onBuyTableDoubleClick"
      ></erp-table>
    </template>
  </erp-full-screen-dialog>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref} from "vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {ITableRef} from "@/components/table/type";
import ErpTable from "@/components/table/ErpTable.vue";
import { GetRowIdParams, RowDoubleClickedEvent } from "ag-grid-community";
import {FindBuyDto, IFindBuyDto} from "@/module/buy/dto/findBuy.dto";
import {IBuyArea} from "@/module/buyArea/buyArea";
import {selectBuyTableState} from "@/view/buy/tableConfig/selectBuyTableState";
import {IBuy} from "@/module/buy/buy";
import ErpBuyAreaTree from "@/components/tree/component/ErpBuyAreaTree.vue";
import ErpFullScreenDialog from "@/components/dialog/ErpFullScreenDialog.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import {IFindInventory} from "@/module/inventory/FindInventory";

export default defineComponent({
  name: 'ErpSelectBuyDialog',
  components: {
    ErpButton,
    ErpTable,
    ErpTitle,
    ErpBuyAreaTree,
    ErpInputRound,
    ErpFullScreenDialog,
    ErpNoTitle
  },
  props: {
    resolve_dialog: {
      type: Function as PropType<(value: any) => IFindInventory[] | undefined>,
      required: true,
    },
    reject_dialog: {
      type: Function as PropType<(reason?: any) => void>,
      required: true,
    },
    unmount: {
      type: Function,
      required: true,
      default: () => {
      }
    }
  },
  setup(props) {
    const buyTableRef = ref<ITableRef>()
    const findBuyDto = ref<IFindBuyDto>(new FindBuyDto());

    //表格行id设置
    function getRowNodeId(params: GetRowIdParams<IBuy>) : string{
      return String(params.data.buyid)
    }

    onMounted(async () => {
      await buyTableRef.value?.initTableData();
    })

    //类别树点击事件
    async function categoryTreeClicked(buyarea: IBuyArea) {
      findBuyDto.value.buyareaid = buyarea.buyareaid;
      await buyTableRef.value?.initTableData();
    }

    //搜索栏
    async function onSearchChange() {
      await buyTableRef.value?.initTableData();
    }

    //产品资料表行双击
    function onBuyTableDoubleClick(event: RowDoubleClickedEvent) {
      if (event.data) {
        props.resolve_dialog(event.data);
        props.unmount();
      }
    }

    async function clickedOkSelectedDialog() {
      await props.resolve_dialog(getSelectedBuyInfo());
      props.unmount();
    }

    async function clickedCloseSelectedDialog() {
      await props.reject_dialog();
      props.unmount();
    }

    function getSelectedBuyInfo(): IBuy {
      return buyTableRef.value?.getGridApi().getSelectedRows()[0];
    }

    return {
      buyTableRef,
      findBuyDto,
      selectBuyTableState,
      getRowNodeId,
      categoryTreeClicked,
      clickedOkSelectedDialog,
      clickedCloseSelectedDialog,
      onBuyTableDoubleClick,
      onSearchChange,
    }
  }
})

</script>