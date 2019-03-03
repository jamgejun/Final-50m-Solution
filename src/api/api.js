import axios from 'axios'
import Message from 'element-ui'

let server = axios.create({
    baseURL: '/api/',
    timeout: 5000,
    withCredentials: true
})
// 使用npm run build 的时候， 将上面注释掉  default 路径使用下面的就行
// server.baseURL = 'http://t159z26789.iask.in/f50m-web/'  //打包部署上线时 
// server.baseURL = 'http://localhost:8888/f50m-web/'  //打包部署上线时 

// 解决跨域
// axios.defaults.headers.post["Content-type"]='application/x-www-form-urlencoded';

//http request 拦截器
server.interceptors.request.use(
    config => {
      config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'
      }
      return config;
    },
    error => {
      return Promise.reject(err);
    }
  );

// response 拦截器
server.interceptors.response.use((response) => {
    return response
},(err)=> {
    if (err && err.response) {
        switch(err.response.status) {
            case 400: Message.error({message: '请求错误！'})
            break
            case 401: Message.error({message: '对不起，您目前没有权限，请登录'})
            break
            case 405: Message.error({message: '网络请求出错，请查看请求方式'})
            break
            case 500: Message.error({message: '服务器出错，请联系系统管理员'})
            break
            default:
        }
    }
    return Promise.reject(err)
})

export default server