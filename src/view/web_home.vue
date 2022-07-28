<template>
  <erp-loading></erp-loading>
  <div class="flex flex-col w-full h-full ">

    <div class="flex flex-none h-12 w-full pt-1.5 bg-gray-200">

      <div class="flex flex-col w-full h-full">

        <!--router tab-->
        <erp-router-tab
            @clickedMenuButton="showMenu"
            @clickedTabButton="onClickedTabButton"
            @clickedCloseButton="onClickedCloseButton"
        ></erp-router-tab>

      </div>

    </div>

    <div class="flex-grow flex w-full h-full">

      <menu2 v-show="isCollapse"></menu2>


      <div class="flex-grow h-full overflow-auto pb-3">
        <router-view v-slot="{ Component }">
          <erp-keep-alive @getKeepAliveTest="getKeepAliveTestCache">
            <component :is="Component"
                       :key="$route.fullPath"></component>
          </erp-keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ErpLoading from "@/components/loading/ErpLoading.vue";
import {ref} from "vue";
import Menu2 from "@/components/menu2/menu2.vue";
import {KeepAliveTestApi} from "@/components/ErpKeepAlive/ErpKeepAlive";
import {ErpKeepAlive} from "@/components/ErpKeepAlive/ErpKeepAlive";
import ErpRouterTab from "@/components/tab/erp_tab.vue";
import {useRouter} from "vue-router";
import {useRouterPage} from "@/utils";

const isCollapse = ref(true)

function showMenu() {
  isCollapse.value = !isCollapse.value
}


let keepAliveTestApi: KeepAliveTestApi;

function getKeepAliveTestCache(api: KeepAliveTestApi) {
  keepAliveTestApi = api;
}

const router = useRouter()

function onClickedTabButton(tabKey: string) {
  useRouterPage(tabKey,"")
}

async function onClickedCloseButton(tabKey: string, nextKey: string) {
  if (nextKey) {
    await useRouterPage(nextKey,"")
  }


  if (keepAliveTestApi) {
    console.log('deleteCache')
    keepAliveTestApi.deleteCache(tabKey);
  }
}
</script>