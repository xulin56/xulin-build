import React from 'react';
import {autobind} from 'core-decorators';
import Pagination from 'rc-pagination';
import Calendar from 'components/Calendar';
import SubNav from 'components/SubNav';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';

@autobind
export default class Demo1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            count : 70,
            selectDateVal : '请选择日期'
        };
    }

    componentDidMount(){

    }
    onShowSizeChange(current, pageSize) {

    }
    onChange(current, pageSize) {
        console.log(current, pageSize)
    }
    selectDate(val) {
        console.log(val);
        this.setState({
            selectDateVal : val
        })
    }
    render(){
        const {count,selectDateVal} = this.state;
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
              <Calendar selectCb={this.selectDate} selectDateVal={selectDateVal}></Calendar>
              <div style={{width:"500px"}}><SubNav></SubNav></div>
            </div>
        )
    }
}
