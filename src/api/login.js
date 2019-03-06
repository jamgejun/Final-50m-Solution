import qs from 'qs'

// 获取验证码
export const getValidatecode = (ev) => { 
    ev.$ajax.get('/captcha', {
        responseType: 'arraybuffer'
    }).then(response => {
        return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    }).then(data => {
        return ev.validateCode = data
    })
}

// 处理登录
export const login = (ev, data) => { 
    return ev.$ajax.post('/sys/login', qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }); 
}

// 获取菜单列表项
export const getMenus = (ev) => {
    return ev.$ajax.get('/sys/menus')
}

// 获取字典表
export const getDictorys = (ev, id) => {
    return ev.$ajax.get(`/dictorys?pId=${id}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}