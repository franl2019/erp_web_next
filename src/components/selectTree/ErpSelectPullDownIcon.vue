<template>
  <div class="absolute top-0 w-full h-full cursor-pointer flex justify-end items-center px-2"
       @click.stop="onClickInput">
    <img :class="popoverVisible?`rotate-180`:``" alt="btn"
         class="h-5 w-5 select-none rotate-0" src="@/assets/expand_more_black_24dp.svg">
  </div>
</template>
<script lang="ts">
export default {
  name: 'ErpSelectPullDownIcon',
  props: {
    onClickInput: {},
    popoverVisible: {}
  }
}
</script>