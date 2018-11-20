import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {sStore} from 'js';
import './style.less';

@autobind
export default class HSelect extends React.Component{
    static props = {
        selectList:PropTypes.array.isRequire,
        val : PropTypes.string,
        selectCb : PropTypes.func,
    };
    static defaultProps = {
        selectList : [
            {
              label : '选择一',
              value : 0,
            },
            {
              label : '选择二',
              value : 1,
            },
            {
              label : '选择三',
              value : 2,
            },
            {
              label : '选择四',
              value : 3,
            }
        ],
    }
    state = {
      showSelectItem : false,
      selectVal : '请选择'
    }
    componentDidMount() {
        this.setState((state,props)=>({
            selectVal : props.val
        }));
    }
    selectItem(item,index) {
        const {selectCb} = this.props;
        this.setState({
            selectVal : item.label,
            showSelectItem : false
        });
        selectCb && selectCb(item,index)
    }
    render(){
        const {selectList} = this.props;
        const {showSelectItem,selectVal} = this.state;
        return(
            <div className="h-select">
                <h3 onClick={()=>this.setState({showSelectItem : !showSelectItem})}><span>{selectVal}</span><i className="arrow"></i></h3>
                {
                  showSelectItem &&
                  <ul>
                    {
                        selectList.map((row,index)=>{
                            return <li key={index} onClick={()=>this.selectItem(row,index)}>{row.label}</li>
                        })
                    }
                  </ul>
                }
            </div>
        )
    }
}
