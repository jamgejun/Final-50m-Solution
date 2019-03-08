export const getOrder = (ev, data) => {
    return ev.$ajax.get(`/api/orders`, {
        params: data
    })
}