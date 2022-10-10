<template>
  <div class="flex flex-grow">
    <!--menu btn-->
    <div class="flex flex-none h-full items-center justify-center w-12 bg-zinc-50 rounded-tr-md select-none cursor-pointer">
      <div class="flex-none flex items-center
                  flex-row flex-nowrap select-none space-x-4"
           @click="showMenu">
        <img alt="menu"
             class="h-6 w-6"
             src="@/assets/menu_black_18dp.svg"/>
      </div>
    </div>


    <div class="flex flex-col w-full h-full">
      <!--拖动tab-->
      <draggable
          :list="props.modelValue"
          class="flex w-full h-full px-1 overflow-x-auto"
          ghost-class="ghost"
          drag-class="drag"
          handle=".handle"
          item-key="key"
      >
        <template #item="{ element }">
          <div class="handle">
            <erp_menu_tab_item
                :tab="element"
                v-bind="$attrs"
            ></erp_menu_tab_item>
          </div>
        </template>
      </draggable>

    </div>

  </div>

</template>

<script lang="ts" setup>
import Erp_menu_tab_item from "@/components/router_tab/erp_tab_item.vue";
import {Tab} from "@/components/router_tab/useRouterTab";
import Draggable from "vuedraggable";
import {ref} from "vue";

const props = withDefaults(
    defineProps<{
      modelValue: Tab[]
    }>(),
    {
      modelValue: () => []
    })

const isShowMenu = ref(true);
const emits = defineEmits([
  'clickedMenuButton',
])

function showMenu() {
  emits('clickedMenuButton');
  isShowMenu.value = !isShowMenu.value
}
</script>

<style lang="scss" scoped>
.ghost {
  @apply border-2 border-solid border-indigo-400 rounded
}

.drag {
  @apply opacity-0
}
</style>