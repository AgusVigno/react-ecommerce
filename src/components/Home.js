import React from 'react'
import logo from "../images/react.png";

const Home = (props) => {
  
  const styles = {
    width: 300
  }

  return ( 
    <div>
      <h1 style={{marginTop:50, marginBottom: 70}}>{props.message}</h1>
      <img 
        src={logo}
        alt="logo de react"
        style={styles}
      />
    </div>
  );
}
 
export default Home;