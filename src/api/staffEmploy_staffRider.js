import axios from 'axios'

//查询骑手接口
export const searchRider = (ev, data) => {
    return ev.$ajax.get(`/api/riderworks`, {
        params: data
    })
}

export const referRider = (ev, data) => {
    return ev.$ajax.get(`/sys/users`, {
        params: data
    })
}

//新增骑手接口
export const addRider = (ev, data) => {
    return ev.$ajax.post(`/api/riderworks`, data)
}

//更新骑手接口
export const changeRider =(ev, id, data) => {
    return ev.$ajax.put(`/api/riderworks/${id}`,data)
}

//删除骑手接口
export const deleteRider = (ev, id) => {
    return ev.$ajax.delete(`/api/riderworks/${id}`)
}