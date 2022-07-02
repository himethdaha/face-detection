const webcam = document.querySelector("#webcam");

//Loading all the models
Promise.all([
  //Faster, smaller less resource consuming detector
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  //Detect parts of the face(eyes,nose and etc)
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  //Detect where the face is
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  //Used to detect emotions
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]);
//Function to hookup the webcam with the video container
function hookWebCam() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    //stream -> whats coming from our webcam
    .then((stream) => {
      //Set the video source as what's rendering from the webcam
      webcam.srcObject = stream;
    })
    .catch((err) => {
      console.error(err);
    });
}

hookWebCam();
