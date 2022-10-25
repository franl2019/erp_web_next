<template>
  <div class="h-36 w-60 flex-none shadow-md border border-solid border-gray-300 p-3 hover:shadow-xl">
    <div class="mb-1 flex items-end justify-between">
      <div class="text-xl font-bold">{{ title }}</div>
      <div class="text-sm text-gray-900 cursor-pointer">查看</div>
    </div>
    <div class="bg-black w-full my-1" style="height: 2px"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name:"moduleCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  }
});
</script>