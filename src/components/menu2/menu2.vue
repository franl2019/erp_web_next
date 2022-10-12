<template>
  <div class="absolute sm:relative flex flex-col w-full h-full z-20 bg-white sm:w-64 border-r border-gray-200 border-solid">
    <div class="flex flex-none items-center px-3 py-1.5 border-b border-solid">
      <img alt="logo" class="h-10 w-10 p-1.5" src="@/assets/logo.svg">
      <span class="text-sm font-bold space-x-2">Enterprise Resource Planning 企业资源计划</span>
    </div>
    <div class="flex-grow h-0 overflow-y-scroll">
      <menu-item2 v-for="item in menuConfig" :menu-item="item"></menu-item2>
    </div>
  </div>
</template>

<script lang="ts">
import MenuItem2 from "@/components/menu2/menuItem2.vue";
import menuConfig from "@/config/menu";
import {defineComponent} from "vue";

export default defineComponent({
  name: "Menu2",
  components: {
    MenuItem2,
  },
  setup() {
    return {
      menuConfig,
    };
  },
});
</script>