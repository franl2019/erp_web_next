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

    <div class="flex flex-col w-full h-full overflow-x-auto">
      <div class="flex w-full h-full px-1">
        <erp_menu_tab_item
            v-for="(value,key) in tabMenu.getTabMap().value"
            :title="value[1].title"
            :activation="value[1].activation"
            :show-close-button="value[1].showCloseButton"
            :tab-key="value[0]"
            :key="key"
            @clickedTabButton="onClickedTabButton"
            @clickedCloseButton="onClickedCloseButton"
        >
        </erp_menu_tab_item>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import Erp_menu_tab_item from "@/components/tab/erp_tab_item.vue";
import Erp_button_svg from "@/components/button/ErpSvgButton.vue";
import {tabMenu} from "@/components/tab/useRouterTab";

const emits = defineEmits([
  'clickedMenuButton',
  'clickedTabButton',
  'clickedCloseButton'
])


function onClickedCloseButton(tabKey: string) {
  const nestKey = tabMenu.deleteTab(tabKey)
  emits("clickedCloseButton", tabKey, nestKey)

}

function onClickedTabButton(tabKey: string) {
  tabMenu.activationTab(tabKey)
  emits('clickedTabButton', tabKey)
}
</script>