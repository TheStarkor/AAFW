import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
/* Material UI */
import { Fab, makeStyles, createStyles } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
/* Tensorflow BodyPix */
import * as bodyPix from "@tensorflow-models/body-pix";
import * as tf from "@tensorflow/tfjs";
// console.log("Using TensorFlow backend: ", tf.getBackend());
import one from './images/one.png';

tf.setBackend('cpu')

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonStyle: {
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 30,
      zIndex: 10
    }
  })
);

const videoConstraints = {
  width: 375,
  height: 667,
  facingMode: "user"
};

const Test = () => {
  const videoRef = useRef(null)
  const classes = useStyles();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [model, setModel] = useState();

  useEffect(() => {
    bodyPix.load().then((net) => {
      setModel(net);
      console.log(net);
    });
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setWidth(width);
    setHeight(height);
  }, []);

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("imageSrc", imageSrc);
  }, [webcamRef]);

  const estimate = () => {
    const webcam = document.getElementById("webcam");
    console.log("## webcam", webcam);
    model.segmentPerson(webcam).then(
      (segmentation) => {
        console.log("## segmentation", segmentation);
      },
      [model]
    );
  };

  return (
    <>
      <Webcam
        id="webcam"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <div className={classes.buttonStyle}>
        <Fab color="primary" onClick={estimate}>
          <PhotoCameraIcon />
        </Fab>
      </div>
    </>
  );
}

export default Test;