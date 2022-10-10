<template>
  <label :for="inputUUID" class="flex items-center">
    <input :id="inputUUID" name="remember-me" type="checkbox"
           class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
    <span class="ml-2 block text-sm text-gray-900"><slot></slot></span>
  </label>
</template>

<script setup lang='ts'>
import {v4 as uuidv4} from 'uuid';

const inputUUID = uuidv4();
</script>