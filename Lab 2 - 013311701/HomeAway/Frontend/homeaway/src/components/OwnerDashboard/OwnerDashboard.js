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

        //bind
        this.handleSearchChange = this.handleSearchChange.bind(this);

    }

    componentWillMount(){
        
        var token = localStorage.getItem("token");
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/owner-dashboard-details', {
            headers: {"Authorization" : `Bearer ${token}`}
        })
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


    handleSearchChange = (event) => {

        var target = event.target;
        var name = target.name;
        var value = target.value;


        // //var value = e.target.value;
        // //console.log('searchText', value);
        // this.state.tripDetails = this.state.tripDetails.filter(function(item){
        //     console.log('Item', item.Headline.includes("2"));
        //     return item.Headline.includes("2");
        // });

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
            //console.log(startDate);
            
            //End date
            date = new Date(trip.AvailabilityEndDate);
            month = date.toLocaleString(locale, { month: "short" });
            day = date.getDate();
            endDate = month + " - " + day;
            //console.log(endDate);

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
                    <div class="pad-lft-9-pc">
                        <div className="form-group row search-tab">                                    
                            <span className="col-lg-8 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
                                <input type="textbox" className="form-control form-control-lg" name="ownerDashboardSearchText" id = "ownerDashboardSearchText" placeholder="Search" onChange={this.handleSearchChange} ></input>                                        
                            </span>
                        </div>
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