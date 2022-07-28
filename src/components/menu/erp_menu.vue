<template>
  <div class="flex flex-col">
    <div class="overflow-y-auto">
      <el-menu
          class="border-none"
          :collapse-transition="false"
          router
      >
        <erp_sub_menu
            v-for="submenu in menuConfig"
            :menuItem="submenu"
            :key="submenu.menuId"
        ></erp_sub_menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Erp_sub_menu from "@/components/menu/erp_sub_menu.vue";
import menuConfig from "@/config/menu";
</script>