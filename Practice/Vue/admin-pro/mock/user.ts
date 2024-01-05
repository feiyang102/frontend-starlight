import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        // 路径要以/mock开头
        url: '/mock/api/login',
        method: 'post',
        // 这里使用 body 可以获取请求体
        response: ({ body }) => {
            // 目前简单逻辑是，用户名和密码不相同就认为密码错误
            if (body.username !== body.password) {
                return {
                    code: 1,
                    message: '密码错误',
                    data: {
                        username: '',
                        roles: [],
                        accessToken: ''
                    }
                };
            }
            if (body.username === 'admin') {
                return {
                    code: 0,
                    message: '登录成功',
                    data: {
                        username: 'admin',
                        roles: ['admin'],
                        accessToken: 'admin'
                    }
                };
            } else {
                return {
                    code: 0,
                    message: '登陆成功',
                    data: {
                        username: 'common',
                        roles: ['common'],
                        accessToken: 'common'
                    }
                };
            }
        }
    }
] as MockMethod[];
