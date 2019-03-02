import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from 'axios'

// 使用ElementUI
import ElementUI from 'element-ui'

// 两套不同主体的切换
// import 'element-ui/lib/theme-default/index.css'
import './assets/theme/theme-green/index.css'

// 字体文件
import 'font-awesome/css/font-awesome.min.css'
import VueRouter from 'vue-router'
import mystore from './store'
import Vuex from 'vuex'
import routes from './router/admin'

// 声明使用插件
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes
})
const store = new Vuex.Store(mystore)


// 设置基本路径
axios.defaults.baseURL = '/api/' // 本地调试时
//  设置session请求一致性
axios.defaults.withCredentials = true;

// 使用npm run build 的时候， 将上面注释掉  default 路径使用下面的就行
// axios.defaults.baseURL = 'http://t159z26789.iask.in/f50m-web/'  //打包部署上线时 
// axios.defaults.baseURL = 'http://localhost:8888/f50m-web/'  //打包部署上线时 

// 解决跨域
// axios.defaults.headers.post["Content-type"]='application/x-www-form-urlencoded';

// 对Vue原型链赋值
Vue.prototype.$ajax = axios;


//NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
	if (!store.state.userToken) {
		console.log('没有权限 只能登录不需要权限的路由');
		if (to.matched.length>0 && !to.matched.some(record => record.meta.requiresAuth)) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		// console.log('有了token，但没有路由权限列表')
		// if (!store.state.permissionList) {

		// 	// 
		// 	getMenus(ev, params).then((res) => {
		// 		let routerList = res.routerList
		// 		store.dispatch('getMenus', routerList)
		// 		next({
		// 			path: to.path
		// 		})
		// 	}).catch((err) => {
		// 		console.log(err)  
		// 	})

		// } else {
		// 	//  如果都存在 则放行
		// 	if (to.path !== '/login') {
    //             next()
    //         } else {
    //             next(from.fullPath)
    //         }
    // }
    next();
	}
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

