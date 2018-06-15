import React from 'react';
import {autobind} from 'core-decorators';
import {Route} from 'react-router-dom';
import {browser} from 'src';
import LoignIndex from './Login';
import Register from './Register';
import ForgetPassword from './ForgetPassword';

@autobind
export default class Login extends React.Component{
    render(){
        const {pathname} = browser.location;
        return(
            <div className="Login">
                {
                   (pathname == '/login' || pathname == '/login/') && <LoignIndex />
                }
                <Route path="/login/register" component={Register} />
                <Route path="/login/forget_password" component={ForgetPassword} />
            </div>
        )
    }
}
