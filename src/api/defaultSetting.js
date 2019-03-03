// 设置基本路径
axios.defaults.baseURL = '/api/' // 本地调试时
//  设置session请求一致性
axios.defaults.withCredentials = true;


// 使用npm run build 的时候， 将上面注释掉  default 路径使用下面的就行
// axios.defaults.baseURL = 'http://t159z26789.iask.in/f50m-web/'  //打包部署上线时 
// axios.defaults.baseURL = 'http://localhost:8888/f50m-web/'  //打包部署上线时 

// 解决跨域
// axios.defaults.headers.post["Content-type"]='application/x-www-form-urlencoded';

// // 全局默认设置
// // 超时时间
// axios.defaults.timeout = 5000;

// // baseUrl
// axios.defaults.baseURL = 'http://t159z26789.iask.in/f50m-web';

// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         if (store.state.UserToken) {
//             config.headers.Authorization = `token ${store.state.UserToken}`
//         } 
//         return config
//     },
//     err => {
//         return Promise.reject(err);
//     }
// )