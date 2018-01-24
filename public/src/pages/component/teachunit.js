import React from 'react';
import ReactDOM from 'react-dom';
import {getElementPositionOfWindow,getClickPosition} from '../commonfun/commonfun.js'

class TeachUnit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            left: 0,
            top: 0,
            currentX: 0,
            currentY: 0,
            flag: false
        };
    }
    startDrag(e){
        let newState={};
        let event=e||window.event;
        event.preventDefault();
        newState.currentX=event.clientX;
        newState.currentY=event.clientY;
        newState.flag=true;
        let computedStyle = document.defaultView.getComputedStyle(ReactDOM.findDOMNode(this.refs.dragBox), null);
        newState.left = computedStyle.left;
        newState.top = computedStyle.top;
        this.setState(newState);
    }

    move(event){

        let e = event ? event : window.event;
        let dBox = ReactDOM.findDOMNode(this.refs.dragBox);
        if (this.state.flag) {
            let mousePosition = getClickPosition(e);
            let transformPosition = getElementPositionOfWindow(dBox);
            dBox.style.left = (mousePosition.left - transformPosition.left)/this.props.scale;
            dBox.style.top = (mousePosition.top - transformPosition.top)/this.props.scale;

        }
    }
    endDrag() {
        let computedStyle = document.defaultView.getComputedStyle(ReactDOM.findDOMNode(this.refs.dragBox), null);
        this.setState({
            left: computedStyle.left,
            top: computedStyle.top,
            flag: false
        });
    }
    componentDidMount(){
        document.addEventListener('mousemove', (e) => {
            this.move(e);
        }, false);
        document.addEventListener('mouseup', (e) => {
            this.endDrag(e);
        }, false);
    }

    render(){
        return(
            <div id="dragBox" className="dragBox" ref="dragBox" onMouseDown={this.startDrag.bind(this)}>我可以被拖拽</div>
        )
    }
}

TeachUnit.propTypes = {

};
TeachUnit.defaultProps = {

};


export {TeachUnit}

