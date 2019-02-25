import axios from 'axios';
import base  from './baseUrl';

export const getValidatecode = () => { 
    return axios.get(`${base}/validatecode`);
}

export const login = (params) => { 
    return axios.get(`${base}/sys/login`, { params: params }); 
}