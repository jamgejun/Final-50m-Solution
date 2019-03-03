import Home from '../views/Home.vue';

export const setRouter = (ev,routerList) => {
    let parentList = routerList.filter((v) => ( v.parentId === 0 ) )
    let childrenList = routerList.filter((v) => ( v.url !=='' ) )
    let preRouter = [];
    for(let i = 0; i < parentList.length; i++ ) {
        preRouter[i] = {
            path: '/',
            component: Home,
            meta: {
                id: parentList[i].id,
                parentId: parentList[i].parentId,
                name: parentList[i].name,
                indexNum: parentList[i].indexNum,
                icon: parentList[i].icon
            },
            children: []
        }
        for( let j=0; j < childrenList.length; j++ ) {
            if ( parentList[i].id === childrenList[j].parentId ) {
                let reg = new RegExp('/views')
                let path = childrenList[j].url.replace(reg, '')
                console.log(path)
                preRouter[i].children.push({
                    path: childrenList[j].url,
                    meta: {
                        name: childrenList[j].name,
                        parentId: childrenList[j].parentId,
                        icon: childrenList[j].icon,
                        permission: childrenList[j].permission
                    },
                    component: (resolve) => require([`../views${path}.vue`], resolve)
                    
                })
            }   
        }
    }
    for (let k=0 ;k<preRouter.length; k++) {
        ev.$router.options.routes.push(preRouter[k])
    }
    // 添加路由
    ev.$router.addRoutes(ev.$router.options.routes)
    // 设置菜单
    ev.$store.dispatch('setRoutes', preRouter);
    console.log(ev.$store.state.routesList);
}