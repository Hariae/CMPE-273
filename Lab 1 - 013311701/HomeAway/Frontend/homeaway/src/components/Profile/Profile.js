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
            Phonenumber: "",
            Aboutme: "",
            Country: "",
            City: "",
            Company: "",
            School: "",
            Hometown: "",
            Language: "",
            Gender: "",
            ProfileImage: "",
            ProfileImagePreview: undefined
        }

        //Bind
        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount() {

        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/profile-details')
            .then(response => {
                if (response.status === 200) {
                    //console.log('Status: '. response.status);
                    console.log(response.data);
                    var data = response.data;
                    this.setState({
                        Firstname: data.Firstname,
                        Lastname: data.Lastname,
                        Email: data.Email,
                        Phonenumber: data.Phonenumber,
                        Aboutme: data.Aboutme,
                        Country: data.Country,
                        City: data.City,
                        Gender: data.Gender,
                        School: data.School,
                        Hometown: data.Hometown,
                        Language: data.Language,
                        Company: data.Company,
                        ProfileImage: data.ProfileImage
                    });

                    //DOwnload Image
                    console.log('Profile Photo Name: ', data.ProfileImage);

                    //Download image
                    axios.post('http://localhost:3001/download-file/' + data.ProfileImage)
                        .then(response => {
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                            this.setState({
                                ProfileImagePreview: imagePreview
                            })

                        });
                        


                }
            });
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
            axios.post('http://localhost:3001/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);

                        //Download image
                        axios.post('http://localhost:3001/download-file/' + profilePhoto.name)
                            .then(response => {
                                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                                this.setState({
                                    ProfileImage: profilePhoto.name,
                                    ProfileImagePreview: imagePreview
                                })

                            });
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
        axios.defaults.withCredentials = true;

        const data = {
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            Email: this.state.Email,
            Phonenumber: this.state.Phonenumber,
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
        axios.post('http://localhost:3001/update-profile', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('');
                }
            });

    }

    render() {

        let redrirectVar = null;
        if (!cookie.load('cookie')) {
            redrirectVar = <Redirect to="/login" />
        }

        let profileImageData = <img src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (this.state.ProfileImagePreview) {
            profileImageData = <img src={this.state.ProfileImagePreview} alt="logo" />
        }
        return (
            <div>
                <Header />
                <div className="container">
                    {redrirectVar}
                    <div className="center-content profile-heading">
                        {profileImageData}
                        <h3>{this.state.Firstname} {this.state.Lastname}</h3> 
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
                                        <input type="text" name="Firstname" id="firstname" className="form-control form-control-lg" placeholder="First name" onChange={this.handleChange} value={this.state.Firstname} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="Lastname" id="lastname" className="form-control form-control-lg" placeholder="Last name" onChange={this.handleChange} value={this.state.Lastname} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="Email" id="email" className="form-control form-control-lg" placeholder="Email address" onChange={this.handleChange} value={this.state.Email} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="Phonenumber" id="phonenumber" className="form-control form-control-lg" placeholder="Phone Number" onChange={this.handleChange} value={this.state.Phonenumber} />
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

export default Profile;