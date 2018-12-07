import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from '../Header/Header';

import { connect } from 'react-redux';
import { signup } from '../../actions/index';
import { Field, reduxForm } from 'redux-form';

class OwnerSignup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            isNewUserCreated: false,
            validationError: false,
            errorRedirect: false
        }

        //bind
       
    }



    //Define component to be rendered
    renderField(field) {

        console.log(field);
        const { meta: { touched, error } } = field;
        const className = touched && error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
        console.log('filef name', field.placeholder);
        const inputType = field.type;
        const inputPlaceholder = field.placeholder;
        const errorMessageStyling = touched && error ? "text-danger" : "";
        var divClassName = "";
        if (field.id === "firstname") {
            divClassName = "form-group login-form-control pad-top-20";
        }
        else {
            divClassName = "form-group login-form-control";
        }


        return (

            <div className={divClassName} >
                <input className={className} type={inputType} placeholder={inputPlaceholder} {...field.input} />
                <div className={errorMessageStyling}>
                    <div>{touched ? error : ""}</div>

                </div>
            </div>
        );
    }

     //Submit
     onSubmit(values){

        var data = {
            FirstName: values.firstname,
            LastName: values.lastname,
            Email: values.email,
            Password: values.password,
            Accounttype: 2
        }

       // e.preventDefault();
        this.props.signup(data);
        
    }


    render() {
        let redirectVar = null;
        let errorPanel = null;

        if (this.props.signupStateStore.result) {
            console.log('Inside props login', this.props.signupStateStore);
            if (this.props.signupStateStore.result.isNewUserCreated === true) {
                redirectVar = <Redirect to="/login" />
            }
            if (this.props.signupStateStore.result.errorRedirect === true) {
                redirectVar = <Redirect to="/error" />
            }

        }

        if(this.props.signupStateStore.duplicateUser === true){
            errorPanel = <div>
            <div className="alert alert-danger" role="alert">
                <strong>Validation Error!</strong> User Already exists!
            </div>
        </div>
        }
        

        const { handleSubmit } = this.props;

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
                                {errorPanel}
                                <form name="signupForm" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                    <Field
                                        name="firstname"
                                        id="firstname"
                                        type="text"
                                        placeholder="First name"
                                        component={this.renderField} />
                                    <Field
                                        name="lastname"
                                        id="lastname"
                                        type="text"
                                        placeholder="Last name"
                                        component={this.renderField} />
                                    <Field
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="E-mail"
                                        component={this.renderField} />
                                    <Field
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        component={this.renderField} />
                                    <div className="form-group login-form-control">
                                        <button className="btn btn-login col-lg-12 col-md-12 col-sm-12" type="submit">Sign me up </button>
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
    signupStateStore: state.signup
});

function validate(values) {
    console.log('inside vaidate');
    const errors = {};
    if (!values.firstname) {
        errors.firstname = "Enter your name";
    }
    if (!values.lastname) {
        errors.lastname = "Enter your lastname";
    }
    if (!values.email) {
        errors.email = "Enter E-mail";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "signupForm"
})(connect(mapStateToProps, { signup })(OwnerSignup));