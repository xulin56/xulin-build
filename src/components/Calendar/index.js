import 'rc-calendar/assets/index.css';
import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import 'rc-select/assets/index.css';
import Select from 'rc-select';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import './style.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';
const en = window.location.search.indexOf('en') !== -1;

const now = moment();
if (en) {
  now.locale('en-gb').utcOffset(0);
} else {
  now.locale('zh-cn').utcOffset(8);

}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');


@autobind
export default class Calendar extends React.Component{
    static = {
        selectCb : PropTypes.func,
        selectDateVal : PropTypes.string
    }
    state = {
      type: 'month',
      showDate : false,

    };
    static defaultProps = {
        selectDateVal : moment().format(format)
    }
    componentWillMount() {
      const that = this;
      window.document.getElementById('root').addEventListener('click',(e)=>{
          const path = e.path || e.composedPath();
          if(!path.includes(this.showCalendar)){
              that.setState({
                  showDate : false
              })
          }
      });
    }
    onSelect(value) {
        const {selectCb} = this.props;
        selectCb && selectCb(value.format(format));
        this.setState({
            showDate : false,
        });
    }
    onTypeChange(type){
      this.setState({
        type,
      });
    }
    selectDate() {
        this.setState({
            showDate : true
        })
    }
    disabledCb(current) {
      const date = moment();
      date.hour(0);
      date.minute(0);
      date.second(0);
      return current.isAfter();  // can not select days before today
    }
    render(){
        const {showDate} = this.state;
        const {selectDateVal} = this.props;
        return(
            <div className="calendar">
                <div className="date-input" onClick={this.selectDate}>
                    <span>{selectDateVal}</span>
                    <i className="iconfont icon-rili"></i>
                </div>
                {
                    showDate
                    ?
                    <div style={{ zIndex: 1000, position: 'absolute' }} ref={(val)=>this.showCalendar=val}>
                      <FullCalendar
                        style={{ margin: 10 }}
                        Select={Select}
                        fullscreen={false}
                        onSelect={this.onSelect}
                        defaultValue={now}
                        locale={en ? enUS : zhCN}
                        disabledDate = {this.disabledCb}
                      />
                    </div>
                    :
                    ''
                }
            </div>
        )
    }
}
