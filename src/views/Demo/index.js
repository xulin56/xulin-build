import React from 'react';
import {autobind} from 'core-decorators';
import API from 'js/api';
import Select from 'components/Select';
import {Tabs,TabsItem} from 'components/Tabs';
import {Link} from 'react-router-dom';
import {browser} from 'src';
import './style.less';

@autobind
export default class Demo extends React.Component{
    state = {
      nav : [
        {
          label : '当前订单',
          icon : 'A-2'
        },
        {
          label : '历史订单',
          icon : 'A-2'
        },
      ],
      tabIndex : 0,
        demo : '1'
    }
    tab(index) {

    }
    componentDidMount(){
        API.UserInfo({},(res)=>{
            console.log(res)
        })
    }
    change(name,value){
        this.setState({[name]:value});
    }
    render(){
      const {nav,tabIndex,demo} = this.state;
        return(
            <div className="demo">
              <i className='iconfont icon-jiantou'></i>
              <h3>sldsljds <span>青丘之名的灵魂不会永远漂泊</span> </h3>
                <Select
                    name="demo"
                    value={demo}
                    onChange={this.change}
                    placeholder='请输入选项'
                    config={{
                        options:[{
                            label:'选项A',
                            value:1
                        },{
                            label:'选项B',
                            value:2
                        }],
                    }
                    }
                />
                <Tabs labels={nav} tabClick={this.tab} tabIndex={tabIndex}>
                    <TabsItem><div>34903493 <button onClick={_=>browser.push('/goods')}>跳转</button> </div></TabsItem>
                    <TabsItem><div>233434 <Link to='/welcome'>去吧</Link> </div></TabsItem>
                </Tabs>
            </div>
        )
    }
}
