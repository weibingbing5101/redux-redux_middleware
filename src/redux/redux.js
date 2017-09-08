function createStore(reducer, initState) {

    let state = initState;
    let listenArr = [];

    let dispatch = function(action) {
        state = reducer(state, action);
        listenArr.forEach((item) => {
            item && item(state);
        })
    };

    let getState = function() {
        return state;
    }


    let sub = function(cbfn) {
        listenArr.push(cbfn);
    }


    return {
        dispatch,
        getState,
        sub
    }
}

let applyMiddleWare = (middleweare)=>(createStore)=>(reducer,state)=>{

	let store = createStore(reducer,state);

	let dispatch = middleweare(store)(store.dispatch);

	return {
		...store,
		dispatch
	}
}























// function applyMiddleWare(middleweare) {
//     return function(createStore) {
//         return function(reducer, state) {
//             let store = createStore(reducer, state);
//             let dispatch = middleweare(store)(store.dispatch);
//             return {
//                 ...store,
//                 dispatch
//             }
//         }
//     }
// }


export { createStore, applyMiddleWare };