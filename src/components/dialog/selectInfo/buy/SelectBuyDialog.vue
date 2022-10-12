<template>
  <erp-left-right-structure-dialog>
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
      <erp-no-title title="请选择供应商">
        <template #input>
          <erp-input-round v-model="a"
                           class="md:w-52"
                           placeholder="输入关键词"
                           @change="onSearchChange"></erp-input-round>
          <erp-button @click="clickedCloseSelectedDialog">关闭</erp-button>
        </template>
        <erp-button type="success" @click="clickedOkSelectedDialog">确定选择</erp-button>

      </erp-no-title>
      <erp-table ref="buyTableRef"
                 :find-dto="findBuyDto"
                 :getRowNodeId="getRowNodeId"
                 :table-state="selectBuyTableState"
                 @rowDoubleClicked="onBuyTableDoubleClick"
      ></erp-table>
    </template>
  </erp-left-right-structure-dialog>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, unref} from "vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {ITableRef} from "@/components/table/type";
import ErpTable from "@/components/table/ErpTable.vue";
import {RowDoubleClickedEvent} from "ag-grid-community";
import {FindBuyDto, IFindBuyDto} from "@/module/buy/dto/findBuy.dto";
import {IBuyArea} from "@/module/buyArea/buyArea";
import {selectBuyTableState} from "@/view/buy/tableConfig/selectBuyTableState";
import {IBuy} from "@/module/buy/buy";
import ErpBuyAreaTree from "@/components/tree/aboutComponent/ErpBuyAreaTree.vue";
import ErpLeftRightStructureDialog from "@/components/dialog/ErpLeftRightLayoutDialog.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";

export default defineComponent({
  name: 'SelectBuyDialog',
  components: {
    ErpButton,
    ErpTable,
    ErpTitle,
    ErpBuyAreaTree,
    ErpInputRound,
    ErpLeftRightStructureDialog,
    ErpNoTitle
  },
  props: {
    unmount: {
      type: Function,
      required: true,
      default: () => {
      }
    },
    ok: {
      type: Function,
      default: () => {
      }
    },
    close: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(props) {
    const {ok, close, unmount} = unref(props)
    const buyTableRef = ref<ITableRef>()
    const findBuyDto = ref<IFindBuyDto>(new FindBuyDto());
    const a = ref("")
    //表格行id设置
    function getRowNodeId(data: IBuy) {
      return data.buyid
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
    async function onBuyTableDoubleClick(event: RowDoubleClickedEvent) {
      if (event.data) {
        await ok(event.data);
        unmount();
      }
    }

    async function clickedOkSelectedDialog() {
      await ok(getSelectedBuyInfo());
      unmount();
    }

    async function clickedCloseSelectedDialog() {
      await close();
      unmount();
    }

    function getSelectedBuyInfo(): IBuy {
      return buyTableRef.value?.getGridApi().getSelectedRows()[0];
    }

    return {
      a,
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