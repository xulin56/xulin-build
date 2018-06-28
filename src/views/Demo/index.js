import React from 'react';
import {autobind} from 'core-decorators';
import API from 'js/api';
import Select from 'components/Select';
import {Tabs,TabsItem} from 'components/Tabs';
import {success,error} from 'components/Message';
import {Link} from 'react-router-dom';
import {browser} from 'src';
import Son from './Son';
import {getBottom,goTop,ScrollImgLeft,idDom,arrRandom,ScrollImgTop} from 'xulinjs';
import {Motion, spring} from 'react-motion';
import QRCode from 'qrcode';
import ReactSwipe from 'react-swipe';
import Player from 'xgplayer';
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
        num : 1,
        arr : [
            {id: 5, unique: 'unique_5'},
            {id: 4, unique: 'unique_4'},
            {id: 3, unique: 'unique_3'},
            {id: 2, unique: 'unique_2'},
            {id: 1, unique: 'unique_1'},
            {id: 0, unique: 'unique_0'},
        ],
        QRCODE : '',
        chandleId : '2343434'
    }
    tab(index) {

    }
    componentDidMount(){
        // let player = new Player({
        //     id:'vs',
        //     url:'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
        //     width:"98%",
        //     height:"100%"
        //     // poster: 'http://cfds.oss-cn-hongkong.aliyuncs.com/1529550842955.jpg',
        // });
        //
        // //多个视频支持
        // player.emit('resourceReady', [{name: '高清', url: '/mp4/',cname:'高清'}, {name: '超清', url: '/mp5/',cname:'超清'}]);
        const {chandleId} = this.state;
        QRCode.toDataURL('https://crmwww-dev.ga096.cn?chandleId='+chandleId)
            .then(url => {
                this.setState({
                    QRCODE : url
                })
            })
            .catch(err => {
                console.error(err)
            })
        ScrollImgLeft(idDom('scroll_begin'),idDom('scroll_end'),idDom('scroll_div'))
        ScrollImgTop(idDom('begin'),idDom('end'),idDom('roll'))
        getBottom(()=>{
            console.log('ok')
        });
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
    random(){
      console.log('rand');
      this.setState({
        arr : arrRandom(this.state.arr)
      })
    }
    render(){
      const {nav,demo,num,arr,QRCODE} = this.state;
        return(
            <div className="demo">
                {/*<ReactSwipe className="carousel" swipeOptions={{*/}
                    {/*continuous: true,*/}
                    {/*speed: 400,*/}
                    {/*auto: 3000,*/}
                    {/*stopPropagation: false,*/}
                    {/*callback: function(index, elem) {},*/}
                {/*}}>*/}
                    {/*<div><img src={BANNER} alt=""/></div>*/}
                    {/*<div><img src={BANNER} alt=""/></div>*/}
                    {/*<div><img src={BANNER} alt=""/></div>*/}
                {/*</ReactSwipe>*/}
                <div id="vs"></div>
              <i className='iconfont icon-jiantou'></i>
              <h3>sldsljds <span>青丘之名的灵魂不会永远漂泊</span> </h3>
                <img src={QRCODE} alt=""/>
              <ul>
              {
                arr.map((item,index)=>{
                  return (
                      <li key={index}>{item.unique}</li>
                  )
                })
              }
              </ul>

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
                <div id="animateEle" style={{width:'200px',height:'200px',background:'red'}}></div>
                <button onClick={this.random}>随机</button>
                <div id="scroll_div" className="fl">
                    <ul id="scroll_begin" className='list'>
                        <li>恭喜793765***获得 <span className="pad_right">50元巨人点卡奖励</span></li>
                        <li>恭喜30954059***获得 <span className="pad_right">904545元巨人点卡奖励</span></li>
                    </ul>
                    <div id="scroll_end"></div>
                </div>
                <Tabs labels={nav} tabClick={this.tab}>
                    <TabsItem><div>34903493 <button onClick={_=>browser.push('/goods')}>跳转</button> </div></TabsItem>
                    <TabsItem><div>233434 <Link to='/welcome'>去吧</Link> </div></TabsItem>
                </Tabs>
                <button onClick={this.changeLang}>切换</button>
                <button onClick={this.buy}>buy</button>
                <button onClick={this.sell}>sell</button>
                <div>胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就胜利大街老实交代胜利大街胜利大街胜利大街胜利大街历史的记录时间段杀伤力大家欧威43喔就</div>
                <button onClick={this.getScroll}>获取滚动条</button>
                <Son num={num} />
                <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
                    {value => <div>{value.x}</div>}
                </Motion>
                <button onClick={()=>goTop()}>返回顶部</button>
                <div className="roll" id="roll">
                    <ul id='begin'>
                        <li>第一个结构</li>
                        <li>第二个结构</li>
                        <li>第三个结构</li>
                        <li>第四个结构</li>
                        <li>第五个结构</li>
                        <li>第六个结构</li>
                        <li>第七个结构</li>
                        <li>第八个结构</li>
                    </ul>
                    <div id="end"></div>
                </div>
            </div>
        )
    }
}
