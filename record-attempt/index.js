let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrls = [];
let audioUrl;
let audio;
let recording = false;
let stream;

let recordBtn = document.querySelector("#record");

let stopBtn = document.querySelector("#stop");

//This is the base record time out example.
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    
    recordBtn.onclick = (e) => {
        
        if(!recording){
            mediaRecorder.start();
            recording = !recording;
        }
        else if(recording){
            mediaRecorder.stop();
            recording = !recording;
        }
        else{
            console.log("Guess I'll cry.")
        }
        
    }
    // stopBtn.onclick = (e) => {
    //     mediaRecorder.stop();
    // }

    audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", () => {
        audioBlob = new Blob(audioChunks);
        audioUrl = URL.createObjectURL(audioBlob);
        audioUrls.push(audioUrl);
        audio = new Audio(audioUrl);
      audio.play();
      });
    
  });