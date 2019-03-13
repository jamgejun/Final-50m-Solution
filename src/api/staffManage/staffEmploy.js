import axios from 'axios'

//查询员工接口
export const searchEmploy = (ev, data) => {
    return ev.$ajax.get(`/sys/admins`, {
        params: data
    }, {
        headers: {
            'Content-type':'application/x-www-form-urlencoded'
        }
    })
}

//新增员工接口
export const addEmploy = (ev, data) => {
    return ev.$ajax.post(`/sys/users`, data)
}

//更新员工信息接口
export const changeEmploy = (ev, id, data) => {
    return ev.$ajax.put(`/sys/users/${id}`, data)
}

// 删除员工接口
export const deleteEmploy = (ev, id) => {
    return ev.$ajax.delete(`/sys/users/${id}`)
}