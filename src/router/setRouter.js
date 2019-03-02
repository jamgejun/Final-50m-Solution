import Home from '../views/Home.vue';

export const setRouter = (ev,routerList) => {
    let parentList = routerList.filter((v) => ( v.parentId === 0 ) )
    let childrenList = routerList.filter((v) => ( v.url !=='' ) )

    for(let i = 0; i < parentList.length; i++ ) {
        for( let j=0; j < childrenList.length; j++ ) {

        }
    }
    console.log(JSON.stringify(parentList));
    console.log(JSON.stringify(childrenList));
    // ev.$router.addRouter(routerList)
}