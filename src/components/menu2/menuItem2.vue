<template>
  <div class="flex flex-none items-center w-full h-14 hover:bg-blue-50 select-none px-2"
    @click="routerPath(menuItem.path)">
    <img class="inline-block h-6 w-auto mx-3" alt="menu_logo" :src="menuItem.style" />
    <span class="font-bold mx-1">
      {{ menuItem.title }}
    </span>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { useRouterPage } from "@/utils";
import { IMenuConfig } from "@/config/menu";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name:"MenuItem2",
  props: {
    menuItem: {
      type: Object as PropType<IMenuConfig>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    function routerPath(path: string) {
      const route = router.resolve({
        name: path
      })
      useRouterPage(route.fullPath, route.meta.title as string)
    }

    return {
      props,
      routerPath,
    };
  },
});
</script>