<template>
  <button class="py-1 px-1 rounded-sm" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  name:"ErpSmallButton"
})
</script>