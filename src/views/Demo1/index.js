import React from 'react';
import {autobind} from 'core-decorators';
import Pagination from 'rc-pagination';
import Calendar from 'components/Calendar';
import {HInput} from 'components/Form';
import SubNav from 'components/SubNav';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
import ScrollNotice from 'components/ScrollNotice';

@autobind
export default class Demo1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            count : 70,
            selectDateVal : '请选择日期',
            dataList : [{text:'2017年2月28日 - 而且专门用来监控对象属性变化的Object.observe方法',link:'/demo'}],
            eye : 'B-Copy',
            tel : '',
            pw : ''
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
    eyeToggle(){if(this.state.eye === 'B-Copy'){this.setState({eye:'B-Copy1'})}else {this.setState({eye : 'B-Copy'})}}
    render(){
        const {count,selectDateVal,dataList,eye,tel,pw} = this.state;
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
                <ScrollNotice
                    dataList={dataList}
                />
                <HInput type="text" icon='B-3' append={eye} value={tel} changeVal={(name,tel)=>this.setState({tel})} eyeToggle={this.eyeToggle} clearVal={()=>this.setState({tel:''})} />
              <HInput type="text" icon='B-3' append={eye} value={pw} changeVal={(name,pw)=>this.setState({pw})} eyeToggle={this.eyeToggle} clearVal={()=>this.setState({pw:''})} />
            </div>
        )
    }
}
