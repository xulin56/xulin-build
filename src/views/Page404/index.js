import React from 'react';
import {autobind} from 'core-decorators';

@autobind
export default class Page404 extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="page-404">
404,访问的页面不存在!
            </div>
        )
    }
}
