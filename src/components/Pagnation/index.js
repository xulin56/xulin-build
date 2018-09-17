import React from 'react';
import {autobind} from 'core-decorators';
import propTypes from 'prop-types';
import './style.less';

@autobind
export default class Pagnation extends React.Component{
    static props = {
        total : propTypes.number.isRequire,
        pageSize : propTypes.number.isRequire,
        nextCb : propTypes.func,
        preCb : propTypes.func,
    }
    static defaultProps = {
        total : 70,
        pageSize : 10,
    }
    state = {
        currentPage : 1,
        pageNum : 0,
        endPage : '',
        beginPage : 1,
        arrive : false,
        start : true
    }
    pageList = [];
    changeIndex = 1;
    showBeginPage = false;
    showEndPage = false;
    componentWillMount() {
        const {total,pageSize} = this.props;
        this.pageNum = Math.ceil(total/pageSize);
        if(this.pageNum>5){
          this.setState({
              endPage : this.pageNum,
          });
            this.showEndPage = true
            this.pageNum = 5;
        }else {
          this.setState({
              endPage : this.pageNum,
          });
        }
        for(var i=0;i<this.pageNum;i++){
            this.pageList.push(i+1)
        }
    }
    changePage(pages) {
        const {endPage} = this.state;
        if(pages>1){
            this.setState({
                start : false,
                arrive : false
            });
            if(pages === endPage) {
              this.setState({
                  start : false,
                  arrive : true
              });
            }
        }else {
            this.setState({
                start : true,
                arrive : false
            })
        };
        this.setState({
            currentPage : pages
        });
    }
    toEndPage() {
      const {endPage} = this.state;
      this.setState({
          currentPage :endPage,
          arrive : true
      });
      this.showBeginPage = true;
    }
    beginEndPage() {
      const {beginPage} = this.state;
      this.setState({
          currentPage :beginPage,
          start : true
      });
      this.showEndPage = true;
    }
    toNext() {
      const {currentPage,endPage} = this.state;
      const {nextCb} = this.props;
      if(currentPage<=endPage) {
        this.setState({
            currentPage : currentPage+1,
            start : false,
            arrive : false
        },()=>{
          if(this.state.currentPage === endPage){
            this.setState({
                arrive : true
            });
            nextCb(this.state.currentPage,endPage);
            return;
          }else {
            nextCb(this.state.currentPage,endPage);
          }
        });
      }else {
          this.setState({
              arrive : true
          })
      }
    }
    toPre() {
      const {currentPage,endPage} = this.state;
      const {preCb} = this.props;
      if(currentPage>1) {
          this.setState({
            currentPage : currentPage-1,
            start : false,
            arrive : false
          },()=>{
            if(this.state.currentPage==1){
              this.setState({
                  start : true
              },()=>{
                  preCb(this.state.currentPage,endPage)
              });
            }else {
                preCb(this.state.currentPage,endPage)
            }
          })
      }else {
          this.setState({
              start : true
          })
      }
    }
    step() {
        const {beginPage,endPage,currentPage} = this.state;
        const {total,pageSize} = this.props;
        if((total/pageSize)>5) {
            if(currentPage == this.pageList[0]){
                this.pageList = [];
                this.changeIndex -= 2;
                for(let i=0;i<this.pageNum;i++){
                    this.pageList.push(i+this.changeIndex)
                }
                this.showEndPage = true;
            }
            if(currentPage === this.pageList[this.pageList.length-1]) {
                this.pageList = [];
                this.showBeginPage = true;
                if(currentPage != endPage) {
                    this.changeIndex += 2;

                }else {
                    this.showEndPage = false;
                }
                for(let i=0;i<this.pageNum;i++){
                    this.pageList.push(i+this.changeIndex)
                }
                if(endPage === this.pageList[this.pageList.length-1]) {
                    this.showEndPage = false;
                }
            }
            if(currentPage === endPage){
                this.pageList = [];
                this.showEndPage = false;
                this.changeIndex = endPage-4;
                for(let i=0;i<this.pageNum;i++){
                    this.pageList.push(i+this.changeIndex)
                }
            }
            if(currentPage === beginPage) {
                this.pageList = [];
                this.showBeginPage = false;
                this.changeIndex = 1;
                for(let i=0;i<this.pageNum;i++){
                    this.pageList.push(i+this.changeIndex)
                }
            }
         }
    }
    render(){
        const {beginPage,endPage,currentPage,start,arrive} = this.state;
        this.step();
        return(
            <div className="pagnation">
                <span  className={start?"pre disabled":"pre"} onClick={()=>!start&&this.toPre()}>上一页</span>
                {
                    this.showBeginPage &&
                    <span className={currentPage===beginPage?"begin-page begin-actice":"begin-page"} onClick={this.beginEndPage}>{beginPage}</span>
                }
                <ul className="pages-list">
                    {
                        this.pageList.map((pages,index)=>{return pages<=endPage?<li key={index} className={currentPage===pages?'active':''} onClick={()=>this.changePage(pages)}>{pages}</li>:''})
                    }
                </ul>
                {
                  this.showEndPage &&
                  <span className="pages-omit">...</span>
                }
                {
                  this.showEndPage &&
                  <span className={currentPage===endPage?"end-page end-actice":"end-page"} onClick={this.toEndPage}>{endPage}</span>
                }
                <span className={arrive?"next disabled":"next"} onClick={()=>!arrive && this.toNext()}>下一页</span>
            </div>
        )
    }
}
