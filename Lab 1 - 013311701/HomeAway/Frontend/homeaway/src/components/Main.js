import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import ListProperty from './ListProperty/ListProperty';
import AddProperty from './ListProperty/AddProperty';
import DisplayProperties from './DisplayProperties/DisplayProperties';
import PropertyDisplay from './DisplayProperties/PropertyDisplay';
import Profile from './Profile/Profile';
import MyTrips from './MyTrips/MyTrips';
import OwnerDashboard from './OwnerDashboard/OwnerDashboard';

class Main extends Component{

    render(){
        return(
            <div>
                {/** Render Different Components based on ROute*/}
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />               
                <Route path="/sign-up" component={Signup} />
                <Route path="/list-property" component={ListProperty} />
                <Route path="/add-property" component={AddProperty} />                
                <Route path="/display-properties" component={DisplayProperties} />
                <Route path="/property-display/:id" component={PropertyDisplay} />
                <Route path="/profile" component={Profile} />
                <Route path="/owner-dashboard" component={OwnerDashboard} />
                <Route path="/my-trips" component={MyTrips} />
            </div>
        )
    }

}

export default Main