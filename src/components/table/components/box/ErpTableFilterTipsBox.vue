<template>
  <div
      class="h-9 border-l
        border-r border-t border-solid
        flex
        items-center
        px-2"
      style="border-color:#bec4c7"
  >
      <slot name="default">
      </slot>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "ErpTableFilterTipsBox"
})
</script>

<style scoped>

</style>