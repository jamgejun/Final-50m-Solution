import router from 'vue-router'
import store from '../vuex/store';

// 无权限路由表
export default constRouter = [
    {
        path: '/login',
        component: (resolve) => require(['@/views/Login.vue'], resolve)
    }
]

// 动态路由表
export const DynamicRoutes = [
    {
        path: '',
        component: (resolve) => require(['@/views/Home'], resolve),
        name: 'layout',
        meta: {
            requiresAuth: true,
            name: '首页',
        },
        children: []
    },
    {
        path: '/404',
        component: (resolve) => require(['@/views/404'], resolve)
    },
    {
        path: '*',
        redirect: '404'
    }
]

router.beforeEach((to, from, next) => {
    // 如果没有token的情况
    if (!store.getters.getToken) {
        // 第一， 只能跳转不需要权限的页面 否则，跳转到login登录页
        if ( to.matched.length > 0 && to.matched.some(record => record.meta.requiresAuth) ) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else { 
        // 有token的情况下，判断是否已经存在权限路由表
        if (!store.state.permission.permissionList) {
            // 如果没有
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                // 设置权限路由表之后，跳转目的路由
                next({
                    path: to.path
                })
            })
        } else {
            if (to.path !== '/login') {
                next()
            } else {
                next(from.fullPath)
            }
        }
    }
})