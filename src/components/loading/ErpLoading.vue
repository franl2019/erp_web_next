<template>
  <div v-if="isLoading" class="absolute flex h-screen w-full items-center justify-center  z-50  select-none"
       @click.stop.prevent
       @keyup.enter.stop>
    <erp_loading_svg></erp_loading_svg>
  </div>
</template>

<script setup lang="ts">
import Erp_loading_svg from "@/components/loading/ErpLoadingSvg.vue";
import {isLoading} from "@/components/loading/loading";
</script>