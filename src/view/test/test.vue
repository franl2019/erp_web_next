<template>
  <div class="h-screen w-screen" @click="test">123</div>
</template>

<script setup lang="ts">
import {http_post} from "@/api/axios";
import {API_URL} from "@/api/url";

async function test() {
  const data = await http_post(API_URL.TEXT)
  console.log(data)
}
</script>

