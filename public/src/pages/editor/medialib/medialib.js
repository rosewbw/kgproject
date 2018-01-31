import React from 'react';
import {Upload} from '../upload/upload.js'
import './medialib.css'

class MediaLib extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    componentDidMount(){

    }
    render(){
        return(
            <div id="medialib" className="mediaLib">
                <Upload/>
            </div>
        )
    }
}

MediaLib.propTypes = {

};
MediaLib.defaultProps = {

};


export {MediaLib}
