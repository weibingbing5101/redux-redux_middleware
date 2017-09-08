import React, { Component } from 'react';
import PropTypes from 'prop-types';




class Provider extends Component {
	// 设置父级context属性
	getChildContext(){
		return {store: this.props.store}
	}

	// methods
	render(){
		return this.props.children;
	}
};
// 设置父级context 数据类型
Provider.childContextTypes = {
	store: PropTypes.object
};






const connect = (mapStateToProps, mapDispatchToProps)=>(Components)=>{
	class Proxy extends Component {
		constructor(args) {
			super();
			// this.state = mapStateToProps(this.context.store.getState());   如果你没有初始化的值千万别这样写，会报错的，state最好不要{}空json
		}

		componentDidMount(){
			this.setState(mapStateToProps(this.context.store.getState()));
			this.context.store.sub((state)=>{
				this.setState(mapStateToProps(this.context.store.getState()))
			})
		}

		// methods
		render(){
			return(
				<Components {...this.state} {...mapDispatchToProps(this.context.store.dispatch)}/>
			)
		}
	}
	Proxy.contextTypes = {
	  	store: PropTypes.object
	}
	return Proxy;
};




export {Provider, connect};