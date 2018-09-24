import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import axios from 'axios';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            Firstname: "",
            Lastname: "",
            Email: "",
            PhoneNumber: "",
            Aboutme: "",
            Country: "",
            City: "",
            Gender: ""
        }

        

    }

    componentDidMount() {

        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/profile-details')
            .then(response => {
                if (response.status === 200) {
                    //console.log('Status: '. response.status);
                    console.log(response.data);
                    var data = {
                        Firstname: "",
                        Lastname: "",
                        Email: "",
                        PhoneNumber: "",
                        Aboutme: "",
                        Country: "",
                        City: "",
                        Gender: ""
                    }
                    data = response.data;
                    this.setState({
                        Firstname: data.Firstname,
                        Lastname: data.Lastname,
                        Email: data.Email,
                        PhoneNumber: data.PhoneNumber,
                        Aboutme: data.Aboutme,
                        Country: data.Country,
                        City: data.City,
                        Gender: data.Gender
                    });
                }
            });
    }

    render() {

        let redrirectVar = null;
        if (!cookie.load('cookie')) {
            redrirectVar = <Redirect to="/login" />
        }

        return (
            <div>
                <Header />
                <div className="container">
                    {redrirectVar}
                    <div className="center-content profile-heading">
                        <img src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
                        <h3>{this.state.Firstname} {this.state.Lastname}</h3>
                        <p>Member since 2001</p>
                    </div>
                    <div className="container profile-content">
                        <div className="row">
                            <div className="col-8 border">
                                <div className="headline-text">
                                    <h4><strong>Profile Information</strong></h4>
                                </div>
                                <div className="profile-form-content">
                                    <div className="form-group">
                                        <input type="text" name="firstname" id="firstname" className="form-control form-control-lg" placeholder="First name" vaue={this.state.Firstname}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="lastname" id="lastname" className="form-control form-control-lg" placeholder="Last name" value={this.state.Lastname}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="email" id="email" className="form-control form-control-lg" placeholder="Email address" value={this.state.Email}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="phonenumber" id="phonenumber" className="form-control form-control-lg" placeholder="Phone Number" value={this.state.PhoneNumber}/>
                                    </div>
                                    <div className="form-group">
                                        <textarea type="text" name="aboutme" id="aboutme" className="form-control form-control-lg" placeholder="About me" value={this.state.Aboutme} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="country" id="country" className="form-control form-control-lg" placeholder="Country" value={this.state.Country}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="city" id="city" className="form-control form-control-lg" placeholder="City" value={this.state.City}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="gender" id="gender" className="form-control form-control-lg" placeholder="Gender" value={this.state.Gender}/>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-lg btn-primary">Save Changes</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;