<template>
  <div v-if="isLoading" class="absolute flex h-screen w-full items-center justify-center  z-50  select-none"
    @click.stop.prevent @keyup.enter.stop>
    <erp-loading-svg></erp-loading-svg>
  </div>
</template>

<script lang="ts">
import ErpLoadingSvg from "@/components/loading/ErpLoadingSvg.vue";
import { isLoading } from "@/components/loading/loading";
import { defineComponent } from "vue";

export default defineComponent({
  name:"ErpLoading",
  components:{
    ErpLoadingSvg
  },
  setup() {
    return {
      isLoading,
    };
  },
});
</script>