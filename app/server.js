/**
 * Created by Martin on 05/09/2016.
 * Original server script taken from
 * https://nodejs.org/dist/latest-v6.x/docs/api/synopsis.html
 * New version from
 * http://www.jblotus.com/2011/05/30/building-your-first-node-js-app-part-2-building-the-web-server-and-request-dispatcher/
 */

// include modules
const util = require('util');
const http = require('http');
const url = require('url');

// require customer dispatcher
const dispatcher = require('./dispatcher.js');

// set server values
const hostname = '127.0.0.1';
const port = 3000;

console.log(`Starting server at http://${hostname}:${port}/`);

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
        res.writeHead(500);
        res.end('Internal Server Error');
    }
});

server.listen(port, hostname, () => {
    // runs when our server is created
    console.log(`Server running at http://${hostname}:${port}/`);
});


