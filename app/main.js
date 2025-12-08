const net = require("net");

console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // Parse the HTTP request
    const request = data.toString();
    const lines = request.split("\r\n");
    const requestLine = lines[0];
    
    // Extract the request method, path, and HTTP version
    const [method, path, httpVersion] = requestLine.split(" ");
    
    console.log(`Method: ${method}, Path: ${path}`);
    
    // Check if the path is "/"
    if (path === "/") {
      // Send HTTP 200 OK response
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
    } else {
      // Send HTTP 404 Not Found response
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }
    
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");