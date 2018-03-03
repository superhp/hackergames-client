import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import Service from './Service';
import { BrowserRouter } from 'react-router-dom'

var service = new Service();
var socket = service.getSocket();
 
const DOMNode = document.getElementById('renderTarget');

ReactDOM.render(
    <BrowserRouter>
        <SocketProvider socket={socket}>
            <App service={service}/>
        </SocketProvider>
    </BrowserRouter>,
    document.getElementById('root'));
//registerServiceWorker();
