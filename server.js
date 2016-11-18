var static = require('node-static');

var port = process.env.PORT || 8080;
var dir = './public';

var fileServer = new static.Server(dir);

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(port);

console.log('Serving', dir, 'on port', port);
