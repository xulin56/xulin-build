import {LANG} from 'store/action/i18n';

export const lang = (state,action)=>{
    switch(action.type) {
        case LANG :
            return {
                ...state,
                lang : action.lang
            }
        default :
            return {
                lang : 'zh'
            }
    }
}
