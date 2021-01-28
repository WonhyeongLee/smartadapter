const express = require('express');
const router = express.Router();
const mqtt = require('mqtt');
// const socket = require('socket.io');
const socketio = require('socket.io-client');
// 나중에 config 로 옮겨야함 
var topic_list=["/pc1/tab1","/pc1/tab2","/pc1/tab3"];
const options = {
    host: '172.30.1.53',
    port: 1883,
    protocol: 'mqtt',
    username:"gsk2",
    password:"gskpw",
  };

  const client = mqtt.connect(options);

  const io = socketio('http://127.0.0.1:3002');

  io.on('connection', (socket) => {
    console.log("socket connect");
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

  client.subscribe(topic_list, {qos:1});

  client.on("connect", () => {	
    console.log("연결됨 ::"+ client.connected);
    
  });

  client.on("error", (error) => { 
    console.log("Can't connect" + error);
  });
  
  client.on('message', (topic, message, packet) => {
	console.log("message is "+ message);
	console.log("topic is "+ topic);
});


module.exports = router;