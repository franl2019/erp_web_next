<template>
  <div class="cursor-pointer" @click="clickedTitle">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import {useRouter} from "vue-router";
import {useRouterPage} from "@/utils";
import {defineComponent} from "vue";

export default defineComponent({
  name:"ErpRouterButton",
  props: {
    routerName: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const router = useRouter();

    function clickedTitle() {
      if (props.routerName) {
        const route = router.resolve({
          name: props.routerName
        })
        useRouterPage(route.fullPath, route.meta.title as string);
      }
    }

    return {
      clickedTitle,
    };
  },
});
</script>

<style lang='scss' scoped>

</style>