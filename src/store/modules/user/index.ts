import { defineStore } from 'pinia';
import {
  getUserInfo, login,
} from '@/api/user/index.ts';
import { setToken, clearToken } from '@/utils/auth';
import type { UserState } from './types';
import {LoginRequest} from "@/api/user/types.ts";
import router from "@/router";
const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    phone: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    }
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // 获取用户信息
    async info() {
      const res = await getUserInfo();
      this.setInfo(res.data);
    },

    // 登录
    async login(loginForm: LoginRequest) {
      try {
        const res = await login(loginForm);
        console.log(res);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      this.resetInfo();
      clearToken();
    },
    // 退出登录
    async logout() {

      this.logoutCallBack();
      await router.replace({
        name: 'login'
      })
    }
  }
});

export default useUserStore;
