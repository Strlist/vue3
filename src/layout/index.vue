<script setup lang="ts">
import {computed, ref} from 'vue';
import MenuSider from './MenuSider/index.vue'
import ToolHeader from './ToolHeader/index.vue'
import {useRouter} from "vue-router";
const collapsed = ref(false);
const onCollapse = () => {
  collapsed.value = !collapsed.value;
};
const router = useRouter()
const path_list = computed(
  () => router.currentRoute.value.matched.map((item) => item.meta.title)
)
</script>
<template>
  <a-layout class="h-screen w-screen bg-slate-50">
    <MenuSider :collapsed="collapsed"/>
    <a-layout class="relative w-full h-screen overflow-y-auto" id="app-main-content">
      <ToolHeader @on-collapse="onCollapse" :collapsed="collapsed"/>
      <a-layout class="!px-5 !mt-2 w-full" >
        <a-breadcrumb class="px-2">
          <a-breadcrumb-item v-for="item in path_list">{{item}}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content >
          <router-view />
        </a-layout-content>
        <a-layout-footer></a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<style scoped>
</style>

