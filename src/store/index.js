import setRouter from '../router/setRouter'

export default {
    state: {
        userToken:'',
        permissionList: [],
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
        SET_MENUS(state, ev, routerList) {
            state.permissionList = routerList;
            setRouter(ev, routerList);
        }
    },
    action: {
        login({commit}, token) {
            commit('LGOIN_IN', token)
        },
        loginOut({commit}) {
            commit('LOGIN_OUT');
        },
        getMenus({commit}, routerList) {
            commit('SET_MENUS', routerList);
        }
    }
}