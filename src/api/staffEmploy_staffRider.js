import axios from 'axios'

//查询骑手接口
export const searchRider = (ev, data) => {
    return ev.$ajax.get(`/api/riderworks`, {
        params: data
    })
}

export const referRider = (ev, data) => {
    return ev.$ajax.get(`/sys/users?type=${31}`)
}

//新增骑手接口
export const addRider = (ev, data) => {
    return ev.$ajax.post(`/api/riderworks`, data)
}

export const newRider = (ev, data) => {
    return ev.$ajax.post(`/sys/users`, data)
}

//更新骑手接口
export const changeRider =(ev, id, data) => {
    return ev.$ajax.put(`/api/riderworks/${id}`, data)
}

export const updateRider =(ev, id, data) => {
    return ev.$ajax.put(`/sys/users/${id}`, data)
}

//删除骑手接口
export const deleteRider = (ev, id) => {
    return ev.$ajax.delete(`/api/riderworks/${id}`)
}

//查询员工接口
export const searchEmploy = (ev, data) => {
    return ev.$ajax.get(`/sys/users`, {
        params: data
    })
}

export const referEmploy = (ev, data) => {
    return ev.$ajax.get(`/sys/users?type=${32}`)
}
//新增员工接口
export const addEmploy = (ev, data) => {
    return ev.$ajax.post(`/api/riderworks`, data)
}

export const newEmploy = (ev, data) => {
    return ev.$ajax.post(`/sys/users`, data)
}