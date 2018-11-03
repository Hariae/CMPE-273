import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';


import { connect } from 'react-redux';
import { submitLogin } from '../../actions/index';
import { Field, reduxForm } from 'redux-form';

class Login extends Component {



    constructor() {
        super();

        this.state = {
            Email: "",
            Password: "",
            formValidationFailure: false,
            isValidationFailure: true,
            errorRedirect: false

        }


        //Bind events        
    }

   

    //Define component to be rendered
    renderField(field) {

        const { meta: { touched, error } } = field;
        const className = touched && error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
        const inputType = field.type;
        const inputPlaceholder = field.placeholder;
        const errorMessageStyling =  touched && error ? "text-danger" : "";

        return (

            <div className="form-group">
                <label>{field.label}</label>
                <input className={className} type={inputType} placeholder={inputPlaceholder} {...field.input} />
                <div className={errorMessageStyling}>
                    <div>{touched ? error : ""}</div>
                    
                </div>
            </div>
        );
    }


    //
    onSubmit(values) {
       axios.defaults.withCredentials = true;
        var data = {
            Email: values.email,
            Password: values.password
        }

        this.props.submitLogin(data);
    }

    render() {

        let redrirectVar = null;        

        if (this.props.loginStateStore.result) {
            if(this.props.loginStateStore.result.isAuthenticated === true){
                redrirectVar = <Redirect to="/home" />
            }
            
        }

        if (this.state.errorRedirect) {
            redrirectVar = <Redirect to="/error" />
        }

        let errorPanel = null;
        if (this.props.loginStateStore.isAuthenticated === false) {
            errorPanel = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Validation Error!</strong> Username and Password doesn't match!
                </div>
            </div>

        }

        let formErrorPanel = null;
        if (this.state.formValidationFailure) {
            formErrorPanel = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Validation Error!</strong> Username and Password are required!
                </div>
            </div>

        }

        const { handleSubmit } = this.props;

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
                            <div>
                                <p>Need an Owner account? <a href="/owner-sign-up">Owner Sign Up</a></p>
                            </div>
                            <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">
                                <div className="login-form-heading input-group pad-top-10 input-group-lg">
                                    Account login
                            </div>
                                <hr />
                                {errorPanel}
                                {formErrorPanel}


                                <form name="loginForm" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                    <Field
                                        name="email"
                                        id="email"
                                        type="text"
                                        placeholder="Email Address"
                                        component={this.renderField}

                                    />

                                    <Field
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        component={this.renderField}

                                    />
                                    <div className="form-group login-form-control">
                                        <a href="" className="">Forgot Password?</a>
                                    </div>



                                    <div className="form-group login-form-control">
                                        <button className="btn btn-login col-lg-12 col-md-12 col-sm-12" type="submit" >Login </button>
                                    </div>
                                </form>
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

//This method provides access to redux store
const mapStateToProps = state => ({
    loginStateStore: state.login
});

function validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = "Enter E-mail";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }

    return errors;
}

//export default Login;
export default reduxForm({
    validate,
    form: "loginForm"
})(connect(mapStateToProps, { submitLogin })(Login));