<template>
  <div class="absolute top-0 left-0 z-30 h-full w-full">
    <div class="relative p-10 h-full w-full">
      <div class="flex bg-white rounded-md border-solid border shadow-md pt-2 pb-2 px-2 h-full w-full">
        <!--left-->
        <div v-show="props.leftMenu && isShowLeft"
             class="flex-col flex-none absolute sm:relative bg-white top-0 sm:left-0 z-30 w-full sm:w-64 h-full pl-2">
          <slot name="left"></slot>
        </div>
        <div class="w-6 h-full flex flex-none items-start z-40 sm:z-0 mr-2 border-l border-solid" @click="switchLeftBoxVisible">
          <div class="py-2 border-t border-r border-b border-solid flex flex-col items-center justify-center cursor-pointer">
            <div v-show="!isShowLeft" class="text-center font-bold text-sm select-none">筛选</div>
            <div v-show="isShowLeft" class="text-center font-bold text-sm select-none">收起</div>
            <img v-show="!isShowLeft" class="h-5 w-5"
                 src="@/assets/keyboard_double_arrow_right_black_18dp.svg"
                 alt="menu"/>
            <img v-show="isShowLeft" class="h-5 w-5"
                 src="@/assets/keyboard_double_arrow_left_black_18dp.svg"
                 alt="menu"/>
          </div>
        </div>
        <!--right-->
        <div class="flex-shrink w-5/6 flex flex-col h-full w-full">
          <slot></slot>
        </div>
      </div>
    </div>

  </div>
  <div class="absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-black opacity-50 z-10" @click.stop.prevent
       @keyup.enter.stop>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";

const props = withDefaults(defineProps<{
  leftMenu?: boolean
}>(), {
  leftMenu: true
})

const isShowLeft: Ref<boolean> = ref(true);

function switchLeftBoxVisible() {
  isShowLeft.value = !isShowLeft.value;
}
</script>