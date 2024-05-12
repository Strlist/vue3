import { createRouter, createWebHashHistory } from 'vue-router';

import { appRoutes } from './routes/index.ts';
import { REDIRECT_MAIN } from './routes/base';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: "goods/goods-search"
        },
        {
            path: '/login',
            name: "login",
            component: () => import('@/views/login/index.vue'),
            meta: {
                requiresAuth: false
            }
        },
        ...appRoutes,
        REDIRECT_MAIN
    ],
    scrollBehavior() {
        return { top: 0 };
    }
});


export default router;
