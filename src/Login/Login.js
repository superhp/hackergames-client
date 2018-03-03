import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Service from '../Service';
import Tags from '../Tags/tags';
import Paper from 'material-ui/Paper';
import styles from './login.css';

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

        fetch("https://learnfromme.azurewebsites.net/.auth/me", {
            credentials: 'include'
        }).then(response => response.json())
        .then(data => this.facebookLogin(data));
    }

    facebookLogin(data) {
        this.state.setState({
            username: data[0].user_id
        })
        this.register();
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
        <Paper className="col-md-4 col-md-offset-4 login-box" zDepth={3}>
            <div className="login">
                <h1>Register</h1>

                <TextField hintText="Username" value={this.state.username} onChange={this.changeUsername} floatingLabelText="Your username" />
                <br /><br />
                <Tags updateTags={this.handleTagsChange} users={this.state.users} />

                <RaisedButton className="register-button" label="JOIN" onClick={this.register} primary={true} />

                <a className='ui facebook fluid button cg-login-button' href={"https://learnfromme.azurewebsites.net/.auth/login/facebook?post_login_redirect_url=/"}>Login with Facebook</a>
            </div>
        </Paper>
      );
    }

  }
  
export default Login;
  