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
import store from './store/index'
import Vuex from 'vuex'
import routes from './router/admin'
// import Mock from './mock'
// Mock.bootstrap();

// 声明使用插件
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

// 设置基本路径
axios.defaults.baseURL = '/api/' // 本地调试时

// 使用npm run build 的时候， 将上面注释掉  default 路径使用下面的就行
// axios.defaults.baseURL = 'http://t159z26789.iask.in/f50m-web/'  //打包部署上线时 

// 解决跨域
axios.defaults.headers.post["Content-type"]="application/json";

// 对Vue原型链赋值
Vue.prototype.$ajax = axios;

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if (!store.state.userToken) {
//     if (to.matched.length>0 && !to.matched.some(record => record.meta.requiresAuth)) {
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
    
//   }
// })

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

