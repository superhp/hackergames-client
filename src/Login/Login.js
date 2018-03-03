import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Service from '../Service';
import Tags from '../Tags/tags';

const registerButtonStyle = {
  margin: 12,
};

function handleRequestDelete() {
    console.log("delete");
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", users: []};

        this.register = this.register.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
    }

    componentDidMount() {
        this.props.service.getSocket().on('user list', activeUsers => {
            console.log("users list");
            console.log(activeUsers);
            this.setState({users: activeUsers});
        });
    }

    register() {
        console.log(this.state);
        this.props.service.register({
            name: this.state.username,
            tags: []
        });

        this.props.onLogin(this.state.username);
    }

    changeUsername(e) {
        this.setState({ username: e.target.value });
    }

    handleTagsChange = (tags) => {
        this.setState({
            username: this.state.username,
            tags: tags
        });
        console.log(tags);
    }

    render() {
      return (
        <div className="col-md-8 col-md-offset-2">
            <h1>Join</h1>

            <TextField hintText="Username" value={this.state.username} onChange={this.changeUsername} floatingLabelText="Your username" />
            <br /><br />
            <Tags updateTags={this.handleTagsChange} users={this.state.users} />

            <RaisedButton label="JOIN" onClick={this.register} primary={true} style={registerButtonStyle} />
        </div>
      );
    }

  }
  
export default Login;
  