<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {useUserStore} from "@/store";
import {useRouter} from "vue-router";
const router = useRouter();
const loading = ref(false);
const userStore = useUserStore()
const form = ref<any>({
  username: '',
  password: '',
  rememberPassword: false,
});
const rules = {
  username: [
    {
      required: true,
      message:'账号不能为空',
    },
  ],
  password: [
    {
      required: true,
      message:'密码不能为空',
    },
  ],
}

const setRememberPassword = (value: boolean) => {
  form.value.rememberPassword = value;
}

const formRef = ref();

const handleSubmit =async () => {
  if(form.value.rememberPassword){
    localStorage.setItem('user-message',JSON.stringify(form.value))
  }else{
    localStorage.removeItem('user-message')
  }
  loading.value=true
  try {
    const result = await formRef.value.validate();
    if (!result) {
      await userStore.login(form.value);
      Message.info('登录成功');
      await router.push('/');
    }
  } finally {
    loading.value=false
  }
}

onMounted(() => {
  const userMessage = localStorage.getItem('user-message');
  if(userMessage){
    form.value = {...JSON.parse(userMessage)}
  }
})
</script>

<template>
<div class="w-screen h-screen login-background object-fill flex justify-center items-center">
  <div class="w-96 py-10 px-8 bg-white rounded-xl shadow">
    <div class="text-center text-2xl font-bold mb-2">登录</div>
    <a-form
        ref="formRef"
        class="login-form-wrapper"
        layout="vertical"
        :model="form"
        :rules="rules"
    >
      <a-form-item field="username" validate-trigger="blur" hide-label>
        <a-input
            v-model="form.username"
            autocomplete="username"
            placeholder="请输入账号"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" validate-trigger="blur" hide-label>
        <a-input-password
            v-model="form.password"
            autocomplete="current-password"
            placeholder="请输入密码"
            allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-checkbox
          checked="rememberPassword"
          :model-value="form.rememberPassword"
          @change="setRememberPassword"
      >
        记住密码
      </a-checkbox>
      <a-button
          type="primary"
          class="mt-5"
          long
          :loading="loading"
          @click="handleSubmit"
      >
        登录
      </a-button>
    </a-form>
  </div>
</div>
</template>

<style scoped>
.login-background {
  background-image: url('@/assets/images/background.png');
  background-size: cover;
  background-position: center;
}
</style>