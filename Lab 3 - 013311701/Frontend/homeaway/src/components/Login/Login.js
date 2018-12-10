import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';


import { connect } from 'react-redux';
//import { submitLogin } from '../../actions/index';
import { Field, reduxForm, propTypes } from 'redux-form';
import {login} from '../../queries/queries';

import { graphql } from 'react-apollo';


import {withApollo} from 'react-apollo';

class Login extends Component {



    constructor(props) {
        super(props);

        this.state = {
            Email: "",
            Password: "",
            formValidationFailure: false,
            isValidationFailure: true,
            errorRedirect: false,
            isAuthenticated : false,
            validationFailure: false

        }


        //Bind events      
        this.submitLoginData = this.submitLoginData.bind(this);
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
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
    // onSubmit(values) {
    //    axios.defaults.withCredentials = true;
    //    console.log('Val', values);
    //     var data = {
    //         Email: this.state.email,
    //         Password: this.state.password
    //     }

    //     //this.props.submitLogin(data);
    //     this.props.login(data);
    // }

    submitLoginData = () =>{
        axios.defaults.withCredentials = true;
       
        this.props.client.query({
            query : login,
            variables: {
                Username : this.state.email,
                Password : this.state.password
            }
        }).then((response)=>{
            console.log('Response', response.data);
            console.log('UserData', response.data.login.userData);
            if(response.data.login.result == true){
                
                localStorage.setItem("ProfileName",response.data.login.userData.FirstName);
                localStorage.setItem('accountType', response.data.login.userData.Accounttype);
                localStorage.setItem("isAuthenticated", true);

                this.setState({
                    isAuthenticated:true
                });
            }
            else{
                this.setState({
                    validationFailure:true
                });
            }
        });

        
    }

    render() {

        let redrirectVar = null;        

        // if (this.props.loginStateStore.result) {
        //     if(this.props.loginStateStore.result.isAuthenticated === true){
        //         redrirectVar = <Redirect to="/home" />
        //     }
            
        // }

        if(this.state.isAuthenticated === true){
            redrirectVar = <Redirect to="/home" />
        }

        if (this.state.errorRedirect) {
            redrirectVar = <Redirect to="/error" />
        }

        let errorPanel = null;
    //     if (this.props.loginStateStore.result) {
    //    if (this.props.loginStateStore.result.isAuthenticated === false) {
        if (this.state.validationFailure === true) {
            errorPanel = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Validation Error!</strong> Username and Password doesn't match!
                </div>
            </div>

        }
    // }

        let formErrorPanel = null;
            // x

        //const { handleSubmit } = this.props;

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


                                {/* <form name="loginForm"> */}

                                    {/* <Field
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

                                    /> */}
                                    <div className="form-group">
                                        <input type="text" name="email" id="email" className="form-control form-control-lg" placeholder="Email" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" id="password" className="form-control form-control-lg" placeholder="Last name" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group login-form-control">
                                        <a href="" className="">Forgot Password?</a>
                                    </div>



                                    <div className="form-group login-form-control">
                                        <button className="btn btn-login col-lg-12 col-md-12 col-sm-12" type="submit" onClick={this.submitLoginData}>Login </button>
                                    </div>
                                {/* </form> */}
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
// export default reduxForm({
//     validate,
//     form: "loginForm"
// })(connect(mapStateToProps, { submitLogin })(Login));



// export default graphql(login, 
//         {
//             options : (props) =>({
//                 variables : {
//                    Username :"aehari2010@gmail.com",
//                    Password: "aearivoli"
//                 }
//             })
//         }
//         )(Login);

export default withApollo(Login);