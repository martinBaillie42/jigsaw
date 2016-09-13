/**
 * Created by Martin on 05/09/2016.
 * Original server script taken from
 * https://nodejs.org/dist/latest-v6.x/docs/api/synopsis.html
 * New version from
 * http://www.jblotus.com/2011/05/30/building-your-first-node-js-app-part-2-building-the-web-server-and-request-dispatcher/
 */

// TODO: Update server and dispatcher in this style https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/


// include modules
const util = require('util');
const http = require('http');
const url = require('url');

// require customer dispatcher
const dispatcher = require('./dispatcher');

const server = http.createServer((req, res) => {
    // wrap call in a try catch
    // or node js server will crash upon any code errors
    try {
        // pipe some details to the node console
        console.log(`Incoming request from: ${req.connection.remoteAddress} for href: ${url.parse(req.url).href}`);

        // dispatch our request
        dispatcher.dispatch(req, res);

    } catch (err) {
        // handle errors gracefully
        util.puts(err);
        res.writeHead(404);
        res.end('Not Found');
    }
});

exports.listen = function (port, hostname) {
    server.listen(port, hostname, () => {
        // runs when our server is created
        console.log(`Server running at http://${hostname}:${port}/`);
    });
};

exports.close = function () {
    server.close();
};



