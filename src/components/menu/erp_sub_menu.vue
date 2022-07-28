<template>
  <el-sub-menu
      v-if="props.menuItem.menuMx"
      :index="props.menuItem.path"
      :key="props.menuItem.menuId"
  >
    <template #title>
      <img class="inline-block h-6 w-auto" alt="menu_logo" :src="props.menuItem.style"/>
      <span class="text-base text-gray-800 font-semibold tracking-wider pl-2 mx-1.5" slot="title">{{ props.menuItem.title }}</span>
    </template>
    <erp_sub_menu
        v-for="submenu in props.menuItem.menuMx"
        :menuItem="submenu"
        :key="submenu.menuId"
    ></erp_sub_menu>
  </el-sub-menu>
  <el-menu-item class="flex items-center"  v-else :index="props.menuItem.path">
      <img class="inline-block h-6 w-auto" alt="menu_logo" :src="props.menuItem.style"/>
      <span class="text-base text-gray-800 font-semibold tracking-wider pl-2 mx-1.5" slot="title">{{ props.menuItem.title }}</span>
  </el-menu-item>
</template>

<script setup lang='ts'>
interface IMenuConfig {
  menuId: number,
  title: string,
  path: string,
  style?: string,
  menuMx?: IMenuConfig[]
}

const props = defineProps<{
  menuItem:IMenuConfig
}>()
</script>

<style lang='scss' scoped>

</style>

