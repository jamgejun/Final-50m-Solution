const whiteList = [
    '/'
]

// 不需要权限的界面
const constantRouterMap = [
    {
        path: '/',
        name: '首页',
        component: (resolve) => require(['@/views/Home'], resolve)
    },
    {
        path: '/login',
        name: '登录',
        component: (resolve) => require(['@/views/Login'], resolve)
    },
    {
        path: '/404',
        name: '404 Not defound',
        component: (resolve) => require(['@/views/404'], resolve)
    }
    // {
    //     path: '*',
    //     name: '重定向',
    //     redirect: {
    //         path: '/404'
    //     }
    // }
]

export default constantRouterMap