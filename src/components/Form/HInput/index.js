import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import './style.less';

@autobind
export default class HInput extends Component {
  static props = {
      name:PropTypes.string.isRequired,
      changeVal : PropTypes.func.isRequired,
      value:PropTypes.string,
      placeholder:PropTypes.string,
      type: PropTypes.string,
      icon : PropTypes.string,
      clearVal : PropTypes.func,
      eyeToggle : PropTypes.func,
      append : PropTypes.string,
      disabled : PropTypes.bool,
      icon : PropTypes.string,
      errorHint : PropTypes.bool,
      onFocus : PropTypes.func,
      onBlur : PropTypes.func,
      maxlength : PropTypes.number,
      autofocus : PropTypes.bool,
      id :  PropTypes.string,
      className : PropTypes.string,
  };
  static defaultProps = {
      placeholder:'',
      type:'text',
      append : '',
      value : '',
      icon : '',
      disabled : false,
      errorHint : false,
      autofocus : false,
      maxlength : 2000000
  };
  state = {
    hideClose : false,
    showClearBtn : true
  }
  formInput=null;
  timer=null;
  timer1=null;

  componentWillUnmount(){
    clearTimeout(this.timer);
    clearTimeout(this.timer1);
  }

  getVal(e) {
      const { changeVal,name,clearVal,append } = this.props;
      let {value}=e.target;
      let onOff=true;
      if(value&&clearVal&&!this.state.showClearBtn){
        this.getFocus();
      }
      changeVal(name,value);
  }
  getBlur() {
      clearTimeout(this.timer);
      this.timer=setTimeout(()=>{
          this.setState({
              showClearBtn : false
          })
      },300);
  }
  getFocus() {
      const {clearVal} = this.props;

      clearVal && this.setState({
          showClearBtn : true
      });
  }
  forcus(){
    clearTimeout(this.timer1);
    this.timer1=setTimeout(()=>{
      this.formInput.focus();
    });
  }
  render() {
    const { className, value ,id, placeholder , eyeToggle , append , type , icon , disabled ,clearVal,errorHint,onFocus,onBlur,maxlength,autofocus} = this.props;
    const {showClearBtn} = this.state;

    return (
      <div className="form-input">
      {
        <input ref={(dom)=>this.formInput=dom} type={(append=='B-Copy'||append=='B-Copy1')?(append=='B-Copy'?'password':'url'):type} id={id} maxLength={maxlength} className={(errorHint?'error-hint ':'') + (icon!=''?'left-icon' : ''+className)} autoFocus={autofocus} placeholder={placeholder} value={value || ""} disabled={disabled} onChange={this.getVal} onFocus={()=>{onFocus&&onFocus();this.getFocus()}} onBlur={()=>{onBlur&&onBlur();this.getBlur()}} />
      }
        {
            icon === '+86'
            ?
              <div className="icon-wrap">{icon}</div>
            :
            icon != '+86' && icon != ''
            ?
              <div className="icon-wrap"><div className={"icon iconfont icon-" + icon}></div></div>
            :
            ""
        }
        <div className="icon-right">
            {
                clearVal && value.length>0 && showClearBtn
                    ?
                    <i
                      onClick={()=>{
                        clearVal&&clearVal();
                        this.forcus();
                      }}
                      className="iconfont icon-B-Copy6"
                    ></i>
                    :
                    ""
            }
            {
                append
                    ?
                    <i
                      onClick={()=>{
                        eyeToggle&&eyeToggle();
                        this.forcus();
                      }}
                      className={"iconfont icon-" + append}
                    ></i>
                    :
                    ''
            }
        </div>



      </div>
    )
  }
}
