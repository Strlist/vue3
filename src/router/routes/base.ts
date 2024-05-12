import type { RouteRecordRaw } from 'vue-router';

export const DEFAULT_LAYOUT = () => import('@/layout/index.vue');

export const REDIRECT_MAIN: RouteRecordRaw = {
    path: '/redirect',
    name: 'redirectWrapper',
    component: DEFAULT_LAYOUT,
    meta: {
        requiresAuth: true,
        hideInMenu: true
    },
    children: [
        {
            path: '/redirect/:path',
            name: "redirect",
            component: () => import('@/views/redirect/index.vue'),
            meta: {
                requiresAuth: true,
                hideInMenu: true
            }
        }
    ]
};
