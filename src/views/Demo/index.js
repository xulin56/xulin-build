import React from 'react';
import {autobind} from 'core-decorators';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './actions';

@autobind
export class Demo extends React.Component {
    render() {
        return <div className='demo'>
            {this.props.index}
            <button onClick={()=>this.props.add(1)}>click</button>
          </div>
    }
}

const mapStateToProps = (state) => {
    return state.demoReducers.toJS();
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
