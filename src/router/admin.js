// 登录和404 页面
let routes = [
    {
        path: '/login',
        name: '登录',
        component: (resolve) => require(['@/views/Login'], resolve),
        meta: {
            requiresAuth: false,
        }
    }
]

export default routes