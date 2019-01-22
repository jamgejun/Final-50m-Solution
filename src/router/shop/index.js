import Home from '../../views/Home.vue';
import echarts from '../../views/charts/echarts.vue'
import building from '../../views/shopCompoent/building.vue'
import repository from '../../views/shopCompoent/repository.vue'
import goods from '../../views/shopCompoent/goods.vue'
import qishou from '../../views/shopCompoent/qishou.vue'
import employ from '../../views/shopCompoent/employ.vue'
import shopStore from '../../views/shopCompoent/shopStore.vue'
import buyer from '../../views/shopCompoent/buyer.vue'

let shop = [
    {
        path: '/',
        component: Home,
        name: '管理楼栋',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/building', component: building, name: '楼栋列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理仓库',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/repository', component: repository, name: '仓库列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理商品',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/goods', component: goods, name: '商品列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理骑手',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/qishou', component: qishou, name: '骑手列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单统计',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '所有订单' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理员工',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/employ', component: employ, name: '员工列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '店铺打烊',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/shopStore', component: shopStore, name: '店铺列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '查看买家',
        level: 1,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/buyer', component: buyer, name: '已注册买家' }
        ]
    }

]

export default shop