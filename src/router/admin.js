// 登录和404 页面
import Home from '../views/Home.vue';

let routes = [
    {
        path: '/login',
        component: (resolve) => require(['@/views/Login'], resolve),
        name: '登录',
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/',
        component: Home,
        level: 1,
        meta: {
            id: 1 ,
            parentId: 0,
            name: '楼栋/仓库管理',
            indexNum: 2,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        children: [
            { 
                path: '/building',
                meta: {
                    name: '楼栋列表',
                    parentId: 1,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: 'goods:list,goods:info,goods:create,goods:update,goods:delete'
                },
                component: (resolve) => require(['@/views/shop/building/building'], resolve), 
            },
            {   
                path: '/repository',
                meta: {
                    name: '仓库列表',
                    parentId: 1,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: 'goods:list,goods:info,goods:create,goods:update,goods:delete'
                },
                component: (resolve) => require(['@/views/shop/building/repository'], resolve), 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        level: 1,
        meta: {
            id: 2 ,
            parentId: 0,
            name: '管理商品',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        children: [
            { 
                path: '/goodsCategory', 
                meta: {
                    name: '商品分类',
                    parentId: 2,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/shop/goods/goodsCategory'], resolve), 
            },
            {
                path: '/goodsMessage',
                meta: {
                    name: '商品信息',
                    parentId: 2,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/shop/goods/goodsMessage'], resolve),
            }
        ]
    },
    {
        path: '/',
        component: Home,
        level: 1,
        meta: {
            id: 3 ,
            parentId: 0,
            name: '员工管理',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        children: [
            { 
                path: '/staffRider', 
                meta: {
                    name: '骑手列表',
                    parentId: 3,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/shop/staff/staffRider'], resolve),
            },
            {
                path: '/staffEmploy', 
                meta: {
                    name: '员工管理',
                    parentId: 3,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/shop/staff/staffEmploy'], resolve), 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        level: 1,
        meta: {
            id: 4 ,
            parentId: 0,
            name: '订单统计',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        children: [
            { 
                path: '/orderAll', 
                meta: {
                    name: '所有订单',
                    parentId: 4,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/shop/order/orderAll'], resolve),
            },
            { 
                path: '/orderCategory', 
                meta: {
                    name: '订单分类',
                    parentId: 4,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/shop/order/orderCategory'], resolve),
            }
        ]
    },
    {
        path: '/',
        component: Home,
        meta: {
            id: 5,
            parentId: 0,
            name: '店铺打烊',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        level: 1,
        children: [
            { 
                path: '/close', 
                meta: {
                    name: '店铺打烊',
                    parentId: 5,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/shop/close'], resolve),
            }
        ]
    },
    {
        path: '/',
        component: Home,
        level: 1,
        meta: {
            id: 6,
            parentId: 0,
            name: '买家列表',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        children: [
            { 
                path: '/buyer', 
                meta: {
                    name: '买家列表',
                    parentId: 6,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/shop/buyer'], resolve),
            }
        ]
    },
    {
        path: '/',
        component: Home,
        meta: {
            id: 7,
            parentId: 0,
            name: '分拣管理',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        level: 2,
        children: [
            { 
                path: '/reOrder', 
                meta: {
                    name: '分拣管理',
                    parentId: 7,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/repository/reOrder'], resolve),
            }
        ]
    },
    {
        path: '/',
        component: Home,
        meta: {
            id: 8,
            parentId: 0,
            name: '管理订单',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        level: 2,
        children: [
            { 
                path: '/sorting', 
                meta: {
                    name: '管理订单',
                    parentId: 8,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/repository/sorting'], resolve),
            }
        ]
    },
    {
        path: '/',
        component: Home,
        meta: {
            id: 9,
            parentId: 0,
            name: '操作日志',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        level: 0,
        children: [
            { 
                path: '/sysLog', 
                meta: {
                    name: '操作日志',
                    parentId: 9,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/admin/sysLog'], resolve),
            }
        ]
    },
    {
        path: '/',
        component: Home,
        meta: {
            id: 10,
            parentId: 0,
            name: '角色管理',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        level: 0,
        children: [
            { 
                path: '/sysUser', 
                meta: {
                    name: '角色管理',
                    parentId: 10,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/admin/sysUser'], resolve),
            }
        ]
    },
    {
        path: '/',
        component: Home,
        meta: {
            id: 11,
            parentId: 0,
            name: '权限管理',
            indexNum: 3,
            requiresAuth: true,
            icon: 'fa fa-bar-chart',
        },
        level: 0,
        children: [
            { 
                path: '/sysPermission', 
                meta: {
                    name: '权限管理',
                    parentId: 11,
                    requiresAuth: true,
                    icon: 'fa fa-weixin',
                    permission: ''
                },
                component: (resolve) => require(['@/views/admin/sysPermission'], resolve),
            }
        ]
    },
    {
        path: '/404',
        component: (resolve) => require(['@/views/404'], resolve),
        name: '',
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '*',
        redirect: { path: '/404' },
        meta: {
            requiresAuth: false
        }
    },
]

export default routes