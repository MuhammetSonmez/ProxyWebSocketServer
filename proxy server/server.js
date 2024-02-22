const WebSocket = require('ws');
const axios = require("axios");

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', async function incoming(message) {
    console.log('Received:', message);
    let data = JSON.parse(message);
    /*
    let url = data["url"];
    let payload = data["payload"];
    let request_type = ["request_type"];
    */

    try {
        if (!data.url || !data.request_type) {
            throw new Error('url and request_type are required');
        }

        await send_request(data.url, data.payload, data.request_type, ws);
    } catch (error) {
        ws.send("Error: " + error.message);
    }
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

async function send_request(url, payload, requestType, ws) {
    try {
        let response;
        if (requestType === 'GET') {
            response = await axios.get(url);
        } else if (requestType === 'POST') {
            response = await axios.post(url, payload);
        } else if (requestType === 'PUT') {
            response = await axios.put(url, payload);
        } else if (requestType === 'DELETE') {
            response = await axios.delete(url);
        } else {
            throw new Error('invalid request type.');
        }

        const responseData = response.data;
        const chunkSize = 2048;

        for (let i = 0; i < responseData.length; i += chunkSize) {
            const chunk = responseData.slice(i, i + chunkSize);
            ws.send(chunk); // Parçayı istemciye gönder
            await new Promise(resolve => setTimeout(resolve, 0));
        }
        ws.close();
    } catch (error) {
        throw new Error('Error: ' + error.message);
    }
}
