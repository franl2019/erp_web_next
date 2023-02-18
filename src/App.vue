<template>
  <div class="flex h-screen w-screen">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import {config} from "@/config/env";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {

      //关闭二次确定
      if (!config.isDev) {
        window.onbeforeunload = function () {
          return true;
        };
      }

      // contextmenu 禁用右键菜单
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      })
    })
    return {}
  },
});
</script>

