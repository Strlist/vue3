import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const GoodsManagement: AppRouteRecordRaw = {
    path: '/goods',
    name: 'goods',
    component: DEFAULT_LAYOUT,
    meta: {
        title:"商品管理",
        requiresAuth: true,
        icon: 'icon-list',
        order: 2
    },
    children: [
        {
            path: 'goods-search',
            name: 'GoodsSearch',
            component: () => import('@/views/GoodsManagement/index.vue'),
            meta: {
                title:"商品内容管理",
                requiresAuth: true
            }
        }
    ]
};

export default GoodsManagement;
