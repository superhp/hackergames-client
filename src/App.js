import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { socketConnect } from 'socket.io-react';
import MainPage from './MainPage/MainPage';
import Login from './Login/Login';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);

    this.props.service.getSocket().on('user list', msg => console.log(msg));

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
      <MainPage socket={this.props.service.getSocket()}/>
      <button onClick={this.sendMessage}>
         Send msg to socket.io
         </button>

      <Login onLogin={ this.onLogin } service={ this.props.service } />

    </MuiThemeProvider>
  }

}

export default App;