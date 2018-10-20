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
                        trips: response.data
                    });

                    var tripDetails = [];
                    for (let i = 0; i < this.state.trips.length; i++) {
                        var data = {
                            PropertyId: this.state.trips[i].PropertyId
                        }

                        axios.post('http://localhost:3001/property-details', data)
                            .then(response => {

                                if (response.status === 200) {
                                    var tripDetail = response.data;
                                    tripDetail["Bookingstartdate"] = this.state.trips[i].Bookingstartdate;
                                    tripDetail["Bookingenddate"] = this.state.trips[i].Bookingenddate;
                                    tripDetail["Guests"] = this.state.trips[i].Guests;
                                    tripDetail["Totalcost"] = this.state.trips[i].Totalcost;
                                    tripDetail["Travelername"] = this.state.trips[i].Travelername;
                                    tripDetails.push(tripDetail);
                                    this.setState({
                                        tripDetails: tripDetails
                                    });
                                    console.log("Trip Details: ", this.state.tripDetails);
                                }

                            }).catch((err) =>{
                                if(err){
                                    this.setState({
                                        errorRedirect: true
                                    })
                                }
                            });
                    }

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

            return (
                <div className="container trip-details-container" key={index}>
                    <div className="trip-details-content border">
                        <div className="trip-main-details blue-text">
                            <h2><strong>{trip.Headline}</strong></h2>
                            <div>Property Type : {trip.Propertytype}</div>
                            <div>{trip.Bedrooms} BR</div>
                            <div>{trip.Bathrooms} BA</div>
                            <div>Sleeps {trip.Accomodates}</div>
                            <div>Arrive: {trip.Bookingstartdate}</div>
                            <div>Depart: {trip.Bookingenddate}</div>
                            <div>Guests: {trip.Guests} guests</div>
                            <div>Traveler Name: {trip.Travelername}</div>
                        </div>
                        
                        <div className="pricing-content">
                            <h3><strong>Total Cost: ${trip.Totalcost}</strong></h3>
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