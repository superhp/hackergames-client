import React from 'react';
import Tags from '../Tags/tags';
import Mentors from './Mentors.js';
import { activeUsers, requestMessages } from '../data/data';
import MessageRequests from './MessageRequests';
import Chat from '../Chat/Chat';
import Dialog from 'material-ui/Dialog';
import Rating from '../Rating/Rating';

class MainPage extends React.Component {

    constructor() {
        super();

        this.state = { users: [], filteredUsers: [], tags: [], tagsToRate: [], requestMessages: requestMessages, inChat: false, mentorSocketId: '', mentorUserName: '', showRating: false };

        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.filterAndSortUsers = this.filterAndSortUsers.bind(this);
        this.handleMessageRequest = this.handleMessageRequest.bind(this);

        this.handleMessageReject = this.handleMessageReject.bind(this);       
        this.handleClose = this.handleClose.bind(this); 
    }

    handleClose() {
        this.setState({inChat: false, mentorUserName: '', mentorSocketId: '', showRating: true});
        this.props.service.getSocket().emit('private message', this.state.mentorSocketId, '** ' + this.state.mentorUserName + ' has left **');     
    }

    componentDidMount() {
        this.props.service.getSocket().on('user list', activeUsers => {
            this.setState({users: activeUsers});
            this.filterAndSortUsers(this.state.tags);
        });
        this.props.service.getSocket().on('request messages', reqMessages => {
            this.setState({requestMessages: reqMessages});
        });
        this.props.service.getSocket().on('notify accept', mentorSocketId => {
            var user = this.state.filteredUsers.find(user => user.socketId === mentorSocketId);            
            this.setState({inChat: true, mentorSocketId: mentorSocketId, tagsToRate: user.profile.tags, mentorUserName: user.profile.name});            
        })
    }

    handleTagsChange(newTags) {
        this.setState({tags: newTags})
        this.filterAndSortUsers(newTags);
    }

    handleMessageReject(e, requesterSocketId) {
        this.props.socket.emit('reject message', this.props.socket.id, requesterSocketId);
    }

    filterAndSortUsers(tags) {
        var sortedUsers = [];
        if (tags.length == 0) {
            sortedUsers = this.sortMentors(this.state.users, []);
        } else {
            let usersFilteredByTag = this.state.users.filter(user => {
                let intersectingTags = tags.filter(tag => {
                    return user.profile.tags.map(t => t.name).indexOf(tag) !== -1;
                });
                return intersectingTags.length !== 0;
            });
            sortedUsers = this.sortMentors(usersFilteredByTag, tags);
        }
        sortedUsers = sortedUsers.filter(x => x.socketId !== this.props.service.getSocket().id); 
        this.setState({filteredUsers: sortedUsers});
    }

    sortMentors(users, tags) {
        return users.sort((a, b) => {
            var firstHas = this.hasTags(a, tags);
            var secondHas = this.hasTags(b, tags);
            if (firstHas > secondHas)
                return false;
            else if (secondHas > firstHas)
                return true;

            return a.rating < b.rating;
        });
    }

    hasTags(user, tags) {
        var tagNames = tags.map(t => t.name);
        if (user.tags) {
            var found = user.tags.filter(t => tagNames.indexOf(t) > -1);
            return found.length;
        } else {
            return 0;
        }
    }

    handleMessageRequest(user, reqMessage, topic) {
        this.props.service.getSocket().emit('send request message', user.socketId, this.props.service.getSocket().id, reqMessage, topic);
    }
    
    rated = (rating) => {
        this.props.service.rate(rating, this.state.mentorSocketId);
    }

    cancel = () => {
        this.setState ({
            showRating: false
        });
    }

    render = () => {             
        return <div className="row">
            <div className="col-lg-8 col-lg-offset-1">
                <div>
                    <h1 className="bottom-margin-0">Interests</h1>
                    <span>The things you somehow forgot.</span>
                    <Tags updateTags={this.handleTagsChange} users={this.state.users} />
                </div>
                <div>
                    <h1 className="bottom-margin-0">Mentors</h1>
                    <span>People who are willing to share.</span>
                    <Mentors tableData={this.state.filteredUsers} selectedTags={this.state.tags} handleMessageRequest={this.handleMessageRequest}/>
                </div>
            </div>
            <div className="col-lg-3">
                <MessageRequests messages={this.state.requestMessages}
                    handleMessageReject={this.handleMessageReject} service={this.props.service}/>
            </div>
            <Dialog
                modal={true}
                open={this.state.inChat}
                >
                <Chat service={this.props.service} receiver={{name: this.state.mentorUserName, id: this.state.mentorSocketId}} onClose={this.handleClose} />
                
            </Dialog>
            <Rating tags={ this.state.tagsToRate } show={ this.state.showRating } cancel={this.cancel} rated={this.rated} service={ this.props.service } receiver={{name: this.state.mentorUserName, id: this.state.mentorSocketId}} />
        </div>    
    }
}

export default MainPage;