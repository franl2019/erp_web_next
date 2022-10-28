<template>
  <div class="flex flex-col flex-none items-center
                  border-r border-y border-solid
                  w-6"
       style="border-color:#bec4c7">
    <slot name="default"></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErpTableOptionTab'
})
</script>

<style scoped>

</style>