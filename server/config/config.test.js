/**
 * Created by Martin on 11/09/2016.
 */
'use strict'

const dev = require('./config.dev.js');

const test = {
    port: 3001
};

module.exports = Object.assign({}, dev, test);
