<template>

  <!--激活tab-->
  <div v-if="tab.activation" class="w-52 h-full flex flex-none items-center justify-between text-sm select-none">
    <div class="w-1.5 h-full bg-zinc-50">
      <div class="w-1.5 h-full bg-gray-200 rounded-br-md"></div>
    </div>
    <div class="flex-grow flex items-center h-full rounded-t-md bg-zinc-50 active:bg-gray-100 px-2.5"
         @click.stop="clickedTabButton" @click.middle.stop="clickedCloseButton">
      <div class="flex-grow">{{ tab.title }}</div>
      <div v-show="tab.showCloseButton"
           class="w-5 h-5 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200"
           @click.stop="clickedCloseButton">
        <img alt="menu" class="h-3 w-3" src="@/assets/close_black_18dp.svg"/>
      </div>
    </div>
    <div class="w-2 h-full bg-zinc-50">
      <div class="w-2 h-full bg-gray-200 rounded-bl-md"></div>
    </div>
  </div>

  <!--停用tab-->
  <div v-else class="w-52 h-full flex flex-none items-center justify-between text-sm select-none group">
    <div class="w-1.5 h-full bg-gray-200">
    </div>
    <div class="flex-grow flex items-center h-full rounded-t-md bg-gray-200 px-2.5 hover:bg-gray-100 active:bg-gray-50"
         @click.stop="clickedTabButton" @click.middle.stop="clickedCloseButton">
      <div class="flex-grow">{{ tab.title }}</div>
      <div v-show="tab.showCloseButton"
           class="w-5 h-5 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200"
           @click.stop="clickedCloseButton">
        <img alt="menu" class="h-3 w-3" src="@/assets/close_black_18dp.svg"/>
      </div>
    </div>
    <div class="w-2 h-full bg-gray-200 flex items-center">
      <div class="h-2/4 border-solid border-r border-gray-400 group-hover:border-gray-200"></div>
    </div>
  </div>

</template>

<script lang="ts">
import {Tab, tabMenu} from "@/components/router_tab/useRouterTab";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "ErpRouteTabItem",
  props: {
    tab: {
      type: Object as PropType<Tab>,
      required: true,
    },
  },
  emits: [
    'clickedTabButton',
    'clickedCloseButton'
  ],
  setup(props, {emit: emits}) {
    function clickedTabButton() {
      tabMenu.activationTab(props.tab.key);
      emits('clickedTabButton', props.tab.key);
    }

    function clickedCloseButton() {
      if (props.tab.showCloseButton) {
        const nextTab = tabMenu.closeTab(props.tab.key);
        emits('clickedCloseButton', props.tab.key, nextTab?.key);
      }
    }

    return {
      tabMenu,
      clickedTabButton,
      clickedCloseButton,
    };
  },
});
</script>