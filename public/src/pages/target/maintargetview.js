import React from 'react';
import ReactDOM from 'react-dom';
import {Target} from './maintarget.js'
import styles from './maintarget.css'
import {TeachUnit} from '../component/teachunit.js'
import {getElementPositionOfWindow,getClickPosition} from '../commonfun/commonfun.js'

class MainTarget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            scale:1,
            mousePosition:{
                left:0,
                top:0
            },
            flag:false
        };
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this)
    }
    onMouseDown(e){
        let newState = {};
        let event = e||window.event;
        let ele = event.srcElement||event.target;
        newState.mousePosition = {
            left:event.clientX,
            top:event.clientY
        };
        newState.flag = true;
        ReactDOM.findDOMNode(this.refs.target).addEventListener('mousemove', (e) => {
            this.onMouseMove(e);
        }, false);
        this.setState(newState);
    }
    onMouseMove(e){
        if(this.state.flag)
        let event = e||window.event;
        let transformElement = ReactDOM.findDOMNode(this.refs.target);
        let mousePosition = getClickPosition(event);
        let transformPosition = getElementPositionOfWindow(transformElement);
    }
    onMouseWheel(e){
        console.log(e);
        let newState = {};
        newState.scale = e.deltaY < 0 ? this.zoomIn(this.state.scale):this.zoomOut(this.state.scale);
        this.setState(newState)
    }
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.target).addEventListener('mousewheel', (e) => {
            this.onMouseWheel(e);
        }, false);

    }
    zoomIn(scale){
        scale < 1.95 ? scale += 0.05 : '';
        let target = ReactDOM.findDOMNode(this.refs.targetTransform);
        target.style.transform = 'scale('+this.state.scale+')';
        return scale;
    }
    zoomOut(scale){
        scale > 0.6 ? scale -= 0.05 : '';
        let target = ReactDOM.findDOMNode(this.refs.targetTransform);
        target.style.transform = 'scale('+this.state.scale+')';
        return scale;
    }
    render(){
        console.log(styles.targetTransform);
        return(
            <div id="target" ref="target" className="target" onMouseDown={this.onMouseDown.bind(this)}>
                <div id="target-transform" className="targetTransform" ref="targetTransform" >
                    <TeachUnit/>
                </div>
            </div>
        )
    }
}

MainTarget.propTypes = {

};
MainTarget.defaultProps = {

};


export {MainTarget}

