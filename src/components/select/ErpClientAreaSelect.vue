<template>
  <!--  <el-select v-bind="$attrs" placeholder="选择所属地区" ref="ElSelectRef">-->
  <!--    <el-option-->
  <!--        v-for="item in clientAreaSelectList"-->
  <!--        :key="item.clientareaid"-->
  <!--        :label="item.clientareaname"-->
  <!--        :value="item.clientareaid"-->
  <!--    >-->
  <!--    </el-option>-->
  <!--  </el-select>-->
  <el-tree-select
      v-bind="$attrs"
      :data="clientAreaList"
      :props="clientAreaTreeConfig"
      node-key="clientareaid"
      check-strictly
      filterable
      ref="ElSelectRef"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IClientArea} from "@/module/clientArea/clientArea";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";

const ElSelectRef = ref();
const clientAreaList = ref<IClientArea[]>([]);
const clientAreaService = new ClientAreaService();
//客户地区树配置
const clientAreaTreeConfig = {
  children: 'children',
  label: 'clientareaname',
}

onMounted(() => {
  getClientAreaList();
})

async function getClientAreaList() {
  clientAreaList.value = await clientAreaService.getClientAreaTree();
}

function focus() {
  ElSelectRef.value.focus();
}

defineExpose({focus});
</script>

<style scoped>
</style>