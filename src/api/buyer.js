import axios from 'axios'
import qs from 'qs'
//查询买家接口
export const searchBuyer = (ev, data) => { 
    return ev.$ajax.get(`/sys/buyers`, {
        params: data
    },{
        headers: {
            'Content-type':'application/x-www-form-urlencoded'
        }
    })
}