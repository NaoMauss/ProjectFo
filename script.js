console.log("test")
window.addEventListener('keydown', music);

var audio = new Audio("L'internationale.mp3");

var x = document.querySelector(".bg-danger");

function music(e){
  if (e.keyCode == 70){
    audio.play();
    console.log("oaejlzehuizaer");
    x.setAttribute('style', 'background: linear-gradient(157deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 35%, rgba(0,212,255,1) 100%) !important');
  }
  else if (e.keyCode == 79){
    audio.pause();
    x.setAttribute('style', 'background-color: #d9534f !important');
  }
}

