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
    return ev.$ajax.get(`/api/goodss/`, {
        params: data
    }, {
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

// 更新商品接口
export const updateGoods = (ev, id, data) => {
    return ev.$ajax.put(`/api/goodss/${id}`,data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 添加商品接口
export const addGoods = (ev, data) => {
    return ev.$ajax.post(`/api/goodss`, data, {
        headers: {
            'Content-Type': 'application/json; multipart/form-data'
        }
    })
}

// 更新商品图片
export const goodspictures = (ev, data) => {
    return ev.$ajax.put(`/api/goodspictures/`)
}

// 批量删除商品接口
export const deleteGoods = (ev, data) => {
    return ev.$ajax.delete(`/api/goodss`, {
        data: data
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 更新图片接口
export const updatePicture = (ev, data) => {
    return ev.$ajax.put(`/api/goodspictures/`, {
        data: data
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}