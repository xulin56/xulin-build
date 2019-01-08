import thunkMiddleware from 'redux-thunk';
import { applyMiddleware,createStore,combineReducers } from 'redux';
import {APPreducers} from 'views/App/reducers';
import { demoReducers } from 'views/Demo/reducers';

const rootReducer = combineReducers({
    APPreducers,
    demoReducers,
});
export default createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);
