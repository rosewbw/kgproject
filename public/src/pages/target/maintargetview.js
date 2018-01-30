import React from 'react';
import ReactDOM from 'react-dom';
import {Target} from './maintarget.js'
import './maintarget.css'
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
            transPosition:{
                left:0,
                right:0
            },
            flag:false
        };
        this.defaultTransform = {};//[0,0];
        this.defaultTransformOrigin = {};//[450,240];
        this.clickPosition = {};
        this.transformPosition = {};
        // this.transformOrigin = [];
        // this.transformOffset = [];
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseWheel = this.onMouseWheel.bind(this);
    }
    onMouseDown(e){
        let newState = {};
        let event = e||window.event;
        let ele = event.srcElement||event.target;
        let transformElement = ReactDOM.findDOMNode(this.refs.targetTransform);
        if(event.target.id === 'target'){
            this.clickPosition = {
                left:event.clientX,
                top:event.clientY
            };
            this.transformPosition = {
                left:$(transformElement).offset().left,
                top:$(transformElement).offset().top
            };
            newState.flag = true;
            this.setState(newState);
        }

    }
    onMouseMove(e){
        if(this.state.flag){
            let event = e||window.event;
            let transformElement = ReactDOM.findDOMNode(this.refs.targetTransform);
            // let transformElementStyle = document.defaultView.getComputedStyle(transformElement,null);
            let currentPosition = getClickPosition(event);
            let offsetLeft = this.transformPosition.left + currentPosition.left - this.clickPosition.left;
            let offsetTop = this.transformPosition.top + currentPosition.top - this.clickPosition.top;
            console.log(this.transformPosition.top , currentPosition.top , this.clickPosition.top)
            $(transformElement).offset(function (index, oldoffset) {
                return {
                    left:offsetLeft,
                    top:offsetTop
                }
            });
            let transformOffset = getElementPositionOfWindow(transformElement);
            let originX = (parseInt(this.defaultTransformOrigin.left) + this.defaultTransform.left - transformOffset.left)/this.state.scale;
            let originY = (parseInt(this.defaultTransformOrigin.top) + this.defaultTransform.top - transformOffset.top)/this.state.scale;
            transformElement.style.transformOrigin =`${originX}px ${originY}px 0`;
        }
    }
    onMouseUp(e){
        let newState = {};
        let event = e||window.event;
        let transformElement = ReactDOM.findDOMNode(this.refs.targetTransform);
        newState.mousePosition = {
            left:event.clientX,
            top:event.clientY
        };
        newState.transPosition = {
            left:transformElement.offsetLeft,
            top:transformElement.offsetTop
        };
        newState.flag = false;
        this.setState(newState);
}
    onMouseWheel(e){
            let newState = {};
            newState.scale = e.deltaY < 0 ? this.zoomIn(this.state.scale):this.zoomOut(this.state.scale);
            this.setState(newState)
    }
    componentDidMount(){
        let transformElement = ReactDOM.findDOMNode(this.refs.targetTransform);
        let transformElementStyle = document.defaultView.getComputedStyle(transformElement,null);
        this.defaultTransformOrigin = {
            left:transformElementStyle.transformOrigin.match(/\d+/g)[0],
            top:transformElementStyle.transformOrigin.match(/\d+/g)[1]
        };
        this.defaultTransform = {
            left:transformElement.offsetLeft,
            top:transformElement.offsetTop
        };
        document.addEventListener('mousemove', (e) => {
            this.onMouseMove(e);
        }, false);
        document.addEventListener('mouseup', (e) => {
            this.onMouseUp(e);
        }, false);
        ReactDOM.findDOMNode(this.refs.target).addEventListener('mousewheel', (e) => {
            this.onMouseWheel(e);
        }, false);
        console.log("componentDidMount")

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
        return(
            <div id="target" ref="target" className="target" onMouseDown={this.onMouseDown} data-id="target">
                <div id="target-transform" className="targetTransform" ref="targetTransform" >
                    <TeachUnit scale={this.state.scale}/>
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

