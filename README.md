# Proxy Server
## Overview
This proxy server is designed to handle WebSocket connections and act as an intermediary between clients and external HTTP services. It facilitates communication by forwarding HTTP requests from clients to the specified URLs using WebSocket messages and sending back the responses.

## Backend Implementation
Requirements
Node.js
WebSocket (ws package)
Axios (axios package)


## Usage
Include WebSocket support in your client application.
Use the sendRequest function to send HTTP requests through the WebSocket connection.

## Code Explanation

The backend server listens for WebSocket connections on port 8080. When a client connects, it waits for messages containing request data in JSON format, including URL, payload (if applicable), and request type (GET, POST, PUT, DELETE). Upon receiving a message, it forwards the corresponding HTTP request to the specified URL and streams the response back to the client.


## Notes
This proxy server is intended for educational and testing purposes and may require enhancements for production use, such as error handling, security measures, and performance optimizations
