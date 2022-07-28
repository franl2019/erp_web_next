<template>
  <div
      class="flex-col flex-none overflow-y-auto sm:h-auto w-full overflow-x-hidden sm:w-64 border-b md:border-b-0 border-r border-solid border-gray-300 absolute sm:relative z-20 sm:z-0">

    <div class="flex flex-col w-full md:w-64 h-full bg-white overflow-y-auto">
      <div class="flex items-center px-3 py-1.5 border-b border-solid">
        <img class="h-10 w-10 p-1.5" src="@/assets/logo.svg" alt="logo">
        <span class="text-sm font-bold space-x-2">Enterprise Resource Planning 企业资源计划</span>
      </div>
      <menu-item2 v-for="item in menuConfig" :menu-item="item"></menu-item2>
    </div>


  </div>

</template>

<script lang="ts" setup>
import MenuItem2 from "@/components/menu2/menuItem2.vue";
import menuConfig from "@/config/menu";</script>