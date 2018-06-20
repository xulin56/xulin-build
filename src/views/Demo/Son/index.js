import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';

@autobind
export default class Son extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fresh : props.num
        };
    }
    static propTypes = {
        num : PropTypes.number
    };
    static defaultProps = {
      num : 0
    };
    componentWillUpdate(nextProps){
        if(nextProps.num===3){
            console.log('buy')
        }else {
            console.log('sell')
        }
    }
    render(){
        return(
            <div className="son">
                {this.props.num}
            </div>
        )
    }
}
