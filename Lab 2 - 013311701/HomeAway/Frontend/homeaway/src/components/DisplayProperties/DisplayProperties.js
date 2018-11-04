import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import {rooturl} from '../../config/settings';

import { connect } from 'react-redux';

class DisplayProperties extends Component {

    constructor(props) {
        super(props);        

        this.state = {
            arrivalDate: moment(),
            departureDate: moment(),
            Properties: [],
            displayProperty: false,
            propertyId: "",
            Photos: [],
            errorRedirect: false,
            priceFilter: "",
            bedroomFilter: "",
            startDateFilter: moment(),
            endDateFilter: moment(),
            priceFilterMin: 0,
            priceFilterMax: 10000,
            headlineFilter: "",
            startIndex : 0,
            currentPage : 1,
            pagesPerPage : 5,
            PropertiesResult: []
        }

        
        //Bind
        this.handleFilterStartDateChange = this.handleFilterStartDateChange.bind(this);
        this.handleFilterEndDateChange = this.handleFilterEndDateChange.bind(this);
        this.handleFiltering = this.handleFiltering.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }


   
    componentDidMount() {

        var data = {
            searchText : this.props.homeStateStore.result.searchText,
            startDate : this.props.homeStateStore.result.startDate,
            endDate : this.props.homeStateStore.result.endDate
        };
       
        var token = localStorage.getItem("token");
        
        axios.defaults.withCredentials = true;
        axios.post('http://'+rooturl+':3001/search', data, {
            headers: {"Authorization" : `Bearer ${token}`}
        })
            .then(response => {
                console.log(response.data);
                this.setState({
                    Properties: response.data
                });

                var imageArr = [];
                for (let i = 0; i < this.state.Properties.length; i++) {
                    axios.post('http://'+rooturl+':3001/download-file/' + this.state.Properties[i].Photos.split(',')[0] , {
                        headers: {"Authorization" : `Bearer ${token}`}
                    })
                        .then(response => {
                            //console.log("Imgae Res : ", response);
                            let imagePreview = 'data:image/jpg;base64, ' + response.data;
                            imageArr.push(imagePreview);
                            const propertyArr = this.state.Properties.slice();
                            propertyArr[i].Photos = imagePreview;

                            var trips = propertyArr;
                            var tripsResult = trips.filter(function(property){
                                var index = trips.indexOf(property);
                                return index >= 0 && index <= 4;
                            });

                            this.setState({
                                Properties: propertyArr,
                                PropertiesResult: tripsResult                                
                            });
                        }).catch((err) =>{
                            if(err){
                                this.setState({
                                    errorRedirect: true
                                })
                            }
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

    handleFilterStartDateChange(date) {
        this.setState({
            startDateFilter: date
        })
    }

    handleFilterEndDateChange(date) {
        this.setState({
            endDateFilter: date
        })
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleFiltering(event){
        const target = event.target;
        
        var priceFilterMin = this.state.priceFilterMin;
        var priceFilterMax = this.state.priceFilterMax;
        var bedroomFilter = this.state.bedroomFilter;
        var startDateFilter = this.state.startDateFilter;
        var endDateFilter = this.state.endDateFilter;
        var headlineFilter = this.state.headlineFilter;
        
        var filteredProperty = this.state.PropertiesResult.filter(function(property){
            console.log(property.Baserate.slice(1));
            var price = false;
            const Baserate = property.Baserate.slice(1);
            if(Baserate >= priceFilterMin && Baserate <= priceFilterMax){
                price = true;
            }
            const headline = headlineFilter == "" ? true : property.Headline.indexOf(headlineFilter) != -1;
            const bedrooms = bedroomFilter == ""? true: property.Bedrooms == bedroomFilter;
            const startDate = new Date(startDateFilter) >= new Date(property.AvailabilityStartDate);
            const endDate = new Date(endDateFilter) <= new Date(property.AvailabilityEndDate);             
            return headline && bedrooms && startDate && endDate && price;
        });

        console.log('Filtered', filteredProperty);

        this.setState({
            PropertiesResult : filteredProperty
        })

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
            if(startIndex > this.state.Properties.length){
                flag = false;
            }
        }
        

        if(flag === true){

        
        var endIndex = startIndex + this.state.pagesPerPage - 1;
        var trips =this.state.Properties;
        var tripsResult = this.state.Properties.filter(function(property){
            var index = trips.indexOf(property);
            return index >= startIndex && index <= endIndex;
        });
        console.log('startomdex: ', startIndex);
        console.log('endomdex: ', endIndex);
        this.setState({
            PropertiesResult : tripsResult,
            startIndex : startIndex
        });
        }
    }


    render() {

        let redrirectVar = null;
        if(this.props.loginStateStore.result){
            if(!this.props.loginStateStore.result.isAuthenticated === true){
                redrirectVar = <Redirect to="/login" />
            }
        }
        else{
            redrirectVar = <Redirect to="/login" />
        }

        if (this.state.errorRedirect === true) {
            redrirectVar = <Redirect to="/error" />
        }


        console.log('FIletered property', this.state.PropertiesResult);
        let propertyList = this.state.PropertiesResult.map(function (property, index) {
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
                                    <div>{property.StreetAddress}, {property.City} {property.State}</div>
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
                        <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pad-bot-10">
                            <input type="textbox" className="form-control form-control-lg" placeholder="Headline"  name="headlineFilter" onChange={this.handleInputChange}></input>
                        </span>
                        <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pad-bot-10">
                            <DatePicker className="form-control form-control-lg" dateFormat="MM/DD/YY" name="startDateFilter" selected={this.state.startDateFilter} onChange={this.handleFilterStartDateChange} />
                        </span>
                        <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pad-bot-10">
                            <DatePicker className="form-control form-control-lg" dateFormat="MM/DD/YY" name="endDateFilter" selected={this.state.endDateFilter} onChange={this.handleFilterEndDateChange} />
                        </span>
                        <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pad-bot-10">
                            <input type="number" className="form-control form-control-lg" placeholder="Min Price"  name="priceFilterMin" onChange={this.handleInputChange}></input>
                        </span>
                        <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pad-bot-10">
                            <input type="number" className="form-control form-control-lg" placeholder="Max Price"  name="priceFilterMax" onChange={this.handleInputChange}></input>
                        </span>
                        <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pad-bot-10">
                            <input type="number" className="form-control form-control-lg" placeholder="bedrooms"  name="bedroomFilter" onChange={this.handleInputChange}></input>
                        </span>
                        <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pad-bot-10">
                            <button  className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={this.handleFiltering}>Filter</button>
                        </span>
                    </div>

                    <div className="property-listing-content">
                        {propertyList}
                    </div>
                    
                    <div className="pagination-container center-content">
                        <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                            <button className="btn btn-primary btn-lg" id="prev" onClick={this.handlePagination}>Prev</button>
                        </span>
                        <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                            <button className="btn btn-primary btn-lg" id="next" onClick={this.handlePagination} >Next</button>
                        </span>                        
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

//
const mapStateToProps = state => ({
    homeStateStore : state.home,
    loginStateStore : state.login
})

//export default DisplayProperties;

export default connect (mapStateToProps, {})(DisplayProperties);