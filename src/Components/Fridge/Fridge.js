import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Fridge extends Component{
    constructor(){
        super();
    }
    render(){

        if(!this.props.user_id){
            return <Redirect to='/' />
        }  
        
        return (
            <div>
                Fridge
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id       
    }
}

export default connect(mapStateToProps)(Fridge) 