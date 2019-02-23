export default store = {
    state: {
        UserToken:''
    },
    getters: {
        getToken: state => {
            return sessionStorage.getItem('token');
        }
    },
    mutations: {
        LOGIN_IN(state, token) {
            state.UserToken = token;
            // 在session中存储token值
            sessionStorage.setItem('token', token);
        },
        LOGIN_OUT(state) {
            state.UserToken = '';
        }
    },
    action: {
        login({commit}, token) {
            commit('LGOIN_IN', token)
        },
        loginOut({commit}) {
            commit('LOGIN_OUT');
        }
    }
}