<template>
  <div class="card-text-item flex justify-between">
    <div>{{ content }}</div>
    <div class="text-red-400 font-bold">{{ count }}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name:"moduleCardItem",
  props: {
    content: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  }
});
</script>