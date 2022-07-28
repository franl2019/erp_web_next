<template>
  <el-popover placement="bottom-end" :width="300" transition="" v-model:visible="visible" trigger="click">
    <template #reference>
      <erp-button id="filterButton" @click="clickedBtn">
        <div class="w-5 h-5 relative mt-0.5">
          <img class="absolute -left-1 top-0" src="@/assets/filter_alt_black_18dp.svg" alt="filter">
        </div>
        <div class="text-black font-bold">
          <slot></slot>
        </div>
      </erp-button>
    </template>
    <div class="flex px-2 py-1 border-b border-solid border-gray-300">
      <div class="flex flex-grow items-center justify-end">
        <erp-small-button class="text-red-400" @click="reset">重置</erp-small-button>
        <erp-small-button @click="ok">确定</erp-small-button>
      </div>
    </div>
    <div class="max-h-64 px-2 overflow-y-auto">
      <slot name="form">
        <!--插槽-->
      </slot>
    </div>


  </el-popover>
</template>

<script lang="ts" setup>
import ErpButton from "@/components/button/ErpButton.vue";
import {ref} from "vue";
import ErpSmallButton from "@/components/button/ErpSmallButton.vue";

const visible = ref<boolean>(false);
const isFilter = ref<boolean>(false);
const emits = defineEmits(['ok','reset','open','close'])

function ok() {
  visible.value = false;
  isFilter.value = true;
  emits('ok');
}

function reset() {
  visible.value = false;
  emits('reset')
}

function clickedBtn(){
  if(visible.value){
    visible.value = false;
    emits('close')
  }else{
    visible.value = true;
    emits('open')
  }
}

</script>