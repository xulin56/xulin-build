import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './style.less';

@autobind
export default class SubNav extends React.Component{
    static props = {
        nav : PropTypes.array
    }
    static defaultProps = {
        nav : [
            {
                title : '系统管理',
                menu : [
                      {
                          label : '账号管理',
                          menuNav : [
                                        {
                                            url : '/demo',
                                            name : '账号列表'
                                        },
                                        {
                                            url : '/demo1',
                                            name : '角色列表'
                                        }
                                    ]
                      }
                ]
            },
            {
                title : '版本管理',
                menu : [
                  {
                      label : '版本日志',
                      menuNav : [
                                    {
                                        url : '/demo',
                                        name : '账号列表'
                                    },
                                    {
                                        url : '/demo1',
                                        name : '角色列表'
                                    }
                                ]
                  }
                ]
            },
            {
                title : '版本管理',
                menu : [
                  {
                      label : '版本日志',
                      menuNav : [
                                    {
                                        name : '账号列表'
                                    },
                                    {
                                        name : '角色列表'
                                    }
                                ]
                  }
                ]
            },
        ]
    }
    state = {
        showMenuItem : -1
    }
    toggleItem(index) {
      const {showMenuItem} = this.state;
      if(index != showMenuItem){
          this.setState({showMenuItem:index})
      }else {
          this.setState({showMenuItem:-1})
      }
    }
    render(){
        const {nav} = this.props;
        const {showMenuItem} = this.state;
        return(
            <div className="sub-nav">
                {
                    nav.map((item,index)=>{
                        return <div className="nav" key={index}>
                                    <h2><span>{item.title}</span><i className="arrow"></i></h2>
                                    <dl>
                                        <dt onClick={()=>this.toggleItem(index)}><span>版本日志</span><i className="arrow"></i></dt>

                                      {
                                        showMenuItem == index
                                        ?
                                          item.menu[index].menuNav && item.menu[index].menuNav.map((row,idx)=>{
                                              return <dd key={idx}><Link to={row.url}>{row.name}</Link></dd>
                                          })
                                        :
                                          ''
                                      }
                                    </dl>
                                </div>
                    })
                }
            </div>
        )
    }
}
