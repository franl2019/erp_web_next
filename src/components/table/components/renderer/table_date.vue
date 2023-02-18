<template>
  <div>{{ date }}</div>
</template>
<script lang='ts'>
import moment from 'moment'
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "TableDate",
  props:["params"],
  setup(props) {
    const date = ref("")
    if (props.params.value) {
      date.value = moment(props.params.value).format('YYYY-MM-DD HH:mm:ss')
    } else {
      date.value = ""
    }
    return {
      date,
    };
  },
});
</script>