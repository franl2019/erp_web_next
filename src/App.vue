<template>
  <div class="flex h-screen w-screen">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {config} from "@/config/env";

onMounted(()=>{

  //关闭二次确定
  if(!config.isDev){
    window.onbeforeunload = function() {
      return true;
    };
  }

  // contextmenu 禁用右键菜单
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  })
})
</script>

