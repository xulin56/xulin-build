import React from 'react';
import {autobind} from 'core-decorators';
import {Route} from 'react-router-dom';
import DemoPage1 from './DemoPage1'
@autobind
export default class Demo1 extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="demo1">
                <Route path='/demo1' component={DemoPage1} />
            </div>
        )
    }
}
