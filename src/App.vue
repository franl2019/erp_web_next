<template>
  <div class="h-full w-full">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {config} from "@/config";

onMounted(()=>{
  if(!config.isDev){
    window.onbeforeunload = function(e) {

      e = e || window.event;
      const dialogText:string = '是否退出ERP?';
      if(e){
        e.returnValue = dialogText;
      }
      return dialogText;
    };
  }
})
</script>

