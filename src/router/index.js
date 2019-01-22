import Admin from './admin/index';
import repository from './repository/index';
import Shop from './shop/index';

// 登录和404 页面
import Login from '../views/Login';
import NotFound from '../views/404';

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    ...Admin,
    ...repository,
    ...Shop,
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
]

export default routes