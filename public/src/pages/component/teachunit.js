import React from 'react';
import ReactDOM from 'react-dom';

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
            let nowX = e.clientX, nowY = e.clientY;
            let disX = nowX - this.state.currentX, disY = nowY - this.state.currentY;
            /*增加拖拽范围检测*/
            let currentLeft = parseInt(this.state.left) + disX;
            let currentTop = parseInt(this.state.top) + disY;
            let docX = document.documentElement.clientWidth || document.body.clientWidth;
            let docY = document.documentElement.clientHeight || document.body.clientHeight;
            if (currentLeft >= (docX - dBox.offsetWidth + 0)) {
                dBox.style.left = (docX - this.state.offsetX)/this.props.scale + "px";
            } else {
                dBox.style.left = currentLeft/this.props.scale + "px";
            }
            if (currentTop <= 0) { //检测屏幕上边，因为我这里的初始居中是利用了负1/2的盒子高度，所以用200px判断边界
                dBox.style.top = 0 + "px";
            } else if (currentTop >= (docY - dBox.offsetHeight + 0)) {
                dBox.style.top = (docY - this.state.offsetY)/this.props.scale + "px";
            } else {
                dBox.style.top = currentTop/this.props.scale + "px";
            }
        }
    }
    endDrag() {
        let computedStyle = document.defaultView.getComputedStyle(ReactDOM.findDOMNode(this.refs.dragBox), null);
        this.setState({
            left: computedStyle.left,
            top: computedStyle.top,
            flag: false
        });
        //console.log("endDrag")
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

