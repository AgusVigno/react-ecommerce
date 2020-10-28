import React from 'react';
import CustomNavBar from './components/CustomNavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./react.png";

function App() {
  
  const styles = {
    width: 300
  }


  return (
    <div className="App">
      <CustomNavBar />
      <h1 style={{marginTop:50, marginBottom: 70}}>Curso de React.JS - CoderHouse</h1>
      <img 
        src={logo}
        alt="imagen de react"
        style={styles}
      />
    </div>
  );
}

export default App;
