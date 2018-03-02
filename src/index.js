import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

var serverUrl = process.env.NODE_ENV === "production" ?
"https://hg-api.azurewebsites.net" :
"http://localhost:1337";

const socket = io.connect(serverUrl);
socket.on('chat message', msg => console.log(msg));
 
const DOMNode = document.getElementById('renderTarget');

ReactDOM.render(
    <SocketProvider socket={socket}>
        <App socket={socket}/>
    </SocketProvider>,
    document.getElementById('root'));
registerServiceWorker();
