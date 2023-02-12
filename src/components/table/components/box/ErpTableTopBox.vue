<template>
  <div
      class="flex flex-row flex-none h-9 border-l justify-between
        border-r border-t border-solid
        items-center py-1.5 space-x-3"
      style="border-color:#bec4c7"
  >
    <slot name="default">
    </slot>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "ErpTableTopBox"
})
</script>

<style scoped>

</style>