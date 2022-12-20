const express = require('express');
const app = express();
const ExpressPeerServer = require('peer').ExpressPeerServer;
const server = app.listen(4000);
const options = {
    debug: true
}
app.use('/', ExpressPeerServer(server, options));