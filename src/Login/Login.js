import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Service from '../Service';
import Tags from '../Tags/tags';
import Paper from 'material-ui/Paper';
import styles from './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            users: [],
            tags: [],
            email: ""
        };

        this.register = this.register.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
    }

    componentDidMount() {
        this.props.service.getSocket().on('user list', activeUsers => {
            this.setState({users: activeUsers});
        });

        fetch("https://learnfromme.azurewebsites.net/.auth/me", {
            credentials: 'include'
        }).then(response => response.json())
        .then(data => this.facebookLogin(data));
    }

    facebookLogin(data) {
        console.log(data);
        this.setState({
            email: data[0].user_id,
            username: data[0].user_claims.find(uc => uc.typ === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").val
        })
        //this.register();
    }

    register() {
        console.log(this.state);
        this.props.service.register({
            name: this.state.username,
            email: this.state.email,
            tags: this.state.tags.map(t => new Object({
                name: t,
                rating: 0,
                ratingCount: 0
            }))
        });

        this.props.onLogin(this.state.username);
    }

    changeUsername(e) {
        this.setState({ username: e.target.value });
    }

    changeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleTagsChange = (tags) => {
        this.setState({
            username: this.state.username,
            tags: tags
        });
    }

    render() {
      return (
        <Paper className="col-md-4 col-md-offset-4 login-box" zDepth={3}>
            <div className="login">
                <h1>Register</h1>

                <div className="row">
                    <div className="col-md-12">
                        <TextField hintText="Email" value={this.state.email} onChange={this.changeEmail} floatingLabelText="Your email" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <TextField hintText="Username" value={this.state.username} onChange={this.changeUsername} floatingLabelText="Your username" />
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <Tags updateTags={this.handleTagsChange} users={this.state.users} placeholder={"What is your occupation?"}/>
                    </div>
                </div>
                <RaisedButton className="register-button" label="JOIN" onClick={this.register} primary={true} />

                <a className='ui facebook fluid button cg-login-button' href={"https://learnfromme.azurewebsites.net/.auth/login/facebook?post_login_redirect_url=/"}>Login with Facebook</a>
            </div>
        </Paper>
      );
    }

  }
  
export default Login;
  