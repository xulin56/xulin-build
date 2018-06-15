import React from 'react';
import {autobind} from 'core-decorators';
import Headertitle from 'components/Header';
import {browser} from 'src';
import {HInput} from 'components/Form';
import HButton from 'components/HButton';
import API from 'js/api';
import {alerts} from 'js/yydjs';
import md5 from 'md5';
import './style.less';

@autobind
export default class ForgetPassword extends React.Component{
    componentDidMount(){

    }
    state = {
      eye : 'B-Copy',
      passVal : '',
      telVal : '',
      codeVal : '',
      errorHint : false,
      nameVal : '',
      ctrl : true,
      dim : true,
      registerContent : [
        {
          label : '输入您的手机号',
          hint : '',
          btnText : '发送验证码'
        },
        {
          label : '短信验证码',
          hint : '已向您的手机发送验证码',
          btnText : '下一步'
        },
        {
          label : '设置您的密码',
          hint : '建议密码设置数字和字母组合（6-20位,特殊字符除外）',
          btnText : '完成'
        },

      ],
      pageIndex : 0,
      time : 60,
    }
    timer = null;
    componentWillUnmount() {
        clearTimeout(this.timer)
    };
    eyeToggle(){
      if(this.state.eye === 'B-Copy'){
        this.setState({eye:'B-Copy1'})
      }else {
        this.setState({eye : 'B-Copy'
      })
    }};
    changeTel(val) {
      this.setState({telVal:val});
      if(val!=''){
        this.setState({dim:false})
      }
    };
    changeCode(val){
      this.setState({codeVal:val});
      if(val!=''){
        this.setState({dim:false})

      }
    };
    changePass(val){
      this.setState({passVal:val});
      if(val!=''){
        this.setState({dim:false});
      }
    }
    next() {
      const that = this;
      const {pageIndex,time,telVal,codeVal,passVal,nameVal} = this.state;
      var wait = 60;
      function intime() {
          if (wait == 0) {
              that.setState({
                time : '重新发送',
                ctrl : true
              });
              wait = 60;
          } else {
              wait--;
              that.setState({
                time : wait+'s',
                ctrl : false
              });
              that.timer = setTimeout(intime,
              1000);
          }
      }
      switch (pageIndex) {
        case 0 :
          const telReg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if(!telReg.test(telVal)){
            alerts('手机号格式不正确');
            this.setState({
              errorHint : true,
              dim : true
            });
            return;
          }else {
            this.setState({
              errorHint : false,
              dim : false
            });
          }
          API.SendForgetPwdCode({
            mobile : telVal,
          },(res)=>{
            if(res.code=='0000'){
              this.setState({
                pageIndex : 1,
                dim : true,
                time : 60,
              });
                clearTimeout(this.timer)
                intime();
            }
          });
          break;
        case 1 :
          API.CheckForgetPwdCode({
            mobile : telVal,
            code : codeVal
          },(res)=>{
            if(res.code == 'U0009'){
              this.setState({
                dim : true,
                errorHint : true,
              });
            }
            if(res.code=='0000'){
              this.setState({
                pageIndex : 2,
                dim : true,
                errorHint : false,
              });
            }
          });
          break;
        case 2 :
          let passReg = /^[a-zA-Z0-9]{6,20}$/;
          if(passReg.test(passVal)){
            API.EditPasswordByMobile({
              mobile : telVal,
              code : codeVal,
              password:md5(passVal)
            },(res)=>{
                this.setState({
                  dim : true,
                  errorHint : false,
                });
                alerts('设置成功',true);
                setTimeout(()=>{
                  browser.replace('/login');
                },500);
            });
          }else {
            alerts('密码格式不正确');
            this.setState({
               errorHint : true,
               dim : true,
            })
          }
          let password = md5(passVal);

          break;

        default :
          this.setState({
            pageIndex : 0
          });
          break;
      }
    }
    getCode() {
      const {telVal,ctrl} = this.state;
      const that = this;
      var wait = 60;
      if(ctrl){
        API.SendForgetPwdCode({mobile : telVal},(res)=>{
          this.setState({
            pageIndex : 1,
            time : 60,
          });
            clearTimeout(this.timer)
            intime();
        });
      }
      function intime() {
          if (wait == 0) {
              that.setState({
                time : '重新发送',
                ctrl : true,
              });
              wait = 60;
          } else {
              wait--;
              that.setState({
                time : wait+'s',
                ctrl : false
              });
              setTimeout(intime,
              1000);
          }
      }
    }
    change(val,index) {
      if(val!=''){
        this.setState({
          dim:false
        });
      }else {
        this.setState({
          errorHint:false,
          dim : true
        });
      }
      let valJson = {
        0 : 'telVal',
        1 : 'codeVal',
        2 : 'passVal',
        3 : 'nameVal'

      };
      this.setState({
        [valJson[index]]:val,
      });

    }
    goBack() {
      const {pageIndex} = this.state;
      if(pageIndex===0){
        browser.push('/login');
      }else {
        this.setState({
          pageIndex : this.state.pageIndex-1,
          dim : false,
          errorHint : false
        })
      }
    }
    render(){
      const {eye,passVal,registerContent,pageIndex,time,telVal,codeVal,nameVal,dim,errorHint} = this.state;
        return(
            <div className="forget-password">
              <Headertitle title="忘记密码" hideArrow={true} />
                {
                  registerContent.map((item,index)=>{
                    return (
                      <div key={index} >
                      {
                        index === pageIndex
                        ?
                        <div className="forget-content">
                          <h2>{item.label}</h2>
                          <p>{item.hint}</p>
                          <div className="register-password">
                            {
                                pageIndex === 0
                                ?
                                  <HInput type="number" icon="+86" value={telVal} errorHint={errorHint} changeVal={(name,val)=>this.change(val,pageIndex)} clearVal={()=>this.setState({telVal:'',errorHint:false,dim:true})} />
                                :
                                pageIndex === 1
                                ?
                                  <div className="get-code">
                                    <HInput type="tel" value={codeVal} changeVal={(name,val)=>this.change(val,pageIndex)} errorHint={errorHint} clearVal={()=>this.setState({codeVal:'',errorHint:false,dim:true})} />
                                    <div className="num" onClick={this.getCode}><span>{time}</span></div>
                                  </div>
                                :
                                pageIndex === 2
                                ?
                                  <HInput type="password" maxlength={20} append={eye} value={passVal} changeVal={(name,val)=>this.change(val,pageIndex)} errorHint={errorHint} eyeToggle={this.eyeToggle} clearVal={()=>this.setState({passVal:'',errorHint:false,dim:true})} />
                                :
                                ''
                            }
                          </div>
                          <HButton type='confirm' text={item.btnText} dim={dim} onClick={this.next} size="big"></HButton>
                        </div>
                        :
                        ''
                      }
                      </div>
                    )
                  })
                }
              <span onClick={this.goBack} className="go-back">
                  <i className={'icon iconfont icon-B-'}></i>
              </span>
            </div>
        )
    }
}
