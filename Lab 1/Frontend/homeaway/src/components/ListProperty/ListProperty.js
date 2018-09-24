import React, { Component } from 'react';
import Header from '../Header/Header';

class ListProperty extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="lyp-container h-100">
                    <img src="https://odis.homeaway.com/odis/destination/56d73b61-1f5a-4090-8359-24895c545e5e.hw1.jpg" alt="lyp-image"></img>
                    <div className="lyp-content center-content">
                        <a href="/owner-dashboard" className="btn btn-primary btn-lg lyp-nav-btn">Go to Dashboard</a>
                        <div className="divider"></div>
                        <a href="/add-property" className="btn btn-success btn-lg lyp-nav-btn">Add New Property</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListProperty;