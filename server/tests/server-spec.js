/**
 * Created by Martin on 07/09/2016.
 * See http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
 */
'use strict';
const conf = require('../config/');
const server = require('../');
const expect = require('chai').expect;
const http = require('http');

describe('Server', () => {
    before( () => server.listen(conf.port, conf.hostname) );

    after( () => server.close() );

    describe('/', () => {
        it('should return 200', function (done) {
            http.get('http://127.0.0.1:3000', function (res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
        })
    });

});
