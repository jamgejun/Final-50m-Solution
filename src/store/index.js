import setRouter from '../router/setRouter'

export default {
    state: {
        userToken:'',
        permissionList: [],
        sessionTimeOut: 60
    },
    getters: {
        getToken: () => {
            return sessionStorage.getItem('token');
        }
    },
    mutations: {
        LOGIN_IN(state, token) {
            state.userToken = token;
            // 在session中存储token值
            sessionStorage.setItem('token', token);
        },
        LOGIN_OUT(state) {
            state.userToken = '';
        },
        SET_MENUS(state, routerList) {
            state.permissionList = routerList;
        },
        SET_SESSION(state, ev) {
            state.userToken = ''
            sessionStorage.removeItem('token')
            ev.$message({
                message: '登录已过期，请重新登录！',
                type: 'warning'
            })
            ev.$router.push('/login')
        }
    },
    actions: {
        login({commit}, token) {
            commit('LOGIN_IN', token)
        },
        loginOut({commit}) {
            commit('LOGIN_OUT');
        },
        getMenus({commit}, routerList) {
            commit('SET_MENUS', routerList);
        }
    }
}