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


// include modules
const util = require('util');
const http = require('http');
const url = require('url');

// require customer dispatcher
const dispatcher = require('./dispatcher');

const server = http.createServer(
/*    (req, res) => {
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

} */
);

server.on('request', (req, res) => {
    var miniReq = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: []
    };

    req.on('error', function(err) {
        console.error(err);
        // requires a bit more to determine the error and correct error code to return
        res.statusCode = 400;
        res.end();
    }).on('data', function(chunk) {
        minireq.body.push(chunk); // TODO: <- What is this?! on data chunk?
    }).on('end', function() {
        miniReq.body = Buffer.concat(miniReq.body).toString(); // TODO: What is Buffer?
        // At this point, `body` has the entire request body stored in it as a string.
        // Also, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
    });

    // res.on('error', function(err) {
    //     console.log(err);
    // });

    dispatcher.dispatch(miniReq, res);

    // res.writeHead(dispatch.statusCode, {'Content-Type': dispatch.contentType}, dispatch.encoding);
    // res.end(dispatch.body);

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // res.writeHead(200, {'Content-Type': 'application/json'})

    // res.write("HELLO");
    // res.end();
    // Note: the 2 lines above could be replaced with this next one:
    // res.end(JSON.stringify(responseBody))
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



