<template>
  <div v-if="activation" class="w-52 h-full flex flex-none items-center justify-between text-sm select-none">
    <div class="w-1.5 h-full bg-white">
      <div class="w-1.5 h-full bg-gray-200 rounded-br-md"></div>
    </div>
    <div class="flex-grow flex items-center h-full rounded-t-md bg-white active:bg-gray-100 px-2.5" @click.stop="emits('clickedTabButton',props.tabKey)" @click.middle.stop="()=>{if(showCloseButton)emits('clickedCloseButton',props.tabKey)}">
      <div class="flex-grow">{{title}}</div>
      <div v-show="showCloseButton" class="w-5 h-5 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200" @click.stop="emits('clickedCloseButton',props.tabKey)">
        <img alt="menu"
             class="h-3 w-3"
             src="@/assets/close_black_18dp.svg"/>
      </div>
    </div>
    <div class="w-2 h-full bg-white">
      <div class="w-2 h-full bg-gray-200 rounded-bl-md"></div>
    </div>
  </div>


  <div v-else class="w-52 h-full flex flex-none items-center justify-between text-sm select-none group">
    <div class="w-1.5 h-full bg-gray-200">
    </div>
    <div class="flex-grow flex items-center h-full rounded-t-md bg-gray-200 px-2.5 hover:bg-gray-100 active:bg-gray-50" @click.stop="emits('clickedTabButton',props.tabKey)" @click.middle.stop="()=>{if(showCloseButton)emits('clickedCloseButton',props.tabKey)}">
      <div class="flex-grow">{{title}}</div>
      <div v-show="showCloseButton" class="w-5 h-5 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200" @click.stop="emits('clickedCloseButton',props.tabKey)">
        <img alt="menu"
             class="h-3 w-3"
             src="@/assets/close_black_18dp.svg"/>
      </div>
    </div>
    <div class="w-2 h-full bg-gray-200 flex items-center">
      <div class="h-2/4 border-solid border-r border-gray-400 group-hover:border-gray-200"></div>
    </div>
  </div>

</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title?:string;
  activation?:boolean;
  showCloseButton?:boolean;
  tabKey?:string;
}>(),{
  title:"缺少标题",
  activation:false,
  showCloseButton:true,
  tabKey:""
})

const emits = defineEmits([
    'clickedTabButton',
    'clickedCloseButton'
])
</script>