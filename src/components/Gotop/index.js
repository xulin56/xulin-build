import React from 'react';
import {autobind} from 'core-decorators';
import propType from 'prop-types';
import GOTOP from './images/ayk_11.png';
import './style.less';

@autobind
export default class Gotop extends React.Component{
    static props = {
        top : propType.number,//滚蛋多高开始出现
    }
    static defaultProps = {
       top : 400
    }
    state = {
        hideTop : false
    }
    isMoving = false;
    interval = null;
    backPosition = 0;
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
      if (this.interval) {
        clearInterval(this.interval)
      }
    }
    handleScroll () {
      this.setState({
          hideTop : window.pageYOffset > this.props.top
      })
    }
    easeInOutQuad (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    }
    backToTop() {
      if (this.isMoving) return
      const start = window.pageYOffset
      let i = 0
      this.isMoving = true
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition)
          clearInterval(this.interval)
          this.isMoving = false
        } else {
          window.scrollTo(0, next)
        }
        i++
      }, 16.7)
    }
    render(){
      const {hideTop} = this.state;
        return(
            <div className="go-top">
            {
              hideTop &&
              <div className="content" onClick={this.backToTop}><img src={GOTOP} alt="返回顶部"/></div>
            }
            </div>
        )
    }
}
