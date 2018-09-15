import React from 'react';
import {autobind} from 'core-decorators';
import propTypes from 'prop-types';
import './style.less';

@autobind
export default class Pagnation extends React.Component{
    static props = {
        total : propTypes.number.isRequire,
        pageSize : propTypes.number.isRequire,
    }
    static defaultProps = {
        total : 70,
        pageSize : 10,
    }
    state = {
        currentPage : 1,
        pageNum : 0,
        endPage : '',
        beginPage : 1
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
        this.setState({
            currentPage : pages
        });
    }
    toEndPage() {
      const {endPage} = this.state;
      this.setState({
          currentPage :endPage,
      });
      this.showBeginPage = true;
    }
    beginEndPage() {
      const {beginPage} = this.state;
      this.setState({
          currentPage :beginPage,
      });
      this.showEndPage = true;
    }
    render(){
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
        return(
            <div className="pagnation">
                <span className="pre">上一页</span>
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
                <span className="next">下一页</span>
            </div>
        )
    }
}
