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
    return ev.$ajax.post(`/api/apartments`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 更新楼栋信息接口
export const changeBuilding = (ev, id, data) => {
    return ev.$ajax.put(`/api/apartments/${id}`, data)
}

// 删除楼栋信息接口
export const deleteBuilding = (ev, id) => {
    return ev.$ajax.delete(`/api/apartments/${id}`)
}


// 查询商铺的仓库接口
export const getRepository = (ev) => {
    return ev.$ajax.get(`/api/storages?name=${ev.RpSearch.name}`).then((res) => {
        console.log(res)
        ev.RpList = res.data.data.rows
    }).catch((err) => {
        console.log(err)
    });
}

// 新增仓库信息接口
export const addRepository = (ev, data) => {
    return ev.$ajax.post(`/api/storages`, data)
}

// 更新仓库信息接口
export const refreshRepository = (ev, id, data) => {
    return ev.$ajax.put(`/api/storages/${id}`, data)
}

// 删除仓库信息接口
export const deleteRepository = (ev,id) => {
    return ev.$ajax.delete(`/api/storages/${id}`)
}








// 删除仓库信息接口
export const deleteRpository11 = (id) => {
    axios.delete(`${base}/api/storages/id=${id}`)
}