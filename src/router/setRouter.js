import admin from './admin'

export default (ev,routerList) => {
    ev.$router.addRouter(routerList)
}