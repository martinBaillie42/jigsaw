/**
 * Created by Martin on 07/09/2016.
 * See http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
 */
'use strict';
const expect = require('chai').expect;
const server = require('../app/server');
const http = require('http');

describe('Server', () => {
    before( () => server.listen(3000) );

    after( () => server.close() );
});

describe('/', () => {
    it('should return 200', function (done) {
        http.get('http://127.0.0.1:3000', function (res) {
            expect(res.statusCode).to.equal(200);
            done();
        })
    })
});


// describe('Server', function() {
//     it('should exist', function() {
//         var Server = require('../app/server.js');
//         expect(Server).to.not.be.undefined;
//     });
// });

