import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

class Header extends Component {

    constructor() {
        super();

        //bind
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/logout')
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

        if(cookie.load('Accounttype') >= 2){
            ownerContent = <a className="dropdown-item blue-text" href="/owner-dashboard">Owner Dashboard</a>
            ownerListPropertyTab = <span><a href="/add-property" className="btn btn-lg lyp-btn">List your property</a></span>
        }

        if(cookie.load('Accounttype') == 1 || cookie.load('Accounttype') == 3){
            travelerContent = <a className="dropdown-item blue-text" href="/my-trips">My Trips</a>
        }

        let username = cookie.load('cookie');
        if (cookie.load('cookie')) {
            loggedInUserContent = <span className="header-bar-tabs">
                <span className="blue-text">Trip Boards</span>
                <span>
                    <a className="btn dropdown-toggle userName-dropdown" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {username}
                    </a>
                    {this.props.name}

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item blue-text" href="/profile">Profile</a>
                        {travelerContent}
                        {ownerContent}                        
                        <a className="dropdown-item blue-text" href="/login" onClick={this.handleLogout}>Logout</a>
                    </div>                    
                </span>
                {ownerListPropertyTab}                
            </span>


        }

        return (
            <div className="container header-container">
                <div className="header-bar" >
                    <a href="/home"><img src={require('../../Static/Images/logo-bceheader.svg')} alt="logo-homeaway" /></a>
                    {loggedInUserContent}
                    <a href="/home"><img src={require('../../Static/Images/birdhouse-bceheader.svg')} alt="logo" className="flt-right" /></a>
                </div>
            </div>
        )
    }
}

export default Header;