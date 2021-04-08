const app = require('express')();
const express = require('express');
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.NODE_ENV === "production" ? 3000 : 3002;
const mqtt = require('mqtt');

// socket 통신 cors 관련 해결
// MQTT , SOCKET 부분 분리해야함.. 고민중
const options={
  cors:true,
  origins:`http://127.0.0.1:${PORT}`,
}

var topic_list=["/pc1/tab1","/pc1/tab2","/pc1/tab3"];
const mqttOptions = {
    host: '172.30.1.53',
    port: 1883,
    protocol: 'mqtt',
    username:"gsk2",
    password:"gskpw",
  };

const client = mqtt.connect(mqttOptions);

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

if (process.env.NODE_ENV === "development") {

  app.use(express.static("client/build"));

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

  socket.on('publish', (data) => {
     console.log("emit publish 성공");
      console.log('Publishing to '+data);
      client.publish("/tab_control",data);
  });
});

client.subscribe(topic_list, {qos:1});
client.on("connect", () => {	
  console.log("MQTT 연결됨 ::"+ client.connected);
  
});

client.on("error", (error) => { 
  console.log("MQTT Can't connect" + error);
});

client.on('message', (topic, message, packet) => {
//console.log("message is "+ message);
//console.log("topic is "+ topic);
// io.emit('mqtt', {'topic':String(topic),
//                   'payload':String(message)})

  if(String(topic) == '/pc1/tab1'){
    io.emit('/pc1/tab1', {'topic':String(topic), 'payload':String(message)})
  }else if(String(topic) == '/pc1/tab2'){
    io.emit('/pc1/tab2', {'topic':String(topic), 'payload':String(message)})
  }else if(String(topic) == '/pc1/tab3'){
    io.emit('/pc1/tab3', {'topic':String(topic), 'payload':String(message)})
  }else{
    console.log("error : 해당 토픽이 없음 ");
  }
});



