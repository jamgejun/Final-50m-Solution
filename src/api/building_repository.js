import axios from 'axios';

// 查询楼栋接口
export const searchBuilding = (params) => { 
    axios.get(`${base}/api/apartments`, { 
        params: params 
    });
}

// 新增楼栋接口
export const addBuilding = (params) => {
    axios.post(`${base}/api/apartments`, {
        params: params
    });
}

// 更新楼栋信息接口
export const changeBuilding = (params, id) => {
    axios.put(`${base}/api/apartments/${id}`, {
        params: params
    });
}

// 删除楼栋信息接口
export const deleteBuilding = (id) => {
    axios.delete(`${base}/api/aparments/id=${id}`);
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