<template>
 <erp-left-right-page-box>
   <template #left>
       <buy-area @clickedBuyAreaNode="clickedBuyAreaNode">
       </buy-area>
   </template>
   <template #right>
     <div class="flex flex-col h-full">
       <erp_title title="供应商管理">
         <template v-slot:input>
           <erp-is-use-select class="md:w-28" v-model="findBuyDto.useflag" @change="onSearchBuy"></erp-is-use-select>
           <erp_input_rounded class="md:w-52" v-model="findBuyDto.search"
                              @keyup.enter="onSearchBuy"
                              placeholder="输入供应商名称搜索">
           </erp_input_rounded>
         </template>
         <erp_button v-if="buttonShowState.create" @click="onClickedAddDialog">新增</erp_button>
         <erp_button v-if="buttonShowState.edit" @click="onClickedEditDialog">修改</erp_button>
         <erp_button v-if="buttonShowState.level1review" @click="onClickedLevel1Review" type="success">审核</erp_button>
         <erp_button v-if="buttonShowState.un_level1review" @click="onClickedUnLevel1Review" type="danger">撤审</erp_button>
         <erp_button v-if="buttonShowState.level2review" @click="onClickedLevel2Review" type="success">财务审核</erp_button>
         <erp_button v-if="buttonShowState.un_level2review" @click="onClickedUnLevel2Review" type="danger">财务撤审
         </erp_button>
         <erp_button v-if="buttonShowState.delete_data" @click="onClickedDelete" type="danger">删除</erp_button>
       </erp_title>

       <erp_table ref="buyTableRef"
                  :table-state="defaultBuyTableState"
                  :find-dto="findBuyDto"
                  :getRowNodeId="getRowNodeId"
                  @selection-changed="onSelectRow"
       ></erp_table>
     </div>
   </template>
 </erp-left-right-page-box>

  <add-buy-dialog
      v-if="isShowAddBuyDialog"
      :add-buy-dto="createBuyDto"
      @clickedConfirm="onClickedAdd"
      @clickedCancel="onClickedAddDialog"
  ></add-buy-dialog>

  <edit-buy-dialog
      v-if="isShowEditBuyDialog"
      :update-buy-dto="buyTableSelect"
      @clickedConfirm="onClickedEdit"
      @clickedCancel="onClickedEditDialog"
  ></edit-buy-dialog>
</template>

<script setup lang='ts'>
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import {onMounted, ref, watch} from "vue";
import type {ITableRef} from "@/components/table/type";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {SelectionChangedEvent} from "ag-grid-community";
import {getButtonState, IButtonState} from "@/composables/useInfoButtonState";
import ErpDialog from "@/components/dialog/dialog";
import {FindBuyDto, IFindBuyDto} from "@/module/buy/dto/findBuy.dto";
import {defaultBuyTableState} from "@/view/buy/tableConfig/defaultBuyTableState";
import {Buy, IBuy} from "@/module/buy/buy";
import {BuyService} from "@/module/buy/buy.service";
import {CreateBuyDto, ICreateBuyDto} from "@/module/buy/dto/createBuy.dto";
import AddBuyDialog from "@/view/buy/component/addBuyDialog.vue";
import EditBuyDialog from "@/view/buy/component/editBuyDialog.vue";
import {OperateareaService} from "@/module/operatearea/operatearea.service";
import ErpIsUseSelect from "@/components/select/ErpIsUseSelect.vue";
import ErpLeftRightPageBox from "@/components/page/ErpLeftRightPageBox.vue";
import BuyArea from "@/view/buyArea/buyArea.vue";
import {IBuyAreaTree} from "@/module/buyArea/buyArea";

//供应商表格组件ref
const buyTableRef = ref<ITableRef>();
onMounted(() => {
  buyTableRef.value?.initTableData();
})

//控制dialog显示
const isShowAddBuyDialog = ref(false);
const isShowEditBuyDialog = ref(false);

const buyTableSelect = ref<IBuy>(new Buy());//供应商表格选择的供应商资料

//表格行id设置
function getRowNodeId(data: IBuy) {
  return data.buyid;
}

const buttonShowState = ref<IButtonState>(getButtonState());

//观察供应商资料的选中
watch(buyTableSelect, (value) => {
  //根据选中供应商审核状态，更改按钮显示状态
  buttonShowState.value = getButtonState(value.level1review, value.level2review)
})

//根据供应商ID选中列表行
function buyIdSelectRow(id: number) {
  buyTableRef.value?.getGridApi().getRowNode("" + id)?.setSelected(true);
}

const createBuyDto = ref<ICreateBuyDto>(new CreateBuyDto());

//供应商资料搜索框回车事件
async function onSearchBuy() {
  await buyTableRef.value?.initTableData();
  buttonShowState.value = getButtonState();
}

async function clickedBuyAreaNode(buyArea: IBuyAreaTree){
  findBuyDto.value.buyareaid = buyArea.buyareaid;
  await onSearchBuy()
}

//供应商表格行点击事件
function onSelectRow(event: SelectionChangedEvent) {
  const selectRows = JSON.parse(JSON.stringify(event.api.getSelectedRows()));
  buyTableSelect.value = selectRows[0];
}

//显示新增供应商dialog
async function onClickedAddDialog() {
  await initCreateBuyDto();
  isShowAddBuyDialog.value = !isShowAddBuyDialog.value;
}

//显示编辑供应商dialog
function onClickedEditDialog() {
  isShowEditBuyDialog.value = !isShowEditBuyDialog.value;
}

async function initCreateBuyDto() {
  createBuyDto.value = new CreateBuyDto();
  const operateareaService = new OperateareaService();
  const operatearea = await operateareaService.findDefault({operateareatype: 1})
  createBuyDto.value.operateareaid = operatearea.operateareaid;
}


//查询供应商资料Dto
const findBuyDto = ref<IFindBuyDto>(new FindBuyDto());

//供应商资料服务
const buyService = new BuyService();

//点击新增按钮事件
async function onClickedAdd() {
  if (createBuyDto.value) {
    await buyService.create(createBuyDto.value);
    await buyTableRef.value?.initTableData();
    await initCreateBuyDto();
    isShowAddBuyDialog.value = !isShowAddBuyDialog.value;
  }
}

//点击修改按钮事件
async function onClickedEdit() {
  if (buyTableSelect.value.buyid) {
    await buyService.update(buyTableSelect.value);
    await buyTableRef.value?.initTableData();
    isShowEditBuyDialog.value = !isShowEditBuyDialog.value;
    buttonShowState.value = getButtonState();
  }
}

//点击审核按钮
async function onClickedLevel1Review() {
  if (buyTableSelect.value.buyid) {
    ErpDialog({
      title: "是否审核",
      message: `供应商编号:${buyTableSelect.value.buycode},供应商名称:${buyTableSelect.value.buyname}`,
      ok: async () => {
        const buyid = buyTableSelect.value.buyid;
        await buyService.level1Review(buyid);
        await buyTableRef.value?.initTableData();
        buyIdSelectRow(buyid);
      }
    })
  }
}

//点击撤审按钮
async function onClickedUnLevel1Review() {
  if (buyTableSelect.value.buyid) {
    ErpDialog({
      title: "是否撤审",
      message: `供应商编号:${buyTableSelect.value.buycode},供应商名称:${buyTableSelect.value.buyname}`,
      ok: async () => {
        const buyid = buyTableSelect.value.buyid;
        await buyService.unLevel1Review(buyid);
        await buyTableRef.value?.initTableData();
        buyIdSelectRow(buyid);
      }
    })
  }
}

//点击财务审核按钮
async function onClickedLevel2Review() {
  if (buyTableSelect.value.buyid) {
    ErpDialog({
      title: "是否财务审核",
      message: `供应商编号:${buyTableSelect.value.buycode},供应商名称:${buyTableSelect.value.buyname}`,
      ok: async () => {
        const buyid = buyTableSelect.value.buyid;
        await buyService.level2Review(buyid);
        await buyTableRef.value?.initTableData();
        buyIdSelectRow(buyid);
      }
    })
  }
}

//点击撤销财务审核按钮
async function onClickedUnLevel2Review() {
  if (buyTableSelect.value.buyid) {
    ErpDialog({
      title: "是否撤销财务审核",
      message: `供应商编号:${buyTableSelect.value.buycode},供应商名称:${buyTableSelect.value.buyname}`,
      ok: async () => {
        const buyid = buyTableSelect.value.buyid;
        await buyService.unLevel2Review(buyid);
        await buyTableRef.value?.initTableData();
        buyIdSelectRow(buyid);
      }
    })
  }
}

//点击删除按钮事件
async function onClickedDelete() {
  if (buyTableSelect.value.buyid) {
    ErpDialog({
      title: "是否删除",
      message: `供应商编号: ${buyTableSelect.value.buycode},供应商名称: ${buyTableSelect.value.buyname}`,
      ok: async () => {
        const buyid = buyTableSelect.value.buyid;
        await buyService.delete_data(buyid);
        await buyTableRef.value?.initTableData();
        buttonShowState.value = getButtonState();
      }
    })
  }
}
</script>