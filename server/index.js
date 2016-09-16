/**
 * Created by Martin on 05/09/2016.
 * Original server script taken from:
 * https://nodejs.org/dist/latest-v6.x/docs/api/synopsis.html
 * New version from:
 * http://www.jblotus.com/2011/05/30/building-your-first-node-js-app-part-2-building-the-web-server-and-request-dispatcher/
 * New new version from:
 * https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
 */

// TODO: Update server and dispatcher in this style https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

'use stict';

// include modules
const util = require('util');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

function constructPath(url) {
    const root = './public';
    var filePath = url === '/' ? url + 'index' : url;
    filePath = !path.extname(filePath) ? filePath + '.html' : filePath;
    return root + filePath;
}

function responseErr(res, responseCode) {
    res.writeHead(responseCode, {'Content-Type': 'text/html'});
    res.end(`<h1>${responseCode}</h1>`, 'utf-8');
    return res;
}

function responseSuccess(res, filePath, data) {
    const contentType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/js'
    };
    var ext = path.extname(filePath).replace('.', '');
    res.writeHead(200, {'Content-Type': contentType[ext]});
    res.end(data.toString(), 'utf-8');
    return res;
}

server.on('request', (req, res) => {

    var filePath = constructPath(req.url);

    console.log(filePath);

    req.on('error', (err) => {
        console.log(err);
        res.statusCode = 400;
        res.end();
    });

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res = responseErr(res, 404);
        } else {
            res = responseSuccess(res, filePath, data);
        }
    });

});

exports.listen = function (port, hostname, scheme) {
    server.listen(port, hostname, () => {
        // runs when our server is created
        console.log(`Server running at ${scheme}://${hostname}:${port}/`);
    });
};

exports.close = function () {
    server.close();
};



