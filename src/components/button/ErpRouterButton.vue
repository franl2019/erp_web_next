<template>
  <div class="cursor-pointer" @click="clickedTitle">
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import {useRouter} from "vue-router";
import {useRouterPage} from "@/utils";



const props = withDefaults(defineProps<{
  routerName?: string
}>(), {
  routerName: ''
})

const router = useRouter();

function clickedTitle() {
  if (props.routerName) {
    const route = router.resolve({
      name: props.routerName
    })
    useRouterPage(route.fullPath,route.meta.title as string);
  }
}
</script>

<style lang='scss' scoped>

</style>