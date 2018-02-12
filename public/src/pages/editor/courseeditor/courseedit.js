import React from 'react';
import ReactDom from 'react-dom';
import './courseedit.css'

class CourseEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    componentWillMount(){

    }
    componentDidMount(){

    }
    render(){
        return(
            <div id="course-edit" className="courseEdit">
                <div id="empty-node" className="emptyNode">
                    <span>Empty node</span>
                </div>
            </div>
        )
    }
}

CourseEdit.propTypes = {

};
CourseEdit.defaultProps = {

};


export {CourseEdit}
