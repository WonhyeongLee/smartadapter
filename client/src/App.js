import React from 'react';
import Navbar from './components/Navbar/Navbar';
import socketio from 'socket.io-client';
import './App.css';

const socket = socketio.connect('localhost:3002');

const onclick = () => {
  const str = "test";
  socket.emit("login" , str);
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
          <button onClick={onclick}>소켓 테스트 </button>
      </header>

    </div>
  );
}

export default App;
