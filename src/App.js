import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { socketConnect } from 'socket.io-react';

class App extends React.Component {

  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage = () => {
    this.props.socket.emit('chat message', 'Hello world from hackergames');
  }

  render = () => {
    return <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <AppBar title="Learn from me" showMenuIconButton={ false } iconElementRight={ <FlatButton label="Home" /> } />
      <button onClick={this.sendMessage}>
         Send msg to socket.io
         </button>
    </MuiThemeProvider>
  }
}

export default App;