/**
 * Created by Martin on 11/09/2016.
 */
const dev = require('./config.dev.js');

const test = {
    port: 8000
};

module.exports = Object.assign({}, dev, test);
