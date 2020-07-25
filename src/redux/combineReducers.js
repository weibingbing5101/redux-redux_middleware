
export default function combineReducers(reducer){
    return (state, action) => {
        let newState = {};
        for (var key in reducer) {
            newState[key] = reducer[key](state[key], action);
        }
        return newState;
    }
}