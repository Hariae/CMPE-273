import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

class DisplayProperties extends Component {

    constructor(props) {
        super(props);        

        this.state = {
            arrivalDate: moment(),
            departureDate: moment(),
            Properties: [],
            propertyDetails: {
                LocationDetails: {
                    country: "",
                    streetAddress: "",
                    unitNumber: "",
                    city: "",
                    state: "",
                    zipCode: ""
                },
                Details: {
                    headline: "",
                    description: "",
                    propertyType: "",
                    bedrooms: "",
                    accomodates: "",
                    bathrooms: ""
                },
                Photos: {
                    photos: ""
                },
                PricingDetails: {
                    availabilityStartDate: "",
                    availabilityEndDate: "",
                    currency: "",
                    baserate: "",
                    minStay: ""

                }
            },
            displayProperty: false,
            propertyId: "",
            Photos: []
        }

        

        //Bind
        this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
        this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);
    }



    componentDidMount() {

        var data = {
            searchText : this.props.searchText,
            startDate : this.props.startDate,
            endDate : this.props.endDate
        };
       

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/search', data)
            .then(response => {
                console.log(response.data);
                this.setState({
                    Properties: response.data
                });

                var imageArr = [];
                for (let i = 0; i < this.state.Properties.length; i++) {
                    axios.post('http://localhost:3001/download-file/' + this.state.Properties[i].Photos.split(',')[0])
                        .then(response => {
                            //console.log("Imgae Res : ", response);
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                            imageArr.push(imagePreview);
                            const propertyArr = this.state.Properties.slice();
                            propertyArr[i].Photos = imagePreview;
                            this.setState({
                                Properties: propertyArr
                            });
                        });
                }
            });
    }

    handleArrivalDateChange(date) {
        this.setState({
            arrivalDate: date
        })
    }

    handleDepartureDateChange(date) {
        this.setState({
            departureDate: date
        })
    }


    render() {

        let redrirectVar = null;
        if (!cookie.load('cookie')) {
            redrirectVar = <Redirect to="/login" />
        }





        let propertyList = this.state.Properties.map(function (property, index) {
            return (
                <div className="container display-properties-container" key={index}>
                    <Link to={'/property-display/' + property.PropertyId}>
                        <div className="property-content row border">
                            <div className="property-content-image col-3">
                                <img className="property-image" src={property.Photos} alt="property-image" />
                            </div>
                            <div className="property-content-desc col-9 hidden-xs">
                                <div>
                                    <h2><strong>{property.Headline}</strong></h2>
                                    <div>{property.Streetaddress}, {property.City} {property.State}</div>
                                    <div>Property Type : {property.Propertytype}</div>
                                    <div>{property.Bedrooms} BR</div>
                                    <div>{property.Bathrooms} BA</div>
                                    <div>Sleeps {property.Accomodates}</div>

                                </div>
                                <div className="pricing-content">
                                    <h5><strong>{property.Baserate}</strong> per night</h5>
                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
            )
        })


        return (
            <div>
                <Header />

                <div className="cotainer">
                    {redrirectVar}
                    <div className="form-group row search-tab container search-tab-display-property">
                        <span className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
                            <input type="textbox" className="form-control form-control-lg" placeholder="Search" value={this.props.searchText} onChange={this.props.handleInputChange}></input>
                        </span>
                        <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                            <DatePicker className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.props.startDate} onChange={this.props.handleStartDateChange} />
                        </span>
                        <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                            <DatePicker className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.props.endDate} onChange={this.props.handleEndDateChange} />
                        </span>
                        <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                            <input type="textbox" className="form-control form-control-lg" placeholder="2 guests" value={this.props.guests} onChange={this.props.handleInputChange}></input>
                        </span>
                        <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                            <a href="/display-properties" className="btn btn-primary btn-lg" style={{ width: "100%" }}>Search</a>
                        </span>
                    </div>
                    <div className="property-listing-content">
                        {propertyList}
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

export default DisplayProperties;