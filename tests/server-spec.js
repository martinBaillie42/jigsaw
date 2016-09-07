/**
 * Created by Martin on 07/09/2016.
 */
// server-spec.js
'use strict';
var expect = require('chai').expect;

describe('Server', function() {
    it('should exist', function() {
        var Server = require('../server.js');
        expect(Server).to.not.be.undefined;
    });
});