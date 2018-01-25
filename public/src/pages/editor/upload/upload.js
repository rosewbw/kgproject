import React from 'react';

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
        //new Target();
    }
    render(){
        return(
            <div>Upload</div>
        )
    }
}

Upload.propTypes = {

};
Upload.defaultProps = {

};


export {Upload}
