import qs from 'qs'

export const getDictorys = (ev) => {
    return ev.$ajax.get(`api/dictorys?pId=7`,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}