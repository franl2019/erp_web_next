<template>
  <div>{{count}}</div>
  <button @click="test">+</button>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useTestComponent} from "@/view/test/useTestComponent";

export default defineComponent({
  name:"testComponent",
  setup(){

    const {count,test} = useTestComponent();

    return{
      count,
      test
    }
  }
})
</script>

<style scoped>

</style>