import React, { Component } from 'react';
import Header from '../Header/Header';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';


class MyTrips extends Component {

    constructor() {
        super();
        this.state = {
            trips: [],
            tripDetails: [],
            errorRedirect: false
        }
    }

    componentWillMount() {

        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/trip-details')
            .then(response => {
                if (response.status === 200) {
                    console.log("Response : ", response.data);
                    this.setState({
                        tripDetails: response.data
                    });

                    // var tripDetails = [];
                    // for (let i = 0; i < this.state.trips.length; i++) {
                    //     var data = {
                    //         PropertyId: this.state.trips[i].PropertyId
                    //     }

                    //     axios.post('http://localhost:3001/property-details', data)
                    //         .then(response => {

                    //             if (response.status === 200) {
                    //                 var tripDetail = response.data;
                    //                 tripDetail["Bookingstartdate"] = this.state.trips[i].Bookingstartdate;
                    //                 tripDetail["Bookingenddate"] = this.state.trips[i].Bookingenddate;
                    //                 tripDetail["Guests"] = this.state.trips[i].Guests;
                    //                 tripDetail["Totalcost"] = this.state.trips[i].Totalcost;
                    //                 tripDetails.push(tripDetail);
                    //                 this.setState({
                    //                     tripDetails: tripDetails
                    //                 });
                    //                 console.log("Trip Details: ", this.state.tripDetails);
                    //             }

                    //         }).catch((err) =>{
                    //             if(err){
                    //                 this.setState({
                    //                     errorRedirect: true
                    //                 })
                    //             }
                    //         });
                    // }

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
            //var startDate = this.state.propertyDetails.AvailabilityStartDate;
            var startDate = "";
            var endDate = "";
            
                var date = new Date(trip.Bookingstartdate);
                var locale = "en-us";
                var month = date.toLocaleString(locale, { month: "short" });
                var day = date.getDate();
                startDate = month + " - " + day;
                console.log(startDate);
            
            //End date
            date = new Date(trip.Bookingenddate);
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
                            <div>Arrive: {startDate}</div>
                            <div>Depart: {endDate}</div>
                            <div>Guests: {trip.Guests} guests</div>
                            <div>Owner Name: {trip.Ownername}</div>
                        </div>
                        

                        <div className="pricing-content">
                            <h3><strong>Total Cost: ${trip.TotalCost}</strong></h3>
                        </div>
                    </div>
                </div>
            )
        })


        return (
            <div>
                {redrirectVar}
                <Header />
                <div className="my-trips-container">
                    <div className="center-content trip-banner">
                        <h1>My Trips - Personalised view of your trips</h1>
                    </div>
                    <div>
                        {tripDetails}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default MyTrips;