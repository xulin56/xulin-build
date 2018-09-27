import 'rc-calendar/assets/index.css';
import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import 'rc-select/assets/index.css';
import Select from 'rc-select';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

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
    }
    state = {
      type: 'month',
    };
    onSelect(value) {
        const {selectCb} = this.props;
        selectCb && selectCb((value.format(format)));
    }
    onTypeChange(type){
      this.setState({
        type,
      });
    }
    render(){
        return(
            <div className="Calendar">
                <div style={{ zIndex: 1000, position: 'relative' }}>
                  <FullCalendar
                    style={{ margin: 10 }}
                    Select={Select}
                    fullscreen={false}
                    onSelect={this.onSelect}
                    defaultValue={now}
                    locale={en ? enUS : zhCN}
                  />
                  <FullCalendar
                    style={{ margin: 10 }}
                    Select={Select}
                    fullscreen
                    defaultValue={now}
                    onSelect={this.onSelect}
                    type={this.state.type}
                    onTypeChange={this.onTypeChange}
                    locale={en ? enUS : zhCN}
                  />
                </div>
            </div>
        )
    }
}
