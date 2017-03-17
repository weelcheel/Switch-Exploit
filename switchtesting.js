var http = require('http');
var fs = require('fs');

var partCount = 0;

function handleRequest(request, response) {

    if (request.method === 'GET') {
        fs.readFile('switchhax0r.html', function (err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
            response.write(data);
            response.end();
        });
    }
    if (request.method === 'POST') {
        var body = [];
        request.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            response.on('error', function (err) {
                console.error(err);
            });

            body = Buffer.concat(body);

            /*var stream = fs.createWriteStream("switchdata.data");
            stream.once('open', function (fd) {
                stream.write(body);
                stream.end();
            });*/

            response.writeHead(200, {});

            console.log(body);
            var stream = fs.createWriteStream("switchdata_part" + partCount + ".data");
            stream.once('open', function (fd) {
                stream.write(body);
                stream.end();
                partCount++;
            });

            response.end();
        });
    }
}

var server = http.createServer(handleRequest);

server.listen(5001, function () {
    console.log("Server listening on: http:localhost:%s", "5001");
});