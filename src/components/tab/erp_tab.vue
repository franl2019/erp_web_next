<template>
  <div class="flex flex-grow">
    <!--menu btn-->
    <div class="flex h-full items-center justify-center px-1 active:bg-gray-100 rounded-t-md bg-white">
      <erp_button_svg @click="emits('clickedMenuButton')">
        <img alt="menu"
             class="h-5 w-5"
             src="@/assets/menu_black_18dp.svg"/>
      </erp_button_svg>
    </div>

    <div class="flex flex-col w-full h-full">
      <!--拖动tab-->
      <draggable
          :list="props.modelValue"
          class="flex w-full h-full px-1 overflow-x-auto"
          handle=".handle"
          item-key="key"
          @end="onDragEndTab"
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
import Erp_menu_tab_item from "@/components/tab/erp_tab_item.vue";
import Erp_button_svg from "@/components/button/ErpSvgButton.vue";
import {defineProps} from "vue";
import {Tab} from "@/components/tab/useRouterTab";
import Draggable from "vuedraggable";

const props = withDefaults(
    defineProps<{
      modelValue: Tab[]
    }>(),
    {
      modelValue: () => []
    })

const emits = defineEmits([
  'clickedMenuButton',
])

function onDragEndTab(){

}
</script>