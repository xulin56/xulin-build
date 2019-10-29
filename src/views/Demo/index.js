import React from 'react';
import {autobind} from 'core-decorators';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import API from 'js/api';
import * as actionCreators from './actions';

@autobind
export class Demo extends React.Component {
    state = {
        selectVal : '请选择语言'
    }
    componentWillMount() {
      let userName = '003';
      let password = '123456';
      API.post(`/bfa/login?staffNum=${userName}&password=${password}`).then(res=>{
          console.log(res.data)
      })
    }
    render() {
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
