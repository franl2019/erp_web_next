<template>
  <test-component></test-component>
  <test-component></test-component>
  <test-component></test-component>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TestComponent from "@/view/test/testComponent.vue";


export default defineComponent({
  components: {TestComponent},
  setup() {

  }
})
</script>

