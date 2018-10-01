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
            tripDetails: []
        }
    }

    componentWillMount() {

        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/trip-details')
            .then(response => {
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
                                    tripDetails.push(tripDetail);
                                    this.setState({
                                        tripDetails: tripDetails
                                    });
                                    console.log("Trip Details: ", this.state.tripDetails);
                                }

                            });
                    }

                }
            });

    }

    render() {

        let redrirectVar = null;
        if (!cookie.load('cookie')) {
            redrirectVar = <Redirect to="/login" />
        }

        let tripDetails = this.state.tripDetails.map(function (trip, index) {

            return (
                <div className="container trip-details-container" key={index}>
                    <div className="trip-details-content border">
                        <div className="trip-main-details">
                            <h2><strong>{trip.Headline}</strong></h2>
                            <div>Property Type : {trip.Propertytype}</div>
                            <div>{trip.Bedrooms} BR</div>
                            <div>{trip.Bathrooms} BA</div>
                            <div>Sleeps {trip.Accomodates}</div>
                        </div>
                        <div className="col-5 trips-table">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td><div>Arrive</div><div className="blue-text">{trip.Bookingstartdate}</div></td>
                                        <td><div>Depart</div><div className="blue-text">{trip.Bookingenddate}</div></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><div>Guests</div><div className="blue-text">{trip.Guests} guests</div></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><div>Owner Name</div><div className="blue-text">{trip.Ownername}</div></td>
                                    </tr>
                                </tbody>
                            </table>
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