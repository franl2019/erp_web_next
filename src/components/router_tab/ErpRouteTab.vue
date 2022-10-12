<template>
  <div class="flex flex-grow">
    <!--menu btn-->
    <div
        class="flex flex-none h-full items-center justify-center w-12 bg-zinc-50 rounded-tr-md select-none cursor-pointer">
      <div class="flex-none flex items-center
                  flex-row flex-nowrap select-none space-x-4" @click="showMenu">
        <img alt="menu" class="h-6 w-6" src="@/assets/menu_black_18dp.svg"/>
      </div>
    </div>


    <div class="flex flex-col w-full h-full">
      <!--拖动tab-->
      <draggable :list="modelValue" class="flex w-full h-full px-1 overflow-x-auto" drag-class="drag"
                 ghost-class="ghost" handle=".handle" item-key="key">
        <template #item="{ element }">
          <div class="handle">
            <erp-route-tab-item :tab="element" v-bind="$attrs"></erp-route-tab-item>
          </div>
        </template>
      </draggable>

    </div>

  </div>

</template>

<script lang="ts">
import ErpRouteTabItem from "@/components/router_tab/ErpRouteTabItem.vue";
import {Tab} from "@/components/router_tab/useRouterTab";
import Draggable from "vuedraggable";
import {defineComponent, PropType, ref} from "vue";

export default defineComponent({
  name: "ErpTab",
  components: {
    ErpRouteTabItem,
    Draggable
  },
  props: {
    modelValue: {
      type: Array as PropType<Tab[]>,
      required: true,
      default: () => [],
    },
  },
  emits: [
    'clickedMenuButton',
  ],
  setup(_props, {emit: emits}) {

    const isShowMenu = ref(true);

    function showMenu() {
      emits('clickedMenuButton');
      isShowMenu.value = !isShowMenu.value
    }

    return {
      isShowMenu,
      showMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.ghost {
  @apply border-2 border-solid border-indigo-400 rounded
}

.drag {
  @apply opacity-0
}
</style>