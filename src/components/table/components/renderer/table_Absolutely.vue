<template>
  <div>{{ value }}</div>
</template>
<script setup lang='ts'>
import {ref} from "vue";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";

const props = defineProps<{
  params: any
}>();

const value = ref<string>("");
value.value = toFixed2(Number(props.params.value) * 100)
</script>