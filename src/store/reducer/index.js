import {combineReducers} from 'redux';
import {good} from './goods';
import {isLoading} from './loading';
import {lang} from './i18n';

export const rootReducer = combineReducers({
    good,
    isLoading,
    lang
});
