<template>
  <div class="flex items-center justify-center">
    <div v-if="params.value" class="font-bold text-green-500">已审</div>
    <div v-else class="font-bold text-red-600">未审</div>
  </div>
</template>

<script lang='ts'>import {defineComponent} from 'vue';

export default defineComponent({
  name: "TableFlag",
  props: ["params"],
  setup() {
    return {}
  },
});
</script>