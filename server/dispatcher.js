/**
 * Created by Martin on 05/09/2016.
 * Based on this:
 * http://www.jblotus.com/2011/05/30/building-your-first-node-js-app-part-2-building-the-web-server-and-request-dispatcher/
 */

// Import modules
const fs = require('fs');

exports.dispatch = function(req, res){

    // some private methods
    function constructResponse({ code = 200, body = code, ext = 'html' } = {}) {
        const contentType = {
            html: 'text/html',
            css: 'text/css',
            js: 'application/js'
        };
        res.writeHead(code, {'Content-Type': contentType[ext]});
        res.end(body.toString(), 'utf-8');
    }

    function fileHandler (err, data, ext) {
        if (err) {
            constructResponse({code: 404});
        } else {
            constructResponse({body: data, ext: ext});
        }
    }

    console.log(req.url);

    // TODO: Tidy up this nastiness!
    var route = req.url === '/' ? '/index' : req.url;
    ext = route.includes('.') ? route.split('.').pop() : 'html';
    route = !route.includes('.') ? route + '.html' : route;
    route = `./public${route}`;

    fs.readFile(route, 'utf-8', (err, data) => {
        fileHandler(err, data, ext);
    });

};
