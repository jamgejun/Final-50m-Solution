import axios from 'axios'

//查询买家接口
export const searchBuyer = (ev, data) => { 
    return ev.$ajax.get(`/api/buyeraddrs`,{
        params:data
    })
}