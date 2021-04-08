import React from 'react';
import Navbar from './components/Navbar/Navbar';
import TabState from './components/TabState';
import { TabStateProvider } from './components/TabStateProvider';
import './App.css';

function App() {

  return (
    <TabStateProvider>
      <div className="App">
          <header className="App-header">
          
            <Navbar />
            <button onClick={onclick}>State 변경 테스트  </button>
          </header>
  
        <TabState />
      </div>
    </TabStateProvider>
  );
}

export default App;
