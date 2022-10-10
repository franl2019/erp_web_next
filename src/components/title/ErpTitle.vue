<template>
  <div
      class="flex flex-none flex-col items-start w-full z-10 bg-white md:flex-row md:items-center md:space-y-0 mb-1"
  >
    <div v-if="title" class="flex-none text-lg font-bold sm:mr-4 text-center sm:text-left w-full sm:w-auto">
      {{ props.title }}
    </div>
    <div class="flex flex-wrap w-full justify-center md:justify-end md:flex-nowrap">
      <div class="flex flex-col-reverse w-full md:flex-row md:items-center md:flex-wrap">
        <div
            class="input-box flex flex-grow flex-col items-center md:flex-wrap md:flex-row md:items-center"
        >
          <slot name="input"></slot>
        </div>
        <div class="flex flex-none space-x-1 sm:mb-0 md:items-center">
          <slot>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang='ts' setup>
const props = withDefaults(defineProps<{
  title?: string;
  height?: string;
}>(), {title: "", height: '2'})
</script>

<style lang="scss" scoped>
:deep(.input-box > *) {
  @apply mr-1 mb-1 md:mb-0

}
</style>