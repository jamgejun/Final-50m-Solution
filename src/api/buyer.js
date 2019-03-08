import axios from 'axios'

//查询买家接口
export const searchBuyer = (ev, data) => { 
    return ev.$ajax.get(`/sys/users`,{
        params:data
    })
}

export const referBuyer = (ev, data) => {
    return ev.$ajax.get(`/sys/users?type=${30}`)
}