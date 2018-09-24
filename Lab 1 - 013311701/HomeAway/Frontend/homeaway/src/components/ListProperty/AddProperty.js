import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';


class AddProperty extends Component {

    constructor() {
        super();

        this.state = {
            locationActive: true,
            detailsActive: false,
            photosActive: false,
            pricingActive: false,
            country: "",
            streetAddress: "",
            unitNumber: "",
            city: "",
            state: "",
            zipCode: "",
            headline: "",
            description: "",
            propertyType: "",
            bedrooms: "",
            accomodates: "",
            bathrooms: "",
            photos: [],
            photoThumbnail: [],
            availabilityStartDate: moment(),
            availabilityEndDate: moment(),
            currency: "",
            baserate: "",
            minStay: ""
        }



        //bind

        //this.handleLocationClick = this.handleLocationClick.bind(this);
        //this.handleDetailsClick = this.handleDetailsClick.bind(this);
        this.handleAvailabilityStartDateChange = this.handleAvailabilityStartDateChange.bind(this);
        this.handleAvailabilityEndDateChange = this.handleAvailabilityEndDateChange.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitPropertyDetails = this.submitPropertyDetails.bind(this);
        //this.uploadFile = this.uploadFile.bind(this);

        //init


    }




    handleLocationClick = () => {
        this.setState({
            locationActive: true,
            detailsActive: false,
            photosActive: false,
            pricingActive: false
        });
    }

    handleDetailsClick = () => {
        this.setState({
            locationActive: false,
            detailsActive: true,
            photosActive: false,
            pricingActive: false

        });
    }

    handlePhotosClick = () => {
        this.setState({
            locationActive: false,
            detailsActive: false,
            photosActive: true,
            pricingActive: false

        });
    }

    handlePricingClick = () => {
        this.setState({
            locationActive: false,
            detailsActive: false,
            photosActive: false,
            pricingActive: true

        });
    }

    handleAvailabilityStartDateChange(date) {
        this.setState({
            availabilityStateDate: date
        })
    }

    handleAvailabilityEndDateChange(date) {
        this.setState({
            availabilityEndDate: date
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === "photos") {
            console.log('Files : ', target.files);

            this.setState({
                photos: this.state.photos.push(...target.files)
            });

            var photos = this.state.photos;
            console.log('photos:', photos);
            let data = new FormData();
            for (var i = 0; i < photos.length; i++) {
                data.append('photos', photos[i]);
            }
            

            axios.post('http://localhost:3001/upload-file', data)
                .then(response => {
                });

            for (var i = 0; i < photos.length; i++) {


                axios.post('http://localhost:3001/download-file/' + photos[i].name)
                    .then(response => {
                        console.log("Imgae Res : ", response);
                        let imagePreview = 'data:image/jpg;base64, ' + response.data;
                        this.setState({
                            photoThumbnail: this.state.photoThumbnail.push(imagePreview)
                        });

                    });
            }
        }
        else {
            this.setState({
                [name]: value
            });
        }

    }

    submitPropertyDetails = (e) => {

        e.preventDefault();

        const locationDetails = {
            country: this.state.country,
            streetAddress: this.state.streetAddress,
            unitNumber: this.state.unitNumber,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zipCode
        };

        const details = {
            headline: this.state.headline,
            description: this.state.description,
            propertyType: this.state.propertyType,
            bedrooms: this.state.bedrooms,
            accomodates: this.state.accomodates,
            bathrooms: this.state.bathrooms
        };
        const photos = {
            photos: this.state.photos
        };
        const pricingDetails = {
            availabilityStartDate: this.state.availabilityStartDate,
            availabilityEndDate: this.state.availabilityEndDate,
            currency: this.state.currency,
            baserate: this.state.baserate,
            minStay: this.state.minStay
        };

        const data = {
            LocationDetails: locationDetails,
            Details: details,
            Photos: photos,
            PricingDetails: pricingDetails
        }


        axios.post('http://localhost:3001/add-property', data)
            .then(response => {

                if (response.status === 200) {

                    console.log('Success!');
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
                <div className="add-property-content">
                    {redrirectVar}
                    <div className="container">
                        <hr />
                        <div className="row">
                            <div className="menu-bar-ver col-3">
                                <ul>
                                    <li>Welcome</li>
                                    <li> <a href="#" onClick={this.handleLocationClick}>Location</a></li>
                                    <li><a href="#" onClick={this.handleDetailsClick}>Details</a></li>
                                    <li><a href="#" onClick={this.handlePhotosClick}>Photos</a></li>
                                    <li><a href="#" onClick={this.handlePricingClick}>Pricing</a></li>
                                </ul>
                            </div>
                            <div className="menu-bar-hor border col-8">
                                <div className="add-property-form">
                                    <div className={this.state.locationActive ? "location-form show-form" : "location-form"}>
                                        <div className="location-form-headlinetext">
                                            <h4>Location Details</h4>
                                        </div>
                                        <hr />
                                        <div className="details-form-description pad-bot-10">
                                            <p>Fill in the location details of your property</p>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="country" id="country" className="form-control form-control-lg" placeholder="Country" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="streetAddress" id="streetAddress" className="form-control form-control-lg" placeholder="Street Address" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="unitNumber" id="unitNumber" className="form-control form-control-lg" placeholder="Unit #, Apt #, etc" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="city" id="city" className="form-control form-control-lg" placeholder="City" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="state" id="state" className="form-control form-control-lg" placeholder="State" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="zipCode" id="zipCode" className="form-control form-control-lg" placeholder="Zip Code" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group location-form-btn flt-right">
                                            <button className="btn btn-primary btn-lg" onClick={this.handleDetailsClick}>Next</button>
                                        </div>
                                    </div>

                                    <div className={this.state.detailsActive ? "details-form show-form" : "details-form"}>
                                        <div className="details-form-headlinetext">
                                            <h4>Describe your property</h4>
                                        </div>
                                        <hr />
                                        <div className="details-form-description pad-bot-10">
                                            <p>Start out with a descriptive headline and a detailed summary of your property</p>
                                        </div>

                                        <div className="form-group">
                                            <input type="text" name="headline" id="headline" className="form-control form-control-lg" placeholder="Headline" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <textarea type="text" name="description" id="description" className="form-control form-control-lg" placeholder="Description" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="propertyType" id="propertyType" className="form-control form-control-lg" placeholder="Property Type" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="bedrooms" id="bedrooms" className="form-control form-control-lg" placeholder="Bedrooms" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="accomodates" id="accomodates" className="form-control form-control-lg" placeholder="Accomodates" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="bathrooms" id="bathrooms" className="form-control form-control-lg" placeholder="Bathrooms" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group details-form-btn flt-right">
                                            <button className="btn btn-primary btn-lg" onClick={this.handlePhotosClick}>Next</button>
                                        </div>

                                    </div>

                                    <div className={this.state.photosActive ? "photos-form show-form" : "photos-form"}>
                                        <div className="photos-form-headlinetext">
                                            <h4>Add up to 5 photos of your property</h4>
                                        </div>
                                        <hr />
                                        <div className="photos-form-description pad-bot-10">
                                            <p>Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 2 photos minimum.</p>
                                        </div>
                                        <div className="container photo-upload-btn-container">
                                            <div className="center-content">
                                                <input type="file" name="photos" className="btn btn-lg photo-upload-btn" onChange={this.handleInputChange} multiple className="btn btn-lg photo-upload-btn" />
                                                <button className="btn btn-lg photo-upload-btn">SELECT PHOTOS TO UPLOAD</button>
                                            </div>
                                        </div>
                                        <div className="pad-top-10 pad-bot-10">
                                            <img src="https://roselanevillas.com/wp-content/uploads/2014/05/OTM-Skelton-2075-e1496338253946.jpg" className="img-thumbnail" alt="thumbnail" width="304" height="236"></img>
                                            <img src="https://roselanevillas.com/wp-content/uploads/2014/05/OTM-Skelton-2075-e1496338253946.jpg" className="img-thumbnail" alt="thumbnail" width="304" height="236"></img>
                                        </div>
                                        <div className="form-group flt-right">
                                            <button className="btn photos-form-btn btn-primary btn-lg" onClick={this.handlePricingClick}>Next</button>
                                        </div>
                                    </div>

                                    <div className={this.state.pricingActive ? "pricing-form show-form" : "pricing-form"}>
                                        <div className="pricing-form-headlinetext">
                                            <h4>How much do you want to charge?</h4>
                                        </div>
                                        <hr />
                                        <div className="pricing-form-description pad-bot-10">
                                            <p>We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</p>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="availabilityStartDate">Start date</label>
                                            <DatePicker name="availabilityStartDate" id="availabilityStartDate" className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.state.availabilityStartDate} onChange={this.handleAvailabilityStartDateChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="availabilityEndDate">End date</label>
                                            <DatePicker name="availabilityEndDate" id="availabilityEndDate" className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.state.availabilityEndDate} onChange={this.handleAvailabilityEndDateChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="currency">Currency </label>
                                            <select name="currency" id="currency" className="form-control form-control-lg" onChange={this.handleInputChange}>
                                                <option value="AUD">Australian Dollar (AUD)</option>
                                                <option value="EUR">Euros (EUR)</option>
                                                <option value="GBP">Great British Pound (GBP)</option>
                                                <option value="USD">US Dollar (USD)</option>
                                                <option value="CAD">Canadian Dollar (CAD)</option>
                                                <option value="NZD">New Zealand Dollar (NZD)</option>
                                                <option value="BRL">Brazil Real (BRL)</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="baserate">Nightly Base Rate</label>
                                            <input type="text" name="baserate" id="baserate" className="form-control form-control-lg" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="minStay">Minimum Stay (nights)</label>
                                            <input type="text" name="minStay" id="minStay" className="form-control form-control-lg" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group flt-right">
                                            <button className="btn btn-primary btn-lg" onClick={this.submitPropertyDetails}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container center-content pad-top-20-pc">
                        <div>
                            Use of this Web site constitutes acceptance of the HomeAway.com Terms and conditions and Privacy policy.
                    </div>
                        <div>
                            ©2018 HomeAway. All rights reserved
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProperty;