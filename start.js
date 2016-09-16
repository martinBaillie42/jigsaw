'use strict'

const conf = require('./server/config/');
const server = require('./server/');

server.listen(conf.port, conf.hostname, conf.scheme);
