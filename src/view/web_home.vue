<template>
  <erp-loading></erp-loading>
  <div class="flex flex-col w-full flex-grow">
    <div class="flex flex-col flex-none h-14 w-full pt-1.5 bg-gray-200">
      <div class="flex flex-col w-full h-full">
        <!--router tab-->
        <erp-router-tab v-model="tabMenu.getTabMap().value" @clickedCloseButton="onClickedCloseButton"
                        @clickedMenuButton="showMenu"
                        @clickedTabButton="onClickedTabButton"></erp-router-tab>
      </div>
      <div class="h-2 bg-zinc-50 border-b border-solid border-gray-200">
      </div>
    </div>

    <div class="flex-grow flex flex-row w-full">
      <menu2 v-show="isCollapse"></menu2>
      <div class="flex-grow h-full overflow-auto">
        <router-view v-slot="{ Component }">
          <erp-keep-alive @getKeepAliveTest="getKeepAliveTestCache">
            <component :is="Component" :key="$route.fullPath"></component>
          </erp-keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import ErpLoading from "@/components/loading/ErpLoading.vue";
import Menu2 from "@/components/menu2/menu2.vue";
import ErpRouterTab from "@/components/router_tab/ErpRouteTab.vue";
import {defineComponent, onMounted, ref} from "vue";
import {ErpKeepAlive, KeepAliveTestApi} from "@/components/erpKeepAlive/ErpKeepAlive";
import {useRouterPage} from "@/utils";
import {tabMenu} from "@/components/router_tab/useRouterTab";

export default defineComponent({
  name: "WebHomeView",
  components: {
    ErpLoading,
    Menu2,
    ErpRouterTab,
    ErpKeepAlive
  },
  setup() {
    const isCollapse = ref(true)

    function showMenu() {
      isCollapse.value = !isCollapse.value
    }


    let keepAliveTestApi: KeepAliveTestApi;

    function getKeepAliveTestCache(api: KeepAliveTestApi) {
      keepAliveTestApi = api;
    }

    function onClickedTabButton(tabKey: string) {
      useRouterPage(tabKey, "")
    }

    async function onClickedCloseButton(tabKey: string, nextKey: string) {
      if (nextKey) {
        await useRouterPage(nextKey, "")
      }
    }

    onMounted(() => {
      tabMenu.setKeepAliveTestApi(keepAliveTestApi);
    })
    return {
      tabMenu,
      isCollapse,
      showMenu,
      getKeepAliveTestCache,
      onClickedTabButton,
      onClickedCloseButton,
    };
  },
});
</script>