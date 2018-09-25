import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';

class DisplayProperties extends Component {

    constructor() {
        super();
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

                },
                PricingDetails: {
                    availabilityStartDate: "",
                    availabilityEndDate: "",
                    currency: "",
                    baserate: "",
                    minStay: ""

                },
            }
        }

        this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
        this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);
    }

    componentWillMount() {

        var data = {};
        axios.get('http://localhost:3001/search', data)
            .then(response => {
                console.log(response.data);
                this.setState({
                    Properties: response.data
                });
                // this.setState({
                //     propertyDetails: this.state.Properties[0]
                // });

                console.log('Proper', this.state.Properties[0]);
                console.log('Proper', this.state.propertyDetails);
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
                    <div className="property-content row border">
                        <div className="property-content-image col-3">
                            <img className="property-image" src="https://odis.homeaway.com/odis/listing/2d64bce1-3b15-4171-8f2f-ae6558097d1c.c10.jpg" alt="property-image" />
                        </div>
                        <div className="property-content-desc col-9 hidden-xs">
                            <div>
                                <h2><strong>{property.Headline}</strong></h2>
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
                            <input type="textbox" className="form-control form-control-lg" placeholder="Search"></input>
                        </span>
                        <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                            <DatePicker className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.state.arrivalDate} onChange={this.handleArrivalDateChange} />
                        </span>
                        <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                            <DatePicker className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.state.departureDate} onChange={this.handleDepartureDateChange} />
                        </span>
                        <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                            <input type="textbox" className="form-control form-control-lg" placeholder="2 guests"></input>
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