import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

class Service {
    constructor() {
        var serverUrl = process.env.NODE_ENV === "production" ?
            "https://hg-api.azurewebsites.net" :
            "http://localhost:1337";
        console.log(process.env['api_url']);
        this.socket = io.connect(serverUrl);
    }

    getSocket() {
        return this.socket;
    }

    register(data) {
        console.log("register data");
        console.log(data);
        this.socket.emit("login", data);
    }

    logout() {
        this.socket.emit("logout");
        console.log("logout");
    }
}

export default Service;