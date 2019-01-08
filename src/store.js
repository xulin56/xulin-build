import thunkMiddleware from 'redux-thunk';
import { applyMiddleware,createStore,combineReducers } from 'redux';
import { demoReducers } from 'views/Demo/reducers';

const rootReducer = combineReducers({
    demoReducers,
});
export default createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);
