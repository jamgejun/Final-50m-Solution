import qs from 'qs'

// 获得商品类的字典表数据
export const getStatus = (ev, id) => {
    return ev.$ajax.get(`/dictorys?pId=${id}`,{ }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 获取所有商品
export const getGoods = (ev, data) => {
    return ev.$ajax.get(`/api/goodss/`, qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 获取某个商品
export const getOneGoods = (ev, id, data) => {
    return ev.$ajax.get(`/api/goodss/${id}`, qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const updateGoods = (ev, id, data) => {
    return ev.$ajax.put(`/api/goodss/${id}`, qs.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const addGoods = (ev, data) => {
    return ev.$ajax.post(`/api/goodss`, data, {
        headers: {
            'Content-Type': 'application/json; multipart/form-data'
        }
    })
}

export const goodspictures = (ev, data) => {
    return ev.$ajax.put(`/api/goodspictures/`)
}