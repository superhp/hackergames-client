import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { socketConnect } from 'socket.io-react';
import MainPage from './MainPage/MainPage';
import Login from './Login/Login';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Chat from './Chat/Chat'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    
    this.state = {};
  }

  sendMessage = () => {
    this.props.socket.emit('chat message', 'Hello world from hackergames');
  }

  onLogin = (username) => {
    this.setState ({
      username: username
    });

    console.log("logged in as " + username);
  }

  logout = () => {
    this.props.service.logout();

    this.setState ({
      username: undefined
    });
  }

  render = () => {
    return <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <AppBar title="Learn from me" showMenuIconButton={ false } iconElementRight={ this.state.username ? <FlatButton onClick={ this.logout } label="Logout" /> : <FlatButton label="Login" />  } />
      
      <Switch>
        <Route exact path='/' render={routeProps => this.state.username ? <Redirect to="/users" /> : <Login {...routeProps} onLogin={ this.onLogin } service={ this.props.service } /> } />
        <Route exact  path='/users' render={routeProps => this.state.username ? <MainPage {...routeProps} socket={this.props.service.getSocket() } /> : <Redirect to="/" /> } />
      </Switch>

    </MuiThemeProvider>
  }

}

export default App;