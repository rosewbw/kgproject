import React from 'react';
import './editor.css'
import {EditorControl} from './editorcontrol/editorcontrol.js'


class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    render(){
        return(
            <div id="editor-container" className="editorContainer">
                <EditorControl>
                    <div name = "媒体库">
                        媒体库
                    </div>
                    <div name = "课程编辑">
                        课程编辑
                    </div>
                    <div name = "课程信息">
                        课程信息
                    </div>
                </EditorControl>
            </div>
        )
    }
}


export {Editor}