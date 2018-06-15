import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Page404 from 'views/Page404';
import Good from 'views/goods';
import Welcome from 'views/welcome';
import Demo from 'views/Demo';
import Login from 'views/Login';

export default class Home extends React.Component{

    render(){
        return(
            <div className="home">
                <Switch>
                    <Route path='/goods' component={Good} />
                    <Route path='/welcome' component={Welcome} />
                    <Route path='/demo' component={Demo} />
                    <Route path='/login' component={Login} />
                    <Route path="**" component={Page404} />
                </Switch>
            </div>
        )
    }
}
