import React from 'react';
import {autobind} from 'core-decorators';
import Headertitle from 'components/Header';
import {browser} from 'src';
import {Link} from 'react-router-dom';
import {HInput} from 'components/Form';
import HButton from 'components/HButton';
import {toast,lStore,alerts,strToJson} from 'js/yydjs';
import md5 from 'md5';
import API from 'js/api';
import './style.less';

@autobind
export default class Register extends React.Component{
    componentDidMount(){
        console.log(document.documentElement.clientHeight);
        document.querySelector('.register').style.height = (document.documentElement.clientHeight)+'px';
        let url = browser.location.search;
        if(url.indexOf('promoteCode=')!=-1){
            let params = strToJson();
            this.setState({
                promoteCode:params.promoteCode
            });
            lStore.set('promoteCode',params.promoteCode);
        }
        if(lStore.get('channelId')){
            this.setState({
                channelId:lStore.get('channelId')
            })
        }
        if(lStore.get('promoteCode')){
            this.setState({
                promoteCode:lStore.get('promoteCode')
            });
        }
        console.log(document.querySelector('.register').style.clientHeight);

    }
    state = {
        eye : 'B-Copy',
        passVal : '',
        telVal : '',
        codeVal : '',
        promoteCode : '',
        channelId : '',
        light : true,
        ctrl : true,
        closeHint : true,
        dim : true,
        errorHint : false,
        registerContent : [
            {
                label : '输入您的手机号进行注册',
                hint : '我们不会在任何地方泄漏您的号码',
                btnText : '发送验证码'
            },
            {
                label : '短信验证码',
                hint : '已向您的手机发送了验证码',
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
        }}
    next() {
        const that = this;
        const {pageIndex,time,telVal,codeVal,passVal,ctrl,promoteCode,channelId} = this.state;
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
                const telReg = /^[1][3-9][0-9]{9}$/;
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
                API.SendRegisterCode({mobile : telVal},(res)=>{
                    if(res.code == '0000'){
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
                API.CheckRegisterCode({
                    mobile : telVal,
                    code : codeVal,
                },(res)=>{
                    if(res.code == 'U0009'){
                        this.setState({
                            errorHint : true
                        })
                        return;
                    }
                    if(res.code == '0000'){
                        this.setState({
                            pageIndex : 2,
                            errorHint : false
                        });
                    }
                });
                break;
            case 2 :
                let passReg = /^[a-zA-Z0-9]{6,20}$/;
                if(passReg.test(passVal)){
                    API.MobileRegister({
                        mobile:telVal,
                        password:md5(passVal),
                        code:codeVal,
                        inviteCode : promoteCode,
                        channelId,
                    },(res)=>{
                        console.log(promoteCode);
                        const {token} = res.data;
                        let userInfor = {
                            userName :  telVal,
                        }
                        lStore.set('token',token);
                        lStore.set('userInfor',userInfor);
                        browser.push('/account');
                    });
                    this.setState({
                        errorHint : false
                    });
                }else {
                    this.setState({
                        errorHint : true
                    });
                    alerts('密码格式不正确');
                }
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
            API.SendRegisterCode({mobile : telVal},(res)=>{
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
    goBack() {
        const {pageIndex} = this.state;
        if(pageIndex===0){
            browser.push('/login');
        }else {
            this.setState({
                pageIndex : this.state.pageIndex-1,
                dim : false,
            })
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

        };
        this.setState({
            [valJson[index]]:val,
        });

    }
    render(){
        const {eye,passVal,registerContent,pageIndex,time,telVal,codeVal,light,dim,closeHint,errorHint} = this.state;
        return(
            <div className="register">
                <Headertitle title="注册" hideArrow={true} />
                    {
                        registerContent.map((item,index)=>{
                            return (
                                <div key={index} >
                                    {
                                        index === pageIndex
                                            ?
                                            <div className="register-content">
                                                <h2>{item.label}</h2>
                                                {
                                                    index ===1
                                                        ?
                                                        <p>已向您的尾号{telVal.substring(telVal.length-4,telVal.length)}的手机发送了验证码</p>
                                                        :
                                                        <p>{item.hint}</p>
                                                }
                                                <div className="register-password">
                                                    {
                                                        pageIndex === 0
                                                            ?
                                                            <HInput type="number" icon="+86" value={telVal} errorHint={errorHint} changeVal={(name,val)=>this.change(val,pageIndex)} clearVal={()=>this.setState({telVal:'',errorHint:false,dim:true})} />
                                                            :
                                                            pageIndex === 1
                                                                ?
                                                                <div className="get-code">
                                                                    <HInput type="number" value={codeVal} changeVal={(name,val)=>this.change(val,pageIndex)} errorHint={errorHint} clearVal={()=>this.setState({codeVal:'',errorHint:false,dim:true})} />
                                                                    <div className="num" onClick={this.getCode}><span>{time}</span></div>
                                                                </div>
                                                                :
                                                                pageIndex === 2
                                                                    ?
                                                                        <HInput type="password" append={eye} value={passVal} errorHint={errorHint} changeVal={(name,val)=>this.change(val,pageIndex)} eyeToggle={this.eyeToggle} clearVal={()=>this.setState({passVal:'',errorHint:false,dim:true})} />
                                                                    :
                                                                        ''
                                                    }
                                                </div>
                                                <HButton type='confirm' text={item.btnText} onClick={this.next} dim={dim} size="big"></HButton>
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
                {
                    pageIndex === 0
                        ?
                        <div className="goback-login">
                            <span>已有账号？</span>
                            <Link to='/login'>快速登录</Link>
                        </div>
                        :
                        ''
                }
            </div>
        )
    }
}
