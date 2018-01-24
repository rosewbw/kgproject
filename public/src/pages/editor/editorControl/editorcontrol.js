import React from 'react';
import './editorcontrol.css'

class EditorControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    checkTitleIndex(index) {
        return index === this.state.currentIndex ? "tabTitle active" : "tabTitle"
    }

    checkItemIndex(index) {
        return index === this.state.currentIndex ? "tabItem show" : "tabItem"
    }
    render() {
        return (
            <div>
                <div className="tabTitleContainer">
                    {
                        React.Children.map(this.props.children, (element, index) => {
                        return (
                        <div onClick={() => {
                        this.setState({currentIndex: index})
                    }} className={this.checkTitleIndex(index)}>{element.props.name}</div>
                        )
                    })
                    }
                </div>
                <div className="tabItemContainer">
                    {
                        React.Children.map(this.props.children, (element, index) => {
                            return (
                                <div className={this.checkItemIndex(index)}>{element}</div>
                            )
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

