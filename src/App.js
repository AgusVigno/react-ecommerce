import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home.js';
import CustomNavBar from './components/CustomNavBar.js';

function App() {
  const message = "Curso de ReactJS - CoderHouse";
  
  return (
    <div className="App">
      <CustomNavBar />
      <Home 
        message={message}
      />
    </div>
  );
}

export default App;
