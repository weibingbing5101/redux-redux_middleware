import React, { Component } from 'react';


// react-redux
import { Provider } from './react-redux/index.js';
import Counter from './Counter.js';

// redux
import { createStore, applyMiddleWare } from './redux/redux.js';
import counterReducer from './reducers/counterReducer.js';
import combineReducers from './redux/combineReducers.js';





// store 没有单独放到一个文件夹中
let state = {
    counterReducer: { number: 0 }
};

// 多个中间件写法
// 日志中间件
let logger = (oldStore) => (dispatch) => (action) => { // action回调函数 是dispatch
    console.log('logger before', oldStore.getState());
    console.log('logger dispatching', action);
    dispatch(action);
    console.log('logger after', oldStore.getState());
}

//                                                               {counterReducer: counterReducer}
// let store = applyMiddleWare(logger)(createStore)(combineReducers({ counterReducer }), state);




// redux-thunk   用于处理dispatch中的异步函数，此中间件不建议使用，正常业务流程，可以在action中写ajax，当ajax请求回来后再执行dispatch
let thunk = (oldStore) => (dispatch) => (action_OR_newDispatch) => {
    // 此处是dispatch   这块用于异步的
    if (typeof action_OR_newDispatch === 'function') {
        action_OR_newDispatch(dispatch);
    } else {
        console.log('thunk 同步 begin');
        // 此处是actions  同步的
        dispatch(action_OR_newDispatch);
        console.log('thunk 同步 begin');

    }
}

// 不使用中间件的写法
// let store = createStore(combineReducers({ counterReducer }),state)

// 使用中间件的写法
// let store = applyMiddleWare(thunk)(createStore)(combineReducers({ counterReducer }),state);



let store = applyMiddleWare(thunk, logger)(createStore)(combineReducers({ counterReducer }), state);




































class App extends Component {
    render() {
        return (
            // 这块是一个facc
            <Provider store={store}>
                <Counter />
            </Provider>
        );
    }
};

export default App;















// 
// 
//