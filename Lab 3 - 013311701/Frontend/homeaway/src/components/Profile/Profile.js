import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import axios from 'axios';
import {rooturl} from '../../config/settings';

import { getProfileDetails, updateProfileDetails } from '../../actions/profileActions';
import { connect } from 'react-redux';

import {graphql, compose} from 'react-apollo';
import {profile} from '../../queries/queries';
import {updateProfile} from '../../mutations/mutations';
import {withApollo} from 'react-apollo';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorRedirect: false,
        }

        //Bind
        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        //this.loadProfile =this.loadProfile.bind(this);
    }


    componentwillreceiveprops(nextProps){
        console.log('componentWillRecieve', nextProps);
    }

    async componentDidMount() {
        // await this.props.getProfileDetails();
        // console.log('key name', Object.keys(this.props.profileStateStore.result.data))
        // const result = this.props.profileStateStore.result.data;
        // var keyArray = Object.keys(this.props.profileStateStore.result.data);

        // for (var i = 0; i < keyArray.length; i++) {
        //     var name = keyArray[i];
        //     console.log('result[i]', result[name])
        //     this.setState({
        //         [name]: result[name]
        //     });
        // }
        // console.log('state', this.state);
        this.props.client.query({
            query : profile,
            variables: {
                Email : localStorage.getItem("Email")
            }
        }).then((response)=>{
            console.log('Response profile', response.data);
            const result = response.data.profile;
            var keyArray = Object.keys(response.data.profile);

            for (var i = 0; i < keyArray.length; i++) {
                console.log('keyArr', keyArray[i]);
                var name = keyArray[i];
                console.log('result[i]', result[name])
                this.setState({
                    [name]: result[name]
                });
            }
            console.log('state', this.state);
            });
        

        console.log('data:', this.props.data);


    }


    handleChange = (e) => {
        console.log('name', e.target.name);
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    saveChanges = (e) => {
        e.preventDefault();


        // const data = {
        //     FirstName: this.state.FirstName,
        //     LastName: this.state.LastName,
        //     Email: this.state.Email,
        //     PhoneNumber: this.state.PhoneNumber,
        //     Aboutme: this.state.Aboutme,
        //     Country: this.state.Country,
        //     City: this.state.City,
        //     Gender: this.state.Gender,
        //     School: this.state.School,
        //     Hometown: this.state.Hometown,
        //     Language: this.state.Language,
        //     Company: this.state.Company,
        //     ProfileImage: this.state.ProfileImage


        // }

        // console.log('Data: ', data);

        //this.props.updateProfileDetails(data);

        this.props.client.mutate({
            mutation: updateProfile,
            variables:{
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
                Company: this.state.Company
            }

        });
        // this.props.updateProfile({
        //     variables:{
        //         FirstName: this.state.FirstName,
        //         LastName: this.state.LastName,
        //         Email: this.state.Email,
        //         PhoneNumber: this.state.PhoneNumber,
        //         Aboutme: this.state.Aboutme,
        //         Country: this.state.Country,
        //         City: this.state.City,
        //         Gender: this.state.Gender,
        //         School: this.state.School,
        //         Hometown: this.state.Hometown,
        //         Language: this.state.Language,
        //         Company: this.state.Company
        //     }
        // })
    }

    render() {

        let redrirectVar = null;
        
        // if(this.props.loginStateStore.result){
        //     if(!this.props.loginStateStore.result.isAuthenticated === true){
        //         redrirectVar = <Redirect to="/login" />
        //     }
        // }
        // else{
        //     redrirectVar = <Redirect to="/login" />
        // }
        console.log(localStorage.getItem("isAuthenticated"));
        if(localStorage.getItem('isAuthenticated') == true){
            redrirectVar = <Redirect to="/login" />
        }

        // if (this.props.profileStateStore.errorRedirect === true) {
        //     redrirectVar = <Redirect to="/error" />
        // }

        //var profileImageData = <img src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        var profileImageData = "";
        profileImageData = <img src="https://cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg" alt="logo" />
        // if (this.props.profileStateStore.result) {
        //     profileImageData = <img src={this.props.profileStateStore.result.imageData} alt="logo" />

        // }
    //    console.log('profile data', this.props.data.profile);
       var profilePageContent = null;
       if(this.state.FirstName){
        profilePageContent = <div>
        <div className="center-content profile-heading">
               
        {profileImageData}
        <h3>{this.state.FirstName} {this.state.LastName}</h3>
        
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
                        <button className="btn btn-lg btn-primary" onClick={this.saveChanges}>Save Changes</button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>
   
       }

    //    if(this.props.data){
    //        console.log('inside');
    //        profilePageContent =  <div>
    //        {/* {this.LoadProfileData()} */}
           
    //        <div className="center-content profile-heading">
               
    //            {profileImageData}
    //            <h3>{this.props.data.profile.FirstName} {this.props.data.profile.LastName}</h3>
    //            <p></p>
    //        </div>
    //        <div className="container profile-content">
    //            <div className="row">
    //                <div className="col-8 border">
    //                    <div className="headline-text">
    //                        <h4><strong>Profile Information</strong></h4>
    //                    </div>
    //                    <div className="profile-form-content">
    //                        <div className="form-group">
    //                            <input type="text" name="FirstName" id="firstname" className="form-control form-control-lg" placeholder="First name" onChange={this.handleChange} value={this.props.data.profile.FirstName} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="LastName" id="lastname" className="form-control form-control-lg" placeholder="Last name" onChange={this.handleChange} value={this.props.data.profile.LastName} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="Email" id="email" className="form-control form-control-lg" placeholder="Email address" onChange={this.handleChange} value={this.props.data.profile.Email} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="PhoneNumber" id="phonenumber" className="form-control form-control-lg" placeholder="Phone Number" onChange={this.handleChange} value={this.props.data.profile.PhoneNumber} />
    //                        </div>
    //                        <div className="form-group">
    //                            <textarea type="text" name="Aboutme" id="aboutme" className="form-control form-control-lg" placeholder="About me" onChange={this.handleChange} value={this.props.data.profile.Aboutme} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="Country" id="country" className="form-control form-control-lg" placeholder="Country" onChange={this.handleChange} value={this.props.data.profile.Country} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="City" id="city" className="form-control form-control-lg" placeholder="City" onChange={this.handleChange} value={this.props.data.profile.City} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="Gender" id="gender" className="form-control form-control-lg" placeholder="Gender" onChange={this.handleChange} value={this.props.data.profile.Gender} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="Company" id="company" className="form-control form-control-lg" placeholder="Company" onChange={this.handleChange} value={this.props.data.profile.Company} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="School" id="school" className="form-control form-control-lg" placeholder="School" onChange={this.handleChange} value={this.props.data.profile.School} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="Hometown" id="hometown" className="form-control form-control-lg" placeholder="Hometown" onChange={this.handleChange} value={this.props.data.profile.Hometown} />
    //                        </div>
    //                        <div className="form-group">
    //                            <input type="text" name="Language" id="language" className="form-control form-control-lg" placeholder="Language" onChange={this.handleChange} value={this.props.data.profile.Language} />
    //                        </div>
                          
    //                        <div className="form-group">
    //                            <button className="btn btn-lg btn-primary" onClick={this.saveChanges}>Save Changes</button>
    //                        </div>
    //                    </div>

    //                </div>
    //            </div>

    //        </div>
       
    //        </div>
    //    }

        return (
            <div>
                <Header />
                <div className="container">
                    {redrirectVar}
                    
           {/* {this.LoadProfileData()} */}
           {profilePageContent}
           
                   
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
//export default connect(mapStateToProps, { getProfileDetails, updateProfileDetails })(Profile);


// export default compose(
//     graphql(profile, {
//         options : (props) => ({ variables: { Email : "aehari2010@gmail.com" }})
//     }),
//     graphql(updateProfile, {name:"updateProfile"})
// )(Profile);
// export default graphql(profile, {
//         options : (props) => ({ variables: { Email : "aehari2010@gmail.com" }})
//     })(Profile);

export default withApollo(Profile);