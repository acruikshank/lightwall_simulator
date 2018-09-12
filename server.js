var http = require('http');
var fs = require('fs');
var path = require('path');

const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8080,
});
let lastMessage = new Date().getTime()
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let nextTime = new Date().getTime()
    let timeSinceLast = nextTime - lastMessage
    if (timeSinceLast < 60) return;
    lastMessage = nextTime;

    port1.write(Buffer.from(message))
    port2.write(Buffer.from(message))
  });
});

const SerialPort = require('serialport');
const port1 = new SerialPort('/dev/tty.usbmodem611591', {baudRate: 9600}, (err) => {
  if (err)
    return console.log("Error opening port 1", err);

  port1.write(Buffer.from(new Uint8Array([0,0])))
});

const port2 = new SerialPort('/dev/tty.usbmodem611661', {baudRate: 9600}, (err) => {
  if (err)
    return console.log("Error opening port 1", err);

  port2.write(Buffer.from(new Uint8Array([0,4])))
});


http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');
