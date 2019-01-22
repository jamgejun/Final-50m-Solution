import Home from '../../views/Home.vue'
import Main from '../../views/Main.vue'
import Table from '../../views/nav1/Table.vue'
import Form from '../../views/nav1/Form.vue'
import user from '../../views/nav1/user.vue'
import Page4 from '../../views/nav2/Page4.vue'
import Page5 from '../../views/nav2/Page5.vue'
import Page6 from '../../views/nav3/Page6.vue'
import showCount from '../../views/adminCompoent/showCount.vue'
import resetPassword from '../../views/adminCompoent/resetPassword'
let admin = [
    {
        path: '/',
        component: Home,
        name: '系统参数',
        level: 0,
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理商铺',
        level: 0,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '所有商铺' },
            { path: '/page5', component: Page5, name: '管理商铺管理员' }
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
            { path: '/page6', component: Page6, name: '操作日志' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统用户管理',
        level: 0,
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        children: [
            { path: '/resetPassword', component: resetPassword, name: '密码重置' },
            { path: '/showCount', component: showCount, name: '查看用户' }
        ]
    }
];

export default admin;