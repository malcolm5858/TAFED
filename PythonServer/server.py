import http.server
import SocketServer

port = 8080
Handler = http.server.SimpleHTTPRequestHandler

with SocketServer.TCPServer(("", port) Handler) as httpd:
    print("serving at port", port)
    httpd.serve_forever()
    