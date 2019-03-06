import Home from '../views/Home.vue';

export const setRouter = (ev,routerList) => {
    let parentList = routerList.filter((v) => ( v.parentId === 0 ) )
    let childrenList = routerList.filter((v) => ( v.type === 41 ) )
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
            if ( parentList[i].id === childrenList[j].parentId) {
                let reg = new RegExp('/views')
                let path = childrenList[j].url.replace(reg, '')
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
    // 使用选择排序，将菜单进行排序
    (() => {
        let len = preRouter.length
        let minIndex, temp
        for (let l = 0 ; l<len ; l++) {
            minIndex = l;
            for (let n = l + 1 ; n < len; n++) {
                if (preRouter[n].meta.indexNum < preRouter[minIndex].meta.indexNum) {
                    minIndex = n // 保存最小数据项
                }
            }
            temp = preRouter[l];
            preRouter[l] = preRouter[minIndex]
            preRouter[minIndex] = temp
        }
    })();
    for (let k=0 ;k<preRouter.length; k++) {
        ev.$router.options.routes.push(preRouter[k])
    }
    // 添加路由
    ev.$router.addRoutes(ev.$router.options.routes)
    // 设置菜单
    ev.$store.dispatch('setRoutes', preRouter);
}