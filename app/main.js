const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
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
    } 
    // Check if the path starts with "/echo/"
    else if (path.startsWith("/echo/")) {
      // Extract the string after "/echo/"
      const echoString = path.substring(6); // Remove "/echo/" prefix
      const contentLength = echoString.length;
      
      // Send HTTP 200 OK response with Content-Type, Content-Length, and body
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Type: text/plain\r\n");
      socket.write(`Content-Length: ${contentLength}\r\n`);
      socket.write("\r\n");
      socket.write(echoString);
    } 
    else {
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