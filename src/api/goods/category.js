import qs from 'qs'

export const getGoodsTypes = (ev, data) => {
    return ev.$ajax.get(`/api/goodstypes`, {
        params: data
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const addGoodsTypes = (ev, data) => {
    return ev.$ajax.post(`/api/goodstypes`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const updateGoodsTypes = (ev, id, data) => {
    return ev.$ajax.put(`/api/goodstypes/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const deleteGoodsTypes = (ev, id, data) => {
    return ev.$ajax.delete(`/api/goodstypes/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}