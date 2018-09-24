import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Header from '../Header/Header';

class PropertyDisplay extends Component {

    constructor() {
        super();

        this.state = {
            arrivalDate: moment(),
            departureDate: moment()
        }
    }

    render() {
        let redrirectVar = null;
        if(!cookie.load('cookie')){
            redrirectVar = <Redirect to="/login" />
        }

        return (
            <div>
                <Header/>
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
                        <a href="/display-properties" className="btn btn-primry btn-lg" style={{ width: "100%" }}>Search</a>
                    </span>
                </div>
                <div className=" container property-display-content border">
                    <div className="row">
                        <div className="property-display-img-content col-6">
                            <img className="property-display-img" src="https://odis.homeaway.com/odis/listing/2d64bce1-3b15-4171-8f2f-ae6558097d1c.c10.jpg" alt="property-image" />
                        </div>
                        <div className="property-display-pricing-content col-5 border">
                            <div className="display-price">
                                <h4><strong>$150</strong></h4><span> per night</span>
                            </div>
                            <div>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td><div>Arrive</div><div className="blue-text">Oct 10</div></td>
                                            <td><div>Depart</div><div className="blue-text">Oct 14</div></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><div>Guests</div><div className="blue-text">2 guests</div></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <span className="pull-left">Total</span>
                                    <span className="flt-right">$950.76</span>
                                </div>
                                <div className="center-content">
                                    <button className="btn btn-lg btn-primary book-btn">Book now</button>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="property-display-details-content col-6">
                            <div className="details-content-headline-text"><h4><strong>Title</strong></h4></div>
                            <div>
                                <p>868, S 5th Street</p>
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
                                            <td>House</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Bedrooms</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Sleeps</td>
                                            <td>5</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Bathrooms</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Min Stay</td>
                                            <td>2 nights</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="property-description-content">
                                <h3><strong>2 bedroom 2 bath</strong></h3>
                                <div className="desc-content">
                                    Natural light fills this charming 2BR/1.5BA duplex perched atop the coveted neighborhood
                                    of Queen Anne. Radiant ceramic floors in the bathroom and vintage kitchen cabinetry from
                                    1909 combine historic charm and contemporary comfort.
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyDisplay;