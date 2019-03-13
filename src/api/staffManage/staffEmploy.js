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
    return ev.$ajax.post(`/api/riderworks`, data)
}

export const newEmploy = (ev, data) => {
    return ev.$ajax.post(`/sys/users`, data)
}

// 批量删除商品接口
export const deleteEmploy = (ev, data) => {
    return ev.$ajax.delete(`/sys/users/{id}`, {
        data: data
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}