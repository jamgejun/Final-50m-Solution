// 获取验证码
export const getValidatecode = (ev) => { 
    return ev.$ajax.get('/captcha');
}

// 处理登录
export const login = (ev, params) => { 
    return ev.$ajax.post('/sys/login', { 
        params: params 
    }); 
}

// 获取菜单列表项
export const getMenus = (ev, params) => {
    return ev.$ajax.get('/sys/menus', {
        params: params
    })
}