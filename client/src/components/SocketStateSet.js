// import React , { useContext } from "react";
// import socketio from 'socket.io-client';
// import CurrentTabState from './TabStateProvider';

// const socket = socketio.connect('localhost:3002');



// function SocketStateSet() {
// const { state , actions} = useContext(CurrentTabState);
// socket.on('connect_failed', () => {
//   console.log("소켓서버에 연결할 수 없습니다.");
// })

// socket.on('connect', () => {
//   console.log('connected !');
//   // socket.on('mqtt', msg => {
//   //   console.log('mqtt 테스트');d
//   //   console.log(msg.topic+ ' ' + msg.payload);
//   // })
//   socket.on('/pc1/tab1', msg => {
//     console.log(msg.topic+ ' : ' + msg.payload);
//     actions.setTab1State(msg.payload)
//   })
//   socket.on('/pc1/tab2', msg => {
//     console.log(msg.topic+ ' : ' + msg.payload);
//     actions.setTab2State(msg.payload)
//   })
//   socket.on('/pc1/tab3', msg => {
//     console.log(msg.topic+ ' : ' + msg.payload);
//     actions.setTab3State(msg.payload)
//   })
// });
// };

// export default SocketStateSet;