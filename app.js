const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const socket = require('socket.io');
const config = require("config");
const client = require('./helpers/redis-client');
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(routes)

const httpServer = http.Server(app);
const io = socket(httpServer, {
    cors: {
        origin: '*',
    }
});
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('User Disconnected');
    });
    socket.on('check-status', async function (msg) {
        try {
            const decode = jwt.verify(msg, config.get('ACCESS_TOKEN_SECRET'))
            const users = await client.lRange(config.get('REDIS_KEY'), 0, -1)
            const user = users.find(user => JSON.parse(user).id === decode.id)
            if (user && JSON.parse(user).logged_in){
                socket.emit('authorised', true);
            }
        } catch (err) {
            socket.emit('authorised', false);
        }
    });
});

const PORT = process.env.PORT || 5006;

httpServer.listen(PORT, () => console.log('Example app listening on port:', PORT))
