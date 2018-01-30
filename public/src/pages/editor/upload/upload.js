import React from 'react';
import WebUploader from 'webuploader'
import FileUpload from 'react-fileupload'


class Upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    componentWillMount(){

    }
    componentDidMount(){
    }
    render(){
        const options={
            baseUrl:'localhost:3000',
            param:{
                fid:0
            }
        }
        return (
            <div>
                <div>fsdfd</div>
            </div>
        )
    }
}

Upload.propTypes = {

};
Upload.defaultProps = {

};


export {Upload}
