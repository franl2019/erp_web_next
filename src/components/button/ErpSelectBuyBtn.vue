<template>
  <div class="flex rounded-md shadow-sm">
    <input v-show="!props.disabled" :value="props.buyname ? props.buyname:'请选择供应商'"
           class="flex-1 z-10 focus:ring-indigo-500 focus:border-indigo-500  block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
           disabled
           placeholder=""
           type="text">

    <input v-show="props.disabled" :value="props.buyname ? props.buyname:'请选择供应商'"
           class="flex-1 z-10 focus:ring-indigo-500 focus:border-indigo-500  block w-full rounded-none rounded sm:text-sm border-gray-300"
           style="background-color: #F5F7FA;color: #A8ABB2"
           disabled
           placeholder=""
           type="text">
    <template v-if="!props.disabled">
      <button
          v-if="props.buyname.length===0"
          class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm active:bg-gray-100 focus:outline-none"
          @click="clickedSelect"
      >
        选择
      </button>
      <button
          v-else
          class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-red-500 text-white text-sm active:bg-red-600 focus:outline-none"
          @click="clickedUnSelect"
      >
        取消
      </button>
    </template>
  </div>
</template>

<script lang='ts' setup>
import ErpSelectBuyDialog from "@/components/dialog/selectInfo/selectBuy/SelectBuyDialog";
import {IBuy} from "@/module/buy/buy";
import ErpDialog from "@/components/dialog/dialog";

const props = withDefaults(defineProps<{
  buyname?: string,
  disabled?: boolean,
  unSelectSure?:boolean
}>(), {
  buyname: "",
  disabled: false,
  unSelectSure:true
})


const emits = defineEmits(["select", "unSelect"]);

function clickedSelect() {
  ErpSelectBuyDialog({
    ok: (buy: IBuy) => {
      emits('select', buy);
    }
  })
}

function clickedUnSelect() {
 if(props.unSelectSure){
   ErpDialog({
     title: "注意",
     message: "取消选择供应商将会清空单据明细",
     ok: () => {
       emits('unSelect');
     }
   })
 }else{
   emits('unSelect');
 }
}
</script>