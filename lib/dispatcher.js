/**
 * Created by Martin on 05/09/2016.
 * Based on this:
 * http://www.jblotus.com/2011/05/30/building-your-first-node-js-app-part-2-building-the-web-server-and-request-dispatcher/
 */

// Import modules
const fs = require('fs');

const actions = {
    'view': function(user) {
        return `<h1>Todos for ${user} <h1>`;
    }
};

this.dispatch = function(req, res){

    // some private methods
    var serverError = function(code, content) {
        res.writeHead(code, {'Content-Type': 'text/plain'});
        res.end(content);
    };

    var renderHtml = function(content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content, 'utf-8');
    };

    var parts = req.url.split('/');
    console.log(parts);

    if (req.url == '/') {
        fs.readFile('./webroot/index.html', function(error, content) {
           if (error) {
               serverError(500);
           } else {
               renderHtml(content);
           }
        });
    } else {
        var action = parts[1];
        var argument = parts[2];

        if (typeof actions[action] == 'function') {
            var content = actions[action](argument);
            renderHtml(content);
        } else {
            serverError(404, '404 Bad Request');
        }
    }
};