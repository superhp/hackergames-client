import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import Service from './Service';

var service = new Service();
var socket = service.getSocket();
 
const DOMNode = document.getElementById('renderTarget');

ReactDOM.render(
    <SocketProvider socket={socket}>
        <App service={service}/>
    </SocketProvider>,
    document.getElementById('root'));
registerServiceWorker();
