import React, { Component } from 'react';
import Header from '../Header/Header';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';


class OwnerDashboard extends Component {

    constructor() {
        super();
        this.state={
            trips: [],
            tripDetails: [],
            errorRedirect: false
        }

    }

    componentWillMount(){
        axios.defaults.withCredentials = true;

        axios.get('http://localhost:3001/owner-dashboard-details')
            .then(response=>{
                if (response.status === 200) {
                    console.log("Response : ", response.data);
                    this.setState({
                        tripDetails: response.data
                    });

                    
                }
            }).catch((err) =>{
                if(err){
                    this.setState({
                        errorRedirect: true
                    })
                }
            });
    }

    render() {

        let redrirectVar = null;
        if (!cookie.load('cookie')) {
            redrirectVar = <Redirect to="/login" />
        }
        if (this.state.errorRedirect === true) {
            redrirectVar = <Redirect to="/error" />
        }


        let tripDetails = this.state.tripDetails.map(function (trip, index) {

            var startDate = "";
            var endDate = "";
            
            var date = new Date(trip.AvailabilityStartDate);
            var locale = "en-us";
            var month = date.toLocaleString(locale, { month: "short" });
            var day = date.getDate();
            startDate = month + " - " + day;
            console.log(startDate);
            
            //End date
            date = new Date(trip.AvailabilityEndDate);
            month = date.toLocaleString(locale, { month: "short" });
            day = date.getDate();
            endDate = month + " - " + day;
            console.log(endDate);

            return (
                <div className="container trip-details-container" key={index}>
                    <div className="trip-details-content border">
                        <div className="trip-main-details blue-text">
                            <h2><strong>{trip.Headline}</strong></h2>
                            <div>Property Type : {trip.PropertyType}</div>
                            <div>{trip.Bedrooms} BR</div>
                            <div>{trip.Bathrooms} BA</div>
                            <div>Sleeps {trip.Accomodates}</div>
                            <div>Availability State Date: {startDate}</div>
                            <div>Availability End Date: {endDate}</div>                            
                        </div>
                        
                        <div className="pricing-content">
                            <h3><strong>Price : {trip.Baserate} / night</strong></h3>
                        </div>
                    </div>
                </div>
            )
        })





        return (
            <div>
                {redrirectVar}
                <Header />
                <div className="dashboard-container">
                    <div className="center-content owner-dashboard-banner">
                        <h1>Dashboard</h1>
                    </div>
                    <div>
                        {tripDetails}
                    </div>
                </div>
            </div>
        )
    }
}

export default OwnerDashboard;