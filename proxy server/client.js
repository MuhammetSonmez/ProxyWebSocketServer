function sendRequest(request) {
    let response = "";
    let allChunksSent = true;

    const ws = new WebSocket('ws://localhost:8080/');

    ws.onopen = function () {
        console.log('WebSocket connected');
        ws.send(JSON.stringify(request));
        allChunksSent = false;
    };

    ws.onmessage = function (event) {
        console.log('Received message:', event.data);
        response += event.data;
        if (allChunksSent) {
            ws.close();
        }
    };

    ws.onerror = function (error) {
        console.error('Error:', error);
    };

    ws.onclose = function () {
        console.log('Connection closed');
    };

    return new Promise(resolve => {
        ws.onclose = () => resolve(response);
    });
}

const request = {
    url: "https://www.google.com",
    payload: "",
    request_type: "GET"
};

sendRequest(request)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
