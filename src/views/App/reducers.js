import {fromJS} from 'immutable';

const initialState = fromJS({
    loadStatus : false,
});

const reducers = {
    SET_LOADING(state,{loadStatus}) {
        return state.set('loadStatus',loadStatus)
    },
}

export const APPreducers = (state = initialState, {type, param}) => {
    if (reducers[type]) {
        return reducers[type](state, param);
    } else {
        return state;
    }
};
