import axios from 'axios'

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