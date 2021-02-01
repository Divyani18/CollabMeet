const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();

const webSocket = require("websocket").server;

const http = require("http");
const server = http.Server(app);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

const wsServer = new webSocket({
  httpServer : server
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../Client/build', '../Client/public/index.html'));
  });
}

const clients = {};

const getUniqueID = () => {
  const id = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return id() + id() + "-" + id();
}

wsServer.on("request", (request) => {
  const userID = getUniqueID();
  console.log((new Date())+" Received a new connection request from " + request.origin +".");

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;

  console.log("connected: " + userID + " in " + Object.getOwnPropertyNames(clients));

  connection.on("message", (message) => {
    if(message.type == "utf8")
      console.log("Received message : ", message.utf8Data);

    for(key in clients) {
      clients[key].sendUTF(message.utf8Data);
    }
  })

});