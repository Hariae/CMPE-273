import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';

class Login extends Component {


    constructor() {
        super();

        this.state = {
            Email: "",
            Password: "",
            isAuthenticated: false
        }


        //Bind events
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
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

    submitLogin = (e) => {

        e.preventDefault();

        var data = {
            Email: this.state.Email,
            Password: this.state.Password
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3002/login', data)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isAuthenticated: true
                    })
                }
                else {
                    this.setState({
                        isAuthenticated: false
                    })
                }
            });
    }



    render() {

        let redrirectVar = null;
        if (cookie.load('cookie')) {
            redrirectVar = <Redirect to="/home" />
        }

        return (
            <div>
                <Header />

                <div className="container fill-graywhite">
                    {redrirectVar}
                    <div className="container content">
                        <div className="login-container">
                            <div>
                                <p>Log in to HomeAway</p>
                                <p>Need an account? <a href="/sign-up">Sign Up</a></p>
                            </div>
                            <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">
                                <div className="login-form-heading input-group pad-top-10 input-group-lg">
                                    Account login
                            </div>
                                <hr />
                                <div className="form-group login-form-control">
                                    <input type="text" name="email" id="email" className="form-control form-control-lg" placeholder="Email Address" onChange={this.emailChangeHandler} required />
                                </div>
                                <div className="form-group login-form-control">
                                    <input type="password" name="password" id="password" className="form-control form-control-lg" placeholder="Password" onChange={this.passwordChangeHandler} required />
                                </div>
                                <div className="form-group login-form-control">
                                    <a href="" className="">Forgot Password?</a>
                                </div>
                                <div className="form-group login-form-control">
                                    <button className="btn btn-login col-lg-12 col-md-12 col-sm-12" onClick={this.submitLogin} >Login </button>
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

export default Login;