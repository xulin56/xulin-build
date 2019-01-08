import {myAjax,dataType,lStore,isEmpty} from './index';
import store from 'store';
import {startLoading,stopLoading} from 'views/App/actions';
import {error} from 'components/Message';
import md5 from 'md5';
let baseUrl='/app/http/';

//对项目返回参数的处理，对ajax的再次封装
const ajaxWrap=function(json){
    myAjax({
        url:json.url,
        type:json.type,
        data:json.data,
        closeToForm:json.closeToForm,
        dataType:json.dataType,
        headers:json.headers,
        before:function(xhr){
            //loading显示处理
            store.dispatch(startLoading());
        },
        after:function(xhr){
            //loading隐藏处理
            store.dispatch(stopLoading());
        },
        success:function(data){
            //只要成功都会走
            //成功code已经失败code处理
            if(dataType(data)==="object"){
                json.success&&json.success(data);
                return;
            }
        },
        error:function(err){
            error(err+'网络异常');
            store.dispatch(stopLoading());
        },
    });
};

const severApi = function(url,json,cb,method){
    var addSign = '';
    if(!isEmpty(json)){
        for(var key in json){
            addSign += json[key];
        }
    }
    let sign = md5(addSign+'0123456789');
    let token = lStore.get('token') || '';
    ajaxWrap({
        url:baseUrl+url,
        type:method,
        data:json,
        dataType:'json',
        headers : {sign,token},
        success:function(res){
            cb&&cb(res);
        },
    });
};
const STATIC_URL = {
    userinfo : 'crm/user/info',//用户信息
    getYearDate : 'crm/market/getYearDate',//行情
};

module.exports = {
    CustomApi : function(url,params,cb) {
        severApi(url,params,cb)
    },
    UserInfo : function(params,cb){
        severApi(STATIC_URL.userinfo,params,cb)
    },
    GetYearDate : function(params,cb){
        severApi(STATIC_URL.getYearDate,params,cb)
    },
};
