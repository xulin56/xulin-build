import thunkMiddleware from 'redux-thunk';
import { applyMiddleware,createStore,combineReducers } from 'redux';
import {APPreducers} from 'views/App/reducers';
import { demoReducers } from 'views/Demo/reducers';
import {I18nReducers} from 'components/I18n/reducers';

const rootReducer = combineReducers({
    APPreducers,
    demoReducers,
    I18nReducers
});
export default createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);
