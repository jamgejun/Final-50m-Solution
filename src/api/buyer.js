import axios from 'axios'
import qs from 'qs'
//查询买家接口
export const searchBuyer = (ev, data) => { 
    return ev.$ajax.get(`/sys/buyers`)
}

export const referBuyer = (ev,data) => {
    return ev.$ajax.get(`/sys/users?type=${30}`)
}