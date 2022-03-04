import React, { useEffect, useRef, useState } from "react";
import * as faceapi from 'face-api.js'
import axios from "axios";

function Face() {
  const [data, setData] = useState(null);
  const [type, setType] = useState(true);
  const [images, setImages] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const videoHeight = 810;
  const videoWidth = 1080;
  const [initializing, setInitializing] = useState(false)
  const handleImage = async () => {
    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      const displaySize = {
        width: videoWidth,
        height: videoHeight
      }
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi.detectAllFaces(
        videoRef.current, 
        new faceapi.TinyFaceDetectorOptions());
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight)
      console.log(detections)
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections)

      const video = document.getElementById('video')
      const canvasSave = document.getElementById('2d');
      canvasSave.width = video.videoWidth;
      canvasSave.height = video.videoHeight;
      canvasSave.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

      canvasSave.toBlob(async function(blob) {
        let data = new FormData();
        data.append('image', blob, 'image.png');
        try {
          const resp = await axios.post(`http://localhost:5000/img`, data);
          const new_images = [...images, resp.data];
          console.log(images)
          setImages(new_images)
          setData(resp.data)
        } catch (err) {
          console.log(err)
        }
      })
    }, 10000)
  }
  
  useEffect(() => {
    setInitializing(true)
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]).then(startVideo())
      .catch((e) => console.log(e))
    }
    loadModels()
  }, [])

  const startVideo = () => {
    navigator.getUserMedia(
      { video : {} },
      stream => videoRef.current.srcObject = stream,
      err => console.error(err))
  };

  return (
    <div style={{ display: 'flex'}}>
      {
        type
        ?
        <>
          <video id='video' autoPlay ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleImage} />
          <canvas id='face' ref={canvasRef} height={videoHeight} width={videoWidth} style={{ position: 'absolute' }} />
          <canvas id='2d' />
          <img src={data} />
        </>
        : <>hi</>
      }
      <button onClick={() => setType(!type)}>press</button>
    </div>
  );
}

export default Face;