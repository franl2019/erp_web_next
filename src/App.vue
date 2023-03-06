<template>
  <div class="flex h-screen w-screen">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {

      // contextmenu 禁用右键菜单
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      })
    })
    return {}
  },
});
</script>

