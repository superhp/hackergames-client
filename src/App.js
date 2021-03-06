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
import Rating from './Rating/Rating';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    
    this.state = {
      showRating: false
    };
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

  rated = (rating) => {
    this.props.service.rate(rating, "socketID", "tag");

    this.setState({
      showRating: false
    });
  }

  closeChat = () => {
    console.log("chat closed");
    this.setState({
      showRating: true
    });

    // TODO: redirect?
  }

  render = () => {
    return <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <AppBar title="Learn From Me" showMenuIconButton={ false } iconElementRight={ this.state.username ? <FlatButton onClick={ this.logout } label="Logout" /> : <FlatButton label="Login" />  } />
      
      <Switch>
        <Route exact path='/' render={routeProps => this.state.username ? <Redirect to="/users" /> : <Login {...routeProps} onLogin={ this.onLogin } service={ this.props.service } /> } />
        <Route exact  path='/users' render={routeProps => this.state.username ? <MainPage {...routeProps} service={ this.props.service } /> : <Redirect to="/" /> } />
      </Switch>

      {/* <Chat onClose={ this.closeChat } socket={ this.props.service.getSocket() } receiver={{name: "test", id: "ttt"}} />

      <Rating show={this.state.showRating } rated={this.rated} service={ this.props.service } receiver={{name: "test", id: "ttt"}} /> */}

    </MuiThemeProvider>
  }

}

export default App;