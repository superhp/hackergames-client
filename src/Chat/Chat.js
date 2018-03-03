import React from 'react';
import { TalkBox } from "react-talk";
import styles from './chat.css'

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        this.onMessageReceive
        this.props.service.getSocket().on('private message', msg => this.onMessageReceive(msg));
    }

    onMessageReceive = (text) => {
        var msg = {};
        msg['author'] = this.props.receiver.name;
        msg['authorId'] = this.props.receiver.socketId;
        msg['message'] = text;
        msg['timestamp'] = Date.now().toString()
        this.setState(prevState => ({
            messages: [...prevState.messages, msg]
        }));
    }
    
    sendMessage = (msg, selfMsg) => {
        selfMsg["timestamp"] = Date.now().toString();
        this.setState(prevState => ({
            messages: [...prevState.messages, selfMsg]
        }));
        this.props.service.getSocket().emit('private message', this.props.receiver.socketId, selfMsg.message);
        return true;
    }

    render() {
        return (
          <div className="close-div"> 
            <a href='#' className="close-thik" onClick={this.props.onClose}/>
            <TalkBox topic={this.props.receiver.name} currentUserId={this.props.receiver.socketId} currentUser={this.props.receiver.name}
              messages={ this.state.messages } onSendMessage={ this.sendMessage }>              
            </TalkBox>
          </div>
        );
    }
}

export default Chat;