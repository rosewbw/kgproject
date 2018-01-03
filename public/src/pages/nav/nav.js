import React from 'react';

class Nav extends React.Component{
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
            <nav></nav>
        )
    }
}

Nav.propTypes = {

};
Nav.defaultProps = {

};


export {Nav}

