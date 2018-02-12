import React from 'react';

class CourseInfo extends React.Component{
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
            <div>CourseInfo</div>
        )
    }
}

CourseInfo.propTypes = {

};
CourseInfo.defaultProps = {

};


export {CourseInfo}
