import React, { Component } from 'react';
import { COUNTERADD } from './actions/counterAction.js';

import { connect } from './react-redux/index.js';

class Add extends Component {
    // methods

    componentDidMount() {

        // this.props.ajaxAdd()
    }

    render() {
        return (
            <div>
                <span>{this.props.number}</span> <br/>
                <span onClick={()=>{this.props.counterAdd()}}> + </span>
                <span onClick={()=>{this.props.ajaxAdd()}}>  ajaxAdd</span>
            </div>
        )
    }
};








// connect 高阶

export default connect((state) => {
    return {
        number: state.counterReducer.number
    }
}, (dispatch) => {
    return {
        counterAdd: () => {
            dispatch({ type: COUNTERADD })
        },
        ajaxAdd: () => {
            // dispatch((dispatch) => {
                console.log('thunk 异步 begin');
                setTimeout(() => {
                    dispatch({ type: COUNTERADD })
                    console.log('thunk 异步 3秒后 end  因为是定时器  所以这个只能写在定时器执行之后 不能写到中间件里面 logger是同步的写哪里无所谓');
                }, 3000)
            // })
        }
    }
})(Add);



























//