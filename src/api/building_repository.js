import axios from 'axios'

// 查询楼栋接口
export const searchBuilding = (ev) => { 
    return ev.$ajax.get(`/api/apartments?name=${ev.buildingStatus.name}`).then((res) => {
        console.log(res)
        ev.buildingList = res.data.data.rows
      }).catch((err) => {
        console.log(err)
      });
}

// 新增楼栋接口
export const addBuilding = (ev, data) => {
    return ev.$ajax.post(`/api/apartments`,data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 更新楼栋信息接口
export const changeBuilding = (ev, id, data) => {
    return ev.$ajax.put(`/api/apartments/${id}`,data)
}

// 删除楼栋信息接口
export const deleteBuilding = (ev, id) => {
    return ev.$ajax.delete(`/api/apartments/${id}`)
}

// 查询商铺的仓库接口
export const getRepository = (params) => {
    axios.get(`${base}/api/storages`, {
        params: params
    });
}

// 新增仓库信息接口
export const addRepository = (params) => {
    axios.post(`${base}/api/storages`, {
        params: params
    });
}

// 更新仓库信息接口
export const refreshRepository = (params, id) => {
    axios.put(`${base}/api/storages/id=${id}`, {
        params: params
    })
}

// 删除仓库信息接口
export const deleteRpository = (id) => {
    axios.delete(`${base}/api/storages/id=${id}`)
}