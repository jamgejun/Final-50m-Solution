// 权限访问路由配置文件

const asyncRouterMap = [
    {
        path: '/admin/sysLog',
        name: 'admin.System',
        meta: {
            permission: []
        },
        component: (resolve) => require(['@/views/admin/sysLog.vue'], resolve)
    },
    {
        path: '/repository/order',
        name: 'repository.Order',
        meta: {
            permission: []
        },
        component: (resolve) => require(['@/views/repository/reOrder.vue'], resolve)
    },
    {
        path: '/repository/sorting',
        name: 'repository.Sorting',
        meta: {
            permission: []
        },
        component: (resolve) => require(['@/views/repository/sorting.vue'], resolve)
    },
    {
        path: '/shop/building',
        name: 'shop.building',
        meta: {
            permission: []
        },
        component: (resolve) => require(['@/views/shop/building/building'], resolve)
    },
    {
        path: '/shop/buyer',
        name: 'shop.buyer',
        meta: {
            permission: []
        },
        component: (resolve) => require(['@/views/shop/buyer'], resolve)
    },
    {
        path: '/shop/close',
        name: 'shop.close',
        meta: {
            permission: []
        },
        component: (resolve) => require(['@/views/shop/close'], resolve)
    },
    {
        path: '/shop/goods',
        name: 'shop.goods',
        meta: {
            permission: []
        },
        component: (resolve) => require(['@/views/shop/goods/goodsCategory'], resolve)
    },
    {
        path: '/shop/order',
        name: 'shop.order',
        meta: {
            permission: []
        },
        component: (resolve) => require(['@/views/shop/order/orderAll'], resolve)
    },
    {
        path: '/shop/staff',
        name: 'shop.staff',
        meta: {
            permission: []
        },
        component: (resolve) => require(['@/views/shop/staff/staffEmploy'], resolve)
    }
]