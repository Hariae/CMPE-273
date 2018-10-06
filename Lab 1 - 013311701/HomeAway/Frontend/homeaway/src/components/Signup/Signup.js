import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from '../Header/Header';

class Signup extends Component {

    constructor() {
        super();

        this.state = {
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            isNewUserCreated: false,
            validationError: false
        }

        //bind
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.signup = this.signup.bind(this);
    }

    firstNameChangeHandler = (e) => {
        this.setState({
            FirstName: e.target.value
        })
    }


    lastNameChangeHandler = (e) => {
        this.setState({
            LastName: e.target.value
        })
    }


    emailChangeHandler = (e) => {
        this.setState({
            Email: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            Password: e.target.value
        })
    }

    signup = (e) => {

        if (this.state.FirstName == "" || this.state.LastName == "" || this.state.Email == "" || this.state.Password == "") {
            this.setState({
                validationError: true
            });            
        }

        else{


            var data = {
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Email: this.state.Email,
                Password: this.state.Password,
                Accounttype: 1
            }

            e.preventDefault();

            axios.defaults.withCredentials = true;

            axios.post('http://localhost:3001/signup', data)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            isNewUserCreated: true
                        })
                    }
                    else {
                        this.setState({
                            isNewUserCreated: false
                        })
                    }
                });
        }
    }

    render() {
        let redirectVar = null;
        if (this.state.isNewUserCreated === true) {
            redirectVar = <Redirect to="/login" />
        }

        let errorAlert = null;
        if(this.state.validationError){
            errorAlert = <div>
            <div className="alert alert-danger" role="alert">
                <strong>Error!</strong> Fill all the fields to proceed!
            </div>
        </div>
        }

        return (
            <div>
                <Header />
                <div className="container fill-graywhite">
                    {redirectVar}
                    <div className="container content">
                        <div className="login-container">
                            <div>
                                <p>Sign up for HomeAway</p>
                                <p>Already have an account? <a href="/login">Login</a></p>
                            </div>
                            
                            <div className="login-form-container col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3 border">
                                <div>
                                    {errorAlert}
                                </div>
                                <div className="form-group login-form-control pad-top-20">
                                    <input type="text" name="firstname" id="firstname" className="form-control form-control-lg" placeholder="First Name" onChange={this.firstNameChangeHandler} required />
                                </div>
                                <div className="form-group login-form-control">
                                    <input type="text" name="lastname" id="lastname" className="form-control form-control-lg" placeholder="Last Name" onChange={this.lastNameChangeHandler} required />
                                </div>
                                <div className="form-group login-form-control">
                                    <input type="text" name="email" id="email" className="form-control form-control-lg" placeholder="Email Address" onChange={this.emailChangeHandler} required />
                                </div>
                                <div className="form-group login-form-control">
                                    <input type="password" name="password" id="password" className="form-control form-control-lg" placeholder="Password" onChange={this.passwordChangeHandler} required />
                                </div>
                                <div className="form-group login-form-control">
                                    <button className="btn btn-login col-lg-12 col-md-12 col-sm-12" onClick={this.signup} >Sign me up </button>
                                </div>
                                <hr />
                                <div className="form-group login-form-control">
                                    <button className="btn fb-btn col-lg-12 col-md-12 col-sm-12">
                                        <img className="fb-logo flt-left" src={require('../../Static/Images/584ac2d03ac3a570f94a666d.png')} alt="fb-logo"></img>
                                        Log in with Facebook</button>
                                </div>
                                <div className="form-group login-form-control">
                                    <button className="btn google-btn col-lg-12 col-md-12 col-sm-12">
                                        <span><img className="google-logo flt-left" src={require('../../Static/Images/google-color-g.svg')} alt="google-logo"></img></span>
                                        Log in with Google</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Signup;