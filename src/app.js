const Client = require('./Handler/Client');
const config = require('./config.json');
const client = new Client(config);
const LoggerFactory = require('./Handler/SLF4j');
const Logger = new LoggerFactory("ClientProcess");
const express = require('express');
const app = express();
const http = require('http');

app.listen(process.env.PORT || 3000)
app.get('/', (req, res) => {
  Logger.info("Sending heartbeat to glitch project");
  res.sendStatus(200);
});

setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 270000);

client.on('disconnect', () => Logger.info('Connection lost...'))
	.on('reconnect', () => Logger.info('Attempting to reconnect...'))
	.on('error', err => Logger.error(err))
    .on('warn', info => Logger.info(info));
client.start();