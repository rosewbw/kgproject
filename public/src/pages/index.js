import React from 'react';
import ReactDOM from 'react-dom';
import {MainTarget} from './target/maintargetview.js'
import {Editor} from  './editor/editor.js'
import {Nav} from './nav/nav.js'
import {Footer} from './footer/footer.js'

class MainProject extends React.Component{
    render(){
        return (
            <div id="main-wrapper">
                <MainTarget/>
                <Editor/>
            </div>
            )
    }
}


ReactDOM.render(
    <div>
        <Nav/>
        <MainProject/>
        <Footer/>
    </div>,
    document.getElementById("body-wrapper")
);






