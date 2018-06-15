import React from 'react';
import {autobind} from 'core-decorators';
import {HInput} from 'components/Form';
import HButton from 'components/HButton';
import {browser} from 'src';
import md5 from 'md5';
import API from 'js/api';
import './style.less';
import {toast,lStore,alerts} from 'js/yydjs';

@autobind
export default class Login extends React.Component{
    state = {
      val : '',
      passVal : '',
      eye : 'B-Copy',
      userImg : require('images/user_img.svg'),
      localImg : '',
      localName : '',
      dim : true,
      autoFocus : 'autoFocus',
    };
    componentDidMount(){
        if(lStore.get('userInfor')){
        let info = lStore.get('userInfor');
          this.setState({
          userImg : info.headImg,
          val : info.userName,
          localImg : info.headImg,
          localName : info.userName
        })
      }
    }
    eyeToggle(){
      if(this.state.eye === 'B-Copy'){
        this.setState({eye:'B-Copy1'})
      }else {
        this.setState({eye : 'B-Copy'
      })
    }};
    changeUserName(val) {
      const {localName,localImg} = this.state;
      this.setState({
        val
      });
      if(val!=localName){
        this.setState({
          userImg : require('images/user_img.svg'),
        })
      }else {
        this.setState({
          userImg : localImg
        })
      }
      if(val.length>0){
        this.setState({
          dim : false
        });
      }
    }
    changePassword(val) {
      this.setState({
        passVal : val,
      })
      if(val.length>0){
        this.setState({
          passVal : val,
          dim : false
        })
      }
    }
    login(){
      const {passVal,val} = this.state;
      const telReg = /^[1][3-9][0-9]{9}$/;
      if(val.length>0){
        this.setState({
          dim : false
        })
      };
       if(!telReg.test(val)) {
            alerts('手机号格式不正确')
        }else {
            API.MobileLogin({
              mobile:val,
              password:md5(passVal)
            },(res)=>{
              if(res.code == '0000'){
                  const {token,headImg} = res.data;
                  const {val} = this.state;
                  lStore.set('token',token);
                  let jsonInfor = {
                      headImg,
                      userName:val,
                  }
                  lStore.set('userInfor',jsonInfor);
                browser.push('/account');
              }else if(res.code == 'CU0020') {
                  const {errorCount} = res.data
                  if(errorCount>0){
                      alerts('您的密码错误，剩余可输入'+errorCount+'次')
                  }else {
                      alerts('剩余次数已用完,请谨慎输入')
                  }
              }
            })
        }


    }
    render(){
      const {val,eye,passVal,userImg,dim,autoFocus} = this.state;
        return(
            <div className="login">
                <div className="login-user">
                    <HInput type="number" icon="B-3" placeholder="手机号登录" value={val} autofocus={true} changeVal={(name,val)=>this.changeUserName(val)} clearVal={()=>this.setState({val:'',autoFocus : 'autoFocus'})} />
                </div>
                <div className="login-password">
                  <HInput type="password" icon='A-3' placeholder='输入密码' append={eye} value={passVal} changeVal={(name,val)=>this.changePassword(val)} eyeToggle={this.eyeToggle} clearVal={()=>this.setState({passVal:''})} />
                </div>
                <HButton type="confirm" text="登录" size="big" dim={dim} onClick={this.login} />
                <div className="get-account">
                    <button onClick={(ev)=>{browser.push('/login/register')}}>快速注册</button>
                    <button onClick={(ev)=>{browser.push('/login/forget_password')}}>忘记密码？</button>
                </div>

            </div>
        )
    }
}
