// An IIFE ("Iffy") - see the notes in mycourses
(function () {
  "use strict";

  //Original Controls
  var NUM_SAMPLES = 256;

  //These need to have audio files implemented
  var sound1 = 'assets/Sounds/Snare.mp3';
  var sound2 = 'assets/Sounds/KickDrum.mp3';
  var sound3 = 'assets/Sounds/Bass.mp3';
  var sound4 = 'assets/Sounds/Synth.mp3';
  var sound5 = 'assets/Sounds/Piano.mp3';
  var sound6 = 'assets/Sounds/Strings.mp3';
  var sound7 = 'assets/Sounds/Guitar.mp3';
  var sound8 = 'assets/Sounds/HiHat.mp3';

  var audioElement;
  var analyserNode;

  function init() {
    // get reference to <audio> element on page
    audioElement = document.querySelector('audio');

    // call our helper function and get an analyser node
    analyserNode = createWebAudioContextWithAnalyserNode(audioElement);

    // load and play default sound into audio element
    playStream(audioElement, stitchAudio());
  }


  function createWebAudioContextWithAnalyserNode(audioElement) {

    //Created new variables for the bass and treble
    var audioCtx, analyserNode, sourceNode;

    // create new AudioContext
    audioCtx = new(window.AudioContext || window.webkitAudioContext);

    // create an analyser node
    analyserNode = audioCtx.createAnalyser();

    // fft stands for Fast Fourier Transform
    analyserNode.fftSize = NUM_SAMPLES;

    // this is where we hook up the <audio> element to the analyserNode
    sourceNode = audioCtx.createMediaElementSource(audioElement);
    sourceNode.connect(analyserNode);

    // here we connect to the destination i.e. speakers
    analyserNode.connect(audioCtx.destination);
    return analyserNode;
  }

  //This should work for playing audio at the same time, but I'm also doing a second method
  //  Just to see if it works...
  function stitchAudio() {
    var snd1 = new Audio(sound1);
    var src1 = snd1;

    var snd2 = new Audio(sound2);
    var src2 = snd2;

    var snd3 = new Audio(sound3);
    var src3 = snd3;

    var snd4 = new Audio(sound4);
    var src4 = snd4;

    var snd4 = new Audio(sound4);

    var snd5 = new Audio(sound5);
    var src5 = snd5;

    var snd6 = new Audio(sound6);
    var src6 = snd6;

    var snd7 = new Audio(sound7);
    var src7 = snd7;

    var snd8 = new Audio(sound8);
    var src8 = snd8;
  }

  //Changes the message to display the current song being played
  function playStream(audioElement, path) {
    audioElement.src = path;
    var promise = audioElement.play();
    
    if (promise !== undefined) {
    promise.then(_ => {
        // Autoplay started!
    }).catch(error => {
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
    });
}
    audioElement.volume = 0.2;
  }

  function update() {
    // Schedules a call to the update() method in 1/60 seconds
    requestAnimationFrame(update);

    // create a new array of 8-bit integers (0-255)
    var data = new Uint8Array(NUM_SAMPLES / 2);

    // populate the array with the frequency data
    // notice these arrays can be passed "by reference" 
    analyserNode.getByteFrequencyData(data);
  }

  // FULL SCREEN MODE
  function requestFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
      element.mozRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
    // .. and do nothing if the method is not supported
  }


  window.addEventListener("load", init);
}());
