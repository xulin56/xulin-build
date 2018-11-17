import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import './style.less';

@autobind
export default class AcrossScroll extends React.Component{
    static props = {
        dataList : PropTypes.array.isRequired,//数据list
        upPull : PropTypes.func,//上拉回调
        downPull : PropTypes.func,//下拉回调
        isFoot : PropTypes.boolean,//是否显示上拉提示
        leftPull :  PropTypes.func,//左拉回调
        rightPull :  PropTypes.func,//右拉回调
        more : PropTypes.string,//左滑距离
        noDate : PropTypes.boolean
    }
    static defaultProps = {
        dataList : ['列表','列表','列表','列表','列表','列表','列表','列表','列表','列表','列表','列表'],
        upPull : function(){},
        downPull : function(){},
        isFoot : true,
        more : '0rem'
    }
    startx = null;
    starty = null;
    //接触屏幕
    touchStart(e) {
        this.startx = e.touches[0].pageX;
        this.starty = e.touches[0].pageY;
        // console.log(this.startx,this.starty)
    }
    //触摸点和离开点连线与[x轴角度][3]
    getAngle(angx,angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    }
    //根据接触和离开判断方向 1向上 2向下 3向左 4向右 0未发生滑动（[Math.abs][4]）
    getDirection(startx, starty, endx, endy) {
        let angx = endx - startx;
        let angy = endy - starty;
        let result = 0;

         //如果滑动距离太短
         if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
        let angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }

        return result;
    }
    //离开屏幕（[e.changedTouches][2]）
    touchEnd(e) {
        let endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        let direction = this.getDirection(this.startx, this.starty, endx, endy);
        switch (direction) {
            case 0:
                console.log("未滑动！");
                break;
            case 1:
                // console.log("向上！");
                this.uploadData();
                break;
            case 2:
                // console.log("向下！");
                this.downloadData();
                break;
            case 3:
                console.log("向左！");
                this.leftloadData();
                break;
            case 4:
                console.log("向右！");
                this.rightloadData();
                break;
            default:
        }
    }
    uploadData() {
      const {upPull,isFoot} = this.props;
      let dataHeight = this.refs.onPullUp.clientHeight;
      let scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
      let screenHeight = document.documentElement.clientHeight;
      const h = 10;//自定义距离底部多少时concat数据
      if (dataHeight - scrollHeight - h < screenHeight && isFoot) {
          upPull(dataHeight,scrollHeight,screenHeight)
      }
    }
    downloadData() {
      const {downPull} = this.props;
      downPull();
    }
    leftloadData() {
      const {leftPull} = this.props;
      leftPull();
    }
    rightloadData() {
        const {rightPull} = this.props;
        rightPull();
    }
    render(){
        const {dataList,isFoot,more,noDate} = this.props;
        return(
            <div className="across-scroll">
                <ul onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} ref="onPullUp" style={{"transform":`translate(${more},0)`,transition: noDate?"none":"transform 1.5s"}}>
                    {
                        dataList.map((item,index)=>{
                            return <li key={index}><img src='https://m.baidu.com/static/index/plus/plus_logo.png' alt=""/><span>{item+index}</span></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
