import React from 'react';
import ReactDOM from 'react-dom';
// import {MainTarget} from 'target/maintarget.js'

class MainProject extends React.Component{
    render(){
        return (
            <div id="story_main">
            </div>
            )

    }
}

ReactDOM.render(
    <MainProject/>,
    document.getElementById('body-wrapper')
);






