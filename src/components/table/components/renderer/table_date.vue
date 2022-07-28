<template>
  <div>{{ date }}</div>
</template>
<script setup lang='ts'>
import moment from 'moment'
import {ref} from "vue";

const props = defineProps<{
  params: any
}>();

const date = ref("")
if (props.params.value) {
  date.value = moment(props.params.value).format('YYYY-MM-DD HH:mm:ss')
} else {
  date.value = ""
}
</script>