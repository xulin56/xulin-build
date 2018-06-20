import React from 'react';
import {autobind} from 'core-decorators';
import API from 'js/api';
import Select from 'components/Select';
import {Tabs,TabsItem} from 'components/Tabs';
import {success,error} from 'components/Message';
import {Link} from 'react-router-dom';
import {browser} from 'src';
import Son from './Son';
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
        demo : '1',
        num : 1
    }
    tab(index) {

    }
    componentDidMount(){
        API.GetYearDate({
            code: 'bitcoin',
            startTime: 1496651489384,
            endTime: 1528187468359
        },(res)=>{
            if(res.code==='0000'){
                success('成功');
                console.log(JSON.parse(res.data))
            }
        })
    }
    change(name,value){
        this.setState({[name]:value});
    };
    changeLang() {
        error('成功切换')
    }
    buy() {
        this.setState({
            num : 3
        })
    }
    sell() {
        this.setState({
            num : 5
        })
    }
    render(){
      const {nav,demo,num} = this.state;
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
                <Tabs labels={nav} tabClick={this.tab}>
                    <TabsItem><div>34903493 <button onClick={_=>browser.push('/goods')}>跳转</button> </div></TabsItem>
                    <TabsItem><div>233434 <Link to='/welcome'>去吧</Link> </div></TabsItem>
                </Tabs>
                <button onClick={this.changeLang}>切换</button>
                <button onClick={this.buy}>buy</button>
                <button onClick={this.sell}>sell</button>
                <Son num={num} />
            </div>
        )
    }
}
