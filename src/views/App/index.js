import React, { Component } from 'react';
import Home from 'views/Home';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from 'components/Loading';
import * as actionCreators from './actions';
import 'style/main.less';

class App extends Component {
    render() {
       const {loadStatus}=this.props;
        return (
            <div className="app">
                  <Switch>
                      <Route path="/" component={Home} />
                  </Switch>
                 <Loading show={loadStatus} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.APPreducers.toJS();
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App
