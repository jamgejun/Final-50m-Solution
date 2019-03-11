export const getOrder = (ev, data) => {
    return ev.$ajax.get(`/api/orders`, {
        params: data
    })
}


// 查询单个订单接口
export const getOderDetail = (ev, id) => {
    return ev.$ajax.get(`/api/orders/${id}/orderdetails`, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
}

// 批量更新订单接口
export const updateAllOrder = (ev, data) => {
    return ev.$ajax.put(`/api/orders`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}