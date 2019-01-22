import Home from '../../views/Home.vue';
import showList from '../../views/repositoryCompoent/showList.vue'
import a from '../../views/repositoryCompoent/a.vue'
import b from '../../views/repositoryCompoent/b.vue'
import c from '../../views/repositoryCompoent/c.vue'

let repository = [
    {
        path: '/',
        component: Home,
        name: '分拣管理',
        level: 2,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/a', component: a, name: '查看待认领订单' },
            { path: '/b', component: b, name: '查看待出库订单' },
            { path: '/c', component: c, name: '启动配送订单' }
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
            { path: '/showList', component: showList, name: '查看订单' }
        ]
    }
]

export default repository