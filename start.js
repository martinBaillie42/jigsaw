const conf = require('./server/config/');
const server = require('./server/');

server.listen(conf.port, conf.hostname, conf.scheme);

// TODO set domain and port in dev and test settings files.