import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {rooturl} from '../../config/settings';

class Header extends Component {

    constructor() {
        super();

        //bind
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        localStorage.clear();
        axios.defaults.withCredentials = true;
        axios.post('http://'+rooturl+':3001/logout')
            .then(response => {
                if (response.status === 200) {
                    console.log('User logged out!');
                }
            });
    }

    render() {

        let loggedInUserContent = null;
        let ownerContent = null;
        let travelerContent = null;
        let ownerListPropertyTab = null;
        let ownerInboxContent = null;
        let travelerInboxContent = null;

        var isOwner = false;
        var isTraveller = false;

        if(localStorage.getItem('accountType') == 1 || localStorage.getItem('accountType') == 3){
            isTraveller = true;
        }

        if(localStorage.getItem('accountType') == 2 || localStorage.getItem('accountType') == 3){
            isOwner = true;
        }

        console.log(localStorage.getItem('accountType'));
        console.log(localStorage.getItem('accountType') == 2);
        console.log(localStorage.getItem('ProfileName'));


        //if(cookie.load('Accounttype') >= 2){
        //if(this.props.loginStateStore.result){
            //if(this.props.loginStateStore.result.Accounttype >= 2){            
                if(isOwner){   
                    ownerContent = <Link to="/owner-dashboard" className="dropdown-item blue-text" >Owner Dashboard</Link>
                    ownerListPropertyTab = <span><Link to="/add-property" className="btn btn-lg lyp-btn">List your property</Link></span>
                    ownerInboxContent = <Link to="/owner-inbox" className="dropdown-item blue-text">Owner Inbox</Link>
                }
            //}
        //}

        //if(this.props.loginStateStore.result){
            //if(this.props.loginStateStore.result.Accounttype == 1 || this.props.loginStateStore.result.Accounttype == 3){
                if(isTraveller){   
                    travelerContent = <Link to="/my-trips" className="dropdown-item blue-text" >My Trips</Link>
                    travelerInboxContent = <Link to="/traveler-inbox" className="dropdown-item blue-text" >Traveler Inbox</Link>
                }
            //}
        //}
       
        let username = null;
        // if(this.props.loginStateStore.result){
        //     username = this.props.loginStateStore.result.FirstName;
        // }
        username = localStorage.getItem('ProfileName');
        //if(this.props.loginStateStore.result){
           // if (this.props.loginStateStore.result.isAuthenticated === true) {
            if(isOwner || isTraveller){
                loggedInUserContent = <span className="header-bar-tabs">
                    <span className="blue-text">Trip Boards</span>
                    <span>
                        <Link to="#" className="btn dropdown-toggle userName-dropdown" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {username}
                        </Link>
                        {this.props.name}
    
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <Link to="/profile" className="dropdown-item blue-text">Profile</Link>
                            {travelerContent}
                            {travelerInboxContent}
                            {ownerContent}  
                            {ownerInboxContent}                                                  
                            <a className="dropdown-item blue-text" href="/login" onClick={this.handleLogout}>Logout</a>
                        </div>                    
                    </span>
                    {ownerListPropertyTab}                
                </span>
            //}
        }
        

        return (
            <div className="container header-container">
                <div className="header-bar" >
                    <Link to="/home"><img src={require('../../Static/Images/logo-bceheader.svg')} alt="logo-homeaway" /></Link>
                    {loggedInUserContent}
                    <Link to="/home"><img src={require('../../Static/Images/birdhouse-bceheader.svg')} alt="logo" className="flt-right" /></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginStateStore : state.login
})

//export default Header;
export default connect(mapStateToProps, {})(Header);