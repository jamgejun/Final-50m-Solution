// 登录和404 页面
import Home from '../views/Home.vue';

let routes = [
    {
        path: '/login',
        component: (resolve) => require(['@/views/Login'], resolve),
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: (resolve) => require(['@/views/404'], resolve),
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/',
        component: Home,
        name: '楼栋/仓库管理',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { 
                path: '/building', 
                component: (resolve) => require(['@/views/shop/building/building'], resolve), 
                name: '楼栋列表' 
            },
            {   path: '/repository',
                component: (resolve) => require(['@/views/shop/building/repository'], resolve), 
                name: '仓库列表' 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理商品',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { 
                path: '/goodsCategory', 
                component: (resolve) => require(['@/views/shop/goods/goodsCategory'], resolve), 
                name: '商品分类' 
            },
            {
                path: '/goodsMessage',
                component: (resolve) => require(['@/views/shop/goods/goodsMessage'], resolve), 
                name: '商品信息'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '员工管理',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { 
                path: '/staffRider', 
                component: (resolve) => require(['@/views/shop/staff/staffRider'], resolve),
                name: '骑手列表' 
            },
            {
                path: '/staffEmploy', 
                component: (resolve) => require(['@/views/shop/staff/staffEmploy'], resolve), 
                name: '员工管理' 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单统计',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { 
                path: '/orderAll', 
                component: (resolve) => require(['@/views/shop/order/orderAll'], resolve),
                name: '所有订单' 
            },
            { 
                path: '/orderCategory', 
                component: (resolve) => require(['@/views/shop/order/orderCategory'], resolve),
                name: '订单分类' 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '店铺打烊',
        level: 1,
        leaf: true,//只有一个节点
        iconCls: 'fa fa-bar-chart',
        children: [
            { 
                path: '/close', 
                component: (resolve) => require(['@/views/shop/close'], resolve),
                name: '店铺打烊' 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '买家列表',
        level: 1,
        leaf: true,//只有一个节点
        iconCls: 'fa fa-bar-chart',
        children: [
            { 
                path: '/buyer', 
                component: (resolve) => require(['@/views/shop/buyer'], resolve),
                name: '买家列表' 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '分拣管理',
        level: 2,
        leaf: true,//只有一个节点
        iconCls: 'fa fa-bar-chart',
        children: [
            { 
                path: '/reOrder', 
                component: (resolve) => require(['@/views/repository/reOrder'], resolve),
                name: '分拣管理' 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理订单',
        level: 2,
        leaf: true,//只有一个节点
        iconCls: 'fa fa-bar-chart',
        children: [
            { 
                path: '/sorting', 
                component: (resolve) => require(['@/views/repository/sorting'], resolve),
                name: '管理订单' 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '操作日志',
        level: 0,
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { 
                path: '/sysLog', 
                component: (resolve) => require(['@/views/admin/sysLog'], resolve),
                name: '操作日志' 
            }
        ]
    }
]

export default routes