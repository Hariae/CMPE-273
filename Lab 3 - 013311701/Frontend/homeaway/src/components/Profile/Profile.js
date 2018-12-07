import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import axios from 'axios';
import {rooturl} from '../../config/settings';

import { getProfileDetails, updateProfileDetails } from '../../actions/profileActions';
import { connect } from 'react-redux';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            errorRedirect: false,
        }

        //Bind
        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    async componentDidMount() {
        await this.props.getProfileDetails();
        console.log('key name', Object.keys(this.props.profileStateStore.result.data))
        const result = this.props.profileStateStore.result.data;
        var keyArray = Object.keys(this.props.profileStateStore.result.data);

        for (var i = 0; i < keyArray.length; i++) {
            var name = keyArray[i];
            console.log('result[i]', result[name])
            this.setState({
                [name]: result[name]
            });
        }
        console.log('state', this.state);
    }



    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if (name === "ProfileImage") {
            console.log(target.files);
            var profilePhoto = target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            axios.defaults.withCredentials = true;
            axios.post('http://'+rooturl+':3001/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);
                        this.setState({
                            ProfileImage: profilePhoto.name
                        });
                    }
                }).catch((err) => {
                    if (err) {
                        this.setState({
                            errorRedirect: true
                        })
                    }
                });
        }
        else {
            this.setState({
                [name]: value
            });
        }

    }

    saveChanges = (e) => {
        e.preventDefault();


        const data = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            PhoneNumber: this.state.PhoneNumber,
            Aboutme: this.state.Aboutme,
            Country: this.state.Country,
            City: this.state.City,
            Gender: this.state.Gender,
            School: this.state.School,
            Hometown: this.state.Hometown,
            Language: this.state.Language,
            Company: this.state.Company,
            ProfileImage: this.state.ProfileImage


        }

        console.log('Data: ', data);

        this.props.updateProfileDetails(data);
    }

    render() {

        let redrirectVar = null;
        if(this.props.loginStateStore.result){
            if(!this.props.loginStateStore.result.isAuthenticated === true){
                redrirectVar = <Redirect to="/login" />
            }
        }
        else{
            redrirectVar = <Redirect to="/login" />
        }

        if (this.props.profileStateStore.errorRedirect === true) {
            redrirectVar = <Redirect to="/error" />
        }

        //var profileImageData = <img src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        var profileImageData = "";
        if (this.props.profileStateStore.result) {
            profileImageData = <img src={this.props.profileStateStore.result.imageData} alt="logo" />

        }


        return (
            <div>
                <Header />
                <div className="container">
                    {redrirectVar}
                    <div className="center-content profile-heading">
                        {profileImageData}
                        <h3>{this.state.FirstName} {this.state.LastName}</h3>
                        <p></p>
                    </div>
                    <div className="container profile-content">
                        <div className="row">
                            <div className="col-8 border">
                                <div className="headline-text">
                                    <h4><strong>Profile Information</strong></h4>
                                </div>
                                <div className="profile-form-content">
                                    <div className="form-group">
                                        <input type="text" name="FirstName" id="firstname" className="form-control form-control-lg" placeholder="First name" onChange={this.handleChange} value={this.state.FirstName} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="LastName" id="lastname" className="form-control form-control-lg" placeholder="Last name" onChange={this.handleChange} value={this.state.LastName} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="Email" id="email" className="form-control form-control-lg" placeholder="Email address" onChange={this.handleChange} value={this.state.Email} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="PhoneNumber" id="phonenumber" className="form-control form-control-lg" placeholder="Phone Number" onChange={this.handleChange} value={this.state.PhoneNumber} />
                                    </div>
                                    <div className="form-group">
                                        <textarea type="text" name="Aboutme" id="aboutme" className="form-control form-control-lg" placeholder="About me" onChange={this.handleChange} value={this.state.Aboutme} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="Country" id="country" className="form-control form-control-lg" placeholder="Country" onChange={this.handleChange} value={this.state.Country} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="City" id="city" className="form-control form-control-lg" placeholder="City" onChange={this.handleChange} value={this.state.City} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="Gender" id="gender" className="form-control form-control-lg" placeholder="Gender" onChange={this.handleChange} value={this.state.Gender} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="Company" id="company" className="form-control form-control-lg" placeholder="Company" onChange={this.handleChange} value={this.state.Company} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="School" id="school" className="form-control form-control-lg" placeholder="School" onChange={this.handleChange} value={this.state.School} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="Hometown" id="hometown" className="form-control form-control-lg" placeholder="Hometown" onChange={this.handleChange} value={this.state.Hometown} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="Language" id="language" className="form-control form-control-lg" placeholder="Language" onChange={this.handleChange} value={this.state.Language} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ProfileImage"><strong>Profile Image : </strong></label><br />
                                        <input type="file" name="ProfileImage" id="ProfileImage" className="btn btn-lg photo-upload-btn" onChange={this.handleChange} className="btn btn-lg photo-upload-btn" />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-lg btn-primary" onClick={this.saveChanges}>Save Changes</button>
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

const mapStateToProps = state => ({
    profileStateStore: state.profile,
    loginStateStore: state.login
})

//export default Profile;
export default connect(mapStateToProps, { getProfileDetails, updateProfileDetails })(Profile);