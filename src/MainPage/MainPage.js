import React from 'react';
import Tags from '../Tags/tags';
import Mentors from './Mentors.js';
import { activeUsers } from '../data/data';

class MainPage extends React.Component {

    constructor() {
        super();
        this.state = { users: [], filteredUsers: [], tags: [] };

        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.filterAndSortUsers = this.filterAndSortUsers.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('user list', activeUsers => {
            this.setState({users: activeUsers});
            this.filterAndSortUsers(this.state.tags);
        });
    }

    handleTagsChange(newTags) {
        this.setState({tags: newTags})
        this.filterAndSortUsers(newTags);
    }

    filterAndSortUsers(tags) {
        let usersFilteredByTag = this.state.users.filter(user => {
            let intersectingTags = tags.filter(tag => {
                return user.tags.indexOf(tag) !== -1;
            });
            return intersectingTags.length !== 0;
        });
        let sortedUsers = usersFilteredByTag.sort((a, b) => {
            return a.rating < b.rating;
        })
        this.setState({filteredUsers: sortedUsers});
    }

    render = () => {
        return <div>
            <Tags updateTags={this.handleTagsChange} users={this.state.users} />
            <Mentors tableData={this.state.filteredUsers}/>
        </div>
    }
}

export default MainPage;