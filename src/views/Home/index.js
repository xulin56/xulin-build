import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Page404 from 'views/Page404';
import Demo from 'views/Demo';

export default class Home extends React.Component{

    render(){
        return(
            <div className="home">
                <Switch>
                    <Route exact path='/' component={Demo} />
                    <Route path='/demo' component={Demo} />
                    <Route path="**" component={Page404} />
                </Switch>
            </div>
        )
    }
}
