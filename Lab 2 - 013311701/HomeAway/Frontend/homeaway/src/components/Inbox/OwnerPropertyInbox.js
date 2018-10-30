import React, { Component } from 'react';
import Header from '../Header/Header';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';

class OwnerPropertyInbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageContent : "",
            messages : [],
            messageResult: [],
            propertyMessages : []

        }

        //bind
        this.sendMessage = this.sendMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {

        var token = localStorage.getItem("token");
        axios.defaults.withCredentials = true;
        var data = {};

        axios.post('http://localhost:3001/get-messages/', data)
            .then(response => {
                if (response.status === 200) {
                    //console.log(response.data);
                    // this.setState({
                    //     messages: response.data
                    // });

                    var messageResult =  response.data;
                    //console.log('messages', this.state.messages);
                    for(var i=0;i<messageResult.length;i++){
                        console.log('Inside loop');
                        if(messageResult[i].propertyId === this.props.match.params.id){
                            this.setState({
                                propertyMessages : messageResult[i].messages
                            });
                            console.log('message Content: ', this.state.propertyMessages);
                            
                        }
                    }

                    

                }
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
            traveler : false,
            messageContent : this.state.messageContent,
            PropertyId: this.props.match.params.id
        }

        axios.post('http://localhost:3001/send-message', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => {

            if(response.status === 200){
                console.log('Message sent!');
            }
        });
    }

    
    render() {

        // let messages = this.state.propertyMessages.map(function(message, index){
        //     return(
        //     <div className="container display-messages-container pad-5-pc" key={index}>
        //             <div >
        //                 <div>
        //                     <span className="light-blue-bg">Traveler: {message.propertyId}</span>
        //                 </div>
        //             </div>
        //             <div >
        //                 <div>
        //                     <span className="dark-blue-bg flt-right">Owner: {message.messages[0].owner}</span>
        //                 </div>
        //             </div>
        //             <br/><br/>                    
                    
                    

        //         </div>
        //         );
        // });

        let messages = this.state.propertyMessages.map(function(message, index){

            return(
                <div key={index}>
                    <div>
                        <div>
                            <span className="light-blue-bg">Traveler: {message.traveler}</span>
                        </div>
                    </div>
                    <div >
                        <div>
                            <span className="dark-blue-bg">Owner: {message.owner}</span>
                        </div>
                    </div>                   
                </div>
            )
        });

        
        return (
            <div>
                <Header />
                <div className="container">
                    <div>
                        <div>
                        
                            <div>
                            <div>
                               {messages}
                            </div>
                            <div className="clear">
                            </div>
                                <div className="center-content">
                                    <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Reply</button>
                                </div>
                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">Reply to traveler</h4>
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            </div>
                                            <div className="modal-body">
                                                <p></p>
                                                <div className="form-group">
                                                    <textarea type="text" name="messageContent" id="messageContent" className="form-control form-control-lg" placeholder="Type your message here" onChange={this.handleInputChange} />
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
                    </div>
                </div>
            </div>
        );
    }

}

export default OwnerPropertyInbox;