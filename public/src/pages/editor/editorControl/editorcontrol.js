import React from 'react';
import './editorcontrol.css'
import {MediaLib} from './medialib.js'
import {CourseEdit} from './courseedit.js'
import {CourseInfo} from './courseinfo.js'

class EditorControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
        this.tabItem = [
            {
                className:"mediaLib",
                childComponent:<MediaLib/>
            },
            {
                className:"courseEdit",
                childComponent:<CourseEdit/>
            },
            {
                className:"courseInfo",
                childComponent:<CourseInfo/>
            }
        ];
    }
    getItemComponent(index){
        return <div className={this.tabItem[index].className}>{this.tabItem[index].childComponent}</div>
    }

    checkTitleIndex(index) {
        return index === this.state.currentIndex ? "tabTitle active" : "tabTitle"
    }

    checkItemIndex(index) {
        return index === this.state.currentIndex;
    }
    render() {
        return (
            <div id="editor-wrapper" className="editorWrapper">
                <div className="tabTitleContainer">
                    {
                        React.Children.map(this.props.children, (element, index) => {
                        return (
                        <div onClick={()=>{this.setState({currentIndex: index})}} className={this.checkTitleIndex(index)}>{element.props.name}</div>
                        )
                    })
                    }
                </div>
                <div className="tabItemContainer">
                    {
                        React.Children.map(this.props.children, (element, index) => {
                            if(this.checkItemIndex(index)){
                                console.log(index);
                                return this.getItemComponent(index);
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

EditorControl.propTypes = {};
EditorControl.defaultProps = {};


export {EditorControl}

