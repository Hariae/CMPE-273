import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Calculator from './Calculator/Calculator';


class Main extends Component{
    render(){
        return(
            <div>
                <Route path="/" component={Calculator}/>
            </div>
        )
    }

}

export default Main;