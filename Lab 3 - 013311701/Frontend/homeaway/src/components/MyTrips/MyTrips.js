import React, { Component } from 'react';
import Header from '../Header/Header';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {rooturl} from '../../config/settings';

import {graphql} from 'react-apollo';
import {tripDetails} from '../../queries/queries';

class MyTrips extends Component {

    constructor() {
        super();
        this.state = {
            trips: [],
            tripDetails: [],
            errorRedirect: false,
            startIndex : 0,
            currentPage : 1,
            pagesPerPage : 5,
            ownerDashBoardTrips: []
        }

        //bind
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }

    componentWillMount() {
       
        // var token = localStorage.getItem("token");
        // axios.defaults.withCredentials = true;
        // axios.get('http://'+rooturl+':3001/trip-details', {
        //     headers: {"Authorization" : `Bearer ${token}`}
        // })
        //     .then(response => {
        //         if (response.status === 200) {
        //             console.log("Response : ", response.data);

        //             var trips = response.data;
        //             var tripsResult = trips.filter(function(property){
        //                 var index = trips.indexOf(property);
        //                 return index >= 0 && index <= 4;
        //             });

        //             this.setState({
        //                 tripDetails: response.data,
        //                 ownerDashBoardTrips : tripsResult
        //             });

                    
        //         }
        //     }).catch((err) =>{
        //         if(err){
        //             this.setState({
        //                 errorRedirect: true
        //             })
        //         }
        //     });

    }

    handleSearchChange = (event) => {

        var target = event.target;        
        var value = target.value;

                
        var filteredArray = this.state.tripDetails.filter(function (item){
            return item.Headline.indexOf(value) != -1;
        });

        this.setState({
            ownerDashBoardTrips : filteredArray,
            startIndex: 0
        });
        console.log('Filtered Array: ', filteredArray);
    }

    handlePagination(event){

        var target = event.target;
        var id = target.id;
        var flag = true;
        if(id == "prev"){
            console.log('SI', this.state.startIndex);
            if(this.state.startIndex > 0){
                var startIndex = this.state.startIndex - this.state.pagesPerPage;
            }
            else{
                flag = false;
            }
        }        
        else{
            var startIndex = this.state.startIndex + this.state.pagesPerPage;
            if(startIndex > this.state.tripDetails.length){
                flag = false;
            }
        }
        

        if(flag === true){

        
        var endIndex = startIndex + this.state.pagesPerPage - 1;
        var trips =this.state.tripDetails;
        var tripsResult = this.state.tripDetails.filter(function(property){
            var index = trips.indexOf(property);
            return index >= startIndex && index <= endIndex;
        });
        console.log('startomdex: ', startIndex);
        console.log('endomdex: ', endIndex);
        this.setState({
            ownerDashBoardTrips : tripsResult,
            startIndex : startIndex
        });
        }
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

        // if (this.state.errorRedirect === true) {
        //     redrirectVar = <Redirect to="/error" />
        // }

        var tripDetails = null;

        if(this.props.data.tripDetails){
            tripDetails = this.props.data.tripDetails.trips.map(function (trip, index) {
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
                                <div>Arrive: {startDate}</div>
                                <div>Depart: {endDate}</div>
                                <div>Owner Name: {trip.Ownername}</div>
                            </div>
                            
    
                            <div className="pricing-content">
                                <h3><strong>Total Cost: ${trip.TotalCost}</strong></h3>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        

        console.log('trips:', this.props.data.tripDetails);
        return (
            <div>
                {redrirectVar}
                <Header />
                <div className="my-trips-container">
                    <div className="center-content trip-banner">
                        <h1>My Trips - Personalised view of your trips</h1>
                    </div>
                    <div className="pad-lft-9-pc">
                        <div className="form-group row search-tab">                                    
                            <span className="col-lg-8 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
                                <input type="textbox" className="form-control form-control-lg" name="myTripsSearchText" id = "myTripsSearchText" placeholder="Search" onChange={this.handleSearchChange}></input>                                        
                            </span>
                        </div>
                    </div>
                    <div>
                        {tripDetails}
                    </div>
                    <div className="pagination-container center-content">
                        <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                            <button className="btn btn-primary btn-lg" id="prev" onClick={this.handlePagination}>Prev</button>
                        </span>
                        <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                            <button className="btn btn-primary btn-lg" id="next" onClick={this.handlePagination} >Next</button>
                        </span>                        
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginStateStore : state.login
})

//export default Header;
//export default connect(mapStateToProps, {})(MyTrips);
const MyTripsPage = connect(mapStateToProps, {})(MyTrips);
export default graphql(tripDetails, {
    options : (props)=>({
        variables: {Email : "aehari2010@gmail.com"}
    })
})(MyTripsPage);