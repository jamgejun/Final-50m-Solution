import setRouter from '../router/setRouter'

export default {
    state: {
        userToken:'',
        permissionList: [],
        routesList: [],
        dictorys: {},
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
        SET_ROUTES(state, routesList) {
            state.routesList = routesList;
        },
        SET_DICTORYS(state, dictorys) {
            state.dictorys = dictorys
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
        },
        setRoutes({commit}, routesList) {
            commit('SET_ROUTES', routesList)
        },
        setDictorys({commit}, dictorys) {
            commit('SET_DICTORYS', dictorys)
        }
    }
}