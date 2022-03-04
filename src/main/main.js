import React, { useCallback, useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

import one from './images/one.png';
import two from './images/two.png';
import three from './images/three.png';
import four from './images/four.png';
import five from './images/five.png';
import './main.css';


const Main = () => {
  const [, updateState] = React.useState();
  
  const imageStyle={
    position:'absolute',
    height: '100%',
  }

  const imgSource = "https://yummeal-image.s3.ap-northeast-2.amazonaws.com/original/aafw"
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',  
      width: '100vw', 
      height: '100vh'
      }}
    >
      <img src={one} alt="as" style={imageStyle} />
      <img src={two} alt="as" style={imageStyle} />
      <img src={three} alt="as" style={imageStyle} className="background" />
      <img src={four} alt="as" style={imageStyle} />
      <img src={five} alt="as" style={imageStyle} className="background" />

      <img src={`${imgSource}/test0.jpg`} alt="face" className="box" id="face1" />
      <img src={`${imgSource}/test1.jpg`} alt="face" className="box7" id="face2" />
      <img src={`${imgSource}/test2.jpg`} alt="face" className="box2" id="face3" />
      <img src={`${imgSource}/test3.jpg`} alt="face" className="box3" id="face4" />
      <img src={`${imgSource}/test4.jpg`} alt="face" className="box6" id="face5" />
      <img src={`${imgSource}/test5.jpg`} alt="face" className="box5" id="face6" />
      <img src={`${imgSource}/test6.jpg`} alt="face" className="box4" id="face7" />
    </div>
  )
}

export default Main;