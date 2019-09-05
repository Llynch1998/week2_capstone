let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrls = [];
let audioUrl;
let audio;
let recording = false;

let recordBtn = document.querySelector("#record");

let stopBtn = document.querySelector("#stop");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia (
       // constraints - only audio needed for this app
       {
          audio: true
       })
 
       // Success callback
       .then(function(stream) {
  
         
       })
 
       // Error callback
       .catch(function(err) {
          console.log('The following getUserMedia error occured: ' + err);
       }
    );
 } else {
    console.log('getUserMedia not supported on your browser!');
 }

let mediaRecorder = new mediaRecorder(stream);

recordBtn.onclick = function(e) {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
}

mediaRecorder.ondataavailable = function(e) {
    audioChunks.push(e.data);
  }

stopBtn.onclick = function(){
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
}

//This is the base record time out example.
// navigator.mediaDevices.getUserMedia({ audio: true })
//   .then(stream => {
//     mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.start();

//     audioChunks = [];

//     mediaRecorder.addEventListener("dataavailable", event => {
//       audioChunks.push(event.data);
//     });
//     mediaRecorder.addEventListener("stop", () => {
//         audioBlob = new Blob(audioChunks);
//         audioUrl = URL.createObjectURL(audioBlob);
//         audioUrls.push(audioUrl);
//         audio = new Audio(audioUrl);
//       audio.play();
//       });
//     setTimeout(() => {
//         mediaRecorder.stop();
//       }, 1000);
//   });

// recording = !recording;
//     if(recording){
//         mediaRecorder.start();
//     }
//     else if(recording == false){
//         mediaRecorder.addEventListener("stop", () => {
//             audioBlob = new Blob(audioChunks);
//             audioUrl = URL.createObjectURL(audioBlob);
//             audioUrls.push(audioUrl);
//             audio = new Audio(audioUrl);
//           audio.play();
//           });

//         mediaRecorder.stop();
//     }