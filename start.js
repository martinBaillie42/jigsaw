const conf = require('./app/config/');
const server = require('./app/server');

server.listen(conf.port, conf.hostname);

// TODO set domain and port in dev and test settings files.