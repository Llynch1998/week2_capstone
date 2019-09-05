var bassEffect, trebleEffect;
var bass = 0,
  treble = 0;
var NUM_SAMPLES = 256;

// audioElement should be the audio files used to put through the line of code
function createWebAudioCtx(audioElement) {
  //We need new variable for the bass and treble
  var audioCtx, analyzerNode, sourceNode;

  //Create the new audio content for a playback
  audioCtx = new(window.AudioContext || window.webkitAudioContext);

  // Create the analyzer node
  analyzerNode = audioCtx.createAnalyser();
  analyzerNode.ffsSize = NUM_SAMPLES;

  // Hook up the <audio> element to the analyzerNode
  sourceNode = audioCtx.createMediaElementSource(audioElement);
  sourceNode.connect(analyserNode);

  //Create RNG to manipulate the bass and treble values
  //  This is needed to help change the audio effect...
  var rngBass = Math.floor(Math.random() * 61) - 30;
  var rngTreble = Math.floor(Math.random() * 61) - 30;
  bass = rngBass;
  treble = rngTreble;
  
  //Use BiquadFilterNode to create the bass and treble boosts
  // Bass - Low pitch
  bassEffect = audioCtx.createBiquadFilter();
  bassEffect.type = "lowshelf";
  bassEffect.frequency.value = 200;
  bassEffect.gain.value = bass;

  // Treble - High Pitch
  trebleEffect = audioCtx.createBiquadFilter();
  trebleEffect.type = "highshelf";
  trebleEffect.frequency.value = 200;
  trebleEffect.gain.value = treble;

  //Connect all of the effects to the main song to create low and high pitch sounds
  sourceNode.connect(bassEffect);
  bassEffect.connect(trebleEffect);
  trebleEffect.connect(analyserNode);

  // here we connect to the destination i.e. speakers
  analyserNode.connect(audioCtx.destination);
  return analyserNode;
}

//Original code used for project
/*
function createWebAudioContextWithAnalyserNode(audioElement) {

        //Created new variables for the bass and treble
        var audioCtx, analyserNode, sourceNode;

        // create new AudioContext
        audioCtx = new (window.AudioContext || window.webkitAudioContext);

        // create an analyser node
        analyserNode = audioCtx.createAnalyser();

        // fft stands for Fast Fourier Transform
        analyserNode.fftSize = NUM_SAMPLES;

        // this is where we hook up the <audio> element to the analyserNode
        sourceNode = audioCtx.createMediaElementSource(audioElement);
        sourceNode.connect(analyserNode);

        //A friend explained this to me
        //  I also looked at this website to understand the basics: 
        //  https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
        //Add the bass boost
        bassEffect = audioCtx.createBiquadFilter();
        bassEffect.type = "lowshelf";
        bassEffect.frequency.value = 200;
        bassEffect.gain.value = bass;

        //Add the treble boost
        trebleEffect = audioCtx.createBiquadFilter();
        trebleEffect.type = "highshelf";
        trebleEffect.frequency.value = 200;
        trebleEffect.gain.value = treble;

        //Connect all of the effects to the main song to create low and high pitch sounds
        sourceNode.connect(bassEffect);
        bassEffect.connect(trebleEffect);
        trebleEffect.connect(analyserNode);

        // here we connect to the destination i.e. speakers
        analyserNode.connect(audioCtx.destination);
        return analyserNode;
    }
*/

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
