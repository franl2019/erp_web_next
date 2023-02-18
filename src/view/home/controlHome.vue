<template>
  <erp-page-box-row>
    <div class="flex flex-none flex-col items-start flex-grow pt-3 overflow-auto">
      <div class="font-bold text-xl mb-2">首页</div>
    </div>
  </erp-page-box-row>
</template>

<script lang="ts">
import ErpPageBoxRow from "@/components/page/ErpPageBoxRow.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "controlHome",
  components: {
    ErpPageBoxRow
  },
  setup() {
    return {};
  },
});
</script>