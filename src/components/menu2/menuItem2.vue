<template>
  <div class="flex flex-none items-center w-full h-14 hover:bg-blue-50 select-none px-2"
       @click="routerPath(menuItem.path)">
    <img class="inline-block h-6 w-auto mx-3" alt="menu_logo" :src="menuItem.style"/>
    <span class="font-bold mx-1">
      {{ menuItem.title }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useRouterPage} from "@/utils";

interface IMenuConfig {
  title: string,
  path: string,
  style?: string
}

const props = defineProps<{
  menuItem: IMenuConfig
}>()

const router = useRouter();

function routerPath(path: string) {
  const route = router.resolve({
    name:path
  })

  useRouterPage(route.fullPath,route.meta.title as string)
}
</script>