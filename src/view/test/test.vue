<template>
  <erp-button @click="test">测试</erp-button>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import ErpButton from "@/components/button/ErpButton.vue";
import useErpDialog from "@/components/dialog/useErpDialog";


export default defineComponent({
  components: {ErpButton},
  setup() {
    onMounted(() => {
    })

    async function test() {

      await useErpDialog({
        message: "ss"
      })

      console.log('后续')

    }

    return {
      test
    }
  }
})
</script>

