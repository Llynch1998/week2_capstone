// An IIFE ("Iffy") - see the notes in mycourses
(function () {
  "use strict";

  //Original Controls
  var NUM_SAMPLES = 256;

  //These need to have audio files implemented
  var sound1 = '';
  var sound2 = '';
  var sound3 = '';
  var sound4 = '';
  var sound5 = '';
  var sound6 = '';
  var sound7 = '';
  var sound8 = '';

  var audioElement;
  var analyserNode;

  function init() {
    // get reference to <audio> element on page
    audioElement = document.querySelector('audio');

    // call our helper function and get an analyser node
    analyserNode = createWebAudioContextWithAnalyserNode(audioElement);

    // load and play default sound into audio element
    playStream(audioElement, sound1);
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
    var snd1, snd2, snd3, snd4, snd5, snd6, snd7, snd8 = new Audio();
    var src1, src2, src3, src4, src5, src6, src7, src8 = document.createElement("source");
    
    src1.type = "audio/mpeg";
    src1.src = sound1;
    snd1.appendChild(src1);

    src2.type = "audio/mpeg";
    src2.src = sound2;
    snd2.appendChild(src2);
    
    src3.type = "audio/mpeg";
    src3.src = sound3;
    snd3.appendChild(src3);
    
    src4.type = "audio/mpeg";
    src4.src = sound4;
    snd4.appendChild(src4);
    
    src5.type = "audio/mpeg";
    src5.src = sound1;
    snd5.appendChild(src5);

    src6.type = "audio/mpeg";
    src6.src = sound6;
    snd6.appendChild(src6);
    
    src7.type = "audio/mpeg";
    src7.src = sound7;
    snd7.appendChild(src7);
    
    src8.type = "audio/mpeg";
    src8.src = sound8;
    snd8.appendChild(src8);
    
    snd1.play(); snd2.play(); snd3.play(); snd4.play(); snd5.play(); snd6.play(); snd7.play(); snd8.play();
  }

  //Changes the message to display the current song being played
  function playStream(audioElement, path) {
    audioElement.src = path;
    audioElement.play();
    audioElement.volume = 0.2;
    document.querySelector('#status').innerHTML = "Now playing: " + path;
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
