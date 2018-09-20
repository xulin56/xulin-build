import React from 'react';
import {autobind} from 'core-decorators';
import TEST from '../images/test1.jpg';
import './style.less';

@autobind
export default class RotatePlay extends React.Component{
  state = {
    start : false,
    willdeg : 360+Math.random()*10*30,  //最终定格的角度
  }
  startPlay() {
      this.setState({
          start : true
      });
      setTimeout(()=>{   //旋转完成后跳出奖励
            const {willdeg} = this.state;
            if(willdeg%360>0&&willdeg%360<=90){
                console.log('一等奖');  //点击确定后才会执行下面的函数，即重新加载
            }
            if(willdeg%90>120&&willdeg%360<=180){
                console.log('2等奖');  //点击确定后才会执行下面的函数，即重新加载
            }
            if(willdeg%360>180&&willdeg%360<=270){
                console.log('3等奖');  //点击确定后才会执行下面的函数，即重新加载
            }
            if(willdeg%360>270&&willdeg%360<=360){
                console.log('4等奖');  //点击确定后才会执行下面的函数，即重新加载
            }
        },5000);
  }
  render(){
      const {willdeg,start} = this.state;
      return <div className="rotate-play">
                <div className="content" style={{transform:start?"rotate("+willdeg+"deg)":"rotate(0deg)"}}>
                	<div className="arrow"></div>
                </div>
                <button onClick={this.startPlay}>抽奖</button>
            </div>
  }
}
