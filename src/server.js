var static = require('node-static');

var port = process.env.PORT || 8080;
var dir = './public';
var ONE_HOUR = 3600; // cache control

var headers = {
  "Cache-Control": "no-cache, must-revalidate" // TODO: remove this for production
};

var fileServer = new static.Server(dir, {
  cache: ONE_HOUR,
  headers: headers,
});

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(port);

console.log('Serving', dir, 'on http://localhost:' + port);
