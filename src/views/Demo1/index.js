import React from 'react';
import {autobind} from 'core-decorators';
import {Route} from 'react-router-dom';
import DemoPage1 from './DemoPage1'
import moment from 'moment';
import Pagination from 'rc-pagination';

import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';

const format = 'YYYY-MM-DD';
@autobind
export default class Demo1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            count : 70,
        };
    }

    componentDidMount(){

    }
    onShowSizeChange(current, pageSize) {

    }
    onChange(current, pageSize) {
        console.log(current, pageSize)
    }

    render(){
        const {count} = this.state;
        return(
            <div className="demo1">
              <Pagination
                showQuickJumper
                showSizeChanger
                defaultPageSize={10}
                defaultCurrent={1}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onChange}
                total={count}
                />
            </div>
        )
    }
}
