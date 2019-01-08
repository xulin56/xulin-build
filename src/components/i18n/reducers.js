import {fromJS} from 'immutable';

const initialState = fromJS({
    lang : 'zh'
});
const reducers = {
    GETLANG(state,{lang}) {
      return state.set('lang', lang);
    },
};
export const  I18nReducers = (state = initialState, {type, param}) => {
    if (reducers[type]) {
        return reducers[type](state, param);
    } else {
        return state;
    }
};
