<template>
  <div class="flex flex-col flex-none justify-center items-center
                    text-center text-sm font-bold leading-5
                    border-b border-solid border-gray-300
                    hover:bg-gray-100 active:bg-gray-200
                    w-full py-1.5 select-none"
  >
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'ErpTableOptionTabBar'
})
</script>

<style scoped>

</style>