const app = require('express')();
const express = require('express');
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.NODE_ENV === "production" ? 3000 : 3002;

// socket 통신 cors 관련 해결
const options={
  cors:true,
  origins:`http://127.0.0.1:${PORT}`,
 }
const io = require('socket.io')(server,options);
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");




app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



console.log("현재 모드 : ", process.env.NODE_ENV);

if (process.env.NODE_ENV == "production") {
  console.log("Production Mode1");
} else if (process.env.NODE_ENV == "development") {
  console.log("Development Mode");
}


app.use("/state", require("./routes/tabs"));
app.use("/mqtt", require("./routes/mqtt"));

// io.on('connection', function(socket) {
//   console.log('A user connected');

//   socket.on('disconnect', function () {
//      console.log('A user disconnected');
//   });
// });



// app.get('/', (req,res) => res.send('Test!'));


if (process.env.NODE_ENV === "development") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

server.listen(PORT, function() {
  console.log('listening on *:' + PORT);
});

io.on('connection', (socket) => {
  const {url} = socket.request;
  console.log(`소켓 연결 ${url}`);

  socket.on('login', (data) => {
    console.log(data);
  })

  io.on('subscribe', (data) => {
      console.log('Subscribing to '+data.topic);
      socket.join(data.topic);
      client.subscribe(data.topic);
  });

  io.on('publish', (data) => {
      console.log('Publishing to '+data.topic);
      client.publish(data.topic,data.payload);
  });
});



