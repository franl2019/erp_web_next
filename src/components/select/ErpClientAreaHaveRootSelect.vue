<template>
  <!--  <el-select v-bind="$attrs" placeholder="选择上级地区" ref="ElSelectRef">-->
  <!--    <el-option-->
  <!--        v-for="item in clientAreaSelectList"-->
  <!--        :key="item.clientareaid"-->
  <!--        :label="item.clientareaname"-->
  <!--        :value="item.clientareaid"-->
  <!--    >-->
  <!--    </el-option>-->
  <!--  </el-select>-->
  <el-tree-select
      :data="clientAreaSelectList"
      :props="clientAreaTreeConfig"
      node-key="clientareaid"
      check-strictly
      filterable
  />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IClientArea} from "@/module/clientArea/clientArea";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";

const ElSelectRef = ref();
const clientAreaSelectList = ref<IClientArea[]>([]);
const clientAreaService = new ClientAreaService();

//客户地区树配置
const clientAreaTreeConfig = {
  children: 'children',
  label: 'clientareaname',
}

onMounted(async () => {
  await getClientAreaListHaveRoot()
})


async function getClientAreaListHaveRoot() {
  clientAreaSelectList.value = await clientAreaService.getClientAreaTreeHaveRoot();
}

function focus() {
  ElSelectRef.value.focus();
}

defineExpose({focus});
</script>

<style scoped>

</style>