import axios from 'axios'
import qs from 'qs'
//查询买家接口
export const searchBuyer = (ev, data) => { 
    return ev.$ajax.get(`/sys/users`,{
        params: data
    }, {
        headers: {
            'Content-type':'application/x-www-form-urlencoded'
        }
    })
}

export const referBuyer = (ev) => {
    return ev.$ajax.get(`/sys/users?type=${30}`)
}