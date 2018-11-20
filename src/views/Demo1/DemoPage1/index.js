import React from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import {Scene, Sprite} from 'spritejs';
import * as actions from 'store/action/i18n';
import I18n from 'components/i18n';
import HSelect from 'components/HSelect';
import {sStore} from 'js';
import './style.less';
@autobind
class DemoPage1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            demo : '1',
            selectVal : '请选择语言'
        };
    }
    componentWillMount() {
        const {dispatch} = this.props;
        switch(sStore.get('lang')){
            case 'zh' :
              this.change({label:'中文',value:'zh'});
              break;
            case 'en' :
              this.change({label:'英文',value:'en'});
              break;
            case 'fa' :
                this.change({label:'法语',value:'fa'});
                break;
            default :
                this.change({label:'英文',value:'en'});
                break;
        }
    }
    componentDidMount(){
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
    change(item){
        const {dispatch} = this.props;
        switch(item.value){
            case 'zh' :
                dispatch(actions.getLang('zh'));
                this.setState({
                    selectVal : '中文'
                });
                sStore.set('lang','zh');
            break;
            case 'en' :
                dispatch(actions.getLang('en'));
                this.setState({
                    selectVal : '英文'
                });
                sStore.set('lang','en');
            break;
            case 'fa' :
                dispatch(actions.getLang('fa'));
                this.setState({
                    selectVal : '法语'
                });
                sStore.set('lang','fa');
            break;
            default :
                dispatch(actions.getLang('en'));
                this.setState({
                    selectVal : '英文'
                });
                sStore.set('lang','en');
        }

    };
    nextCb(currentPage,endPage) {
        console.log(currentPage,endPage)
    }
    preCb(currentPage,endPage) {
        console.log(currentPage,endPage)
    }
    render(){
        const {demo,selectVal} = this.state;
        return(
            <div className="Demo-page1">
               <div id='demo-quickStart'></div>
                <div></div>
                <div className='demo-content'>
                    <button><I18n message={'HELLO'}></I18n></button>
                    <h4><I18n message={'SHIGE'}></I18n></h4>
                    <HSelect
                      val={selectVal}
                      selectCb={this.change}
                      selectList={[{label:'中文',value:"zh"},{label:'英文',value:"en"},{label:'法语',value:'fa'}]}></HSelect>
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
