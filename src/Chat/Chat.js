import React from 'react';
import { ChatFeed, Message } from 'react-chat-ui'
import styles from './chat.css'
import TextField from 'material-ui/TextField';
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward';
import FlatButton from 'material-ui/FlatButton';
import {fullWhite} from 'material-ui/styles/colors';
import io from 'socket.io-client';

const style = {
  margin: 12,
};

class Chat extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            msg: '',
            receiver: {},
            messages: []
        };

        this.changeMessage = this.changeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.state.socket.on('private message', (msg) => this.setState({messages: [...this.state.messages, new Message({id: 1, message: msg})]}))
    }

    componentDidMount(){
        this.setState({ receiver: {name: this.props.receiver.name, socketId: this.props.receiver.id}})
    }

    changeMessage(e) {
        this.setState({ msg: e.target.value });
    }

    sendMessage(msg){
        this.props.socket.emit('private message', this.state.receiver.socketId, msg);
        this.setState({messages: [...this.state.messages, new Message({id: 0, message: msg})], msg: ''});
    }

    render() {
        return (
            <div className="chat-body">
                <div className="row">
                    <div className="col-sm-6 pull-left">
                        <h3>  Talking to {this.state.receiver.name}</h3>
                    </div>
                    <div className="col-sm-6 pull-right">
                        <h5/><FlatButton className="pull-right" label="Finish" primary={true} onClick={this.props.onClose} />
                    </div>
                </div>
                <hr/>
                <ChatFeed
                    messages={this.state.messages} // Boolean: list of message objects
                    isTyping={this.state.is_typing} // Boolean: is the recipient typing
                    hasInputField={false} // Boolean: use our input, or use your own
                    showSenderName // show the name of the user who sent the message
                    bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                    // JSON: Custom bubble styles
                    bubbleStyles={
                        {
                            text: {
                                fontSize: 30
                            },
                            chatbubble: {
                                borderRadius: 70,
                                padding: 40
                            }
                        }
                    }
                />
                <div className="row chat-footer">
                    <div className="col-md-11">
                        <TextField hintText="Hint Text" fullWidth value={this.state.msg} onChange={this.changeMessage}/>
                    </div>
                    <div className="col-md-1">
                        <FlatButton
                            backgroundColor="#4DD0E1"
                            hoverColor="#00BCD4"
                            icon={<Arrow color={fullWhite} />}
                            style={style}
                            fullWidth
                            onClick={(e) => this.sendMessage(this.state.msg)}
                        />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Chat;