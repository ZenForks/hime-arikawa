const Client = require('./Handler/Client');
const config = require('./config.json');
const client = new Client(config);
const LoggerFactory = require('./Handler/SLF4j');
const Logger = new LoggerFactory("ClientProcess");

client.on('disconnect', () => Logger.info('Connection lost...'))
	.on('reconnect', () => Logger.info('Attempting to reconnect...'))
	.on('error', err => Logger.error(err))
    .on('warn', info => Logger.info(info));
client.start();