import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';

class TravelerInbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //messageContent: "",
            //messages: [],
            messageResult: []
        }

    }

    componentWillMount() {

        var token = localStorage.getItem("token");
        axios.defaults.withCredentials = true;
        var data = {


        };
        console.log('component did mount');
        axios.post('http://localhost:3001/get-traveler-messages', data)
            .then(response => {
                if (response.status === 200) {
                    //console.log(response.data);
                    this.setState({
                        messageResult: response.data
                    });
                    console.log('messages', this.state.messageResult);
                }
            });
    }


    render() {

        let messageDetails = this.state.messageResult.map(function (message, index) {

            return (
                <div className="container display-messages-container pad-5-pc" key={index}>
                    <div >
                        <div>
                            <span className="light-blue-bg">{message.Message.traveler}</span>
                        </div>
                    </div>

                    <div >
                        <div>
                            <span className="dark-blue-bg">{message.Message.owner}</span>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <Header />
                {messageDetails}
            </div>
        );
    }
}

export default TravelerInbox;