import React, { useCallback, useEffect, useState } from 'react';
import useInterval from '@use-it/interval';

import one from './images/one.png';
import two from './images/two.png';
import three from './images/three.png';
import four from './images/four.png';
import five from './images/five.png';
import './main.css';
import axios from 'axios';

const Main = () => {
  const [images, setImages] = useState([]);
  
  const imageStyle={
    position:'absolute',
    height: '100%',
  }


  useInterval(() => {
    axios.get('https://46ef-1-223-190-197.ngrok.io/images')
      .then(res => {
        console.log(res.data);
        setImages(res.data.results)
      })

  }, 2000);
  
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

      {
        images.map((image, index) => (
          <img key={`image-${image}`} src={image} alt="face" className={`box${index}`} id={`face${index}`} />    
        ))
      }
    </div>
  )
}

export default Main;