import React from 'react';
import {autobind} from 'core-decorators';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import API from 'js/api';
import * as actionCreators from './actions';
import HSelect from 'components/HSelect';
import store from 'src/store';
import {sStore} from 'js';

@autobind
export class Demo extends React.Component {
    state = {
        selectVal : '请选择语言'
    }
    componentWillMount() {
      API.GetYearDate({
          code: 'bitcoin',
          startTime: 1496651489384,
          endTime: 1528187468359
      },(res)=>{
          if(res.code==='0000'){
          }
      });
    }
    render() {
        const {selectVal} = this.state;
        return <div className='demo'>
            <div>{this.props.row}</div>
            <div>{this.props.index}</div>
            <button onClick={()=>this.props.add(1)}>add</button>
            <button onClick={()=>this.props.mul(3)}>mul</button>
          </div>
    }
}

const mapStateToProps = (state) => {
    return state.demoReducers.toJS()
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
