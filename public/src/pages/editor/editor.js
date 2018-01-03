import React from 'react';
class Editor extends React.Component{
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
            <div id="editor-container">

            </div>
        )
    }
}

Editor.propTypes = {

};
Editor.defaultProps = {

};


export {Editor}