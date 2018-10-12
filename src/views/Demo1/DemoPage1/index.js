import React from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import {Scene, Sprite} from 'spritejs';
import * as actions from 'store/action/i18n';
import I18n from 'components/i18n';
import Select from 'components/Select';
import {sStore} from 'js';
import './style.less';
@autobind
class DemoPage1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            demo : '1'
        };
    }

    componentDidMount(){
        if(sStore.get('langIndex')){
            this.change('demo',sStore.get('langIndex'))
        }
        const scene = new Scene('#demo-quickStart', {viewport: [770, 200], resolution: [3080, 800]})

        const layer = scene.layer()

        const robot = new Sprite('https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png')

        robot.attr({
            anchor: [0, 0.5],
            pos: [0, 100],
        });

        robot.animate([
            {pos: [0, 0]},
            {pos: [0, 300]},
            {pos: [2700, 300]},
            {pos: [2700, 0]},
        ], {
            duration: 5000,
            iterations: Infinity,
            direction: 'alternate',
        })

        layer.append(robot)

    }
    change(name,value){
        this.setState({[name]:value});
        sStore.set('langIndex',value);
        const {dispatch} = this.props;
        switch(value){
            case 1 :
                dispatch(actions.getLang('zh'));
                sStore.set('lang','zh');
            break;
            case 2 :
                dispatch(actions.getLang('en'));
                sStore.set('lang','en');
            break;
            case 3 :
                dispatch(actions.getLang('fa'));
                sStore.set('lang','fa');
            break;
            default :
                dispatch(actions.getLang('zh'));
                sStore.set('lang','zh');
        }

    };
    nextCb(currentPage,endPage) {
        console.log(currentPage,endPage)
    }
    preCb(currentPage,endPage) {
        console.log(currentPage,endPage)
    }
    render(){
        const {demo} = this.state;
        return(
            <div className="Demo-page1">
               <div id='demo-quickStart'></div>
                <div></div>
                <div className='demo-content'>
                    <button><I18n message={'HELLO'}></I18n></button>
                    <h4><I18n message={'SHIGE'}></I18n></h4>
                    <Select
                        name="demo"
                        value={demo}
                        onChange={this.change}
                        placeholder='请输入选项'
                        config={{
                            options:[{
                                label:'中文',
                                value:1
                            },{
                                label:'英文',
                                value:2
                            },{
                                label:'法语',
                                value:3
                            }],
                        }
                        }
                    />
                </div>
              
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps)=>{
    return {
        lang : state.lang.lang
    }
}

export default connect(mapStateToProps)(DemoPage1);
