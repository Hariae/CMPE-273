import React, {Component} from 'react';


class Error extends Component{

    render(){
        return(
            
            <div className="error-div container">
                <h1>Oops!</h1>
                <div>
                    <h4>Try accessing the link <a href="http://localhost:3000">here</a></h4>
                </div>
            </div>
        )
    }

}

export default Error;