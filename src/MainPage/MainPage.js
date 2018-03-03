import React from 'react';
import Tags from '../Tags/tags';
import Mentors from './Mentors.js';
import { activeUsers, requestMessages } from '../data/data';
import MessageRequests from './MessageRequests';

class MainPage extends React.Component {

    constructor() {
        super();
        this.state = { users: [], filteredUsers: [], tags: [], requestMessages: requestMessages };

        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.filterAndSortUsers = this.filterAndSortUsers.bind(this);
        this.handleMessageRequest = this.handleMessageRequest.bind(this);
        this.handleMessageReject = this.handleMessageReject.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('user list', activeUsers => {
            this.setState({users: activeUsers});
            this.filterAndSortUsers(this.state.tags);
        });
        this.props.socket.on('request messages', reqMessages => {
            this.setState({requestMessages: reqMessages});
        });
    }

    handleTagsChange(newTags) {
        this.setState({tags: newTags})
        this.filterAndSortUsers(newTags);
    }

    handleMessageReject(e, userName) {
        let updatedMessages = this.state.requestMessages.filter(x => x.userName !== userName);
        this.setState({requestMessages: updatedMessages})
    }

    filterAndSortUsers(tags) {
        var sortedUsers = [];
        if (tags.length == 0) {
            sortedUsers = this.sortMentors(this.state.users, []);
        } else {
            let usersFilteredByTag = this.state.users.filter(user => {
                let intersectingTags = tags.filter(tag => {
                    return user.tags.map(t => t.name).indexOf(tag) !== -1;
                });
                return intersectingTags.length !== 0;
            });
            sortedUsers = this.sortMentors(usersFilteredByTag, tags);
        }
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
        var found = user.tags.filter(t => tagNames.indexOf(t) > -1);
        return found.length;
    }

    handleMessageRequest(user, reqMessage) {
        this.props.socket.emit('send request message', user.socketId, this.props.socket.id, reqMessage);
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
                    handleMessageReject={this.handleMessageReject}/>
            </div>
        </div>
    }
}

export default MainPage;