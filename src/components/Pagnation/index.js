import React from 'react';
import {autobind} from 'core-decorators';
import Pagination from 'rc-pagination';
import PropTypes from 'prop-types';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';

@autobind
export default class Pagnation extends React.Component {
    static props = {
        count : PropTypes.number,
        onShowSizeChange : PropTypes.func,
        onChange : PropTypes.func.isRequired,
        pageSize : PropTypes.number,
        cuurentPage : PropTypes.number
    };
    static defaultProps = {
        count : 100,
        pageSize : 10,
        cuurentPage : 1
    }
    ShowSizeChange(current,pageSize) {
        console.log(current,pageSize)
    }
    render() {
        const {count,onChange,pageSize,cuurentPage} = this.props;
        return(
            <div className="pagnation">
                <Pagination
                  showQuickJumper
                  showSizeChanger
                  defaultPageSize={pageSize}
                  defaultCurrent={cuurentPage}
                  onShowSizeChange={(current,pageSize)=>this.ShowSizeChange(current,pageSize)}
                  onChange={(current,pageSize)=>onChange && onChange(current,pageSize)}
                  total={count}
                  />
            </div>
        )
    }
}
