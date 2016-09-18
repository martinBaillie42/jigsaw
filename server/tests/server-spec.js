/**
 * Created by Martin on 07/09/2016.
 * See http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
 */

'use strict';
const conf = require('../config/');
const server = require('../');
const expect = require('chai').expect;
const http = require('http');

const schemeHostPort = `${conf.scheme}://${conf.hostname}:${conf.port}`;

describe(schemeHostPort, () => {
    before( () => server.listen(conf.port, conf.hostname) );

    after( () => server.close() );

    describe('/', () => {
        it('should return 200', function (done) {
            http.get(schemeHostPort, function (res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
        })
    });

    describe('/not-a-url', () => {
        it('should return 404', function (done) {
            http.get(`${schemeHostPort}/not-a-url`, function (res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
        })
    });

    describe('/styles/', () => {
        it('should return 404', function (done) {
            http.get(`${schemeHostPort}/styles/`, function (res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
        })
    });

    describe('/styles/main.css', () => {

        it('should return 200', function (done) {
            http.get(`${schemeHostPort}/styles/main.css`, function (res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
        });

        it('should return content type \'text/css\'', function (done) {
            http.get(`${schemeHostPort}/styles/main.css`, function (res) {
                expect(res.headers['content-type']).to.equal('text/css');
                done();
            })
        });
    });



    describe('/scripts/', () => {
        it('should return 404', function (done) {
            http.get(`${schemeHostPort}/scripts/`, function (res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
        })
    });

    describe('/scripts/main.js', () => {

        it('should return 200', function (done) {
            http.get(`${schemeHostPort}/scripts/main.js`, function (res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it('should return content type \'application/js\'', function (done) {
            http.get(`${schemeHostPort}/scripts/main.js`, function (res) {
                expect(res.headers['content-type']).to.equal('application/js');
                done();
            });
        });

    });

    describe('/icons/', () => {
        it('should return 404', function (done) {
            http.get(`${schemeHostPort}/icons/`, function (res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
        })
    });

    describe('/icons/fi-mmc/', () => {
        it('should return 404', function (done) {
            http.get(`${schemeHostPort}/icons/fi-mmc`, function (res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
        })
    });

    describe('/icons/fi-mmc/svg/', () => {
        it('should return 404', function (done) {
            http.get(`${schemeHostPort}/icons/fi-mmc/svg`, function (res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
        })
    });

    describe('/icons/fi-mmc/svg/avatar.svg', () => {

        it('should return 200', function (done) {
            http.get(`${schemeHostPort}/icons/fi-mmc/svg/avatar.svg`, function (res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it('should return content type \'image/svg+xml\'', function (done) {
            http.get(`${schemeHostPort}/icons/fi-mmc/svg/avatar.svg`, function (res) {
                expect(res.headers['content-type']).to.equal('image/svg+xml');
                done();
            });
        });

    });

});

