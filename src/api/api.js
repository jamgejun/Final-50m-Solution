import axios from 'axios';

let base = '';

export const requestLogin = params => { 
    return axios.post(`${base}/login`, params).then(res => res.data); 
};

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

// 用户登录接口
export const login = params => { return axios.post(`${base}/sys/login`, {params: params }); } 
// 用户登出接口
export const logout = params => { return axios.get(`${base}/sys/logout`, {params: params }); }
// 数据库访问日志接口
export const syslogs = params => { return axios.get(`${base}/sys/syslogs`, {params: params}); }


// 管理楼栋接口
export const getBuilding = params => { return axios.get(`${base}/building/`, { params: params }); };