import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './messageRequests.css';
import Chat from '../Chat/Chat';
import Dialog from 'material-ui/Dialog';

class MessageRequests extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            inChat : false,
            acceptedMessage : {}
        }

        this.handleAccept = this.handleAccept.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleAccept(msg){
        console.log(msg);
        this.setState({inChat: true, acceptedMessage: msg});
        this.props.socket.emit('notify accept', msg.socketId, this.props.socket.id)
    }

    handleClose = () => {
        this.setState({inChat: false, acceptedMessage: {}});
    };

    render = () => {
        const style = {
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        };

        if(this.state.inChat){
            return <Dialog
                modal={true}
                open={this.state.inChat}
                >
                <Chat socket={this.props.socket} receiver={{name: this.state.acceptedMessage.userName, id: this.state.acceptedMessage.socketId}} onClose={this.handleClose} />
            </Dialog>
        }
        else{
            return (
                <ul>
                    {this.props.messages.map((msg, index) => {
                            return <li>
                                <Card>
                                    <CardHeader
                                        title={msg.userName}
                                        subtitle={msg.topic}
                                        actAsExpander={true}/>
                                    
                                    <CardText expandable={true}>
                                        {msg.message}
                                        <CardActions>
                                            <FlatButton label="Reject" secondary={true} onClick={(e) => this.props.handleMessageReject(e, msg.userName)}/>
                                            <FlatButton label="Accept" primary={true} onClick={(e) => this.handleAccept(msg)}/>
                                        </CardActions>
                                    </CardText>
                                </Card>
                            </li> 
                        }
                    )}
                </ul>
            )
        }
    }

}

export default MessageRequests;