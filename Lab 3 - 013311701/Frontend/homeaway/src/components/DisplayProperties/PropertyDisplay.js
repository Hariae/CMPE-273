import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import axios from 'axios';
import { connect } from 'react-redux';
import {rooturl} from '../../config/settings';

import { graphql,compose } from 'react-apollo';
import {property} from '../../queries/queries';
import {bookProperty} from '../../mutations/mutations';

class PropertyDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrivalDate: moment(),
            departureDate: moment(),
            propertyDetails: {},
            photos: [],
            bookingStartDate: "",
            bokingEndDate: "",
            guests: 2,
            totalCost: 0,
            errorRedirect: false,
            redirectToHome: false,
            messageContent: ""
        }

        //Bind
        this.submitBooking = this.submitBooking.bind(this);
        this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
        this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        // var token = localStorage.getItem("token");
        // axios.defaults.withCredentials = true;

        // var data = {
        //     PropertyId: this.props.match.params.id
        // }
        // console.log('Data: ', data);
        // axios.post('http://'+rooturl+':3001/property-details', data, {
        //     headers: { "Authorization": `Bearer ${token}` }
        // })
        //     .then(response => {
        //         if (response.status === 200) {
        //             console.log('Result: ', response.data);
        //             this.setState({
        //                 propertyDetails: response.data[0]
        //             });

        //             var imageArr = [];
        //             var photoList = this.state.propertyDetails.Photos.split(',');
        //             for (let i = 0; i < photoList.length; i++) {
        //                 axios.post('http://'+rooturl+':3001/download-file/' + photoList[i], {
        //                     headers: { "Authorization": `Bearer ${token}` }
        //                 })
        //                     .then(response => {
        //                         //console.log("Imgae Res : ", response);
        //                         let imagePreview = 'data:image/jpg;base64, ' + response.data;
        //                         imageArr.push(imagePreview);
        //                         const photoArr = this.state.photos.slice();
        //                         photoArr[i] = imagePreview;
        //                         this.setState({
        //                             photos: photoArr
        //                         });

        //                         console.log('PhotoArr: ', photoArr);
        //                         console.log('Photo State: ', this.state.photos);
        //                     }).catch((err) => {
        //                         if (err) {
        //                             this.setState({
        //                                 errorRedirect: true
        //                             });
        //                             console.log(err);
        //                         }
        //                     });
        //             }


        //         }
        //     }).catch((err) => {
        //         if (err) {
        //             this.setState({
        //                 errorRedirect: true
        //             });
        //             console.log(err);
        //         }
        //     });
    }

    submitBooking = (e) => {



        this.props.bookProperty({
            variables : {
                PropertyId: this.props.match.params.id,
                Ownername: this.props.data.property.Ownername,
                Headline : this.props.data.property.Headline,
                PropertyType:this.props.data.property.PropertyType,
                PropertyBedrooms:this.props.data.property.Bedrooms,
                PropertyBathrooms:this.props.data.property.Bathrooms,
                PropertyAccomodates:this.props.data.property.Accomodates,
                PropertyBookingStartDate:localStorage.getItem('startDate'),
                PropertyBookingEndDate:localStorage.getItem('endDate'),
                PropertyTotalCost:e.target.value,
                Email: localStorage.getItem('Email'),
                FirstName: localStorage.getItem('ProfileName')
            }

        }).then((response)=>{
            console.log('Response', response.data);
        });
        // axios.defaults.withCredentials = true;
        // var token = localStorage.getItem("token");

        // var data = {
        //     PropertyId: this.props.match.params.id,
        //     Bookingstartdate: this.props.homeStateStore.result.startDate,
        //     Bookingenddate: this.props.homeStateStore.result.endDate,
        //     Guests: this.props.homeStateStore.result.guests,
        //     TotalCost: e.target.value,
        //     Ownername: this.state.propertyDetails.Ownername,
        //     PropertyDetails: this.state.propertyDetails
        // }


        // axios.post('http://'+rooturl+':3001/submit-booking', data, {
        //     headers: { "Authorization": `Bearer ${token}` }
        // })
        //     .then(response => {
        //         if (response.status === 200) {
        //             console.log('Booking Successful!');
        //             this.setState({
        //                 redirectToHome: true
        //             });
        //         }
        //     }).catch((err) => {
        //         if (err) {
        //             this.setState({
        //                 errorRedirect: true
        //             });
        //         }
        //     });

    }

    handleArrivalDateChange(date) {

        var month = date.toString().split(' ')[1];
        var day = date.toString().split(' ')[2];

        this.setState({
            arrivalDate: date,
            bookingStartDate: month + ' ' + day
        });
    }

    handleDepartureDateChange(date) {

        var month = date.toString().split(' ')[1];
        var day = date.toString().split(' ')[2];

        this.setState({
            departureDate: date,
            bookingEndDate: month + ' ' + day
        });
    }

    handleInputChange = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;


        this.setState({
            [name]: value
        });
    }

    sendMessage = () => {
        console.log('Inside Send Message ', this.state.messageContent);
        var token = localStorage.getItem("token");
        axios.defaults.withCredentials = true;

        var data = {
            traveler : true,
            messageContent : this.state.messageContent,
            PropertyId: this.props.match.params.id,
            OwnerId: this.state.propertyDetails.OwnerId
        }

        axios.post('http://'+rooturl+':3001/send-message', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => {

            if(response.status === 200){
                console.log('Message sent!');
            }
        });
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

        // if (this.state.redirectToHome === true) {
        //     redrirectVar = <Redirect to="/home" />
        // }
        console.log('property details', this.props.data.property);
        var totalCost = 0;

        if (this.state.propertyDetails.Baserate && this.props.homeStateStore.result) {


            const startDate = moment(this.props.homeStateStore.result.startDate);
            const timeEnd = moment(this.props.homeStateStore.result.endDate);
            const diff = timeEnd.diff(startDate);
            const diffDuration = moment.duration(diff);
            console.log('diffduration', diffDuration);
            totalCost = (diffDuration._data.days + 1) * this.state.propertyDetails.Baserate.substring(1);
        }

        let carousalBlock = this.state.photos.map(function (item, index) {

            return (
                <div className={index == 0 ? "carousel-item active" : "carousel-item"} key={index}>
                    <img className=" carousel-img property-display-img" src={item} alt="property-image" />
                </div>
            )
        });

        let carousalIndicator = this.state.photos.map(function (item, index) {

            return (
                <li data-target="#myCarousel" data-slide-to={index} className={index == 0 ? "active" : ""} key={index}></li>
            )
        });

        //var startDate = this.state.propertyDetails.AvailabilityStartDate;
        var startDate = "";
        var endDate = "";
        //if (this.props.homeStateStore.result) {
            //var date = new Date(this.props.homeStateStore.result.startDate);
            var date = new Date(localStorage.getItem('startDate'));
            var locale = "en-us";
            var month = date.toLocaleString(locale, { month: "short" });
            var day = date.getDate();
            startDate = month + " - " + day;
            console.log(startDate);

            //End date
            //date = new Date(this.props.homeStateStore.result.endDate);
            date = new Date(localStorage.getItem('endDate'));
            month = date.toLocaleString(locale, { month: "short" });
            day = date.getDate();
            endDate = month + " - " + day;
            console.log(endDate);
        //}
        var propertyDetailsContent = null;
        if(this.props.data.property != null){

            propertyDetailsContent = <div className=" container property-display-content border">
            <div className="row">
                {/* <div className="property-display-img-content col-6">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">


                        <ul className="carousel-indicators">
                            {carousalIndicator}
                        </ul>

                        <div className="carousel-inner">
                            {carousalBlock}
                        </div>

                        <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
                    </div>
                </div> */}
                <div className="property-display-pricing-content col-5 border">
                    <div className="display-price">
                        <h4><strong>{this.props.data.property.Baserate}</strong></h4><span> per night</span>
                    </div>
                    <div>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td><div>Arrive</div><div className="blue-text">{startDate}</div></td>
                                    <td><div>Depart</div><div className="blue-text">{endDate}</div></td>
                                </tr>
                                <tr>
                                    <td colSpan="2"><div>Guests</div><div className="blue-text">{this.props.homeStateStore.result ? this.props.homeStateStore.result.guests : "2"} guests</div></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <span className="pull-left">Total</span>
                            <span className="flt-right">${totalCost}</span>
                        </div>
                        <div className="center-content">
                            <button className="btn btn-lg btn-primary book-btn" onClick={this.submitBooking} value={this.props.data.property.Baserate}>Book now</button>
                        </div>
                        <hr />
                        <div className="center-content">
                            <label htmlFor="ownername">Property Owner: </label>
                            <span id="ownername"><strong> {this.props.data.property.Ownername}</strong></span>
                        </div>
                        <div>
                            <div className="center-content">
                                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Message Owner</button>
                            </div>
                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h4 className="modal-title">Ask Manager a Question</h4>
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>                                                    
                                        </div>
                                        <div className="modal-body">
                                            <p></p>
                                            <div className="form-group">
                                                <textarea type="text" name="messageContent" id="messageContent" className="form-control form-control-lg" placeholder="Type your message here" onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.sendMessage}>Send</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="property-display-details-content col-6">
                    <div className="details-content-headline-text"><h4><strong>{this.props.data.property.Headline}</strong></h4></div>
                    <div>
                        <p>{this.props.data.property.StreetAddress}, {this.props.data.property.City} {this.props.data.property.State}</p>
                    </div>
                    <div className="details-table">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Details</th>
                                    <th scope="col">Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Property type</td>
                                    <td>{this.props.data.property.PropertyType}</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Bedrooms</td>
                                    <td>{this.props.data.property.Bedrooms}</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Sleeps</td>
                                    <td>{this.props.data.property.Accomodates}</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Bathrooms</td>
                                    <td>{this.props.data.property.Bathrooms}</td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Min Stay</td>
                                    <td>{this.props.data.property.MinStay} nights</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="property-description-content">
                        <h3><strong>{this.props.data.property.Bedrooms} bedroom {this.props.data.property.Bathrooms} bath</strong></h3>
                        <div className="desc-content">
                            {this.props.data.property.Description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }



        return (
            <div>
                <Header />
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
                        <input type="textbox" className="form-control form-control-lg" placeholder="2 guests" name="guests" onChange={this.handleInputChange}></input>
                    </span>
                    <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                        <a href="/display-properties" className="btn btn-primry btn-lg" style={{ width: "100%" }}>Search</a>
                    </span>
                </div>
                {propertyDetailsContent}
                </div>
        )
    }
}

const mapStateToProps = state => ({
    homeStateStore: state.home,
    loginStateStore : state.login
});

//export default PropertyDisplay;
//export default connect(mapStateToProps)(PropertyDisplay);
// export default compose(
//     graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
//     graphql(addBookMutation, { name: "addBookMutation" })
// )(AddBook);


const PropertyDisplayPage = connect(mapStateToProps)(PropertyDisplay);
export default compose (
    graphql(property, {options : (props) => ({ variables : {propertyId: props.match.params.id}})}),
    graphql(bookProperty, {name: "bookProperty"})
)(PropertyDisplayPage);