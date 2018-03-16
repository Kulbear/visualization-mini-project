import React from "react";
import { Link } from "react-router-dom";
import Img from 'react-image'
import "./css/styles.css";


export default props => (
  <div className='home'>
    <h2 className='title'>Welcome to our air quality demo station!</h2>
    <Img  className= "pollution central" src="https://nelson.wisc.edu/sage/images/banner_airquality.jpg"/>
    <br></br>
    <br></br>
    <br></br>
    <p>
      View the air quality data of <mark>China mainland</mark> here by table mode and
      chart mode. Please choose from the tab above.
    </p>

  </div>
    
);
