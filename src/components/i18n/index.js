import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from './actions';
import {ZH,EN,FA} from 'language';
import {sStore} from 'js';

@autobind
class I18n extends React.Component{
    static propsTypes = {
        message : PropTypes.string.isRequired,
    };
    txt = '';
    componentWillMount(){
        let langObj = {
            'zh' : ZH,
            'en' : EN,
            'fa' : FA
        };
        if(sStore.get('lang')){
            let currentLang = sStore.get('lang');
            const {message} = this.props;
            this.txt = langObj[currentLang][message];
        }else {
            const {message} = this.props;
            this.txt = langObj['zh'][message]
        }

    }
    componentWillUpdate(state) {
        console.log(this.props)
        const {message} = this.props;
        switch (state.lang) {
            case 'zh' :
                this.txt = ZH[message];
                break;
            case 'en' :
                this.txt = EN[message];
                break;
            case 'fa' :
                this.txt = FA[message];
            break;
            default :
                this.txt = ZH[message];
        }
    }
    render(){
        const {txt} = this;
        return txt
    }
}
const mapStateToProps = (state) => {
    return state.I18nReducers.toJS();
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(I18n);
