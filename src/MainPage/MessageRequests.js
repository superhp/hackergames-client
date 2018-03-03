import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './messageRequests.css';

class MessageRequests extends React.Component {

    render = () => {
        const style = {
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        };

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
                                <FlatButton label="Reject" secondary={true}/>
                                <FlatButton label="Accept" primary={true}/>
                            </CardActions>
                        </CardText>
                    </Card>
                    </li> 
                })}
            </ul>
        )
    }

}

export default MessageRequests;