import React, { Component } from 'react';
import Home from 'views/Home';
import Page404 from 'views/Page404';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from 'components/Loading';
import 'components/style/main.less';

class App extends Component {
    render() {
       const {isLoading}=this.props;
        return (
            <div className="app">
                  <Switch>
                      <Route path="/" component={Home} />
                      <Route path="*" component={Page404} />
                  </Switch>
                 <Loading show={isLoading} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const {isLoading} = state.isLoading;
    return {
            isLoading
        }
};
export default connect(mapStateToProps)(App);
