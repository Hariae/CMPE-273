import React, { Component } from 'react';


class ListProperty extends Component {

    render() {
        return (
            <div className="container">
                <div className="container content">
                    <div className="jumbotron">
                        <div className="flt-left mar-right-50">
                            <h1><strong> How much could </strong></h1>
                            <h1><strong>you earn?</strong></h1>
                        </div>                        
                        <div className="flt-left center-content">
                        
                            <div className="predict-contentpad-left-25">
                                <div><strong>Let's start with basics</strong></div>
                                <br/>
                                <div className="prediction-divider">
                                    <div className="">
                                        <img src="https://www.homeaway.com/lyp/build/client/static/earn/Bedroom-Icon.svg" alt="beds" />
                                        <div>Bedrooms <span><input class="form-control input-lg"></input></span></div>
                                        
                                    </div>
                                    <hr/>
                                    <div className="">
                                        <img src="https://www.homeaway.com/lyp/build/client/static/earn/Bathroom-Icon.svg" alt="baths" />
                                        <div>Bathrooms<span><input class="form-control input-lg"></input></span></div>
                                    </div>
                                    <br/>
                                    <div>
                                        <button className="btn btn-primary btn-lg">Next</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="clear"></div>
                        
                    </div>

                    <div className="jumbotron">
                        <h3 className="center-content">Simply the perfect vacation rental marketplace</h3>
                        <div>
                            <div className="col-lg-4 col-md-4 col-sm-12 flt-left center-content">
                                <img src="https://www.homeaway.com/lyp/build/client/static/earn/Globe.svg" alt="globe" />
                                <div>Maximum Exposure</div>
                                <div>Reach travelers in 190 countries</div>
                                <div>across 50+ dedicated sites</div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 flt-left center-content">
                                <img src="https://www.homeaway.com/lyp/build/client/static/earn/Control.svg" alt="control" />
                                <div>You're in control</div>
                                <div>You control prices, availability, and</div>
                                <div>who stays at your property</div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 flt-left center-content">
                                <img src="https://www.homeaway.com/lyp/build/client/static/earn/Tools.svg" alt="tools" />
                                <div>Easy-to-use Tools</div>
                                <div>Access best-in-class reservation tools</div>
                                <div>for setting up your rates and managing reservations</div>
                            </div>
                            <div className="clear">

                            </div>
                        </div>
                    </div>

                    <div className="jumbotron">
                        VIDEO              
                    </div>

                    <div className="jumbotron">
                        <div className="col-lg-4 col-md-4 col-sm-12 flt-left center-content">
                            <div><strong>Set up your property</strong></div>
                            <br/>
                            <div>Explain what's unique, show off with</div>
                            <div>photos, and set the right price</div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 flt-left center-content">
                            <div><strong>Get the perfect match</strong></div>
                            <br/>
                            <div>We'll connect with travelers from</div>
                            <div>home and abroad</div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 flt-left center-content">
                            <div><strong>Start earning</strong></div>
                            <br/>
                            <div>We'll help you collect the payment deduct a commission</div>
                            <div>and send you the balance</div>
                        </div>
                        <div className="clear">
                        </div>    
                    
                    </div>
                    <div className="jumbotron">
                    <div className="center-content">
                        <h3>Are you a property manager?</h3>
                        <div>If you manage more than 10 properties</div>
                        <div>you might consider signing up as a manager</div>
                        <br/>
                        <div><button className="btn btn-primary btn-lg">Learn more</button></div>
                    </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default ListProperty;