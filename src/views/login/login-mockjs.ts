import Mock from 'mockjs';
import  {
    successResponseWrap,
    failResponseWrap
} from '@/utils/setup-mock.ts';
import type { MockParams } from '@/types/mock.ts';
// 登录
Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
    const { username, password } = JSON.parse(params.body);
    if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000);
    }
    if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000);
    }
    if (username === 'admin' && password === 'admin') {
        return successResponseWrap({
            token: '12345'
        });
    }
    if (username === 'user' && password === 'user') {
        return successResponseWrap({
            token: '54321'
        });
    }
    return failResponseWrap(null, '账号或者密码错误', 50000);
});