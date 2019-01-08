import {fromJS} from 'immutable';

const initialState = fromJS({
    index: 4,
    row : 1,
});
const reducers = {
    MUL(state,{row}) {
      return state.set('row', state.get('row')*row);
    },
    ADD(state, {index}) {
        return state.set('index', state.get('index')+index);
    },
};
export const demoReducers = (state = initialState, {type, param}) => {
    if (reducers[type]) {
        return reducers[type](state, param);
    } else {
        return state;
    }
};
