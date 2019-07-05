import React, { Component } from 'react';
import {COUNTERADD} from './actions/counterAction.js';

import {connect} from './react-redux/index.js';

class Add extends Component {
	// methods

	componentDidMount(){
			
			this.props.ajaxAdd()
	}

	render(){
		return(
			<div>
				<span>{this.props.number}</span> <br/>
				<span onClick={()=>{this.props.counterAdd()}}> + </span>
			</div>
		)
	}
};








// connect 高阶

export default connect((state)=>{
	return {
		number: state.counterReducer.number
	}
},(dispatch)=>{
	return {
		counterAdd: ()=>{
			dispatch({type:COUNTERADD})
		},
		ajaxAdd: ()=>{
			dispatch((dispatch)=>{
				setTimeout(()=>{
					dispatch({type:COUNTERADD})
				},3000)
			})
		}
	}
})(Add);













