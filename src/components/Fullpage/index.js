import React from 'react';
import {autobind} from 'core-decorators';

@autobind
export default class Fullpage extends React.Component{
      state={
      bannerList:[                 //盒子背景颜色
          {
              bg:"#f6f6f6"
          },
          {
              bg:"#87d9e1"
          },
          {
              bg:"#8185d7"
          },
          {
              bg:"#e187cf"
          }
      ],
      offsetheight:document.documentElement.clientHeight,    //获取当前页面的高度
      fullPage:0,           //当前在第几页
      fullPageNum:false,        //是否在滑动
    }
    componentDidMount(){
        //
        //添加鼠标滑动事件
        //
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll',this.scroll,false);
        }
        window.onmousewheel=document.onmousewheel=this.scroll;
    }
    pageInfo(index){
        this.setState({
            fullPage:index
        })
    }
    scroll(e){
      e=e || window.event;
      //
      //是否正在滑动
      //
      if(this.state.fullPageNum){
          return false;
      }
      //
      //   e.wheelDelta为负数时向下滑动
      //
      if(e.wheelDelta<0){
        //   console.log(11)
          if(this.state.fullPage>=3){
              return false
          }
          this.setState({fullPageNum:true})
          this.pageInfo(this.state.fullPage+1);
          //
          //  css设置动画事件为1000，所以等到1000ms后滚动状态为false
          //
          setTimeout(()=>{
              this.setState({fullPageNum:false})
          },1000)
      //
      //   否则就是向上划
      //
      }else{
          if(this.state.fullPage<=0){
              return false;
          }
          this.setState({fullPageNum:true});
          this.pageInfo(this.state.fullPage-1);
          setTimeout(()=>{
              this.setState({fullPageNum:false})
          },1000)
      }
    }
    render(){
        let fullPage=this.state.bannerList.map((i,index)=>{
            return <div key={index} className={"page"+index} style={{'height':this.state.offsetheight+'px','background':i.bg}}></div>
        })     //使用map来循环添加dom
        let fullList=this.state.bannerList.map((i,index)=>{
            return <div key={index} className={this.state.fullPage==index?'color':''} onClick={()=>this.pageInfo(index)}></div>
        })
        return(
            <div className="fullpage">
            <div className="section" style={{'height':this.state.offsetheight+'px'}}>
                  <div className="container" style={{'transform': 'translate3d(0px,-'+ this.state.fullPage*this.state.offsetheight +'px, 0px)'}}>
                    <div className="page1" style={{'height':this.state.offsetheight+'px'}}>page1</div>
                    <div className="page2" style={{'height':this.state.offsetheight+'px'}}>page2</div>
                    <div className="page3" style={{'height':this.state.offsetheight+'px'}}>page3</div>
                </div>
                <div className="fixed-list">
                    {fullList}
                </div>
            </div>
            </div>
        )
    }
}
