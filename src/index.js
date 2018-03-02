import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

var serverUrl = process.env['api_url'] | "http://localhost:1337";
console.log(process.env['api_url']);
const socket = io.connect(serverUrl);
socket.on('message', msg => console.log(msg));
 
const DOMNode = document.getElementById('renderTarget');

ReactDOM.render(
    <SocketProvider socket={socket}>
        <App socket={socket}/>
    </SocketProvider>,
    document.getElementById('root'));
registerServiceWorker();
