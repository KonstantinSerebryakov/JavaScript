const http = require('http');
const https = require('https');
const ports = require('./config.json');
const fs = require('fs');
const path = require('path');
const router = require('./router');

const certificatePath = path.resolve(__dirname, './certificates');

const isCertificatesExists = fs.existsSync(`${certificatePath}/key.pem`) && fs.existsSync(`${certificatePath}/cert.pem`);
const server = isCertificatesExists
    ? https.createServer({
        key: fs.readFileSync(`${certificatePath}/key.pem`),
        cert: fs.readFileSync(`${certificatePath}/cert.pem`)
    }, requestHandler)
    : http.createServer(requestHandler);

const port = isCertificatesExists ? ports.https.port : ports.http.port;

const baseURL = `${isCertificatesExists ? 'https' : 'http'}://localhost:${port}`;

function requestHandler(request, response) {
    const {method, url} = request;
    log(`${method} - ${url}`);
    const parsedUrl = new URL(url, baseURL);
    const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

    const buffer = [];
    request.addListener('data', (chunk) => {
        buffer.push(chunk);
    });

    request.addListener('end', () => {
        const body = buffer.length ? JSON.parse(Buffer.concat(buffer).toString()) : {};

        try {
            const resultMessage = router[trimmedPath][method.toLowerCase()](body, response);
            log(resultMessage);
        } catch (e) {
            console.error(e);
        }
    });

    function log(message) {
        console.log(message);
    }
}

server.listen(port, () => {
    console.log(`I am listening to port ${port} on this computer`);
});
