<template>
  <div
      class="flex flex-none flex-col my-2 items-start w-full bg-white md:flex-row md:items-center md:space-y-0"
  >
    <div class="flex flex-wrap w-full justify-center md:justify-end md:flex-nowrap">
      <div class="flex flex-col md:justify-between w-full md:flex-row md:items-center md:flex-wrap">
        <div class="flex flex-wrap flex-none space-x-1.5 mb-1 md:items-center">
          <slot></slot>
        </div>
        <div class="input-box flex flex-col items-center mb-1 md:flex-wrap md:flex-row md:items-center">
          <slot name="input"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>

</script>

<style lang="scss" scoped>
:deep(.input-box > *) {
  @apply mr-1 mb-1 md:mb-0
}
</style>