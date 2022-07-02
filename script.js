const webcam = document.querySelector("#webcam");

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
