import websocket
import json

def send_request(request):
    global response, all_chunks_sent
    response = "" 
    all_chunks_sent = True

    def on_message(ws, message):
        global response, all_chunks_sent
        #print("Received message:", message)
        response += message
        
        if all_chunks_sent:
            ws.close()

    def on_error(ws, error):
        print("Error:", error)

    def on_close(ws, *args):
        print("Connection closed")

    def on_open(ws):
        global all_chunks_sent
        print("WebSocket connected")
        
        ws.send(json.dumps(request))
        all_chunks_sent = False

    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:8080/",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open
    ws.run_forever()
    return response



request = {
    "url": "https://www.google.com",
    "payload": "",
    "request_type": "GET"
}
response = send_request(request)


