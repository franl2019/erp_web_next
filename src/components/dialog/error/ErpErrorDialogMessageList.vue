<template>
  <div class="max-h-48 overflow-scroll">
    <p v-for="(message,index) in messageList"
       :key="index"
       class="mt-1 text-lg">
      {{ `${index + 1} - ${message}` }}
    </p>
  </div>
</template>
<script lang="ts">
import {PropType} from "vue";

export default {
  name: 'ErpErrorDialogMessageList',
  props: {
    messageList: {
      type: Array as PropType<Array<string>>,
      default: () => []
    }
  }
}
</script>