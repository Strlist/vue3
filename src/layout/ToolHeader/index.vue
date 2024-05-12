<script setup lang="ts">
import {IconMenuUnfold, IconMenuFold,IconUser,IconExport} from "@arco-design/web-vue/es/icon";
import {useUserStore} from "@/store";
const userStore = useUserStore()
// import Logo from "@/layout/MenuSider/logo.vue";
defineProps({
  collapsed: Boolean
})
const emit = defineEmits(["on-collapse"])
const exitHandler = () => {
  userStore.logout()
};
</script>

<template>
  <a-affix :offsetTop="0" target="#app-main-content">
    <a-layout-header  >
      <div class=" w-full top-0 h-[60px] border-b flex justify-between items-center bg-white pl-5 px-14">
        <div class="py-2">
          <a-button @click="emit('on-collapse')">
            <IconMenuFold v-if="collapsed"/>
            <IconMenuUnfold v-else/>
          </a-button>
        </div>
        <div>
          <a-dropdown trigger="click">
            <a-avatar :size="32" :style="{ backgroundColor: '#3370ff' }">
              <IconUser :size="16"/>
            </a-avatar>
            <template #content>
              <a-doption @click="exitHandler">
                <a-space>
                  <icon-export />
                  <span>
                  退出登录
                </span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>

    </a-layout-header>
  </a-affix>

</template>

<style scoped>

</style>