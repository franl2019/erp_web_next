<template>
  <div class="flex rounded-md shadow-sm" v-show="!props.disabled">
    <input type="text"
           class="flex-1 z-10 focus:ring-indigo-500 focus:border-indigo-500  block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
           placeholder=""
           :value="props.clientname ? props.clientname :'请选择客户'"
           disabled>
    <button
        v-if="props.clientname.length===0"
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
      取消选择
    </button>
  </div>
  <erp-input-round v-show="props.disabled" v-model="props.clientname" disabled></erp-input-round>
</template>

<script setup lang='ts'>
import ErpSelectClientDialog from "@/components/dialog/selectInfo/selectClient/SelectClientDialog";
import {IClient} from "@/module/client/client";
import ErpDialog from "@/components/dialog/dialog";
import ErpInputRound from "@/components/input/ErpInputRound.vue";

const props = withDefaults(defineProps<{
  clientname?: string;
  disabled?: boolean;
  unSelectSure?:boolean
}>(), {
  clientname: "",
  disabled: false,
  unSelectSure:true
})

const emits = defineEmits(["select", "unSelect"]);

function clickedSelect() {
  ErpSelectClientDialog({
    ok: (client: IClient) => {
      emits('select', client);
    }
  })
}

function clickedUnSelect() {
  if(props.unSelectSure){
    ErpDialog({
      title: "注意",
      message: "取消选择客户将会清空单据明细！",
      ok: () => {
        emits('unSelect');
      }
    })
  }else{
    emits('unSelect');
  }
}
</script>