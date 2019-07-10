function createStore(reducer, initState) {

    let state = initState;
    let listenArr = [];

    let dispatch = function(action) {
        state = reducer(state, action);
        // 发布
        listenArr.forEach((item) => {
            item && item(state);
        })
    };

    let getState = function() {
        return state;
    }

    // 订阅
    let sub = function(cbfn) {
        listenArr.push(cbfn);
    }


    return {
        dispatch,
        getState,
        sub
    }
}

// middleweare  
// let logger = (oldStore) => (dispatch) => (action) => { // action回调函数 是dispatch
//     console.log('before', oldStore.getState());
//     console.log(action);
//     dispatch(action);
//     console.log('after', oldStore.getState());
// }

// let thunk = (oldStore) => (dispatch) => (action_OR_newDispatch) => {
//     // 此处是dispatch   这块用于异步的
//     if (typeof action_OR_newDispatch === 'function') {
//         action_OR_newDispatch(dispatch);
//     } else {
//         // 此处是actions  同步的
//         dispatch(action_OR_newDispatch);
//     }
// }




let applyMiddleWare = (...middleweare) => (createStore) => (reducer, state) => {

    let store = createStore(reducer, state);

    let china = middleweare.map((item) => {
        return item(store)
    });

    let dispatch = china.reduce((a, b) => {
        return a(b(store.dispatch))
    });

    // dispatch = (action) => { // action回调函数 是dispatch
    //     console.log('before', oldStore.getState());
    //     console.log(action);


    //     dispatch(action); // 替换为以下
    
    //     ((action_OR_newDispatch) => {
    //         // 此处是dispatch   这块用于异步的
    //         if (typeof action_OR_newDispatch === 'function') {
    //             return action_OR_newDispatch(dispatch);
    //         } else {
    //             // 此处是actions  同步的
    //             dispatch(action_OR_newDispatch);
    //         }
    //     })(action);

    //     console.log('after', oldStore.getState());
    // };

    return {
        ...store,
        dispatch
    }
}





// let applyMiddleWare = (middleweare) => (createStore) => (reducer, state) => {

//     let store = createStore(reducer, state);

//     let dispatch = middleweare(store)(store.dispatch);

//     return {
//         ...store,
//         dispatch
//     }
// }























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