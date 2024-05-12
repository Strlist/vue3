declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// 解决mockjs报错
declare module 'mockjs';
declare module 'pinia';