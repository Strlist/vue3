import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const GoodsManagement: AppRouteRecordRaw = {
    path: '/test',
    name: 'test',
    component: DEFAULT_LAYOUT,
    meta: {
        title:"测试单个",
        requiresAuth: true,
        icon: 'icon-list',
        hideChildrenMenu:true,
        order: 2
    },
    children: [
        {
            path: 'test-search',
            name: 'TestSearch',
            component: () => import('@/views/TestManagement/index.vue'),
            meta: {
                title:"测试啊啊",
                requiresAuth: true
            }
        }
    ]
};

export default GoodsManagement;
