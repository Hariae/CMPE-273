import React, { Component } from 'react';
import Header from '../Header/Header';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {rooturl} from '../../config/settings';
import { connect } from 'react-redux';

class OwnerInbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageContent: "",
            messages: [],
            messageResult: [],
            redirectToHome: false
        }
    }

    
    componentWillMount() {

        var token = localStorage.getItem("token");
        axios.defaults.withCredentials = true;
        var data = {


        };
        //console.log('component did mount');
        axios.post('http://'+rooturl+':3001/get-messages/', data)
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

        let redirectVar = null;
        if(this.props.loginStateStore.result){
            if(!this.props.loginStateStore.result.isAuthenticated === true){
                redirectVar = <Redirect to="/login" />
            }
        }
        else{
            redirectVar = <Redirect to="/login" />
        }
       
        let messageDetails = this.state.messageResult.map(function (message, index) {
            var messageContent = "";
            function handleInputChange(event) {               
                const target = event.target;
                const name = target.name;
                const value = target.value;


                messageContent = value;
            }

            function sendMessage(event) {
                var propertyId = event.target.value;
                //console.log('Inside Send Message ', this.state.messageContent);
                var token = localStorage.getItem("token");
                axios.defaults.withCredentials = true;
                console.log(event.target);
                const target = event.target;
                const messageid = target.name;
                console.log(messageid);

                console.log('Message Id', messageid);
                var data = {
                    traveler: false,
                    messageContent: messageContent,
                    messageId : messageid
                }

                axios.post('http://'+rooturl+':3001/send-message', data, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(response => {

                        if (response.status === 200) {
                            console.log('Message sent!');
                            
                            
                        }
                    });
            }

            return (
                <div className="container display-messages-container pad-5-pc" key={index}>
                    <div >
                        <div>
                            <p><b>Property Id : #{message.PropertyId}</b></p>
                        </div>
                        <div>
                            <span className="alert alert-dark" role="alert">{message.Message.traveler}</span>
                        </div>
                        
                            <div className="flt-right">
                                <span className="alert alert-info" role="alert">{message.Message.owner}</span>
                            </div>
                    </div>

                    <br /><br />
                    <div className="flt-right clear">

                        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target={"#myModal"+index}>Reply</button>
                    </div>

                    <div className="modal fade" id={"myModal"+index} role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Reply to traveler</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p></p>
                                    <div className="form-group">
                                        <textarea type="text" name="messageContent" id="messageContent" className="form-control form-control-lg" placeholder="Type your message here" onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" name={message.MessageId} className="btn btn-success" data-dismiss="modal" onClick={sendMessage}>Send</button>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>
            );

        });

        return (
            <div>
                {redirectVar}
                <Header />
                <div className="container">
                    {messageDetails}
                </div>
            </div>
        );
    }

}

//export default OwnerInbox;

const mapStateToProps = state => ({
    loginStateStore : state.login
})

//export default Profile;
export default connect(mapStateToProps, {})(OwnerInbox);