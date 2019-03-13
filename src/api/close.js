//查询买家接口
export const searchClose = (ev, data) => { 
    return ev.$ajax.get(`/api/shops`,{
        headers: {
            'Content-type':'application/x-www-form-urlencoded'
        }
    })
}