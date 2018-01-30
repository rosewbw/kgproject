import React from 'react';
import {Upload} from '../upload/upload.js'


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
                {/*<MediaGallery/>*/}
            </div>
        )
    }
}

MediaLib.propTypes = {

};
MediaLib.defaultProps = {

};


export {MediaLib}
