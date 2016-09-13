/**
 * Created by Martin on 05/09/2016.
 * Based on this:
 * http://www.jblotus.com/2011/05/30/building-your-first-node-js-app-part-2-building-the-web-server-and-request-dispatcher/
 */

// Import modules
const fs = require('fs');

exports.dispatch = function(req, res){

    // some private methods
    var serverError = function(code, content) {
        res.writeHead(code, {'Content-Type': 'text/plain'});
        res.end(content);
    };

    var renderHtml = function(content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content, 'utf-8');
    };

    var path = req.url.split('/');
    console.log(path);

    if (req.url == '/') {
        fs.readFile('./public/index.html', function(error, content) {
           if (error) {
               serverError(404);
           } else {
               renderHtml(content);
           }
        });
    } else {
        var resource = path[1];

        fs.readFile(`./public/${resource}.html`, function(error, content) {
            if (error) {
                serverError(404);
            } else {
                renderHtml(content);
            }
        });


    }
};
