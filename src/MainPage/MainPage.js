import React from 'react';
import Tags from '../Tags/tags';
import Mentors from './mentors.js';
import { activeUsers } from '../data/data';

class MainPage extends React.Component {

    constructor() {
        super();
        this.state = { users: [] };
    }

    componentDidMount() {
        this.props.socket.emit('user list', null);
        this.props.socket.on('user list', activeUsers => {
            this.setState({users: activeUsers})
        });
    }

    handleTagsChange = (tags) => {
        console.log(tags);
        // let filteredUsers = activeUsers.sort(() => {return 0.5 - Math.random()})
        // this.setState({users: filteredUsers});
    }

    render = () => {
        return <div>
            <Tags updateTags={this.handleTagsChange}/>
            <Mentors tableData={this.state.users}/>
        </div>
    }
}

export default MainPage;