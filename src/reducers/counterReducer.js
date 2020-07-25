import { COUNTERADD } from '../actions/counterAction.js';
let counterReducer = function(state, action) {
	if (action === undefined || !action.type) {
        return state;
    }

    switch (action.type) {
        case COUNTERADD:
            return { number: state.number + (action.amount||1) }
        default:
            return state;
    }
}

export default counterReducer;