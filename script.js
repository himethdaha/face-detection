const webcam = document.querySelector("#webcam");

//Loading all the models
Promise.all([
  //Faster, smaller less resource consuming detector
  faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
  //Detect parts of the face(eyes,nose and etc)
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  //Detect where the face is
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  //Used to detect emotions
  faceapi.nets.faceExpressionNet.loadFromUri("./models"),
]).then(hookWebCam());

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

//Add an event listener to the video element
webcam.addEventListener("play", () => {
  //Create a canvas
  const canvas = faceapi.createCanvasFromMedia(webcam);
  //Add the canvas to the body
  document.body.append(canvas);
  //Give the canvas dimensions
  const displaySize = { width: webcam.width, height: webcam.height };
  faceapi.matchDimensions(canvas, displaySize);
  //Run the function every 100 ms
  setInterval(async () => {
    //Get the detector types
    //detectAllFaces(input element, library used to detect faces)
    //withFaceLandmarks -> to get each section of the face. Different dots on the face
    //withFaceExpressions -> to identify the emotions
    const detectors = await faceapi
      .detectAllFaces(webcam, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    //Resize the detector boxes to match with the video box and canvas
    const resizedDetections = faceapi.resizeResults(detectors, displaySize);
    //Draw the detections onto the canvas
    faceapi.draw.drawDetections(canvas, resizedDetections);
    //Draw face landmarks onto the canvas
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    //Show expressions
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
});
