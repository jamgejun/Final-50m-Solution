import qs from 'qs'

export const getDictorys = (ev, id) => {
    return ev.$ajax.get(`api/dictorys?pId=${id}`,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}