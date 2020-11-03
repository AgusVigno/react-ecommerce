import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home.js';
import CustomNavBar from './components/CustomNavBar.js';

function App() {  
  return (
    <div className="App">
      <CustomNavBar />
      <Home />
    </div>
  );
}

export default App;
